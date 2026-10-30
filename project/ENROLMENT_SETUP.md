# Enrolment Submission & PDF Delivery Setup

This document explains how the enrolment submission workflow is configured and how to manage the PDF form.

## How It Works

### 1. Parent Submits Enquiry
When a parent completes the enrolment enquiry form on the website:
- Their submission is saved to the Supabase `enrolment_submissions` table
- The system generates a secure, signed URL (valid for 7 days) for the PDF form
- Two emails are sent:
  1. **Admin email** - Summary of the enquiry with all details
  2. **Parent email** - Professional HTML email with download link to the PDF form

### 2. Parent Receives PDF
The parent receives an email with:
- Thank you message and next steps
- Download button for the fillable PDF form
- Clear instructions to complete and return the form via email
- The admin email address for submission

### 3. Parent Completes Form
- Parent downloads the PDF (no printing required - it's fillable)
- Completes all required fields
- Replies to the email with the completed PDF attached

## Database Tracking

The `enrolment_submissions` table tracks:
- `pdf_sent` - Whether PDF link was successfully generated
- `pdf_sent_at` - When the PDF link was sent
- `pdf_link_expires_at` - When the signed URL expires (7 days)
- `admin_email_sent` - Admin notification status
- `parent_email_sent` - Parent email status

## PDF Storage

The PDF is stored in **Supabase Storage**:
- **Bucket**: `enrolment-forms` (private)
- **File**: `Studywise-Enrolment-Form.pdf`
- **Access**: Via signed URLs only (generated per-submission, expires in 7 days)

### Uploading the PDF to Supabase

The PDF file is located at `/public/docs/Studywise-Enrolment-Form.pdf` (fallback).

To upload it to Supabase Storage, you need the **service role key**:

1. Get your service role key:
   - Go to your Supabase project dashboard
   - Navigate to **Settings** → **API**
   - Copy the `service_role` key (NOT the `anon` key)

2. Run the upload script:
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here npm run upload-pdf
   ```

3. The script will:
   - Upload the PDF to the `enrolment-forms` bucket
   - Test that signed URLs are working correctly
   - Confirm the upload was successful

### Updating the PDF Form

When you need to update the enrolment form:

#### Option 1: Via Supabase Dashboard (Easiest)
1. Go to **Storage** in your Supabase dashboard
2. Open the `enrolment-forms` bucket
3. Delete the old `Studywise-Enrolment-Form.pdf`
4. Upload the new PDF with the exact same filename

#### Option 2: Via Script (Recommended)
1. Replace `/public/docs/Studywise-Enrolment-Form.pdf` with your new PDF
2. Run: `SUPABASE_SERVICE_ROLE_KEY=your_key npm run upload-pdf`

#### Option 3: Create from HTML Template
A printable HTML template is provided at `/public/docs/create-pdf.html`:
1. Edit the HTML template as needed
2. Open it in a web browser
3. Print to PDF (Ctrl/Cmd + P → Save as PDF)
4. Save as `Studywise-Enrolment-Form.pdf`
5. Upload using Option 1 or 2 above

## Environment Variables

The Netlify function requires these environment variables:

```bash
# Supabase (required)
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email (required)
RESEND_API_KEY=your_resend_api_key

# Admin email (optional - defaults to admin@studywiselearning.com.au)
ADMIN_EMAIL=admin@studywiselearning.com.au
```

### Setting Environment Variables in Netlify

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add each variable listed above
4. Redeploy your site for changes to take effect

## Testing the Setup

### Test the entire workflow:

1. Submit the website form with test data
2. Check that the submission appears in Supabase `enrolment_submissions` table
3. Verify both emails were sent (check `admin_email_sent` and `parent_email_sent` columns)
4. Click the PDF download link in the parent email
5. Confirm the PDF downloads and opens correctly

### If Something Goes Wrong

**Parent doesn't receive email:**
- Check the `parent_email_sent` field in the database
- Verify `RESEND_API_KEY` is set correctly
- Check Netlify function logs for errors

**PDF download link doesn't work:**
- Verify the PDF exists in Supabase Storage
- Check that `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- Confirm the signed URL hasn't expired (7 days)
- Review the `pdf_sent` field - if `false`, URL generation failed

**Fallback behavior:**
- If signed URL generation fails, the system falls back to the public URL
- The public URL points to `/docs/Studywise-Enrolment-Form.pdf`
- This ensures parents always get the form, even if Storage has issues

## Email Templates

Email templates are defined in `/netlify/functions/email-templates.mjs`:

- **Parent email**: Professional HTML email with download button and instructions
- **Admin email**: Plain text summary with all submission details

To customize the emails, edit this file and redeploy.

## Files Modified/Created

### New Files
- `/netlify/functions/email-templates.mjs` - Email template functions
- `/public/docs/Studywise-Enrolment-Form.pdf` - Fillable PDF form
- `/public/docs/create-pdf.html` - HTML template for creating the PDF
- `/public/docs/README.md` - Quick reference for PDF storage
- `/scripts/upload-pdf-to-supabase.mjs` - Upload script
- `/ENROLMENT_SETUP.md` - This documentation

### Modified Files
- `/netlify/functions/send-enrolment-notification.mjs` - Updated with PDF delivery logic
- `/src/components/EnrollmentForm.tsx` - Updated UI text (previous task)
- `/package.json` - Added `upload-pdf` script

### Database
- Migration: `add_pdf_tracking_fields_to_enrolment_submissions.sql`
- Storage bucket: `enrolment-forms` (created)

## Support

For questions or issues with the enrolment workflow:
1. Check the Netlify function logs
2. Review the Supabase database `enrolment_submissions` table
3. Verify all environment variables are set correctly
4. Test the PDF upload using the provided script
