import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

interface NavLink {
  label: string;
  path?: string;
  hash?: string;
}

const navLinks: NavLink[] = [
  { label: 'Programs', hash: 'programs' },
  { label: 'About', path: '/about' },
  { label: 'Why Us', hash: 'why-us' },
  { label: 'FAQs', hash: 'faqs' },
  { label: 'Locations', hash: 'locations' },
  { label: 'Contact', hash: 'contact' }
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (link: NavLink, e: React.MouseEvent) => {
    e.preventDefault();
    if (link.path) {
      navigate(link.path);
      window.scrollTo(0, 0);
    } else if (link.hash) {
      if (location.pathname === '/') {
        scrollToId(link.hash);
        window.history.replaceState(null, '', `/#${link.hash}`);
      } else {
        window.location.href = `/#${link.hash}`;
      }
    }
    setMobileMenuOpen(false);
  };

  const handleEnrolClick = () => {
    if (location.pathname === '/') {
      scrollToId('enrollment');
      window.history.replaceState(null, '', '/#enrollment');
    } else {
      window.location.href = '/#enrollment';
    }
    setMobileMenuOpen(false);
  };

  const isLinkActive = (link: NavLink) => {
    if (link.path) return location.pathname === link.path;
    return false;
  };

  const getLinkHref = (link: NavLink) => {
    if (link.path) return link.path;
    return `/#${link.hash}`;
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-[5.5rem]">
          <Logo variant="light" size={42} />

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link);
              return (
                <a
                  key={link.label}
                  href={getLinkHref(link)}
                  onClick={(e) => handleNavClick(link, e)}
                  className={`font-medium transition-colors ${
                    isActive
                      ? 'text-blue-700 font-semibold'
                      : 'text-gray-700 hover:text-blue-700'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
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
            <Button variant="primary" onClick={handleEnrolClick}>
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
            {navLinks.map((link) => {
              const isActive = isLinkActive(link);
              return (
                <a
                  key={link.label}
                  href={getLinkHref(link)}
                  onClick={(e) => handleNavClick(link, e)}
                  className={`block w-full text-left font-medium py-2 ${
                    isActive
                      ? 'text-blue-700 font-semibold'
                      : 'text-gray-700 hover:text-blue-700'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
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
              onClick={handleEnrolClick}
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
