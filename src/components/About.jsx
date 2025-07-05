import { useEffect, useState } from 'react';
import aboutData from '../data/About.json';
import SkeletonLoader from './SkeletonLoader';

const About = () => {
  const [about, setAbout] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [color, setColor] = useState(false); // false = grayscale, true = color

  useEffect(() => {
    const timer = setTimeout(() => {
      setAbout(aboutData);
    }, 1000);

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleImageClick = () => {
    if (isMobile) {
      setColor((prev) => !prev);
    }
  };

  return (
    <section id="about" className="bg-white dark:bg-black py-20 px-4 sm:px-6 md:px-10">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 text-center">
        {/* Title */}
        <div className="order-1">
          {about ? (
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-2">
              {about.title}
            </h2>
          ) : (
            <SkeletonLoader width="w-48" height="h-8" />
          )}
        </div>

        {/* Image */}
        <div className="order-2">
          {about ? (
            <img
              src={about.image}
              alt="About Neel"
              onClick={handleImageClick}
              className={`w-48 sm:w-56 md:w-64 h-auto object-cover rounded-xl border dark:border-gray-700
                transition-filter duration-300
                ${isMobile
                  ? color
                    ? 'filter-none'
                    : 'filter grayscale'
                  : 'filter grayscale hover:filter-none'}
              `}
              style={{ cursor: isMobile ? 'pointer' : 'default' }}
            />
          ) : (
            <SkeletonLoader width="w-48 sm:w-56 md:w-64" height="h-64" rounded="rounded-xl" />
          )}
        </div>

        {/* Bio */}
        <div className="order-3 max-w-xl">
          {about ? (
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {about.bio}
            </p>
          ) : (
            <div className="space-y-4">
              <SkeletonLoader width="w-full" height="h-4" />
              <SkeletonLoader width="w-4/5" height="h-4" />
              <SkeletonLoader width="w-3/4" height="h-4" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
