import { useState, useEffect } from 'react';
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
  { label: 'Our story', path: '/about' },
  { label: 'Locations', hash: 'locations' }
];

const linkStyles = (active: boolean) =>
  `text-base text-brand-ink underline-offset-[6px] ${
    active ? 'underline decoration-2 decoration-brand-orange' : 'decoration-1 hover:underline'
  }`;

// Past this scroll position the header switches to its compact size
const COMPACT_AFTER = 40;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [compact, setCompact] = useState(() => typeof window !== 'undefined' && window.scrollY > COMPACT_AFTER);
  const navigate = useNavigate();

  useEffect(() => {
    const update = () => setCompact(window.scrollY > COMPACT_AFTER);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
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

  const handlePortalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/student-portal');
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  };

  const isLinkActive = (link: NavLink) => {
    if (link.path === '/about') return location.pathname === '/about' || location.pathname === '/about-us';
    if (link.path) return location.pathname === link.path;
    return false;
  };

  const isPortalActive = location.pathname === '/student-portal';

  const getLinkHref = (link: NavLink) => {
    if (link.path) return link.path;
    return `/#${link.hash}`;
  };

  return (
    // Total height = 5px sky bar + row + 1px rule = --header-full, or --header-compact once scrolled (see index.css)
    <nav className="bg-white border-t-[5px] border-t-brand-sky border-b border-b-brand-ink fixed w-full top-0 z-50" data-compact={compact}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <div
          className={`grid grid-cols-[1fr_auto] xl:grid-cols-[1fr_auto_1fr] items-center gap-6 transition-[height] duration-200 ease-out motion-reduce:transition-none ${
            compact ? 'h-[calc(var(--header-compact)-6px)]' : 'h-[calc(var(--header-full)-6px)]'
          }`}
        >
          <div className="hidden xl:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={getLinkHref(link)}
                onClick={(e) => handleNavClick(link, e)}
                className={`${linkStyles(isLinkActive(link))}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-self-start xl:justify-self-center">
            <Logo
              variant="light"
              size={68}
              crestHeight={compact ? 'var(--crest-compact)' : 'var(--crest-full)'}
              subline="Learning Centre · Est. 2010" />
          </div>

          <div className="hidden xl:flex items-center justify-end gap-8">
            <a
              href="/student-portal"
              onClick={handlePortalClick}
              className={`${linkStyles(isPortalActive)}`}
            >
              Student portal
            </a>
            <Button variant="primary" onClick={handleEnrolClick}>
              Book a free assessment
            </Button>
          </div>

          <button
            className="xl:hidden justify-self-end p-2 -mr-2 text-brand-ink"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-brand-rule">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 pb-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={getLinkHref(link)}
                onClick={(e) => handleNavClick(link, e)}
                className={`block py-4 border-b border-brand-rule ${linkStyles(isLinkActive(link))}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/student-portal"
              onClick={handlePortalClick}
              className={`block py-4 border-b border-brand-rule ${linkStyles(isPortalActive)}`}
            >
              Student portal
            </a>
            <Button variant="primary" onClick={handleEnrolClick} className="w-full mt-6">
              Book a free assessment
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
