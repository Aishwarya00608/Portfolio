import React from 'react';
import { motion } from 'framer-motion';
import { Internship } from '../types';
import { Briefcase, Calendar, MapPin, ExternalLink, CheckCircle, Sparkles } from 'lucide-react';

interface ExperienceTimelineProps {
  internships: Internship[];
  loading?: boolean;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ internships, loading }) => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
            Internship <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            Applied industry machine learning, natural language processing, and Generative AI experience.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-500">Loading internships database...</p>
          </div>
        ) : internships.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">No internship records added yet.</p>
          </div>
        ) : (
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Vertical Spine Line */}
            <div className="absolute top-0 bottom-0 left-6 md:left-1/2 -ml-px w-0.5 bg-gradient-to-b from-purple-300 via-pink-400 to-indigo-300 dark:from-purple-800 dark:via-pink-700 dark:to-indigo-800" />

            <div className="space-y-12">
              {internships.map((item, idx) => {
                const isEven = idx % 2 === 0;

                // Format exact display dates
                const dateDisplay =
                  item.company.toLowerCase().includes('flyrank')
                    ? 'July 2026 – September 2026' // STRICT REQUIREMENT: Completed date
                    : `${item.startDate} – ${item.endDate}`;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="relative flex flex-col md:flex-row items-start"
                  >
                    {/* Timeline Badge Dot */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-4 border-pink-400 dark:border-purple-500 shadow-cute flex items-center justify-center z-10">
                      <Briefcase className="w-4 h-4 text-pink-500" />
                    </div>

                    {/* Content Card */}
                    <div
                      className={`ml-14 md:ml-0 md:w-1/2 ${
                        isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'
                      }`}
                    >
                      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-purple-100/80 dark:border-slate-700/80 shadow-sm hover:shadow-cute transition-all duration-300">
                        {/* Company & Role */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-100 dark:bg-slate-700 text-pink-700 dark:text-pink-300">
                            {item.status || 'Completed'}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {dateDisplay}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                          {item.role}
                        </h3>

                        <h4 className="text-sm font-bold text-purple-600 dark:text-purple-300 mt-1">
                          {item.company}
                        </h4>

                        {item.location && (
                          <div className="text-xs text-slate-400 flex items-center gap-1 mt-1 justify-start md:justify-inherit">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </div>
                        )}

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Achievements / Capstone Note */}
                        {item.achievements && (
                          <div className="mt-3 p-3 rounded-2xl bg-purple-50/60 dark:bg-slate-700/40 border border-purple-100 dark:border-slate-600 text-xs text-slate-700 dark:text-slate-300">
                            <span className="font-bold text-purple-700 dark:text-purple-300">Key Deliverable: </span>
                            {item.achievements}
                          </div>
                        )}

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {(item.technologiesList || []).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Capstone / Certificate Link */}
                        {(item.companyUrl || item.certificateUrl) && (
                          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                            <a
                              href={item.companyUrl || item.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              View Capstone Research / Report
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
