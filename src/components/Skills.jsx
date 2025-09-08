import React from "react";
import { Helmet } from "react-helmet-async";
import skillsJson from "../data/Skills.json";

const Skills = () => {
  return (
    <section
      id="skills"
      className="bg-gray-50 dark:bg-black py-16 px-4 sm:px-6 md:px-10"
    >
      {/* ✅ SEO Meta */}
      <Helmet>
        <meta
          name="description"
          content="Explore my skills in web development, design, and various technologies that showcase my expertise."
        />
        <meta
          name="keywords"
          content="skills, web development, frontend, backend, MERN, programming, software engineering"
        />
        <meta property="og:title" content="Skills | My Portfolio" />
        <meta
          property="og:description"
          content="A showcase of my technical skills and proficiencies in modern technologies."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/skills" />
        <meta
          property="og:image"
          content={skillsJson[0]?.image || "/default-skill.jpg"}
        />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 dark:text-white mb-12">
          Skills
        </h2>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {skillsJson.map((skill, index) => (
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
