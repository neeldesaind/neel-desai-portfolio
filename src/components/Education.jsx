import { useEffect, useState } from 'react';
import educationJson from '../data/Education.json';
import SkeletonLoader from './SkeletonLoader';

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEducation(educationJson);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="education" className="bg-white dark:bg-black py-20 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        {loading ? (
          <div className="mb-12 flex justify-center">
            <SkeletonLoader width="w-56" height="h-10" />
          </div>
        ) : (
          <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-900 dark:text-white mb-12">
            Education
          </h2>
        )}

        {/* Education Cards */}
        <div className="space-y-8">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex items-center gap-6">
                  <SkeletonLoader width="w-16" height="h-16" rounded="rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <SkeletonLoader width="w-3/4" height="h-6" />
                    <SkeletonLoader width="w-1/2" height="h-4" />
                    <SkeletonLoader width="w-1/3" height="h-4" />
                  </div>
                </div>
              ))
            : education.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.degree}
                    className="w-16 h-16 object-contain rounded-md border dark:border-gray-600"
                  />
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                      {item.degree}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">{item.institution}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.year} &middot; {item.grade}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Education;