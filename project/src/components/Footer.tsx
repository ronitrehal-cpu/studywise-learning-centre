import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { Logo } from './Logo';

const centres = [
  { name: 'Cranbourne West', address: '5 Biara Court, Cranbourne West VIC 3977' },
  { name: 'Clyde North', address: 'Balla Balla Community Centre, Clyde North VIC 3978' }
];

const phones = [
  { display: '03 8774 7303', tel: '0387747303' },
  { display: '0430 095 076', tel: '0430095076' }
];

const linkClass = 'text-[#DCE6EF] underline-offset-4 decoration-white hover:underline hover:text-white';
const columnHeading = 'font-sans text-sm font-semibold uppercase tracking-[0.15em] text-[#B9D7EE] mb-4';

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
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 pt-14 pb-10 md:pt-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 pb-10 md:pb-16">
          <p className="font-serif font-medium text-white text-3xl md:text-[36px] leading-[1.15] tracking-tight max-w-xl">
            Helping students grow since 2010.
          </p>
          <Button variant="inverse" onClick={handleBookClick} className="w-full sm:w-auto">
            Book a free assessment
          </Button>
        </div>

        <div className="border-t border-white/15 pt-10 md:pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-8">
          <div>
            <Logo variant="dark" size={80} />
            <p className="mt-5 text-[15px] leading-[1.6] text-[#B9D7EE] max-w-xs">
              Small-group tutoring from Year 1 to VCE in Melbourne's south-east.
            </p>
          </div>

          {centres.map((centre) => (
            <div key={centre.name}>
              <h3 className={columnHeading}>{centre.name}</h3>
              <address className="not-italic text-[15px] leading-[1.6] space-y-2">
                <p>{centre.address}</p>
                {phones.map((phone) => (
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
                <Link to="/student-portal" className={linkClass}>Student portal</Link>
              </li>
              <li>
                <a href="/#contact" onClick={(e) => handleAnchorClick(e, 'contact')} className={linkClass}>
                  Contact
                </a>
              </li>
              <li>
                <a href="mailto:admin@studywiselearning.com.au" className={`${linkClass} break-all`}>
                  admin@studywiselearning.com.au
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 md:mt-16 pt-6 border-t border-white/15 text-sm text-[#B9D7EE]">
          © {currentYear} Studywise Learning Centre Pty Ltd · ABN 27 648 842 773
        </p>
      </div>
    </footer>
  );
}
