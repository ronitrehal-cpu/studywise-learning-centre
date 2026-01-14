import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type EnrolmentSubmission = {
  id?: string;
  created_at?: string;
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
  source_page?: string;
  ip_address?: string;
};
