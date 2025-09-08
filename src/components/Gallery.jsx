import { useState, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import galleryData from "../data/Gallery.json";

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const openImage = (index) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);

  const categories = useMemo(() => {
    const cats = new Set(galleryData.images.map((img) => img.category));
    return ["all", ...cats];
  }, []);

  const filteredImages = useMemo(() => {
    return selectedCategory === "all"
      ? galleryData.images
      : galleryData.images.filter((img) => img.category === selectedCategory);
  }, [selectedCategory]);

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  }, [filteredImages]);

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  }, [filteredImages]);

  return (
    <section id="gallery" className="mt-24 bg-white dark:bg-black py-20 px-4 sm:px-6 md:px-10">
      <Helmet>
        <title>Gallery | Memorable Moments</title>
        <meta
          name="description"
          content="Explore our gallery of memorable moments, featuring events, activities, and inspiring highlights."
        />
        <meta
          name="keywords"
          content="gallery, events, photos, memorable moments, activities"
        />
        <meta property="og:title" content="Gallery | Memorable Moments" />
        <meta
          property="og:description"
          content="A collection of unforgettable events and inspiring activities."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/gallery" />
        <meta
          property="og:image"
          content={filteredImages[0]?.src || "/default-image.jpg"}
        />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Memorable Moments
        </h2>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setVisibleCount(6);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredImages.slice(0, visibleCount).map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
              onClick={() => openImage(index)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
              />
            </div>
          ))}
        </div>

        {visibleCount < filteredImages.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
            >
              View More
            </button>
          </div>
        )}
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
          onClick={closeImage}
        >
          <button
            onClick={closeImage}
            className="absolute top-5 right-5 text-white p-2 rounded-full hover:bg-white/20"
          >
            <X size={28} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-5 text-white p-2 rounded-full hover:bg-white/20"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-5 text-white p-2 rounded-full hover:bg-white/20"
          >
            <ChevronRight size={36} />
          </button>

          <div
            className="flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[selectedIndex].src}
              alt={filteredImages[selectedIndex].alt}
              className="max-h-[80vh] max-w-[90vw] rounded-2xl shadow-lg transition-opacity duration-500"
            />
            <p className="text-white text-center text-sm">
              {filteredImages[selectedIndex].alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
