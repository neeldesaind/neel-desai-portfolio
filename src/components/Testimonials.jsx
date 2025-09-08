import React from "react";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import testimonialsJson from "../data/Testimonials.json";
import "swiper/css";
import "swiper/css/navigation";

const MAX_LENGTH = 120;

const Testimonials = () => {
  const [expandedIndexes, setExpandedIndexes] = React.useState([]);

  const toggleExpand = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section
      id="testimonials"
      className="bg-white dark:bg-black py-20 px-4 sm:px-6 md:px-10"
    >
      {/* ✅ SEO */}
      <Helmet>
        <meta
          name="description"
          content="Read testimonials and feedback from clients and collaborators highlighting my work, professionalism, and expertise."
        />
        <meta
          name="keywords"
          content="testimonials, feedback, clients, portfolio, reviews, work"
        />
        <meta property="og:title" content="Testimonials | My Portfolio" />
        <meta
          property="og:description"
          content="Client testimonials showcasing satisfaction, work quality, and collaboration."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/testimonials" />
        <meta
          property="og:image"
          content={testimonialsJson[0]?.photo || "/default-testimonial.jpg"}
        />
      </Helmet>

      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-12">
          Testimonials
        </h2>

        <Swiper
          modules={[Navigation]}
          loop={true}
          centeredSlides={true}
          slidesPerView={1.1}
          spaceBetween={20}
          navigation
          breakpoints={{
            768: { slidesPerView: 1.5 },
            1024: { slidesPerView: 1.8 },
          }}
        >
          {testimonialsJson.map((item, i) => {
            const isExpanded = expandedIndexes.includes(i);
            const showToggle = item.text.length > MAX_LENGTH;
            const displayText = isExpanded
              ? item.text
              : item.text.slice(0, MAX_LENGTH);

            return (
              <SwiperSlide key={i}>
                <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-8 py-10 shadow-lg max-w-xl mx-auto transition-all duration-50">
                  <span className="text-pink-500 text-5xl absolute -top-6 left-4 select-none">“</span>

                  <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-4 leading-relaxed z-10 relative">
                    {displayText}
                    {!isExpanded && showToggle ? "..." : ""}
                  </p>

                  {showToggle && (
                    <button
                      onClick={() => toggleExpand(i)}
                      className="text-sm text-black dark:text-white underline focus:outline-none"
                    >
                      {isExpanded ? "View Less" : "View More"}
                    </button>
                  )}

                  <div className="flex items-center gap-4 mt-6 justify-center z-10 relative">
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                    />
                    <div className="text-left">
                      <h4 className="text-gray-900 dark:text-white font-semibold">
                        {item.name}
                      </h4>
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
      </div>
    </section>
  );
};

export default Testimonials;
