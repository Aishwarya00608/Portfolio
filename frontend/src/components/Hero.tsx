import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ArrowDownRight } from 'lucide-react';
import { Profile, SocialLink } from '../types';
import { getResumeDownloadUrl } from '../services/api';

interface HeroProps {
  profile: Profile | null;
  socialLinks: SocialLink[];
}

export const Hero: React.FC<HeroProps> = ({ profile, socialLinks }) => {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const name = profile?.fullName || 'Bulusu Vyaghri Aiswarya';
  const headline = profile?.headline || 'Computer Science Engineer | Data Science & AI/ML Enthusiast';
  const bio =
    profile?.shortBio ||
    '4th-year B.Tech Computer Science student specializing in Data Science, AI/ML, Computer Vision, Data Analytics, Full-Stack Engineering, and Cyber Security.';

  return (
    <section id="hero" className="pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Large Horizontal Hero Panel */}
        <div className="black-panel">
          
          {/* Metadata Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#262626] font-mono text-xs uppercase tracking-widest text-[#A0A0A0]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              <span className="text-white font-bold">2026 EDITION</span>
            </div>
            <div>AI / ML / COMPUTER VISION</div>
            <div>HYDERABAD, INDIA</div>
          </div>

          {/* Hero Spread Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8">
            
            {/* Left: Oversized Typography & Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="space-y-1">
                <span className="font-serif italic text-4xl sm:text-6xl text-[#A0A0A0] block">
                  Aiswarya's
                </span>
                <h1 className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-8xl text-white tracking-tighter uppercase leading-none">
                  PORTFOLIO
                </h1>
              </div>

              <div className="space-y-3 pt-2">
                <p className="font-mono text-xs text-white uppercase tracking-widest bg-[#181818] border border-[#262626] px-3 py-1.5 inline-block rounded-full">
                  B.TECH CSE • SPECIALIZATION IN AI / ML & COMPUTER VISION
                </p>

                <p className="text-sm sm:text-base text-[#D5D5D5] leading-relaxed font-sans max-w-xl">
                  {bio}
                </p>
              </div>

              {/* Direct Email Address */}
              <div className="font-mono text-xs text-[#A0A0A0] pt-2 flex items-center gap-2">
                <span>EMAIL:</span>
                <a
                  href="mailto:aishwaryabulusu2006@gmail.com"
                  className="text-white hover:underline font-bold"
                >
                  aishwaryabulusu2006@gmail.com
                </a>
              </div>

              {/* Resume & Actions */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href={getResumeDownloadUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-black-primary text-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD RESUME (PDF)</span>
                </a>

                <a href="#projects" className="btn-black-secondary text-xs">
                  <span>SELECTED WORK</span>
                  <ArrowDownRight className="w-4 h-4" />
                </a>

                {/* Minimal Icon Buttons */}
                <div className="flex items-center gap-2 ml-2">
                  {socialLinks.length > 0 ? (
                    socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[#181818] border border-[#262626] rounded-full text-[#A0A0A0] hover:text-white hover:border-white transition-all"
                        title={link.platform}
                      >
                        {getSocialIcon(link.platform)}
                      </a>
                    ))
                  ) : (
                    <>
                      <a
                        href="https://github.com/Aishwarya00608"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[#181818] border border-[#262626] rounded-full text-[#A0A0A0] hover:text-white hover:border-white transition-all"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href="https://linkedin.com/in/aishwarya-bulusu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[#181818] border border-[#262626] rounded-full text-[#A0A0A0] hover:text-white hover:border-white transition-all"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href="mailto:aishwaryabulusu2006@gmail.com"
                        className="p-3 bg-[#181818] border border-[#262626] rounded-full text-[#A0A0A0] hover:text-white hover:border-white transition-all"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right: Rounded Rectangular Editorial Profile Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="bg-[#181818] border border-[#262626] rounded-3xl p-4 shadow-card-glow">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#141414] relative border border-[#333333]">
                  <img
                    src={
                      profile?.profileImage ||
                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
                    }
                    alt={name}
                    className="w-full h-full object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-[#111111]/90 backdrop-blur-md border border-[#333333] rounded-xl px-3 py-2 flex items-center justify-between font-mono text-[10px] uppercase text-[#A0A0A0]">
                    <span>FIG 1.1 — AISWARYA BULUSU</span>
                    <span className="text-white font-bold">B.TECH CSE</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
