import { useEffect, useState } from "react";
import projectsJson from "../data/Projects.json";
import SkeletonLoader from "./SkeletonLoader";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const [expandedProjects, setExpandedProjects] = useState({}); // 👈 Track which project is expanded

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(projectsJson);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const toggleReadMore = (index) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const displayedProjects = loading
    ? Array.from({ length: 3 })
    : projects.slice(0, visibleCount);

  const hasMoreToShow = visibleCount < projects.length;

  return (
    <section
      id="projects"
      className="bg-white dark:bg-black py-20 px-4 sm:px-6 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        {loading ? (
          <div className="mb-12 flex justify-center">
            <SkeletonLoader width="w-56" height="h-10" />
          </div>
        ) : (
          <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-900 dark:text-white mb-12">
            Projects
          </h2>
        )}

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {loading ? (
                <SkeletonLoader width="w-full" height="h-48" />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-5 space-y-3">
                {loading ? (
                  <>
                    <SkeletonLoader width="w-24" height="h-4" />
                    <SkeletonLoader width="w-3/4" height="h-6" />
                    <SkeletonLoader width="w-full" height="h-4" />
                    <SkeletonLoader width="w-1/2" height="h-4" />
                  </>
                ) : (
                  <>
                    {/* Type Badge */}
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full">
                      {project.type}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>

                    {/* Description with Read More */}
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {expandedProjects[i]
                        ? project.description
                        : project.description.slice(0, 100) +
                          (project.description.length > 100 ? "..." : "")}
                      {project.description.length > 100 && (
                        <button
                          onClick={() => toggleReadMore(i)}
                          className="text-indigo-600 dark:text-indigo-300 font-medium ml-2 hover:underline"
                        >
                          {expandedProjects[i] ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.skills.map((icon, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full bg-white dark:bg-gray-100 flex items-center justify-center p-1 shadow-sm"
                          title={icon.split("/").pop().replace(".png", "")}
                        >
                          <img
                            src={icon}
                            alt="tech"
                            className="w-full h-full object-contain rounded-full"
                          />
                        </div>
                      ))}
                    </div>

                    {/* View Project */}
                    <div className="pt-4">
                      <a
                        href={project.viewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-md hover:opacity-90 transition"
                      >
                        View Project
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {!loading && hasMoreToShow && (
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

export default Projects;
