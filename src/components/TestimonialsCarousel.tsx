import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  customer_name: string;
  customer_title: string;
  rating: number;
  comment: string;
  image_url: string;
  display_order: number;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const sortedTestimonials = [...testimonials].sort((a, b) => a.display_order - b.display_order);

  useEffect(() => {
    if (!isAutoPlaying || sortedTestimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sortedTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, sortedTestimonials.length]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % sortedTestimonials.length);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + sortedTestimonials.length) % sortedTestimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  if (sortedTestimonials.length === 0) {
    return null;
  }

  const currentTestimonial = sortedTestimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-8 md:p-12 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          {currentTestimonial.image_url && (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-6 border-2 border-amber-400/50">
              <img
                src={currentTestimonial.image_url}
                alt={currentTestimonial.customer_name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < currentTestimonial.rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-amber-400/30'
                }`}
              />
            ))}
          </div>

          <p className="text-lg md:text-xl text-amber-100 leading-relaxed mb-6 italic">
            "{currentTestimonial.comment}"
          </p>

          <div>
            <h4 className="text-xl font-semibold text-amber-400">
              {currentTestimonial.customer_name}
            </h4>
            {currentTestimonial.customer_title && (
              <p className="text-sm text-amber-100/70 mt-1">
                {currentTestimonial.customer_title}
              </p>
            )}
          </div>
        </div>
      </div>

      {sortedTestimonials.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-full p-3 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-amber-500/30"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-full p-3 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-amber-500/30"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {sortedTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-amber-400'
                    : 'w-2 bg-amber-400/30 hover:bg-amber-400/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
