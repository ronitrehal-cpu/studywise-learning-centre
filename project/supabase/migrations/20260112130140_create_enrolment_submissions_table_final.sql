/*
  # Create Enrollment Submissions Table

  1. New Tables
    - `enrolment_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `created_at` (timestamptz) - Timestamp when the submission was created
      - `parent_name` (text) - Name of the parent/guardian
      - `parent_email` (text) - Email address of the parent
      - `parent_phone` (text) - Phone number of the parent
      - `student_name` (text) - Name of the student
      - `student_year_level` (text) - Year level of the student
      - `student_school` (text) - School the student attends
      - `subjects` (jsonb) - Array of subjects the student wants to study
      - `learning_mode` (text) - Online or In-Person learning preference
      - `preferred_location` (text) - Preferred location for in-person learning
      - `additional_info` (text) - Any additional information provided
      - `source_page` (text) - The page from which the form was submitted
      - `ip_address` (text) - IP address of the submitter

  2. Security
    - Enable RLS on `enrolment_submissions` table
    - Add policy for anonymous users to insert submissions
    - Add policy for authenticated users to view all submissions
*/

CREATE TABLE IF NOT EXISTS enrolment_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  parent_name text NOT NULL,
  parent_email text NOT NULL,
  parent_phone text NOT NULL,
  student_name text NOT NULL,
  student_year_level text NOT NULL,
  student_school text NOT NULL,
  subjects jsonb DEFAULT '[]'::jsonb,
  learning_mode text NOT NULL,
  preferred_location text DEFAULT '',
  additional_info text DEFAULT '',
  source_page text DEFAULT '',
  ip_address text DEFAULT ''
);

ALTER TABLE enrolment_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit enrolment" ON enrolment_submissions;
CREATE POLICY "Anyone can submit enrolment"
  ON enrolment_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can view all submissions" ON enrolment_submissions;
CREATE POLICY "Authenticated users can view all submissions"
  ON enrolment_submissions
  FOR SELECT
  TO authenticated
  USING (true);