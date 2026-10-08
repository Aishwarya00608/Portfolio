import React from 'react';
import { motion } from 'framer-motion';
import { Profile, PortfolioStats } from '../types';
import { PixelStar, PixelTrophy, PixelGem, PixelCoin } from './pixel/PixelDecorations';

interface AboutProps {
  profile: Profile | null;
  stats: PortfolioStats | null;
}

export const About: React.FC<AboutProps> = ({ profile, stats }) => {
  const bio =
    profile?.longBio ||
    'I am a dedicated 4th-year Computer Science Engineering student specializing in intelligent systems, machine learning pipelines, and modern web application development. My analytical mindset drives me to build computer vision fatigue monitors, role-based enterprise portals, and AI climate risk prediction systems. I thrive at the intersection of data-driven insights and elegant full-stack solutions.';

  const statItems = [
    { label: 'COMPLETED MISSIONS', value: stats ? stats.projects : 3, icon: <PixelStar size={16} />, color: '#00FF66' },
    { label: 'TROPHIES UNLOCKED', value: stats ? stats.certifications : 11, icon: <PixelTrophy size={16} />, color: '#FFD700' },
    { label: 'QUEST LOG (INTERNS)', value: stats ? stats.internships : 2, icon: <PixelGem size={16} />, color: '#FF2E93' },
    { label: 'BATTLE ARENAS', value: stats ? stats.hackathons : 3, icon: <PixelCoin size={16} />, color: '#00F0FF' },
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
    <div className="pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Asymmetric Grid: Bio & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Biography & Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 pixel-card p-6 bg-[#121026] space-y-6"
          >
            <div className="space-y-2">
              <span className="font-pixel text-[10px] text-[#00FF66] uppercase">
                📜 CHARACTER BACKSTORY & PERSPECTIVE
              </span>
              <h3 className="font-pixel text-base text-[#FFD700] leading-snug">
                Bridging analytical data science with clean software architecture.
              </h3>
            </div>

            <p className="text-sm text-[#E0E7FF] leading-relaxed font-sans border-l-2 border-[#2A2650] pl-4">
              {bio}
            </p>

            {/* Core Domains */}
            <div className="pt-4 border-t-2 border-black space-y-3">
              <span className="block font-pixel text-[10px] text-[#8B8BAE] uppercase">
                ABILITY SPECIALIZATIONS & DOMAINS
              </span>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <span
                    key={area}
                    className="pixel-badge"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {statItems.map((item) => (
              <div
                key={item.label}
                className="pixel-card p-5 bg-[#121026] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  {item.icon}
                  <span className="font-pixel text-2xl font-bold" style={{ color: item.color }}>
                    {item.value}
                  </span>
                </div>
                <div className="font-pixel text-[9px] text-[#8B8BAE] tracking-wider leading-tight">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
};
