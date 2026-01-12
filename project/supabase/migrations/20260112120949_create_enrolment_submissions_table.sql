/*
  # Create Enrolment Submissions Table

  1. New Tables
    - `enrolment_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `parent_name` (text) - Name of the parent
      - `parent_email` (text) - Email address of the parent
      - `parent_phone` (text) - Phone number of the parent
      - `student_name` (text) - Name of the student
      - `student_age` (integer) - Age of the student
      - `student_grade` (text) - Current grade level of the student
      - `program_interest` (text) - Program the parent is interested in
      - `preferred_location` (text) - Preferred location for the program
      - `preferred_schedule` (text) - Preferred schedule (weekday/weekend)
      - `additional_notes` (text, optional) - Any additional information
      - `created_at` (timestamptz) - Timestamp of submission

  2. Security
    - Enable RLS on `enrolment_submissions` table
    - Add policy for public insert (anyone can submit the form)
    - Add policy for authenticated users to read all submissions (for admin access)
*/

CREATE TABLE IF NOT EXISTS enrolment_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_name text NOT NULL,
  parent_email text NOT NULL,
  parent_phone text NOT NULL,
  student_name text NOT NULL,
  student_age integer NOT NULL,
  student_grade text NOT NULL,
  program_interest text NOT NULL,
  preferred_location text NOT NULL,
  preferred_schedule text NOT NULL,
  additional_notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE enrolment_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit enrolment form"
  ON enrolment_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all submissions"
  ON enrolment_submissions
  FOR SELECT
  TO authenticated
  USING (true);