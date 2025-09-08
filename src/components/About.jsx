import aboutData from '../data/About.json';

const About = () => {
  const about = aboutData;

  return (
    <section
      id="about"
      className="bg-white dark:bg-black py-20 px-4 sm:px-6 md:px-10"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-center gap-10 md:gap-14">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <a href="/#projects" aria-label="View Projects">
            <img
              src={about.image}
              alt="Neel Desai"
              loading="lazy"
              className="w-full max-w-md md:max-w-lg h-auto object-contain rounded-2xl cursor-pointer hover:opacity-90 transition"
            />
          </a>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white"
          >
            {about.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl mx-auto md:mx-0">
            {about.bio}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
