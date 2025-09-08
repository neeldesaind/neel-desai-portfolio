import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import projectsJson from "../data/Projects.json";
import ReactModal from "react-modal";

const Projects = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [expandedProjects, setExpandedProjects] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);

  const toggleReadMore = (index) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const openScreenshotModal = (images) => {
    setModalImages(images);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleShowMore = () => setVisibleCount((prev) => prev + 3);

  const displayedProjects = projectsJson.slice(0, visibleCount);
  const hasMoreToShow = visibleCount < projectsJson.length;

  return (
    <section id="projects" className="bg-white dark:bg-black py-20 px-4 sm:px-6 md:px-10">
      <Helmet>
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
          content={projectsJson[0]?.image || "/default-project.jpg"}
        />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-900 dark:text-white mb-12">
          Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5 space-y-3">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full">
                  {project.type}
                </span>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>

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

                <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center items-center text-center">
                  <a
                    href={project.viewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-md hover:opacity-90 transition"
                  >
                    View Project
                  </a>

                  {project.screenshots?.length > 0 && (
                    <button
                      onClick={() => openScreenshotModal(project.screenshots)}
                      className="inline-block px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-md hover:opacity-90 transition"
                    >
                      View Screenshots
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMoreToShow && (
          <div className="text-center mt-10">
            <button
              onClick={handleShowMore}
              className="px-6 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-black rounded-md hover:opacity-90 transition"
            >
              Show More
            </button>
          </div>
        )}

        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 flex justify-center items-center z-[50]"
          overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
          ariaHideApp={false}
        >
          <div className="relative bg-white dark:bg-gray-900 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-xl px-4 sm:px-6 py-6 mt-20 sm:mt-24">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Project Screenshots
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

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
