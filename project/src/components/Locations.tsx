import { Section } from './Section';
import { Card } from './Card';
import { MapPin, Phone, Mail, Video } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Location {
  name: string;
  address?: string;
  images?: string[];
  isNew?: boolean;
  isOnline?: boolean;
}

const locations: Location[] = [
  {
    name: 'Cranbourne West',
    address: '5 Biara Court, Cranbourne West VIC 3977',
    images: [
      '/6.webp',
      '/7.webp',
      '/12.webp',
      '/11.webp',
      '/8.webp'
    ]
  },
  {
    name: 'Clyde North',
    address: 'Balla Balla Community Centre, Clyde North VIC 3978',
    images: [
      '/1.jpeg',
      '/2.jpeg',
      '/3.jpg',
      '/actual_4.jpg',
      '/4.jpg'
    ]
  },
  {
    name: 'Studywise Online',
    address: 'Join any class online via Zoom from anywhere',
    isNew: true,
    isOnline: true
  }
];

function ImageSlideshow({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="-mx-6 -mt-6 mb-6">
      <div className="w-full h-48 rounded-t-2xl overflow-hidden relative">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <div className="flex justify-center gap-1.5 mt-3 px-6">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-blue-700' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function Locations({ id }: { id?: string }) {
  return (
    <Section background="white" id={id}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Our Locations
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Visit us at one of our convenient locations in Melbourne's south-east
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {locations.map((location, index) => (
          <Card key={index} hover>
            {location.images ? (
              <ImageSlideshow images={location.images} />
            ) : location.isOnline ? (
              <div className="-mx-6 -mt-6 mb-6">
                <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-blue-700 rounded-t-2xl flex items-center justify-center">
                  <Video className="w-20 h-20 text-white opacity-90" />
                </div>
                <div className="flex justify-center gap-1.5 mt-3 px-6">
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                </div>
              </div>
            ) : (
              <div className="-mx-6 -mt-6 mb-6">
                <div className="w-full h-48 bg-gray-100 rounded-t-2xl"></div>
                <div className="flex justify-center gap-1.5 mt-3 px-6">
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-2xl font-bold text-gray-900">{location.name}</h3>
              {location.isNew && (
                <span className="px-2 py-0.5 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                  NEW
                </span>
              )}
            </div>

            {location.address && (
              <div className="flex items-start gap-3">
                {location.isOnline ? (
                  <Video className="w-5 h-5 text-blue-700 mt-1 flex-shrink-0" />
                ) : (
                  <MapPin className="w-5 h-5 text-blue-700 mt-1 flex-shrink-0" />
                )}
                <p className="text-gray-700">{location.address}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div id="contact-studywise" className="mt-12 max-w-4xl mx-auto scroll-mt-24">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Contact Studywise</h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-700" />
              <span className="text-gray-700 font-medium">03 8774 7303</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-700" />
              <span className="text-gray-700 font-medium">0430 095 076</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-700" />
              <span className="text-gray-700 font-medium">admin@studywiselearning.com.au</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:0387747303"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
            <a
              href="sms:0430095076"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <Phone className="w-4 h-4" />
              Text
            </a>
            <a
              href="mailto:admin@studywiselearning.com.au"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
