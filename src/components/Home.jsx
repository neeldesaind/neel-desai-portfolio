import { useEffect, useState } from "react";
import heroJson from "../data/Hero.json";
import SkeletonLoader from "./SkeletonLoader";

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [isGrayscale, setIsGrayscale] = useState(true); // 🆕 Grayscale toggle

  useEffect(() => {
    const timer = setTimeout(() => {
      setHomeData(heroJson);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleGrayscale = () => setIsGrayscale((prev) => !prev); // 🆕 Toggle logic

  return (
    <section
      id="home"
      className="min-h-screen mt-20 flex items-center justify-center bg-gray-50 dark:bg-black px-6 py-20"
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Right: Image */}
        <div className="flex justify-center md:justify-end w-full order-1 md:order-2">
          {homeData ? (
            <img
              src={homeData.image}
              alt="Profile"
              draggable="false"
              onClick={toggleGrayscale} // 🆕 On click toggle
              className={`w-full max-w-[280px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] aspect-square object-cover rounded-2xl shadow-xl border border-gray-300 dark:border-gray-700 transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer ${
                isGrayscale ? "grayscale" : ""
              }`}
            />
          ) : (
            <SkeletonLoader
              width="w-[300px]"
              height="h-[300px]"
              rounded="rounded-xl"
            />
          )}
        </div>

        {/* Left: Text */}
        <div className="text-center md:text-left space-y-6 order-2 md:order-1">
          {homeData ? (
            <>
              <h1 className="text-5xl sm:text-6xl font-semibold text-gray-900 dark:text-white leading-tight">
                Hi, I&#39;m{" "}
                <span className="text-black dark:text-white">
                  {homeData.name}
                </span>
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
            </>
          ) : (
            <div className="space-y-4">
              <SkeletonLoader width="w-3/4" height="h-10" />
              <SkeletonLoader width="w-1/2" height="h-6" />
              <SkeletonLoader width="w-full" height="h-4" />
              <div className="flex gap-4 pt-4">
                <SkeletonLoader
                  width="w-32"
                  height="h-10"
                  rounded="rounded-full"
                />
                <SkeletonLoader
                  width="w-32"
                  height="h-10"
                  rounded="rounded-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
