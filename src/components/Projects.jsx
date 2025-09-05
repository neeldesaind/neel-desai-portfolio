import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async"; // ✅ SEO
import projectsJson from "../data/Projects.json";
import SkeletonLoader from "./SkeletonLoader";
import ReactModal from "react-modal";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const [expandedProjects, setExpandedProjects] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(projectsJson);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // disable scroll
    } else {
      document.body.style.overflow = "auto"; // re-enable scroll
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const toggleReadMore = (index) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const openScreenshotModal = (images) => {
    setModalImages(images);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Projects | My Portfolio</title>
        <meta
          name="description"
          content="Explore my portfolio projects showcasing web development, design, and technical expertise across various technologies."
        />
        <meta
          name="keywords"
          content="projects, portfolio, web development, coding, software engineering"
        />
        <meta property="og:title" content="Projects | My Portfolio" />
        <meta
          property="og:description"
          content="Browse through my featured projects, highlighting creativity, problem-solving, and technical skills."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/projects" />
        <meta
          property="og:image"
          content={projects[0]?.image || "/default-project.jpg"}
        />
      </Helmet>

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

                    {/* Description */}
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

                    {/* View Links */}
                    <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center items-center text-center">
                      <a
                        href={project.viewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-md hover:opacity-90 transition"
                      >
                        View Project
                      </a>

                      {project.screenshots &&
                        project.screenshots.length > 0 && (
                          <button
                            onClick={() =>
                              openScreenshotModal(project.screenshots)
                            }
                            className="inline-block px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-md hover:opacity-90 transition"
                          >
                            View Screenshots
                          </button>
                        )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Show More */}
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

        {/* Modal */}
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 flex justify-center items-center z-[50]"
          overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
          ariaHideApp={false}
        >
          <div className="relative bg-white dark:bg-gray-900 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-xl px-4 sm:px-6 py-6 mt-20 sm:mt-24">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Project Screenshots
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Screenshot Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6">
              {modalImages.map((img, index) => (
                <div
                  key={index}
                  className="overflow-hidden border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={img}
                    alt={`screenshot-${index}`}
                    className="w-full h-auto max-h-[500px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </ReactModal>
      </div>
    </section>
  );
};

export default Projects;
