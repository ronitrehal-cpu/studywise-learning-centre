import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/image copy.png"
                alt="Studywise Learning Centre"
                className="h-12 w-12 object-contain"
              />
              <div>
                <span className="text-lg font-bold text-white block leading-tight">Studywise</span>
                <span className="text-xs text-gray-400">Learning Centre</span>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Empowering students to achieve their academic goals through expert tutoring and personalized learning.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('programs')}
                  className="text-gray-400 hover:text-sky-400 transition-colors text-sm"
                >
                  Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('why-studywise')}
                  className="text-gray-400 hover:text-sky-400 transition-colors text-sm"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('locations')}
                  className="text-gray-400 hover:text-sky-400 transition-colors text-sm"
                >
                  Locations
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('enrollment')}
                  className="text-gray-400 hover:text-sky-400 transition-colors text-sm"
                >
                  Enrol Now
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Subjects</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Maths</li>
              <li>English</li>
              <li>Science</li>
              <li>VCE Preparation</li>
              <li>Selective Entry</li>
              <li>Scholarship Exams</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  5 Biara Court, Cranbourne West VIC 3977
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:0387747303" className="text-sm text-gray-400 hover:text-sky-400 transition-colors">
                    03 8774 7303
                  </a>
                  <a href="tel:0430095076" className="text-sm text-gray-400 hover:text-sky-400 transition-colors">
                    0430 095 076
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href="mailto:admin@studywiselearning.com.au" className="text-sm text-gray-400 hover:text-sky-400 transition-colors">
                  admin@studywiselearning.com.au
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              {currentYear} Studywise Learning Centre. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button className="text-sm text-gray-400 hover:text-sky-400 transition-colors">
                Privacy Policy
              </button>
              <button className="text-sm text-gray-400 hover:text-sky-400 transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
