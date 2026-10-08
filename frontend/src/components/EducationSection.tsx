import React from 'react';
import { motion } from 'framer-motion';
import { Education } from '../types';

interface EducationSectionProps {
  education: Education[];
  loading?: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education, loading }) => {
  return (
    <section id="education" className="py-20 border-b border-[#1C1B1A]/20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#1C1B1A]/20 mb-8">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A63A24]">
            SECTION N° 08
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1A]">
            Academic Foundation
          </h2>
        </div>

        <p className="text-sm font-sans text-[#1C1B1A]/70 max-w-2xl mb-12">
          Degrees, coursework specializations, and academic performance metrics.
        </p>

        {loading ? (
          <div className="text-center py-12 font-mono text-xs text-[#1C1B1A]/60">
            LOADING ACADEMIC RECORDS...
          </div>
        ) : (
          <div className="space-y-6">
            {education.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="editorial-card p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#1C1B1A]/15 mb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#1C1B1A]/50 block">
                      {item.startDate} – {item.endDate}
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-[#1C1B1A]">
                      {item.degree}
                    </h3>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#A63A24]">
                      {item.institution}
                    </h4>
                  </div>

                  {item.grade && (
                    <div className="editorial-tag font-bold bg-[#1C1B1A] text-[#FAF8F5]">
                      GRADE: {item.grade}
                    </div>
                  )}
                </div>

                {item.description && (
                  <p className="text-sm font-sans text-[#1C1B1A]/80 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
