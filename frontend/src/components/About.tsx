import React from 'react';
import { motion } from 'framer-motion';
import { Profile, PortfolioStats } from '../types';
import { GraduationCap, Award, FolderGit2, Briefcase } from 'lucide-react';

interface AboutProps {
  profile: Profile | null;
  stats: PortfolioStats | null;
}

export const About: React.FC<AboutProps> = ({ profile, stats }) => {
  const bio =
    profile?.longBio ||
    'I am a dedicated 4th-year Computer Science Engineering student specializing in intelligent systems, machine learning pipelines, and modern web application development. My analytical mindset drives me to build computer vision fatigue monitors, role-based enterprise portals, and AI climate risk prediction systems. I thrive at the intersection of data-driven insights and elegant full-stack solutions.';

  const statItems = [
    { label: 'SELECTED PROJECTS', value: stats ? stats.projects : 3, icon: <FolderGit2 className="w-4 h-4 text-[#A63A24]" /> },
    { label: 'CERTIFICATIONS', value: stats ? stats.certifications : 11, icon: <Award className="w-4 h-4 text-[#A63A24]" /> },
    { label: 'INTERNSHIPS', value: stats ? stats.internships : 2, icon: <Briefcase className="w-4 h-4 text-[#A63A24]" /> },
  ];

  const focusAreas = [
    'Artificial Intelligence',
    'Machine Learning',
    'Computer Vision',
    'Deep Learning',
    'Generative AI & LLMs',
    'Data Science & Analytics',
    'Full-Stack Engineering',
    'Cyber Security',
  ];

  return (
    <section id="about" className="py-20 border-b border-[#1C1B1A]/20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#1C1B1A]/20 mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A63A24]">
            SECTION N° 01
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1B1A]">
            About & Perspective
          </h2>
        </div>

        {/* Asymmetric Editorial Magazine Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Huge "WHO AM I?" Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 space-y-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#1C1B1A]/60 block">
              EDITORIAL PROFILE
            </span>
            <h3 className="font-display italic text-4xl sm:text-6xl text-[#1C1B1A] leading-none">
              Who Am I?
            </h3>
            <p className="font-serif text-lg text-[#1C1B1A]/80 leading-snug pt-2">
              Bridging analytical data science with clean software architecture.
            </p>
          </motion.div>

          {/* Center: Biography & Domains */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="editorial-card p-6 bg-white space-y-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#A63A24] block">
                BIOGRAPHY & BACKGROUND
              </span>
              <p className="text-sm font-sans text-[#1C1B1A]/85 leading-relaxed">
                {bio}
              </p>
            </div>

            {/* Core Domains */}
            <div className="p-6 border border-[#1C1B1A]/20 bg-white space-y-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1C1B1A]/60 block">
                PRIMARY FOCUS & CORE DOMAINS
              </span>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <span key={area} className="editorial-tag">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Key Stats & Academic Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 space-y-4"
          >
            {/* Stats Index */}
            <div className="space-y-3">
              {statItems.map((item) => (
                <div key={item.label} className="p-4 border border-[#1C1B1A]/20 bg-white flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#1C1B1A]/60 block">
                      {item.label}
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#1C1B1A]">
                      {item.value}
                    </span>
                  </div>
                  {item.icon}
                </div>
              ))}
            </div>

            {/* Academic Highlight Box */}
            <div className="p-5 border border-[#1C1B1A]/20 bg-[#FAF8F5] flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-[#A63A24] shrink-0 mt-0.5" />
              <div className="space-y-1 font-sans">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#1C1B1A]/60 block">
                  EDUCATION
                </span>
                <h4 className="font-serif font-bold text-sm text-[#1C1B1A]">
                  B.Tech in CSE
                </h4>
                <p className="text-xs text-[#1C1B1A]/70">
                  JNTUH • 2023–2027 (8.7 CGPA)
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
