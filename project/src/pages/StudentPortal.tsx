import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Video, Download, FileText, TrendingUp, CheckCircle2 } from 'lucide-react';

export function StudentPortal() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  const features = [
    { icon: Video, text: 'Join Zoom sessions' },
    { icon: Download, text: 'Download lesson files and resources' },
    { icon: FileText, text: 'View homework and practice tests' },
    { icon: TrendingUp, text: 'Track progress and announcements' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
        <Section background="gradient">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-6">
              Coming Soon
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Student Portal
            </h1>

            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              We're building a Studywise Student Portal where students will be able to log in,
              access lesson resources, view homework, and join Zoom classes — all in one place.
            </p>

            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                What you'll be able to do
              </h2>

              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 text-left">
                      <div className="bg-blue-100 rounded-lg p-3 flex-shrink-0">
                        <Icon className="w-6 h-6 text-blue-700" />
                      </div>
                      <p className="text-gray-700 font-medium pt-2">{feature.text}</p>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Get notified when it's ready
                </h3>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-700 transition-colors"
                    />
                    <Button variant="primary" type="submit">
                      Notify Me
                    </Button>
                  </form>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-green-700 bg-green-50 rounded-lg p-4 max-w-md mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                    <p className="font-medium">Thanks! We'll let you know when the portal is live.</p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => navigate('/')}
              className="text-blue-700 hover:text-blue-800 font-medium hover:underline transition-colors"
            >
              Back to Home
            </button>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
