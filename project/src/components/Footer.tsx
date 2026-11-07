import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { Logo } from './Logo';
import { STUDENT_PORTAL_URL } from '../data/siteLinks';
import { ABN, CAMPUSES, EMAIL, LEGAL_NAME, PHONES, SOCIAL, campusAddress, campusPath, directionsUrl } from '../data/business';

const linkClass = 'text-[#DCE6EF] underline-offset-4 decoration-white hover:underline hover:text-white';
const columnHeading = 'font-sans text-sm font-semibold uppercase tracking-[0.15em] text-[#B9D7EE] mb-4';

// Phones (below md) use their own simpler, stacked layout
const mobileLabel = 'font-sans text-xs font-semibold uppercase tracking-[0.12em] text-[#B9D7EE] mb-3';
const mobileGroup = 'py-7 border-t border-white/15';
const tapTarget = 'inline-flex items-center min-h-[44px]';

export function Footer() {
  const location = useLocation();

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `/#${id}`);
    }
  };

  const handleBookClick = () => {
    if (location.pathname === '/') {
      document.getElementById('enrollment')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', '/#enrollment');
    } else {
      window.location.href = '/#enrollment';
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy border-t-[5px] border-brand-orange text-[#DCE6EF]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 pt-10 pb-8 md:pb-10 md:pt-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8 pb-7 md:pb-16">
          <p className="font-serif font-medium text-white text-[26px] md:text-[36px] leading-[1.12] md:leading-[1.15] tracking-tight max-w-xl">
            Helping students grow since 2010.
          </p>
          <Button variant="inverse" onClick={handleBookClick} className="w-full md:w-auto">
            Book a free assessment
          </Button>
        </div>

        {/* Phones */}
        <div className="md:hidden">
          <div className={mobileGroup}>
            <Logo variant="dark" size={48} />
            <p className="mt-4 text-[15px] leading-[1.55] text-[#B9D7EE] max-w-[320px]">
              Small-group tutoring from Year 1 to VCE in Melbourne's south-east.
            </p>
          </div>

          <div className={mobileGroup}>
            <h3 className={mobileLabel}>Contact</h3>
            <div className="flex flex-wrap gap-x-8">
              {PHONES.map((phone) => (
                <a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  className={`${tapTarget} whitespace-nowrap text-[17px] font-semibold text-white underline-offset-4 hover:underline`}
                >
                  {phone.display}
                </a>
              ))}
            </div>
            <a href={`mailto:${EMAIL}`} className={`${tapTarget} ${linkClass} text-[15px] break-all`}>
              {EMAIL}
            </a>
          </div>

          <div className={mobileGroup}>
            <h3 className={mobileLabel}>Our centres</h3>
            <ul className="divide-y divide-white/15">
              {CAMPUSES.map((centre) => (
                <li key={centre.slug} className="py-4 first:pt-0 last:pb-0">
                  <Link to={campusPath(centre)} className="text-base font-semibold text-white underline-offset-4 hover:underline">
                    {centre.name}
                  </Link>
                  {/* Keep "VIC 3978" together so the postcode never sits alone on a line */}
                  <p className="mt-1 text-[15px] leading-[1.5] text-[#DCE6EF]">{campusAddress(centre).replace(' VIC ', ' VIC\u00A0')}</p>
                  <a
                    href={directionsUrl(centre)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${tapTarget} text-[15px] font-semibold text-white underline decoration-brand-orange underline-offset-4`}
                  >
                    Directions
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className={mobileGroup}>
            <ul className="flex flex-wrap items-center text-[15px]">
              {[
                { label: 'Programs', href: '/#programs', anchor: 'programs' },
                { label: 'Our story', to: '/about' },
                { label: 'FAQs', to: '/faq' },
                { label: 'Contact', to: '/contact' },
                { label: 'Student portal', external: STUDENT_PORTAL_URL },
                ...SOCIAL.map((s) => ({ label: s.label, external: s.url }))
              ].map((item, index, items) => (
                // Separator trails its item, so a wrapped line never starts with "·"
                <li key={item.label} className="flex items-center">
                  {item.external ? (
                    <a href={item.external} className={`${tapTarget} ${linkClass} whitespace-nowrap`}>
                      {item.label}
                    </a>
                  ) : item.to ? (
                    <Link to={item.to} className={`${tapTarget} ${linkClass} whitespace-nowrap`}>
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} onClick={(e) => handleAnchorClick(e, item.anchor!)} className={`${tapTarget} ${linkClass} whitespace-nowrap`}>
                      {item.label}
                    </a>
                  )}
                  {index < items.length - 1 && <span aria-hidden="true" className="px-2.5 text-[#B9D7EE]">·</span>}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* md and up */}
        <div className="hidden md:grid border-t border-white/15 pt-12 grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <Logo variant="dark" size={80} crestHeight="var(--footer-crest)" className="flex-shrink-0" />
            <p className="mt-5 text-[15px] leading-[1.6] text-[#B9D7EE] max-w-xs">
              Small-group tutoring from Year 1 to VCE in Melbourne's south-east.
            </p>
          </div>

          {CAMPUSES.map((centre) => (
            <div key={centre.slug}>
              <h3 className={columnHeading}>
                <Link to={campusPath(centre)} className="underline-offset-4 hover:underline hover:text-white">
                  {centre.name}
                </Link>
              </h3>
              <address className="not-italic text-[15px] leading-[1.6] space-y-2">
                <p>{campusAddress(centre)}</p>
                {PHONES.map((phone) => (
                  <p key={phone.tel}>
                    <a href={`tel:${phone.tel}`} className={`${linkClass} whitespace-nowrap`}>
                      {phone.display}
                    </a>
                  </p>
                ))}
              </address>
            </div>
          ))}

          <div>
            <h3 className={columnHeading}>Studywise</h3>
            <ul className="text-[15px] leading-[1.6] space-y-2">
              <li>
                <a href="/#programs" onClick={(e) => handleAnchorClick(e, 'programs')} className={linkClass}>
                  Programs
                </a>
              </li>
              <li>
                <Link to="/about" className={linkClass}>Our story</Link>
              </li>
              <li>
                <Link to="/faq" className={linkClass}>FAQs</Link>
              </li>
              <li>
                <a href={STUDENT_PORTAL_URL} className={linkClass}>Student portal</a>
              </li>
              <li>
                <Link to="/contact" className={linkClass}>Contact</Link>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className={`${linkClass} break-all`}>
                  {EMAIL}
                </a>
              </li>
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a href={s.url} className={linkClass}>{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="md:mt-16 pt-5 md:pt-6 border-t border-white/15 text-[13px] md:text-sm leading-[1.45] md:leading-5 text-[#B9D7EE]">
          © {currentYear} {LEGAL_NAME} · <span className="whitespace-nowrap">ABN {ABN}</span>
        </p>
      </div>
    </footer>
  );
}
