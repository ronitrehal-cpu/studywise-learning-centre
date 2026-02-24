/*
  # Add PDF Tracking Fields to Enrolment Submissions

  1. Changes
    - Add `pdf_sent` (boolean) - Tracks if PDF was sent to parent
    - Add `pdf_sent_at` (timestamptz) - Timestamp when PDF was sent
    - Add `pdf_link_expires_at` (timestamptz) - When the signed URL expires
    - Add `admin_email_sent` (boolean) - Tracks if admin notification was sent
    - Add `parent_email_sent` (boolean) - Tracks if parent email was sent

  2. Notes
    - All fields have safe defaults
    - Fields help track email delivery and PDF distribution
    - Enables audit trail for troubleshooting
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'enrolment_submissions' AND column_name = 'pdf_sent'
  ) THEN
    ALTER TABLE enrolment_submissions ADD COLUMN pdf_sent boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'enrolment_submissions' AND column_name = 'pdf_sent_at'
  ) THEN
    ALTER TABLE enrolment_submissions ADD COLUMN pdf_sent_at timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'enrolment_submissions' AND column_name = 'pdf_link_expires_at'
  ) THEN
    ALTER TABLE enrolment_submissions ADD COLUMN pdf_link_expires_at timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'enrolment_submissions' AND column_name = 'admin_email_sent'
  ) THEN
    ALTER TABLE enrolment_submissions ADD COLUMN admin_email_sent boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'enrolment_submissions' AND column_name = 'parent_email_sent'
  ) THEN
    ALTER TABLE enrolment_submissions ADD COLUMN parent_email_sent boolean DEFAULT false;
  END IF;
END $$;