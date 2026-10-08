import React from 'react';
import { motion } from 'framer-motion';
import { Education } from '../types';
import { GraduationCap } from 'lucide-react';

interface EducationSectionProps {
  education: Education[];
  loading?: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education, loading }) => {
  return (
    <section id="education" className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Education Window */}
        <div className="bg-[#FAF7F2] border-2 border-[#CBD5E1] rounded-3xl p-6 sm:p-10 shadow-window relative overflow-hidden">
          
          {/* Section Marker */}
          <div className="flex items-center justify-between pb-6 border-b border-[#CBD5E1] font-mono text-xs text-[#64748B]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="bg-[#E0F2FE] border border-[#7DD3FC] text-[#0369A1] px-3 py-0.5 rounded-full font-bold text-[10px] ml-2">
                academic_degree.edu
              </span>
            </div>
            <div className="font-mono text-xs font-bold text-[#1E293B]">
              08 / ACADEMIC FOUNDATION
            </div>
          </div>

          <div className="pt-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-serif italic text-3xl sm:text-4xl text-[#0369A1]">
                  Education
                </h2>
                <p className="text-sm font-sans text-[#475569] max-w-2xl mt-1">
                  Degrees, coursework specializations, and academic performance metrics.
                </p>
              </div>

              <div className="font-hand font-bold text-base text-[#0284C7] bg-[#E0F2FE] border border-[#BAE6FD] px-3.5 py-1 rounded-full shadow-sticker self-start sm:self-auto">
                ✦ B.Tech Computer Science
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12 font-mono text-xs text-[#64748B]">
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
                    className="bg-[#E0F2FE] border-2 border-[#7DD3FC] rounded-2xl p-6 sm:p-8 shadow-sticker"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#BAE6FD] mb-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0284C7] block">
                          {item.startDate} – {item.endDate}
                        </span>
                        <h3 className="font-serif font-bold text-2xl text-[#1E293B]">
                          {item.degree}
                        </h3>
                        <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0369A1]">
                          <GraduationCap className="w-4 h-4 text-[#0284C7]" />
                          <span>{item.institution}</span>
                        </div>
                      </div>

                      {item.grade && (
                        <div className="font-mono text-xs font-bold text-[#0369A1] bg-white px-3.5 py-1.5 rounded-full border border-[#BAE6FD] shadow-sm">
                          GRADE: {item.grade}
                        </div>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-sm font-sans text-[#334155] leading-relaxed bg-white/80 p-4 rounded-xl border border-white">
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
