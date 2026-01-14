import { Resend } from 'resend';

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
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const resend = new Resend(resendApiKey);
    const enrolmentData = JSON.parse(event.body);

    const adminEmailBody = `
New Enrolment Submission - Studywise Learning Centre
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PARENT/GUARDIAN INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${enrolmentData.parent_name}
Email: ${enrolmentData.parent_email}
Phone: ${enrolmentData.parent_phone}

STUDENT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Student Name: ${enrolmentData.student_name}
Year Level: ${enrolmentData.student_year_level}
Current School: ${enrolmentData.student_school}

PROGRAM PREFERENCES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subjects: ${enrolmentData.subjects.join(', ')}
Learning Mode: ${enrolmentData.learning_mode}
Preferred Location: ${enrolmentData.preferred_location || 'Not specified'}

ADDITIONAL INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${enrolmentData.additional_info || 'None provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Please contact this family within 24 hours.
    `;

    const parentEmailBody = `
Dear ${enrolmentData.parent_name},

Thank you for your enquiry at Studywise Learning Centre!

We have received your enrolment form for ${enrolmentData.student_name} (${enrolmentData.student_year_level}).

Program Details:
• Subjects: ${enrolmentData.subjects.join(', ')}
• Learning Mode: ${enrolmentData.learning_mode}
${enrolmentData.preferred_location ? `• Preferred Location: ${enrolmentData.preferred_location}` : ''}

Our team will review your submission and contact you within 24 hours to discuss the next steps and answer any questions you may have.

In the meantime, if you have any urgent questions, please feel free to contact us directly.

Best regards,
Studywise Learning Centre Team
    `;

    const adminEmailResult = await resend.emails.send({
      from: 'Studywise Learning Centre <noreply@studywiselearning.com.au>',
      to: 'admin@studywiselearning.com.au',
      subject: `New Enrolment: ${enrolmentData.student_name} - ${enrolmentData.student_year_level}`,
      text: adminEmailBody,
    });

    const parentEmailResult = await resend.emails.send({
      from: 'Studywise Learning Centre <noreply@studywiselearning.com.au>',
      to: enrolmentData.parent_email,
      subject: 'We received your enrolment enquiry – Studywise Learning Centre',
      text: parentEmailBody,
    });

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Email notifications sent successfully',
        adminEmailId: adminEmailResult.data?.id,
        parentEmailId: parentEmailResult.data?.id,
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
