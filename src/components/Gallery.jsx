import { useEffect, useState, useCallback, useMemo } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import galleryData from "../data/Gallery.json";
import SkeletonLoader from "./SkeletonLoader";

const Gallery = () => {
  const [gallery, setGallery] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setGallery(galleryData);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const openImage = (index) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);

  // Filtered images (memoized so callbacks don't break)
  const filteredImages = useMemo(() => {
    if (!gallery) return [];
    return selectedCategory === "all"
      ? gallery.images
      : gallery.images.filter((img) => img.category === selectedCategory);
  }, [gallery, selectedCategory]);

  // Prev & Next with useCallback
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

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, prevImage, nextImage]);

  if (!gallery) {
    return (
      <section
        id="gallery"
        className="scroll-mt-24 bg-white dark:bg-black py-20 px-4 sm:px-6 md:px-10"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonLoader
              key={i}
              width="w-full"
              height="h-64"
              rounded="rounded-2xl"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="gallery"
      className="mt-24 bg-white dark:bg-black py-20 px-4 sm:px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Memorable Moments
        </h2>

        {/* Category Filters */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {["all", "event", "trip", "other"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setVisibleCount(6); // reset count
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

        {/* Grid of Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredImages.slice(0, visibleCount).map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl shadow-lg group"
              onClick={() => openImage(index)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500 cursor-pointer"
              />
            </div>
          ))}
        </div>

        {/* View More Button */}
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

      {/* Fullscreen Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 animate-fadeIn"
          onClick={closeImage}
        >
          {/* Close */}
          <button
            onClick={closeImage}
            className="absolute top-5 right-5 text-white p-2 rounded-full hover:bg-white/20"
          >
            <X size={28} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-5 text-white p-2 rounded-full hover:bg-white/20"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-5 text-white p-2 rounded-full hover:bg-white/20"
          >
            <ChevronRight size={36} />
          </button>

          {/* Image */}
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
