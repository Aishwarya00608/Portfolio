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
    { label: 'SELECTED PROJECTS', value: stats ? stats.projects : 3, icon: <FolderGit2 className="w-4 h-4 text-white" /> },
    { label: 'CERTIFICATIONS', value: stats ? stats.certifications : 11, icon: <Award className="w-4 h-4 text-white" /> },
    { label: 'INTERNSHIPS', value: stats ? stats.internships : 2, icon: <Briefcase className="w-4 h-4 text-white" /> },
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
    <section id="about" className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Editorial Panel */}
        <div className="black-panel">
          
          {/* Section Marker */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#262626] font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
            <span className="text-white font-bold">01 /</span>
            <span>WHO I AM</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-8">
            
            {/* Left: Large Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-4"
            >
              <h2 className="font-serif italic text-3xl sm:text-5xl text-[#A0A0A0] leading-tight">
                Computer Science
              </h2>
              <h3 className="font-sans font-extrabold text-3xl sm:text-4xl text-white uppercase leading-snug">
                STUDENT BUILDING WITH AI.
              </h3>
              <p className="text-xs font-mono text-[#A0A0A0] uppercase tracking-widest pt-2">
                BRIDGING DATA SCIENCE WITH SCALABLE SOFTWARE SYSTEMS.
              </p>
            </motion.div>

            {/* Right: Bio & Focus Domains */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="black-card space-y-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#A0A0A0] block">
                  BIOGRAPHY & BACKGROUND
                </span>
                <p className="text-sm font-sans text-[#D5D5D5] leading-relaxed">
                  {bio}
                </p>
              </div>

              {/* Focus Domains */}
              <div className="black-card space-y-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#A0A0A0] block">
                  CORE SPECIALIZATIONS
                </span>
                <div className="flex flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <span key={area} className="black-tag">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats & Academic Index */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {statItems.map((item) => (
                  <div key={item.label} className="black-card p-4 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#A0A0A0] block">
                        {item.label}
                      </span>
                      <span className="font-serif text-2xl font-bold text-white">
                        {item.value}
                      </span>
                    </div>
                    {item.icon}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
