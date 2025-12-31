import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EnrolmentData {
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  student_name: string;
  student_year_level: string;
  student_school: string;
  subjects: string[];
  learning_mode: string;
  preferred_location: string;
  additional_info: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const enrolmentData: EnrolmentData = await req.json();

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
Subjects: ${enrolmentData.subjects.join(", ")}
Learning Mode: ${enrolmentData.learning_mode}
Preferred Location: ${enrolmentData.preferred_location || "Not specified"}

ADDITIONAL INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${enrolmentData.additional_info || "None provided"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Please contact this family within 24 hours.
    `;

    const parentEmailBody = `
Dear ${enrolmentData.parent_name},

Thank you for your enquiry at Studywise Learning Centre!

We have received your enrolment form for ${enrolmentData.student_name} (${enrolmentData.student_year_level}).

Program Details:
• Subjects: ${enrolmentData.subjects.join(", ")}
• Learning Mode: ${enrolmentData.learning_mode}
${enrolmentData.preferred_location ? `• Preferred Location: ${enrolmentData.preferred_location}` : ""}

Our team will review your submission and contact you within 24 hours to discuss the next steps and answer any questions you may have.

In the meantime, if you have any urgent questions, please feel free to contact us directly.

Best regards,
Studywise Learning Centre Team
    `;

    console.log("Admin Email Preview:");
    console.log(adminEmailBody);
    console.log("\n\nParent Email Preview:");
    console.log(parentEmailBody);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email notifications prepared",
        adminEmail: {
          to: "admin@studywise.com.au",
          subject: `New Enrolment: ${enrolmentData.student_name} - ${enrolmentData.student_year_level}`,
          body: adminEmailBody,
        },
        parentEmail: {
          to: enrolmentData.parent_email,
          subject: "We received your enrolment enquiry – Studywise Learning Centre",
          body: parentEmailBody,
        },
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing enrolment notification:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
