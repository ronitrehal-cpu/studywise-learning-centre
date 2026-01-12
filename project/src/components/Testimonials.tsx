import { useState, useEffect } from 'react';
import { Section } from './Section';
import { Card } from './Card';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/testimonialData';

export function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / cardsPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [currentSlide, isPaused, totalSlides]);

  const startIndex = currentSlide * cardsPerView;

  const visibleTestimonials = Array.from({ length: cardsPerView }, (_, i) => {
    const testimonialIndex = (startIndex + i) % testimonials.length;
    return testimonials[testimonialIndex];
  });

  return (
    <Section background="white">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          What Our Customers Are Saying
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-sky-400 mx-auto rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {visibleTestimonials.map((testimonial, index) => (
              <Card key={startIndex + index} className="flex flex-col h-full">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow line-clamp-6">
                  "{testimonial.text}"
                </p>

                <div className="border-t border-gray-200 pt-3 mt-auto">
                  <p className="font-bold text-gray-900 text-sm">
                    {testimonial.name}
                  </p>
                  {testimonial.descriptor && (
                    <p className="text-xs text-gray-600 mt-1">
                      {testimonial.descriptor}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 bg-white hover:bg-gray-50 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 border border-gray-200"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 bg-white hover:bg-gray-50 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 border border-gray-200"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="flex justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-blue-600 w-8'
                  : 'bg-gray-300 w-2 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
