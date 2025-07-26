import { useEffect, useState } from 'react';
import aboutData from '../data/About.json';
import SkeletonLoader from './SkeletonLoader';

const About = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAbout(aboutData);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" className="bg-white dark:bg-black py-20 px-4 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-center gap-10 md:gap-14">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          {about ? (
            <a href="/#projects">
  <img
    src={about.image}
    alt="About Neel"
    className="w-full max-w-md md:max-w-lg h-auto object-contain rounded-2xl cursor-pointer hover:opacity-90 transition"
  />
</a>
          ) : (
            <SkeletonLoader width="w-full max-w-lg" height="h-64" rounded="rounded-2xl" />
          )}
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
          {about ? (
            <>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                {about.title}
              </h2>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl mx-auto md:mx-0">
                {about.bio}
              </p>
            </>
          ) : (
            <div className="space-y-4">
              <SkeletonLoader width="w-48" height="h-8" />
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
