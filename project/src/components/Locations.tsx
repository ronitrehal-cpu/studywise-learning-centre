import { Section } from './Section';
import { Card } from './Card';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Location {
  name: string;
  address: string;
  images: string[];
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
      <div className="w-full h-56 rounded-t-2xl overflow-hidden relative">
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

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {locations.map((location, index) => (
          <Card key={index} hover>
            <ImageSlideshow images={location.images} />

            <h3 className="text-2xl font-bold text-gray-900 mb-6">{location.name}</h3>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-700 mt-1 flex-shrink-0" />
              <p className="text-gray-700">{location.address}</p>
            </div>
          </Card>
        ))}
      </div>

      <div id="contact" className="mt-12 max-w-5xl mx-auto scroll-mt-24">
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
