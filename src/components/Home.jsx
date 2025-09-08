import React, { useState, useEffect } from "react";
import heroJson from "../data/Hero.json";

const Home = () => {
  const [homeData, setHomeData] = useState(heroJson); // Load immediately
  const [isMobile, setIsMobile] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(true);

  // Detect if it's mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleGrayscale = () => {
    if (isMobile) setIsGrayscale((prev) => !prev);
  };

  return (
    <section
      id="home"
      className="min-h-screen mt-20 flex items-center justify-center bg-gray-50 dark:bg-black px-6 py-20"
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Right: Image */}
        <div className="flex justify-center md:justify-end w-full order-1 md:order-2">
          <img
            src={homeData.image}
            alt={`${homeData.name} Profile`}
            draggable="false"
            onClick={toggleGrayscale}
            className={`w-full max-w-[280px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] aspect-square object-cover rounded-2xl shadow-xl border border-gray-300 dark:border-gray-700 transition duration-500 ease-in-out cursor-pointer 
              ${isMobile ? (isGrayscale ? "grayscale" : "") : "grayscale hover:grayscale-0"}`}
          />
        </div>

        {/* Left: Text */}
        <div className="text-center md:text-left space-y-6 order-2 md:order-1">
          <h1 className="text-5xl sm:text-6xl font-semibold text-gray-900 dark:text-white leading-tight">
            Hi, I&#39;m{" "}
            <span className="text-black dark:text-white">{homeData.name}</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {homeData.title}
          </p>
          <p className="text-md text-gray-500 dark:text-gray-400 max-w-xl mx-auto md:mx-0">
            {homeData.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <a
              href={homeData.contactLink}
              className="text-sm font-medium text-black dark:text-white border border-gray-800 dark:border-gray-200 px-5 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Contact Me
            </a>
            <a
              href={homeData.cvLink}
              download
              className="text-sm font-medium text-white bg-black dark:bg-white dark:text-black px-5 py-2 rounded-full hover:opacity-90 transition"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
