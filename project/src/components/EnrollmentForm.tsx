import { useState, FormEvent } from 'react';
import { Button } from './Button';

const labelClass = 'block text-[15px] font-semibold text-brand-ink mb-2';
const fieldClass =
  'w-full h-[52px] px-4 rounded bg-white border border-brand-rule text-base text-brand-ink placeholder:text-brand-muted outline-none focus:ring-2 focus:ring-brand-navy focus:border-brand-navy transition-shadow';
const groupHeadingClass = 'font-serif font-medium text-brand-navy text-[22px] leading-snug tracking-tight pt-6 border-t border-brand-rule mb-5';

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

      // The Netlify function is the only writer: it saves the enquiry, then sends the emails
      const response = await fetch('/.netlify/functions/send-enrolment-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...submissionData, honeypot: formData.honeypot })
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        throw new Error(result?.error || `Enquiry not saved (status ${response.status})`);
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
      // Nothing was saved; keep the parent's input so they can try again
      console.error('Enquiry submission failed:', err);
      setError("We couldn't send your enquiry just now, so it hasn't been received. Your answers are still in the form — please try again in a moment, or contact us directly.");
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
    <section id="enrollment" className="bg-white py-14 md:py-28 scroll-mt-[var(--header-anchor)]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="max-w-[880px]">
          <h2 className="font-serif font-medium text-brand-navy text-4xl md:text-[46px] leading-[1.05] tracking-tight">
            Enrolment enquiry
          </h2>
          <p className="mt-5 text-lg leading-[1.6] text-brand-slate">
            Complete this short form and we'll email you the official enrolment form to fill out and return.
          </p>

          <div className="mt-8 md:mt-10">
            {submitted ? (
              <div className="bg-brand-mist border-t border-brand-ink px-6 py-8" role="status">
                <h3 className="font-serif font-medium text-brand-navy text-[26px] leading-snug tracking-tight mb-2">Thank you.</h3>
                <p className="text-[17px] leading-[1.6] text-brand-slate">
                  Thank you — we've received your enquiry. Please check your email for the official enrolment form to complete and return.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                {error && (
                  <div className="bg-brand-mist border-t-2 border-brand-orange px-5 py-4" role="alert">
                    <p className="font-semibold text-brand-orangeText mb-1">Your enquiry wasn't sent</p>
                    <p className="text-brand-slate text-[15px] leading-[1.6]">{error}</p>
                    <p className="text-brand-slate text-[15px] leading-[1.6] mt-2">
                      Call <a href="tel:0387747303" className="whitespace-nowrap text-brand-navy underline decoration-brand-orange underline-offset-4">03 8774 7303</a> or{' '}
                      <a href="tel:0430095076" className="whitespace-nowrap text-brand-navy underline decoration-brand-orange underline-offset-4">0430 095 076</a>, or email{' '}
                      <a href="mailto:admin@studywiselearning.com.au" className="text-brand-navy underline decoration-brand-orange underline-offset-4 break-all">
                        admin@studywiselearning.com.au
                      </a>
                      .
                    </p>
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

                <div>
                  <h3 className={groupHeadingClass}>Parent / guardian</h3>
                  <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
                    <div>
                      <label htmlFor="enrol-parentName" className={labelClass}>
                        Full name *
                      </label>
                      <input
                        id="enrol-parentName"
                        type="text"
                        name="parentName"
                        required
                        value={formData.parentName}
                        onChange={handleChange}
                        className={fieldClass}
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label htmlFor="enrol-email" className={labelClass}>
                        Email address *
                      </label>
                      <input
                        id="enrol-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={fieldClass}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="enrol-phone" className={labelClass}>
                        Phone number *
                      </label>
                      <input
                        id="enrol-phone"
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className={fieldClass}
                        placeholder="0400 000 000"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={groupHeadingClass}>Student</h3>
                  <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
                    <div>
                      <label htmlFor="enrol-studentName" className={labelClass}>
                        Student name *
                      </label>
                      <input
                        id="enrol-studentName"
                        type="text"
                        name="studentName"
                        required
                        value={formData.studentName}
                        onChange={handleChange}
                        className={fieldClass}
                        placeholder="Student's full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="enrol-yearLevel" className={labelClass}>
                        Current year level *
                      </label>
                      <select
                        id="enrol-yearLevel"
                        name="yearLevel"
                        required
                        value={formData.yearLevel}
                        onChange={handleChange}
                        className={fieldClass}
                      >
                        <option value="">Select year level</option>
                        {yearLevels.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="enrol-programType" className={labelClass}>
                        Program type *
                      </label>
                      <select
                        id="enrol-programType"
                        name="programType"
                        required
                        value={formData.programType}
                        onChange={handleChange}
                        className={fieldClass}
                      >
                        <option value="">Select program type</option>
                        {programTypes.map(program => (
                          <option key={program} value={program}>{program}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="enrol-location" className={labelClass}>
                        Preferred location
                      </label>
                      <select
                        id="enrol-location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={fieldClass}
                      >
                        <option value="">Select location (optional)</option>
                        <option value="cranbourne">Cranbourne West</option>
                        <option value="clyde">Clyde North</option>
                        <option value="either">Either location</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-rule">
                  <label htmlFor="enrol-additionalInfo" className={labelClass}>
                    Additional information
                  </label>
                  <textarea
                    id="enrol-additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    className={`${fieldClass} h-auto min-h-[140px] py-3 resize-y`}
                    placeholder="Any specific learning goals, concerns, or questions you'd like to discuss..."
                  />
                </div>

                <div className="pt-6 border-t border-brand-rule flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full md:w-auto"
                    disabled={submitting}
                  >
                    {submitting ? 'Sending…' : 'Send enquiry'}
                  </Button>
                  <div className="max-w-md">
                    <p className="text-sm font-semibold text-brand-ink mb-1">Next step</p>
                    <p className="text-sm leading-[1.6] text-brand-muted">
                      After submitting, you'll receive a fillable enrolment form by email.
                      Please complete it and reply to the email with the form attached.
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
