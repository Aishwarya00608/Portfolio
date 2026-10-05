import React from 'react';
import { motion } from 'framer-motion';
import { Profile, PortfolioStats } from '../types';
import { GraduationCap } from 'lucide-react';

interface AboutProps {
  profile: Profile | null;
  stats: PortfolioStats | null;
}

export const About: React.FC<AboutProps> = ({ profile, stats }) => {
  const bio =
    profile?.longBio ||
    'I am a dedicated 4th-year Computer Science Engineering student specializing in intelligent systems, machine learning pipelines, and modern web application development. My analytical mindset drives me to build computer vision fatigue monitors, role-based enterprise portals, and AI climate risk prediction systems. I thrive at the intersection of data-driven insights and elegant full-stack solutions.';

  const statItems = [
    { label: 'SELECTED PROJECTS', value: stats ? stats.projects : 3 },
    { label: 'CERTIFICATIONS', value: stats ? stats.certifications : 11 },
    { label: 'INTERNSHIPS', value: stats ? stats.internships : 2 },
    { label: 'HACKATHONS', value: stats ? stats.hackathons : 3 },
  ];

  const focusAreas = [
    'Artificial Intelligence',
    'Machine Learning',
    'Computer Vision',
    'Deep Learning',
    'Data Science & Analytics',
    'Full-Stack Engineering',
    'Cyber Security',
  ];

  return (
    <section id="about" className="py-20 border-b border-[#1C1B1A]/15 dark:border-[#EAE7E1]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20 mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1C1B1A]/60 dark:text-[#EAE7E1]/60">
            SECTION 01
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1A] dark:text-[#EAE7E1]">
            About & Perspective
          </h2>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Biography & Career Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1C1B1A]/60 dark:text-[#EAE7E1]/60">
                WHO I AM
              </span>
              <h3 className="font-display italic text-3xl sm:text-4xl text-[#1C1B1A] dark:text-[#EAE7E1] leading-tight">
                Bridging analytical data science with clean software architecture.
              </h3>
            </div>

            <p className="text-base text-[#1C1B1A]/80 dark:text-[#EAE7E1]/80 leading-relaxed font-sans">
              {bio}
            </p>

            {/* Core Domains */}
            <div className="pt-4 border-t border-[#1C1B1A]/15 dark:border-[#EAE7E1]/15">
              <span className="block text-xs font-mono uppercase tracking-widest text-[#1C1B1A]/60 dark:text-[#EAE7E1]/60 mb-4">
                PRIMARY FOCUS & INTERESTS
              </span>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <span
                    key={area}
                    className="editorial-tag"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key Statistics & Academic Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Statistics Index Grid */}
            <div className="grid grid-cols-2 gap-4">
              {statItems.map((item) => (
                <div
                  key={item.label}
                  className="p-6 border border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20 bg-[#FAF8F5] dark:bg-[#191817]"
                >
                  <div className="font-display text-4xl sm:text-5xl font-normal text-[#1C1B1A] dark:text-[#EAE7E1] mb-1">
                    {item.value}
                  </div>
                  <div className="text-[10px] font-mono font-bold tracking-widest text-[#1C1B1A]/60 dark:text-[#EAE7E1]/60">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Academic Highlight Box */}
            <div className="p-6 border border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20 bg-[#FAF8F5] dark:bg-[#191817] flex items-start gap-4">
              <div className="p-3 border border-[#1C1B1A]/30 dark:border-[#EAE7E1]/30 shrink-0">
                <GraduationCap className="w-5 h-5 text-[#1C1B1A] dark:text-[#EAE7E1]" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#1C1B1A]/60 dark:text-[#EAE7E1]/60">
                  EDUCATION
                </span>
                <h4 className="font-serif font-bold text-[#1C1B1A] dark:text-[#EAE7E1] text-base">
                  B.Tech in Computer Science & Engineering
                </h4>
                <p className="text-xs text-[#1C1B1A]/70 dark:text-[#EAE7E1]/70 font-sans">
                  JNTUH Affiliated College • 2023–2027 (8.7 CGPA)
                </p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
