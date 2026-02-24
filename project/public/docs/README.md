# Enrolment Form PDF Storage

## Location
The official Studywise enrolment form PDF is stored in:
- **Supabase Storage**: `enrolment-forms` bucket (private)
- **Filename**: `Studywise-Enrolment-Form.pdf`
- **Fallback**: `/public/docs/Studywise-Enrolment-Form.pdf` (for development/emergency)

## How It Works

1. When a parent submits the website enquiry form, the Netlify function:
   - Saves the submission to Supabase database
   - Generates a signed URL (valid for 7 days) for the PDF in Supabase Storage
   - Sends the admin a summary email
   - Sends the parent an email with a download link to the PDF

2. The signed URL provides secure, temporary access to the private PDF file

3. Parents download the fillable PDF, complete it, and email it back to admin

## Updating the PDF

To update the enrolment form PDF:

### Option 1: Via Supabase Dashboard
1. Go to Storage in your Supabase dashboard
2. Navigate to the `enrolment-forms` bucket
3. Delete the old `Studywise-Enrolment-Form.pdf` (if exists)
4. Upload the new `Studywise-Enrolment-Form.pdf`

### Option 2: Via Supabase Client (programmatically)
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

// Upload new PDF
const { data, error } = await supabase.storage
  .from('enrolment-forms')
  .upload('Studywise-Enrolment-Form.pdf', pdfFile, {
    upsert: true // Overwrites existing file
  })
```

## Creating the PDF from HTML Template

A printable HTML template is provided at `/public/docs/create-pdf.html`.

To convert it to PDF:
1. Open `create-pdf.html` in a web browser
2. Use browser's Print function (Ctrl/Cmd + P)
3. Select "Save as PDF" or "Microsoft Print to PDF"
4. Save as `Studywise-Enrolment-Form.pdf`
5. Upload to Supabase Storage

Alternatively, use a command-line tool like `wkhtmltopdf` or headless Chrome.

## Troubleshooting

**If signed URL generation fails:**
- The system automatically falls back to the public URL at `/docs/Studywise-Enrolment-Form.pdf`
- Check that `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` environment variables are set
- Verify the bucket exists and the file is uploaded

**If parents can't download the PDF:**
- Check the signed URL hasn't expired (7-day limit)
- Verify the file exists in Supabase Storage
- Ensure the bucket permissions are correctly set (private bucket with signed URL access)

## Environment Variables Required

The Netlify function needs these environment variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (for storage access)
- `RESEND_API_KEY` - For sending emails
- `ADMIN_EMAIL` - Email to receive enrolment summaries (defaults to admin@studywiselearning.com.au)
