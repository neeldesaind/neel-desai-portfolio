import { useEffect, useState } from "react";
import skillsJson from "../data/Skills.json";
import SkeletonLoader from "./SkeletonLoader";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSkills(skillsJson);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="skills"
      className="bg-gray-50 dark:bg-black py-16 px-4 sm:px-6 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        {loading ? (
          <div className="mb-12 flex justify-center">
            <SkeletonLoader width="w-48 sm:w-64" height="h-10" />
          </div>
        ) : (
          <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 dark:text-white mb-12">
            Skills
          </h2>
        )}

        {/* Grid */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-300 dark:border-gray-700 animate-pulse">
                    <SkeletonLoader
                      width="w-10"
                      height="h-10"
                      rounded="rounded-full"
                    />
                  </div>
                  <SkeletonLoader width="w-20" height="h-4" />
                </div>
              ))
            : skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 transition-transform hover:-translate-y-1"
                >
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-white flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-sm">
                    <img
                      src={skill.image}
                      alt={skill.name}
                      className="w-10 h-10 object-contain dark:bg-white"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {skill.name}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
