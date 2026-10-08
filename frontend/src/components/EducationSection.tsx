import React from 'react';
import { motion } from 'framer-motion';
import { Education } from '../types';
import { PixelStar } from './pixel/PixelDecorations';

interface EducationSectionProps {
  education: Education[];
  loading?: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education, loading }) => {
  return (
    <section id="education" className="py-16 border-b-4 border-[#2A2650]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Level Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3 bg-[#121026] border-4 border-black shadow-[4px_4px_0px_0px_#000] font-pixel text-xs">
          <div className="flex items-center gap-2 text-[#3B82F6]">
            <span>LEVEL 08</span>
            <span className="text-[#8B8BAE]">•</span>
            <span className="text-[#FFD700]">ACADEMIC EDUCATION VAULT</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#00FF66]">
            <PixelStar size={16} /> RECORDS: {education.length}
          </div>
        </div>

        <p className="font-pixel text-xs text-[#E0E7FF] max-w-3xl mb-8 leading-relaxed">
          ACADEMIC DEGREES, COURSEWORK SPECIALIZATIONS, AND GRADE PERFORMANCE METRICS.
        </p>

        {loading ? (
          <div className="text-center py-12 font-pixel text-xs text-[#00FF66] animate-pulse">
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
                className="pixel-card p-6 bg-[#121026] hover:border-[#3B82F6]"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b-2 border-black mb-4">
                  <div className="space-y-2">
                    <span className="font-pixel text-[10px] text-[#00F0FF] block">
                      {item.startDate} – {item.endDate}
                    </span>
                    <h3 className="font-pixel text-base text-[#FFD700] leading-snug">
                      {item.degree}
                    </h3>
                    <h4 className="font-pixel text-xs text-[#00FF66] uppercase">
                      {item.institution}
                    </h4>
                  </div>

                  {item.grade && (
                    <div className="font-pixel text-xs bg-[#FF2E93] text-white px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_#000] self-start sm:self-auto">
                      GRADE: {item.grade}
                    </div>
                  )}
                </div>

                {item.description && (
                  <p className="text-sm font-sans text-[#E0E7FF] leading-relaxed">
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
