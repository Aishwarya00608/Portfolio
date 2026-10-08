import React from 'react';
import { motion } from 'framer-motion';
import { Internship } from '../types';
import { ExternalLink } from 'lucide-react';

interface ExperienceTimelineProps {
  internships: Internship[];
  loading?: boolean;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ internships, loading }) => {
  return (
    <section id="experience" className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Experience Panel */}
        <div className="editorial-panel-experience">
          
          {/* Section Marker */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#E8DFEA] font-mono text-xs uppercase tracking-widest text-[#6E625A]">
            <span className="text-[#5C4D78] font-bold">04 /</span>
            <span>EXPERIENCE & INTERNSHIPS</span>
          </div>

          <div className="pt-8 space-y-6">
            <h2 className="font-serif italic text-3xl sm:text-4xl text-[#5C4D78]">
              Where I've Worked
            </h2>

            <p className="text-sm font-sans text-[#473B35] max-w-2xl">
              Applied engineering engagements in artificial intelligence, natural language search analytics, and enterprise Generative AI systems.
            </p>

            {loading ? (
              <div className="text-center py-12 font-mono text-xs text-[#6E625A]">
                LOADING EXPERIENCE LOG...
              </div>
            ) : internships.length === 0 ? (
              <div className="text-center py-12 font-mono text-xs border border-dashed border-[#E8DFEA] rounded-2xl text-[#6E625A]">
                NO EXPERIENCE RECORDS FOUND.
              </div>
            ) : (
              <div className="space-y-6 pt-4">
                {internships.map((item, idx) => {
                  const dateDisplay =
                    item.company.toLowerCase().includes('flyrank')
                      ? 'July 2026 – September 2026'
                      : `${item.startDate} – ${item.endDate}`;

                  const hasCapstone = Boolean(item.capstoneUrl && item.capstoneUrl.trim() !== '');

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="editorial-card-lavender p-6 sm:p-8"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        {/* Header */}
                        <div className="lg:col-span-4 space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#5C4D78] block font-semibold">
                            {dateDisplay} • {item.location || 'REMOTE'}
                          </span>
                          <h3 className="font-serif font-bold text-2xl text-[#2B2522]">
                            {item.role}
                          </h3>
                          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#5C4D78]">
                            {item.company}
                          </h4>
                        </div>

                        {/* Deliverables & Actions */}
                        <div className="lg:col-span-8 space-y-4">
                          <p className="text-sm font-sans text-[#332A26] leading-relaxed">
                            {item.description}
                          </p>

                          {item.achievements && (
                            <div className="p-4 border-l-2 border-[#5C4D78] bg-[#F5F0FA] text-xs font-sans text-[#332A26] rounded-r-xl">
                              <strong className="font-mono uppercase text-[10px] tracking-widest block text-[#5C4D78] mb-1">
                                KEY RESPONSIBILITY / DELIVERABLE
                              </strong>
                              {item.achievements}
                            </div>
                          )}

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {(item.technologiesList || []).map((tech) => (
                              <span key={tech} className="editorial-tag-lavender text-[9px]">
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* OPTIONAL CAPSTONE ACTION: Shown ONLY if capstoneUrl exists */}
                          {hasCapstone && (
                            <div className="pt-2">
                              <a
                                href={item.capstoneUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5C4D78] text-[#FAF7F2] hover:bg-[#43355C] text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-sm"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>VIEW CAPSTONE</span>
                              </a>
                            </div>
                          )}
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
