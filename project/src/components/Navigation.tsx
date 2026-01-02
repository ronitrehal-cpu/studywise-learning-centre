import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleNavClick = (link: { label: string; path?: string; id?: string }) => {
    if (link.path) {
      navigate(link.path);
      window.scrollTo(0, 0);
    } else if (link.id) {
      if (link.label === 'Contact') {
        if (location.pathname === '/about') {
          document.getElementById('about-contact-studywise')?.scrollIntoView({ behavior: 'smooth' });
        } else {
          scrollToSection(link.id);
        }
      } else {
        scrollToSection(link.id);
      }
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Programs', id: 'programs' },
    { label: 'About', path: '/about' },
    { label: 'Why Us', id: 'why-studywise' },
    { label: 'FAQs', path: '/faq' },
    { label: 'Locations', id: 'locations' },
    { label: 'Contact', id: 'contact-studywise' }
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img
              src="/560d161f-ee6e-4de0-819e-db29e949995a.png"
              alt="Studywise Learning Centre"
              className="h-[4.2rem] w-[4.2rem] object-contain"
            />
            <div className="flex flex-col justify-center leading-none">
              <span className="text-[1.425rem] md:text-[1.78125rem] font-bold text-gray-900">Studywise</span>
              <span className="text-[10px] md:text-xs font-normal tracking-[0.2em] text-gray-500 uppercase mt-0.5">Learning Centre</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <button
                key={link.path || link.id || index}
                onClick={() => handleNavClick(link)}
                className="text-gray-700 hover:text-blue-700 font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                navigate('/student-portal');
                window.scrollTo(0, 0);
                setMobileMenuOpen(false);
              }}
            >
              Student Portal
            </Button>
            <Button variant="primary" onClick={() => scrollToSection('enrollment')}>
              Enrol Now
            </Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-6 space-y-4">
            {navLinks.map((link, index) => (
              <button
                key={link.path || link.id || index}
                onClick={() => handleNavClick(link)}
                className="block w-full text-left text-gray-700 hover:text-blue-700 font-medium py-2"
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                navigate('/student-portal');
                window.scrollTo(0, 0);
                setMobileMenuOpen(false);
              }}
              className="w-full"
            >
              Student Portal
            </Button>
            <Button
              variant="primary"
              onClick={() => scrollToSection('enrollment')}
              className="w-full"
            >
              Enrol Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
