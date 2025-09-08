import certsJson from '../data/Certficate.json';
import React from 'react';


const Certificates = () => {
  const [visibleCount, setVisibleCount] = React.useState(3);

  const handleShowMore = () => setVisibleCount((prev) => prev + 3);

  const displayed = certsJson.slice(0, visibleCount);
  const hasMore = visibleCount < certsJson.length;

  return (
    <section
      id="certificates"
      className="bg-gray-50 dark:bg-black py-20 px-4 sm:px-6 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-900 dark:text-white mb-12">
          Certificates
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayed.map((cert, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <a href={cert.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  className="w-full h-48 object-cover"
                />
              </a>

              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {cert.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {cert.issuer}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Issued: {cert.issueDate}
                  {cert.expiryDate ? ` · Expires: ${cert.expiryDate}` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={handleShowMore}
              className="px-6 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-black rounded-md hover:opacity-90 transition"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;

