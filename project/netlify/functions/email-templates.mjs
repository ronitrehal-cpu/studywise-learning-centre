export function createParentEmailHTML(data) {
  const { parent_name, student_name, student_year_level, pdfDownloadUrl, adminEmail } = data;

  const studentFirstName = student_name.split(' ')[0];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Studywise Enrolment Form</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 600px;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 40px 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                Studywise Learning Centre
              </h1>
              <p style="margin: 10px 0 0; color: #e0e7ff; font-size: 14px; font-weight: 500;">
                Enrolment Form Ready
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #111827; font-size: 16px; line-height: 1.6;">
                Dear ${parent_name},
              </p>

              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Thanks for your enquiry about enrolling ${studentFirstName} (${student_year_level}) at Studywise Learning Centre.
              </p>

              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                <strong style="color: #111827;">The next step is to complete the official enrolment form.</strong> We've prepared it for you — simply download, fill it out, and send it back to us.
              </p>

              <!-- Download Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${pdfDownloadUrl}" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 6px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);">
                      Download Enrolment Form (PDF)
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Instructions Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; background-color: #f0f9ff; border-left: 4px solid #2563eb; border-radius: 4px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 12px; color: #111827; font-size: 15px; font-weight: 600;">
                      📋 How to Complete Your Enrolment:
                    </p>
                    <ol style="margin: 0; padding-left: 20px; color: #374151; font-size: 14px; line-height: 1.8;">
                      <li style="margin-bottom: 8px;">Click the button above to download the fillable PDF form</li>
                      <li style="margin-bottom: 8px;">Complete all required fields (no printing needed — it's a fillable PDF)</li>
                      <li style="margin-bottom: 8px;">Save the completed form</li>
                      <li>Reply to this email with the completed form attached, or email it to: <strong style="color: #2563eb;">${adminEmail}</strong></li>
                    </ol>
                  </td>
                </tr>
              </table>

              <p style="margin: 25px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                <strong style="color: #374151;">Questions?</strong> Simply reply to this email and we'll be happy to help.
              </p>

              <p style="margin: 20px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6; font-style: italic;">
                Note: The download link will expire in 7 days. If you need a new link, just let us know.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #111827; font-size: 14px; font-weight: 600;">
                Studywise Learning Centre
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.6;">
                Empowering students to achieve their full potential<br>
                <a href="mailto:${adminEmail}" style="color: #2563eb; text-decoration: none;">${adminEmail}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function createAdminEmailText(data) {
  const {
    parent_name,
    parent_email,
    parent_phone,
    student_name,
    student_year_level,
    student_school,
    subjects,
    learning_mode,
    preferred_location,
    additional_info
  } = data;

  return `
New Enrolment Submission - Studywise Learning Centre
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PARENT/GUARDIAN INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${parent_name}
Email: ${parent_email}
Phone: ${parent_phone}

STUDENT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Student Name: ${student_name}
Year Level: ${student_year_level}
Current School: ${student_school}

PROGRAM PREFERENCES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subjects: ${subjects.join(', ')}
Learning Mode: ${learning_mode}
Preferred Location: ${preferred_location || 'Not specified'}

ADDITIONAL INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${additional_info || 'None provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Parent has been sent the PDF enrolment form link.

Please contact this family within 24 hours.
  `.trim();
}
