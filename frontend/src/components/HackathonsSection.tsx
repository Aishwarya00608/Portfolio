import React from 'react';
import { motion } from 'framer-motion';
import { Hackathon } from '../types';
import { Terminal, Award, Calendar, Sparkles } from 'lucide-react';

interface HackathonsSectionProps {
  hackathons: Hackathon[];
  loading?: boolean;
}

export const HackathonsSection: React.FC<HackathonsSectionProps> = ({ hackathons, loading }) => {
  if (!loading && hackathons.length === 0) return null;

  return (
    <section id="hackathons" className="py-20 relative bg-purple-50/20 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Competitive Innovation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
            Hackathons & <span className="gradient-text">Coding Sprints</span>
          </h2>
        </div>

        {/* Hackathon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hackathons.map((hack, idx) => (
            <motion.div
              key={hack.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-purple-100/80 dark:border-slate-700/80 shadow-sm hover:shadow-cute transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-cyan-50 dark:bg-slate-700 flex items-center justify-center text-cyan-500">
                  <Terminal className="w-5 h-5" />
                </div>
                {hack.date && (
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {hack.date}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                {hack.name}
              </h3>

              {hack.organizer && (
                <h4 className="text-xs font-bold text-purple-600 dark:text-purple-300 mt-1">
                  {hack.organizer}
                </h4>
              )}

              {hack.projectName && (
                <div className="mt-3 inline-block px-2.5 py-1 rounded-lg bg-pink-50 dark:bg-slate-700/50 text-pink-700 dark:text-pink-300 text-xs font-semibold">
                  Project: {hack.projectName}
                </div>
              )}

              {hack.description && (
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                  {hack.description}
                </p>
              )}

              {hack.result && (
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <Award className="w-4 h-4" />
                  <span>{hack.result}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
