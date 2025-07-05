import { useEffect, useState } from 'react';
import experienceJson from '../data/Experience.json';
import SkeletonLoader from './SkeletonLoader';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useTheme } from '../Hooks/useTheme'; // ✅ import

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme(); // ✅ use hook

  useEffect(() => {
    const timer = setTimeout(() => {
      setExperiences(experienceJson);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const lineColor = isDark ? '#374151' : '#d1d5db';
  const bgColor = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#f9fafb' : '#1f2937';
  const borderColor = isDark ? '#374151' : '#e5e7eb';
  const arrowColor = isDark ? '#111827' : '#ffffff';
  const iconBg = isDark ? '#1f2937' : '#ffffff';
  const iconBorder = isDark ? '#4b5563' : '#dddddd';

  return (
    <section
      id="experience"
      className="bg-gray-50 dark:bg-black py-20 px-4 sm:px-6 md:px-10 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="mb-12 flex justify-center">
            <SkeletonLoader width="w-56" height="h-10" />
          </div>
        ) : (
          <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-900 dark:text-white mb-12">
            Experience
          </h2>
        )}

        {loading ? (
          <div className="space-y-10">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="px-6">
                <SkeletonLoader width="w-full" height="h-28" />
              </div>
            ))}
          </div>
        ) : (
          <VerticalTimeline lineColor={lineColor}>
            {experiences.map((exp, i) => (
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
                icon={
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="w-8 h-8 object-contain"
                  />
                }
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {exp.company}
                </h3>
                <h4 className="text-sm text-gray-600 dark:text-gray-300">
                  {exp.role} · {exp.type}
                </h4>
                <p className="italic text-sm text-gray-500 dark:text-gray-400">
                  {exp.location}
                </p>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        )}
      </div>
    </section>
  );
};

export default Experience;
