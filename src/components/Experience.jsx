import { useState, useEffect } from 'react';
import experienceJson from '../data/Experience.json';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useTheme } from '../Hooks/useTheme';

const Experience = () => {
  const { isDark } = useTheme();
  const [selectedResponsibilities, setSelectedResponsibilities] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleShowResponsibilities = (responsibilities) => {
    setSelectedResponsibilities(responsibilities || []);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedResponsibilities([]);
  };

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [showModal]);

  const lineColor = isDark ? '#374151' : '#d1d5db';
  const bgColor = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#f9fafb' : '#1f2937';
  const borderColor = isDark ? '#374151' : '#e5e7eb';
  const arrowColor = isDark ? '#111827' : '#ffffff';
  const iconBg = isDark ? '#1f2937' : '#ffffff';
  const iconBorder = isDark ? '#4b5563' : '#dddddd';

  return (
    <section id="experience" className="bg-gray-50 dark:bg-black py-20 px-4 sm:px-6 md:px-10 transition-colors duration-300 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-900 dark:text-white mb-12">
          Experience
        </h2>

        <VerticalTimeline lineColor={lineColor}>
          {experienceJson.map((exp, i) => {
            if (exp.roles && Array.isArray(exp.roles)) {
              return exp.roles.map((role, idx) => (
                <VerticalTimelineElement
                  key={`${i}-${idx}`}
                  date={role.duration}
                  contentStyle={{
                    background: bgColor,
                    color: textColor,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }}
                  contentArrowStyle={{ borderRight: `7px solid ${arrowColor}` }}
                  iconStyle={{
                    background: iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    border: `2px solid ${iconBorder}`,
                  }}
                  icon={
                    <img src={exp.logo} alt={exp.company} className="w-8 h-8 object-contain" />
                  }
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{exp.company}</h3>
                  <h4 className="text-sm text-gray-600 dark:text-gray-300">{role.title} · {role.type}</h4>
                  <p className="italic text-sm text-gray-500 dark:text-gray-400">{role.location}</p>

                  {role.responsibilities && (
                    <button
                      onClick={() => handleShowResponsibilities(role.responsibilities)}
                      className="mt-4 px-4 py-1.5 rounded-full text-sm font-medium transition-colors bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    >
                      View Responsibilities
                    </button>
                  )}
                </VerticalTimelineElement>
              ));
            } else {
              return (
                <VerticalTimelineElement
                  key={i}
                  date={exp.duration}
                  contentStyle={{
                    background: bgColor,
                    color: textColor,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }}
                  contentArrowStyle={{ borderRight: `7px solid ${arrowColor}` }}
                  iconStyle={{
                    background: iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    border: `2px solid ${iconBorder}`,
                  }}
                  icon={<img src={exp.logo} alt={exp.company} className="w-8 h-8 object-contain" />}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{exp.company}</h3>
                  <h4 className="text-sm text-gray-600 dark:text-gray-300">{exp.role} · {exp.type}</h4>
                  <p className="italic text-sm text-gray-500 dark:text-gray-400">{exp.location}</p>

                  {exp.responsibilities && (
                    <button
                      onClick={() => handleShowResponsibilities(exp.responsibilities)}
                      className="mt-4 px-4 py-1.5 rounded-full text-sm font-medium transition-colors bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    >
                      View Responsibilities
                    </button>
                  )}
                </VerticalTimelineElement>
              );
            }
          })}
        </VerticalTimeline>
      </div>

      {/* Modal for Responsibilities */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-red-500 text-3xl"
            >
              &times;
            </button>

            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Key Responsibilities
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm max-h-64 overflow-y-auto">
              {selectedResponsibilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;
