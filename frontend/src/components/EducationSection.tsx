import React from 'react';
import { motion } from 'framer-motion';
import { Education } from '../types';
import { GraduationCap, Calendar, Sparkles, Award } from 'lucide-react';

interface EducationSectionProps {
  education: Education[];
  loading?: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education, loading }) => {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-slate-800 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
            Education & <span className="gradient-text">Qualifications</span>
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-500">Loading education details...</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {education.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-purple-100/80 dark:border-slate-700/80 shadow-sm flex flex-col sm:flex-row items-start gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-slate-700 text-pink-600 dark:text-pink-300 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                      {item.degree}
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 dark:bg-slate-700 text-purple-700 dark:text-purple-300 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.startDate} – {item.endDate}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-pink-600 dark:text-pink-400">
                    {item.institution}
                  </h4>

                  {item.grade && (
                    <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
                      <Award className="w-3.5 h-3.5" />
                      <span>Grade/Score: {item.grade}</span>
                    </div>
                  )}

                  {item.description && (
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-1 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
