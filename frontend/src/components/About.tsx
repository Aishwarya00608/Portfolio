import React from 'react';
import { motion } from 'framer-motion';
import { Profile, PortfolioStats } from '../types';
import { FolderGit2, Award, Briefcase, Sparkles, Code2, GraduationCap } from 'lucide-react';

interface AboutProps {
  profile: Profile | null;
  stats: PortfolioStats | null;
}

export const About: React.FC<AboutProps> = ({ profile, stats }) => {
  const bio =
    profile?.longBio ||
    'I am a dedicated 4th-year Computer Science Engineering student specializing in intelligent systems, machine learning pipelines, and modern web application development. My analytical mindset drives me to build computer vision fatigue monitors, role-based enterprise portals, and AI climate risk prediction systems. I thrive at the intersection of data-driven insights and elegant full-stack solutions.';

  const statItems = [
    { label: 'SELECTED PROJECTS', value: stats ? stats.projects : 3, icon: <FolderGit2 className="w-4 h-4 text-[#0284C7]" /> },
    { label: 'CERTIFICATIONS', value: stats ? stats.certifications : 11, icon: <Award className="w-4 h-4 text-[#EC4899]" /> },
    { label: 'INTERNSHIPS', value: stats ? stats.internships : 2, icon: <Briefcase className="w-4 h-4 text-[#9333EA]" /> },
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
        
        {/* About Pastel Browser Window */}
        <div className="bg-[#FAF7F2] border-2 border-[#CBD5E1] rounded-3xl p-6 sm:p-10 shadow-window relative overflow-hidden">
          
          {/* Browser Top Strip */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E2E8F0] font-mono text-xs text-[#64748B]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="bg-[#DCFCE7] border border-[#86EFAC] text-[#15803D] px-3 py-0.5 rounded-full font-bold text-[10px] ml-2">
                about_me.exe
              </span>
            </div>
            <div className="font-mono text-xs font-bold text-[#1E293B]">
              01 / HI, I'M AISWARYA
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-8">
            
            {/* Left Column: Scrapbook Title & Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="bg-[#FCE7F3] border-2 border-[#F472B6] rounded-2xl p-6 shadow-sticker relative">
                <span className="absolute -top-3 right-4 bg-[#FEF08A] border border-[#EAB308] text-[#854D0E] font-hand font-bold text-xs px-2.5 py-0.5 rounded-full rotate-3">
                  ✦ B.Tech CSE 2026
                </span>
                
                <h2 className="font-serif italic text-3xl sm:text-4xl text-[#BE185D] leading-tight">
                  Hi, I'm Aiswarya.
                </h2>
                <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#1E293B] uppercase leading-snug pt-1">
                  COMPUTER SCIENCE STUDENT BUILDING WITH AI.
                </h3>
                <p className="font-mono text-xs text-[#64748B] pt-2 uppercase tracking-widest">
                  BRIDGING DATA SCIENCE WITH SCALABLE SOFTWARE SYSTEMS.
                </p>
              </div>

              {/* Decorative Sticker Card */}
              <div className="bg-[#FFFBEB] border-2 border-[#FCD34D] rounded-2xl p-5 shadow-sticker space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#B45309]">
                  <GraduationCap className="w-4 h-4 text-[#D97706]" />
                  <span>ACADEMIC BACKGROUND</span>
                </div>
                <p className="text-xs font-sans text-[#451A03] leading-relaxed">
                  B.Tech Computer Science Engineering • Specialization in Data Science, Machine Learning, Computer Vision, and Full-Stack Application Development.
                </p>
              </div>
            </motion.div>

            {/* Right Column: Bio & Specialization Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="bg-white border-2 border-[#CBD5E1] rounded-2xl p-6 shadow-window space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#64748B]">
                    BIOGRAPHY & PERSPECTIVE
                  </span>
                  <span className="font-hand font-bold text-sm text-[#EC4899]">
                    ✦ Personal Note
                  </span>
                </div>
                <p className="text-sm font-sans text-[#334155] leading-relaxed">
                  {bio}
                </p>
              </div>

              {/* Focus Domains */}
              <div className="bg-[#E0F2FE] border-2 border-[#7DD3FC] rounded-2xl p-6 shadow-sticker space-y-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#0369A1] block">
                  CORE SPECIALIZATIONS & INTERESTS
                </span>
                <div className="flex flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <span
                      key={area}
                      className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white text-[#0284C7] border border-[#BAE6FD] shadow-sm"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {statItems.map((item) => (
                  <div
                    key={item.label}
                    className="bg-white border-2 border-[#CBD5E1] rounded-2xl p-4 flex items-center justify-between shadow-sticker hover:border-[#1E293B] transition-all"
                  >
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#64748B] block">
                        {item.label}
                      </span>
                      <span className="font-serif text-2xl font-bold text-[#1E293B]">
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
