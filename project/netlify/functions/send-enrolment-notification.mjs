import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { createParentEmailHTML, createAdminEmailText } from './email-templates.mjs';

export const handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@studywiselearning.com.au';

    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration is missing');
    }

    const resend = new Resend(resendApiKey);
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const enrolmentData = JSON.parse(event.body);

    let pdfDownloadUrl = null;
    let pdfExpiresAt = null;
    let pdfSent = false;

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
        pdfExpiresAt = new Date(Date.now() + expiresInSeconds * 1000).toISOString();
        pdfSent = true;
      }
    } catch (storageError) {
      console.error('Storage error:', storageError);
      const fallbackUrl = process.env.URL || 'https://studywiselearning.com.au';
      pdfDownloadUrl = `${fallbackUrl}/docs/Studywise-Enrolment-Form.pdf`;
    }

    const { data: dbData, error: dbError } = await supabase
      .from('enrolment_submissions')
      .insert([
        {
          parent_name: enrolmentData.parent_name,
          parent_email: enrolmentData.parent_email,
          parent_phone: enrolmentData.parent_phone,
          student_name: enrolmentData.student_name,
          student_year_level: enrolmentData.student_year_level,
          student_school: enrolmentData.student_school,
          subjects: enrolmentData.subjects,
          learning_mode: enrolmentData.learning_mode,
          preferred_location: enrolmentData.preferred_location || '',
          additional_info: enrolmentData.additional_info || '',
          source_page: enrolmentData.source_page || '',
          ip_address: event.headers['x-forwarded-for'] || event.headers['client-ip'] || '',
          pdf_sent: pdfSent,
          pdf_sent_at: pdfSent ? new Date().toISOString() : null,
          pdf_link_expires_at: pdfExpiresAt,
          admin_email_sent: false,
          parent_email_sent: false,
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save enrolment submission');
    }

    const adminEmailBody = createAdminEmailText(enrolmentData);

    let adminEmailResult;
    try {
      adminEmailResult = await resend.emails.send({
        from: 'Studywise Learning Centre <noreply@studywiselearning.com.au>',
        to: adminEmail,
        subject: `New Enrolment: ${enrolmentData.student_name} - ${enrolmentData.student_year_level}`,
        text: adminEmailBody,
      });

      await supabase
        .from('enrolment_submissions')
        .update({ admin_email_sent: true })
        .eq('id', dbData.id);
    } catch (emailError) {
      console.error('Admin email error:', emailError);
    }

    const parentEmailHtml = createParentEmailHTML({
      parent_name: enrolmentData.parent_name,
      student_name: enrolmentData.student_name,
      student_year_level: enrolmentData.student_year_level,
      pdfDownloadUrl: pdfDownloadUrl,
      adminEmail: adminEmail,
    });

    let parentEmailResult;
    try {
      parentEmailResult = await resend.emails.send({
        from: 'Studywise Learning Centre <noreply@studywiselearning.com.au>',
        to: enrolmentData.parent_email,
        subject: 'Studywise Enrolment Form (PDF) – Next Step',
        html: parentEmailHtml,
      });

      await supabase
        .from('enrolment_submissions')
        .update({ parent_email_sent: true })
        .eq('id', dbData.id);
    } catch (emailError) {
      console.error('Parent email error:', emailError);
    }

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Email notifications sent successfully',
        adminEmailId: adminEmailResult?.data?.id,
        parentEmailId: parentEmailResult?.data?.id,
        submissionId: dbData.id,
      }),
    };
  } catch (error) {
    console.error('Error processing enrolment notification:', error);
    return {
      statusCode: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
