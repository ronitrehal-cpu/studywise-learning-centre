/*
  # Create enrolment submissions table

  1. New Tables
    - `enrolment_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `created_at` (timestamptz) - Timestamp of submission
      - `parent_name` (text) - Parent/guardian full name
      - `parent_email` (text) - Parent email address
      - `parent_phone` (text) - Parent phone number
      - `student_name` (text) - Student's full name
      - `student_year_level` (text) - Current year level (Year 1-12)
      - `student_school` (text) - Current school name
      - `subjects` (jsonb) - Array of subjects of interest
      - `learning_mode` (text) - Preferred learning mode (online/in-person/both)
      - `preferred_location` (text) - Preferred location (cranbourne/clyde/either)
      - `additional_info` (text) - Additional information or notes
      - `source_page` (text) - Page URL where form was submitted
      - `ip_address` (text) - IP address for spam protection (optional)
      
  2. Security
    - Enable RLS on `enrolment_submissions` table
    - Add policy for inserting submissions (allow anonymous users to submit)
    - Add policy for authenticated users to read all submissions (admin access)
    
  3. Important Notes
    - This table stores all enrollment form submissions
    - RLS allows public inserts but restricts reads to authenticated users only
    - IP address field can be used for rate limiting
*/

CREATE TABLE IF NOT EXISTS enrolment_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  parent_name text NOT NULL,
  parent_email text NOT NULL,
  parent_phone text NOT NULL,
  student_name text NOT NULL,
  student_year_level text NOT NULL,
  student_school text NOT NULL,
  subjects jsonb DEFAULT '[]'::jsonb NOT NULL,
  learning_mode text NOT NULL,
  preferred_location text DEFAULT '',
  additional_info text DEFAULT '',
  source_page text DEFAULT '',
  ip_address text DEFAULT ''
);

ALTER TABLE enrolment_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit enrolment forms"
  ON enrolment_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
  ON enrolment_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_enrolment_submissions_created_at 
  ON enrolment_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_enrolment_submissions_email 
  ON enrolment_submissions(parent_email);