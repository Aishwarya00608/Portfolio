import React from 'react';
import { motion } from 'framer-motion';
import { Internship } from '../types';
import { ExternalLink, Briefcase } from 'lucide-react';

interface ExperienceTimelineProps {
  internships: Internship[];
  loading?: boolean;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ internships, loading }) => {
  return (
    <section id="experience" className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Experience Panel */}
        <div className="bg-[#FAF7F2] border-2 border-[#CBD5E1] rounded-3xl p-6 sm:p-10 shadow-window relative overflow-hidden">
          
          {/* Section Marker */}
          <div className="flex items-center justify-between pb-6 border-b border-[#CBD5E1] font-mono text-xs text-[#64748B]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="bg-[#F3E8FF] border border-[#C084FC] text-[#7E22CE] px-3 py-0.5 rounded-full font-bold text-[10px] ml-2">
                experience_log.folder
              </span>
            </div>
            <div className="font-mono text-xs font-bold text-[#1E293B]">
              04 / WHERE I'VE WORKED
            </div>
          </div>

          <div className="pt-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-serif italic text-3xl sm:text-4xl text-[#7E22CE]">
                  Where I've Worked
                </h2>
                <p className="text-sm font-sans text-[#475569] max-w-2xl mt-1">
                  Applied engineering engagements in artificial intelligence, natural language search analytics, and enterprise Generative AI systems.
                </p>
              </div>

              <div className="font-hand font-bold text-base text-[#9333EA] bg-[#F3E8FF] border border-[#C084FC] px-3.5 py-1 rounded-full shadow-sticker self-start sm:self-auto">
                ✦ Industry Internships
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12 font-mono text-xs text-[#64748B]">
                LOADING EXPERIENCE LOG...
              </div>
            ) : internships.length === 0 ? (
              <div className="text-center py-12 font-mono text-xs border-2 border-dashed border-[#CBD5E1] rounded-2xl text-[#64748B]">
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
                      className="bg-[#F3E8FF] border-2 border-[#C084FC] rounded-2xl p-6 sm:p-8 shadow-sticker"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        {/* Header */}
                        <div className="lg:col-span-4 space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7E22CE] block font-bold">
                            {dateDisplay} • {item.location || 'REMOTE'}
                          </span>
                          <h3 className="font-serif font-bold text-2xl text-[#1E293B]">
                            {item.role}
                          </h3>
                          <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#9333EA]">
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>{item.company}</span>
                          </div>
                        </div>

                        {/* Deliverables & Actions */}
                        <div className="lg:col-span-8 space-y-4">
                          <p className="text-sm font-sans text-[#334155] leading-relaxed bg-white/80 p-4 rounded-xl border border-white">
                            {item.description}
                          </p>

                          {item.achievements && (
                            <div className="p-4 border-l-4 border-[#9333EA] bg-white text-xs font-sans text-[#334155] rounded-r-xl shadow-sm">
                              <strong className="font-mono uppercase text-[10px] tracking-widest block text-[#7E22CE] mb-1">
                                KEY RESPONSIBILITY / DELIVERABLE
                              </strong>
                              {item.achievements}
                            </div>
                          )}

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {(item.technologiesList || []).map((tech) => (
                              <span
                                key={tech}
                                className="text-[9px] font-mono font-bold px-2.5 py-1 rounded-full bg-white text-[#7E22CE] border border-[#E9D5FF] shadow-sm"
                              >
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
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7E22CE] text-white hover:bg-[#6B21A8] text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-md"
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
