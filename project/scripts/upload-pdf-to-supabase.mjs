import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://awrqtfcqkrjfverqetrm.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required');
  console.log('\nTo upload the PDF, you need the service role key:');
  console.log('1. Go to your Supabase project settings');
  console.log('2. Navigate to API settings');
  console.log('3. Copy the service_role key (not the anon key)');
  console.log('4. Run: SUPABASE_SERVICE_ROLE_KEY=your_key_here npm run upload-pdf');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const pdfPath = join(__dirname, '../public/docs/Studywise-Enrolment-Form.pdf');

if (!fs.existsSync(pdfPath)) {
  console.error('Error: PDF file not found at:', pdfPath);
  process.exit(1);
}

const pdfBuffer = fs.readFileSync(pdfPath);

console.log('📄 Uploading PDF to Supabase Storage...');
console.log('File:', pdfPath);
console.log('Size:', (pdfBuffer.length / 1024).toFixed(2), 'KB');

try {
  const { data, error } = await supabase.storage
    .from('enrolment-forms')
    .upload('Studywise-Enrolment-Form.pdf', pdfBuffer, {
      contentType: 'application/pdf',
      upsert: true
    });

  if (error) {
    console.error('❌ Upload error:', error);
    process.exit(1);
  }

  console.log('✅ PDF uploaded successfully!');
  console.log('Storage path:', data.path);

  console.log('\n🔗 Testing signed URL generation...');
  const { data: signedUrlData, error: signedError } = await supabase.storage
    .from('enrolment-forms')
    .createSignedUrl('Studywise-Enrolment-Form.pdf', 60);

  if (signedError) {
    console.error('❌ Signed URL error:', signedError);
  } else {
    console.log('✅ Signed URL created successfully (expires in 60 seconds):');
    console.log(signedUrlData.signedUrl);
  }

  console.log('\n✨ Upload complete! The PDF is now available in Supabase Storage.');
  console.log('Parents will receive secure download links when they submit enquiries.');
} catch (err) {
  console.error('❌ Unexpected error:', err);
  process.exit(1);
}
