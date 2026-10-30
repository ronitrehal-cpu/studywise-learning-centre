import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { createParentEmailHTML, createAdminEmailText } from './email-templates.mjs';

// This function is the only writer of enrolment_submissions.
// Order: validate -> save the row (fail loudly) -> PDF link -> emails (failures recorded on the row, not fatal).

const MAX_LENGTHS = {
  parent_name: 200,
  parent_email: 254,
  parent_phone: 40,
  student_name: 200,
  student_year_level: 40,
  student_school: 200,
  learning_mode: 40,
  preferred_location: 40,
  additional_info: 5000,
  source_page: 500,
};

const REQUIRED = ['parent_name', 'parent_email', 'parent_phone', 'student_name', 'student_year_level'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

// Returns { data } with trimmed fields, or { error } with a message for the parent-facing form
function validate(body) {
  const data = {};
  for (const [field, maxLength] of Object.entries(MAX_LENGTHS)) {
    data[field] = clean(body[field], maxLength);
  }
  data.subjects = Array.isArray(body.subjects)
    ? body.subjects.filter((s) => typeof s === 'string' && s.trim()).map((s) => s.trim().slice(0, 100)).slice(0, 10)
    : [];

  const missing = REQUIRED.filter((field) => !data[field]);
  if (data.subjects.length === 0) missing.push('subjects');
  if (missing.length > 0) {
    return { error: `Missing required fields: ${missing.join(', ')}` };
  }
  if (!EMAIL_PATTERN.test(data.parent_email)) {
    return { error: 'Invalid email address' };
  }
  return { data };
}

export const handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const respond = (statusCode, body) => ({
    statusCode,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return respond(405, { success: false, error: 'Method not allowed' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return respond(400, { success: false, error: 'Invalid request body' });
  }

  // Honeypot filled: almost certainly a bot. Pretend success and save nothing.
  if (typeof body.honeypot === 'string' && body.honeypot.trim() !== '') {
    return respond(200, { success: true });
  }

  const { data: enrolmentData, error: validationError } = validate(body);
  if (validationError) {
    return respond(400, { success: false, error: validationError });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@studywiselearning.com.au';

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Supabase configuration is missing');
    return respond(500, { success: false, error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // 1. Save the enquiry first. If this fails, nothing else happens and the parent sees an error.
  const { data: dbData, error: dbError } = await supabase
    .from('enrolment_submissions')
    .insert([
      {
        ...enrolmentData,
        ip_address: event.headers['x-forwarded-for'] || event.headers['client-ip'] || '',
        pdf_sent: false,
        pdf_sent_at: null,
        pdf_link_expires_at: null,
        admin_email_sent: false,
        parent_email_sent: false,
      },
    ])
    .select('id')
    .single();

  if (dbError) {
    console.error('Database error:', dbError);
    return respond(500, { success: false, error: 'Failed to save enrolment submission' });
  }

  const submissionId = dbData.id;

  // From here on the enquiry is safe; any failure below is logged and recorded, never fatal.
  const markSubmission = async (fields) => {
    const { error } = await supabase.from('enrolment_submissions').update(fields).eq('id', submissionId);
    if (error) console.error('Failed to update submission flags:', fields, error);
  };

  // 2. PDF link
  let pdfDownloadUrl;
  try {
    const expiresInSeconds = 60 * 60 * 24 * 7;
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('enrolment-forms')
      .createSignedUrl('Studywise-Enrolment-Form.pdf', expiresInSeconds);

    if (signedUrlError) {
      console.error('Error creating signed URL:', signedUrlError);
      pdfDownloadUrl = `${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/public/enrolment-forms/Studywise-Enrolment-Form.pdf`;
    } else {
      pdfDownloadUrl = signedUrlData.signedUrl;
      await markSubmission({
        pdf_sent: true,
        pdf_sent_at: new Date().toISOString(),
        pdf_link_expires_at: new Date(Date.now() + expiresInSeconds * 1000).toISOString(),
      });
    }
  } catch (storageError) {
    console.error('Storage error:', storageError);
    const fallbackUrl = process.env.URL || 'https://studywiselearning.com.au';
    pdfDownloadUrl = `${fallbackUrl}/docs/Studywise-Enrolment-Form.pdf`;
  }

  // 3. Emails
  let adminEmailId;
  let parentEmailId;

  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not configured; enquiry saved without emails');
  } else {
    const resend = new Resend(resendApiKey);

    try {
      const { data, error } = await resend.emails.send({
        from: 'Studywise Learning Centre <noreply@studywiselearning.com.au>',
        to: adminEmail,
        subject: `New Enrolment: ${enrolmentData.student_name} - ${enrolmentData.student_year_level}`,
        text: createAdminEmailText(enrolmentData),
      });
      if (error) throw error;
      adminEmailId = data?.id;
      await markSubmission({ admin_email_sent: true });
    } catch (emailError) {
      console.error('Admin email error:', emailError);
    }

    try {
      const { data, error } = await resend.emails.send({
        from: 'Studywise Learning Centre <noreply@studywiselearning.com.au>',
        to: enrolmentData.parent_email,
        subject: 'Your Studywise enrolment form — next step',
        reply_to: 'admin@studywiselearning.com.au',
        html: createParentEmailHTML({
          parent_name: enrolmentData.parent_name,
          student_name: enrolmentData.student_name,
          student_year_level: enrolmentData.student_year_level,
          pdfDownloadUrl,
          adminEmail,
        }),
      });
      if (error) throw error;
      parentEmailId = data?.id;
      await markSubmission({ parent_email_sent: true });
    } catch (emailError) {
      console.error('Parent email error:', emailError);
    }
  }

  return respond(200, {
    success: true,
    submissionId,
    adminEmailId,
    parentEmailId,
  });
};
