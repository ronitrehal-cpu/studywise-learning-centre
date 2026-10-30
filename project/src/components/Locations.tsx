import { useState, useEffect } from 'react';
import { Reveal } from './Reveal';

interface Location {
  name: string;
  address: string;
  images: string[];
}

const PHONES = [
  { display: '03 8774 7303', tel: '0387747303' },
  { display: '0430 095 076', tel: '0430095076' }
];
const EMAIL = 'admin@studywiselearning.com.au';
const SMS = '0430095076';

const locations: Location[] = [
  {
    name: 'Cranbourne West',
    address: '5 Biara Court, Cranbourne West VIC 3977',
    // Opens on an interior without the old signage; 6 and 11 show the old logo
    images: [
      '/7.webp',
      '/12.webp',
      '/8.webp',
      '/6.webp',
      '/11.webp'
    ]
  },
  {
    name: 'Clyde North',
    address: 'Balla Balla Community Centre, Clyde North VIC 3978',
    // Opens on the hall rather than the exterior, which already leads the hero
    images: [
      '/2.jpeg',
      '/1.jpeg',
      '/3.jpg',
      '/actual_4.jpg',
      '/4.jpg'
    ]
  }
];

const actionLink = 'text-base font-semibold text-brand-navy underline underline-offset-[6px] hover:text-brand-navyDark';

function ImageSlideshow({ images, name }: { images: string[]; name: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <div className="w-full aspect-[4/3] rounded overflow-hidden relative bg-brand-photo">
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`${name} centre, photo ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={`Show ${name} photo ${index + 1}`}
            aria-current={index === currentIndex}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-brand-navy' : 'bg-brand-rule'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function Locations({ id }: { id?: string }) {
  return (
    <section id={id} className="bg-white py-20 md:py-28 scroll-mt-[5.5rem]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <Reveal>
          <h2 className="font-serif font-medium text-brand-navy text-4xl md:text-[46px] leading-[1.05] tracking-tight">
            Our centres
          </h2>
          <p className="mt-4 text-lg leading-[1.6] text-brand-slate">Visit us in Cranbourne West or Clyde North.</p>
        </Reveal>

        <div id="contact" className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-10 lg:gap-16 mt-12 md:mt-16 scroll-mt-24">
          {locations.map((location, index) => (
            <Reveal key={location.name} delay={0.1 * (index + 1)}>
              <ImageSlideshow images={location.images} name={location.name} />

              <h3 className="mt-8 font-serif font-medium text-brand-navy text-[26px] md:text-[30px] leading-tight tracking-tight">
                {location.name}
              </h3>

              <ul className="mt-5 text-[17px] leading-[1.6] text-brand-slate">
                <li className="py-3 border-t border-brand-ink">{location.address}</li>
                {PHONES.map((phone) => (
                  <li key={phone.tel} className="py-3 border-t border-brand-rule">
                    <a href={`tel:${phone.tel}`} className="hover:text-brand-navy hover:underline underline-offset-4">
                      {phone.display}
                    </a>
                  </li>
                ))}
                <li className="py-3 border-y border-brand-rule">
                  <a href={`mailto:${EMAIL}`} className="hover:text-brand-navy hover:underline underline-offset-4 break-all">
                    {EMAIL}
                  </a>
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                <a href={`tel:${PHONES[0].tel}`} className={actionLink}>Call</a>
                <a href={`sms:${SMS}`} className={actionLink}>Text</a>
                <a href={`mailto:${EMAIL}`} className={actionLink}>Email</a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={actionLink}
                >
                  Directions
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
