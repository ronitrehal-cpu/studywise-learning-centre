import { useState, FormEvent } from 'react';
import { Section } from './Section';
import { Card } from './Card';
import { Button } from './Button';
import { supabase } from '../lib/supabase';

export function EnrollmentForm() {
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    studentName: '',
    yearLevel: '',
    programType: '',
    location: '',
    additionalInfo: '',
    honeypot: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const submissionData = {
        parent_name: formData.parentName,
        parent_email: formData.email,
        parent_phone: formData.phone,
        student_name: formData.studentName,
        student_year_level: formData.yearLevel,
        student_school: '',
        subjects: [formData.programType],
        learning_mode: 'in-centre',
        preferred_location: formData.location,
        additional_info: formData.additionalInfo,
        source_page: window.location.href
      };

      const { error: insertError } = await supabase
        .from('enrolment_submissions')
        .insert(submissionData);

      if (insertError) {
        throw new Error(insertError.message);
      }

      try {
        await fetch('/.netlify/functions/send-enrolment-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submissionData)
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }

      setSubmitted(true);
      setFormData({
        parentName: '',
        email: '',
        phone: '',
        studentName: '',
        yearLevel: '',
        programType: '',
        location: '',
        additionalInfo: '',
        honeypot: ''
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const yearLevels = [
    'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6',
    'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'
  ];

  const programTypes = [
    'Primary (Years 1–6)',
    'Secondary (Years 7–10)',
    'VCE (Years 11–12)',
    'Selective Entry Preparation',
    'Scholarship Preparation'
  ];

  return (
    <Section background="light" id="enrollment">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Enrolment Enquiry
          </h2>
          <p className="text-lg text-gray-600">
            Complete this short form and we'll email you the official enrolment form to fill out and return.
          </p>
        </div>

        <Card>
          {submitted ? (
            <div className="text-center py-12">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600">
                Thank you — we've received your enquiry. Please check your email for the official enrolment form to complete and return.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-red-900 mb-1">Submission Error</h4>
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
                tabIndex={-1}
                autoComplete="off"
              />
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Parent/Guardian Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="parentName"
                        required
                        value={formData.parentName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="0400 000 000"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Student Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Student Name *
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        required
                        value={formData.studentName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Student's full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Current Year Level *
                      </label>
                      <select
                        name="yearLevel"
                        required
                        value={formData.yearLevel}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      >
                        <option value="">Select year level</option>
                        {yearLevels.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Program Type *
                      </label>
                      <select
                        name="programType"
                        required
                        value={formData.programType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      >
                        <option value="">Select program type</option>
                        {programTypes.map(program => (
                          <option key={program} value={program}>{program}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred Location
                      </label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      >
                        <option value="">Select location (optional)</option>
                        <option value="cranbourne">Cranbourne West</option>
                        <option value="clyde">Clyde North</option>
                        <option value="either">Either Location</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Any specific learning goals, concerns, or questions you'd like to discuss..."
                  />
                </div>
              </div>

              <div className="mt-6 text-center space-y-4">
                <div className="max-w-md mx-auto">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Next step
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    After submitting, you'll receive a fillable enrolment form by email.<br />
                    Please complete it and reply to the email with the form attached.
                  </p>
                </div>
                <div className="flex justify-center pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="px-12"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Enrolment'}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Card>
      </div>
    </Section>
  );
}
