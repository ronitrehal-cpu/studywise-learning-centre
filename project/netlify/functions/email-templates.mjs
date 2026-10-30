// Escapes text for safe use in HTML content and attribute values
function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function createParentEmailHTML(data) {
  const parent_name = escapeHtml(data.parent_name);
  const studentFirstName = escapeHtml(String(data.student_name ?? '').split(' ')[0]);
  const student_year_level = escapeHtml(data.student_year_level);
  const pdfDownloadUrl = escapeHtml(data.pdfDownloadUrl);
  const adminEmail = escapeHtml(data.adminEmail);

  // Brand: navy #17325C, rules #C9D3DD; Georgia for headings because web fonts don't load reliably in email
  const serif = "Georgia, 'Times New Roman', serif";
  const sans = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Studywise Enrolment Form</title>
</head>
<body style="margin: 0; padding: 0; font-family: ${sans}; background-color: #ffffff;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px; background-color: #ffffff;">

          <!-- Wordmark -->
          <tr>
            <td style="padding: 0 0 20px; border-bottom: 2px solid #17325C;">
              <p style="margin: 0; font-family: ${serif}; font-size: 26px; font-weight: bold; color: #17325C; letter-spacing: -0.3px; line-height: 1.1;">
                Studywise
              </p>
              <p style="margin: 4px 0 0; font-family: ${sans}; font-size: 10px; font-weight: 600; color: #5A6575; letter-spacing: 3px; text-transform: uppercase;">
                Learning Centre
              </p>
            </td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 32px 0 8px;">
              <h1 style="margin: 0; font-family: ${serif}; font-size: 28px; font-weight: normal; color: #17325C; letter-spacing: -0.3px; line-height: 1.2;">
                Enrolment Form Ready
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 24px 0 0;">
              <p style="margin: 0 0 20px; color: #16202E; font-size: 16px; line-height: 1.6;">
                Dear ${parent_name},
              </p>

              <p style="margin: 0 0 20px; color: #3E4A5B; font-size: 16px; line-height: 1.6;">
                Thanks for your enquiry about enrolling ${studentFirstName} (${student_year_level}) at Studywise Learning Centre.
              </p>

              <p style="margin: 0 0 20px; color: #3E4A5B; font-size: 16px; line-height: 1.6;">
                <strong style="color: #16202E;">The next step is to complete the official enrolment form.</strong> We've prepared it for you — simply download, fill it out, and send it back to us.
              </p>

              <!-- Download Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 28px 0;">
                <tr>
                  <td style="background-color: #17325C;">
                    <a href="${pdfDownloadUrl}" style="display: inline-block; background-color: #17325C; color: #ffffff; text-decoration: none; padding: 16px 28px; font-family: ${sans}; font-size: 16px; font-weight: 600;">
                      Download Enrolment Form (PDF)
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Instructions -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 28px 0; border-top: 1px solid #C9D3DD; border-bottom: 1px solid #C9D3DD;">
                <tr>
                  <td style="padding: 20px 0;">
                    <p style="margin: 0 0 12px; font-family: ${serif}; color: #17325C; font-size: 18px;">
                      How to Complete Your Enrolment:
                    </p>
                    <ol style="margin: 0; padding-left: 20px; color: #3E4A5B; font-size: 15px; line-height: 1.7;">
                      <li style="margin-bottom: 8px;">Click the button above to download the fillable PDF form</li>
                      <li style="margin-bottom: 8px;">Complete all required fields (no printing needed — it's a fillable PDF)</li>
                      <li style="margin-bottom: 8px;">Save the completed form</li>
                      <li>Email the completed form to: <strong style="color: #17325C;">${adminEmail}</strong></li>
                    </ol>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; color: #3E4A5B; font-size: 15px; line-height: 1.6;">
                <strong style="color: #16202E;">Questions?</strong> Please email us at <a href="mailto:${adminEmail}" style="color: #17325C; text-decoration: underline;">${adminEmail}</a> or call <a href="tel:0387747303" style="color: #17325C; text-decoration: underline;">03&nbsp;8774&nbsp;7303</a> or <a href="tel:0430095076" style="color: #17325C; text-decoration: underline;">0430&nbsp;095&nbsp;076</a>, and we'll be happy to help.
              </p>

              <p style="margin: 16px 0 0; color: #5A6575; font-size: 14px; line-height: 1.6; font-style: italic;">
                Note: The download link will expire in 7 days. If you need a new link, just let us know.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top: 1px solid #C9D3DD;">
                <tr>
                  <td style="padding: 20px 0 0;">
                    <p style="margin: 0 0 6px; font-family: ${serif}; color: #17325C; font-size: 16px;">
                      Studywise Learning Centre
                    </p>
                    <p style="margin: 0; color: #5A6575; font-size: 13px; line-height: 1.6;">
                      Helping students grow since 2010.<br>
                      <a href="mailto:${adminEmail}" style="color: #17325C; text-decoration: underline;">${adminEmail}</a>
                    </p>
                  </td>
                </tr>
              </table>
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
