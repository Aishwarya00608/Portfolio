import React from 'react';
import { motion } from 'framer-motion';
import { Profile, PortfolioStats } from '../types';
import { FolderGit2, Award, Briefcase, Trophy, User, GraduationCap } from 'lucide-react';

interface AboutProps {
  profile: Profile | null;
  stats: PortfolioStats | null;
}

export const About: React.FC<AboutProps> = ({ profile, stats }) => {
  const bio =
    profile?.longBio ||
    'I am a dedicated 4th-year Computer Science Engineering student specializing in intelligent systems, machine learning pipelines, and modern web application development. My analytical mindset drives me to build computer vision fatigue monitors, role-based enterprise portals, and AI climate risk prediction systems. I thrive at the intersection of data-driven insights and elegant full-stack solutions.';

  const statItems = [
    {
      label: 'Projects',
      value: stats ? stats.projects : 3,
      icon: <FolderGit2 className="w-5 h-5 text-purple-500" />,
      bg: 'bg-purple-50 dark:bg-purple-950/40 border-purple-100 dark:border-purple-900/50',
    },
    {
      label: 'Certifications',
      value: stats ? stats.certifications : 11,
      icon: <Award className="w-5 h-5 text-pink-500" />,
      bg: 'bg-pink-50 dark:bg-pink-950/40 border-pink-100 dark:border-pink-900/50',
    },
    {
      label: 'Internships',
      value: stats ? stats.internships : 2,
      icon: <Briefcase className="w-5 h-5 text-indigo-500" />,
      bg: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-900/50',
    },
    {
      label: 'Hackathons',
      value: stats ? stats.hackathons : 3,
      icon: <Trophy className="w-5 h-5 text-amber-500" />,
      bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/50',
    },
  ];

  const focusAreas = [
    'Data Science',
    'Artificial Intelligence',
    'Machine Learning',
    'Computer Vision',
    'Data Analytics',
    'Full-Stack Engineering',
    'Cyber Security',
  ];

  return (
    <section id="about" className="py-20 relative bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-slate-800 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
            <User className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
            Transforming Data & Ideas into <span className="gradient-text">Impactful Technology</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Dynamic Database Statistics Grid */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              {statItems.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`p-6 rounded-3xl border shadow-sm ${stat.bg} text-center hover:scale-105 transition-transform duration-300`}
                >
                  <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mx-auto mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-1 font-serif">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Academic Highlight Card */}
            <div className="mt-4 p-5 rounded-3xl bg-gradient-to-r from-pink-50 to-purple-50 dark:from-slate-800/80 dark:to-slate-800/40 border border-pink-100 dark:border-slate-700 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  4th-Year B.Tech CSE Student
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  JNTUH Affiliated College • 2023–2027
                </p>
              </div>
            </div>
          </div>

          {/* Long Bio & Specialization Badges */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">
              Passionate Engineer & AI Practitioner
            </h3>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              {bio}
            </p>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                Core Domains & Interests
              </h4>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-sm hover:border-pink-300 dark:hover:border-pink-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                  >
                    • {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
