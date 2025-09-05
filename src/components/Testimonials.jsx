import { useEffect, useState } from 'react';
import testimonialsJson from '../data/Testimonials.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SkeletonLoader from './SkeletonLoader';
import 'swiper/css';
import 'swiper/css/navigation';

const MAX_LENGTH = 120;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTestimonials(testimonialsJson);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="testimonials" className="bg-white dark:bg-black py-20 px-4 sm:px-6 md:px-10">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading with Skeleton */}
        {loading ? (
          <div className="mb-12 flex justify-center">
            <SkeletonLoader width="w-56" height="h-10" />
          </div>
        ) : (
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-12">
            Testimonials
          </h2>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-8 py-10 shadow-lg max-w-xl mx-auto"
              >
                <SkeletonLoader width="w-12" height="h-12" rounded="rounded-full" className="mx-auto mb-4" />
                <SkeletonLoader width="w-3/4" height="h-5" className="mx-auto mb-2" />
                <SkeletonLoader width="w-1/2" height="h-4" className="mx-auto mb-4" />
                <SkeletonLoader width="w-full" height="h-4" className="mb-2" />
                <SkeletonLoader width="w-full" height="h-4" className="mb-2" />
                <SkeletonLoader width="w-2/3" height="h-4" className="mb-2" />
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            loop={true}
            centeredSlides={true}
            slidesPerView={1.1}
            spaceBetween={20}
            navigation
            breakpoints={{
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 1.8 }
            }}
          >
            {testimonials.map((item, i) => {
              const isExpanded = expandedIndexes.includes(i);
              const showToggle = item.text.length > MAX_LENGTH;
              const displayText = isExpanded ? item.text : item.text.slice(0, MAX_LENGTH);

              return (
                <SwiperSlide key={i}>
                  <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-8 py-10 shadow-lg max-w-xl mx-auto transition-all duration-50">
                    <span className="text-pink-500 text-5xl absolute -top-6 left-4 select-none">“</span>

                    <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-4 leading-relaxed z-10 relative">
                      {displayText}
                      {!isExpanded && showToggle ? '...' : ''}
                    </p>

                    {showToggle && (
                      <button
                        onClick={() => toggleExpand(i)}
                        className="text-sm text-black dark:text-white underline focus:outline-none"
                      >
                        {isExpanded ? 'View Less' : 'View More'}
                      </button>
                    )}

                    <div className="flex items-center gap-4 mt-6 justify-center z-10 relative">
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                      />
                      <div className="text-left">
                        <h4 className="text-gray-900 dark:text-white font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.role} · {item.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
