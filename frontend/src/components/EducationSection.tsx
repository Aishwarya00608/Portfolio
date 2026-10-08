import React from 'react';
import { motion } from 'framer-motion';
import { Education } from '../types';

interface EducationSectionProps {
  education: Education[];
  loading?: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education, loading }) => {
  return (
    <section id="education" className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Education Panel */}
        <div className="black-panel">
          
          {/* Section Marker */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#262626] font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
            <span className="text-white font-bold">08 /</span>
            <span>ACADEMIC FOUNDATION</span>
          </div>

          <div className="pt-8 space-y-6">
            <h2 className="font-serif italic text-3xl sm:text-4xl text-white">
              Education
            </h2>

            <p className="text-sm font-sans text-[#D5D5D5] max-w-2xl">
              Degrees, coursework specializations, and academic performance metrics.
            </p>

            {loading ? (
              <div className="text-center py-12 font-mono text-xs text-[#A0A0A0]">
                LOADING ACADEMIC RECORDS...
              </div>
            ) : (
              <div className="space-y-6 pt-4">
                {education.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="black-card p-6 sm:p-8"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#262626] mb-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#A0A0A0] block">
                          {item.startDate} – {item.endDate}
                        </span>
                        <h3 className="font-serif font-bold text-2xl text-white">
                          {item.degree}
                        </h3>
                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#A0A0A0]">
                          {item.institution}
                        </h4>
                      </div>

                      {item.grade && (
                        <div className="black-tag font-bold text-white bg-[#141414] border border-[#333333]">
                          GRADE: {item.grade}
                        </div>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-sm font-sans text-[#D5D5D5] leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
