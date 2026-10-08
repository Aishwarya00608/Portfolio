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
    <section id="hero" className="relative pt-24 pb-16 border-b border-[#1C1B1A]/20 overflow-hidden bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Magazine Cover Issue Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1C1B1A]/20 font-mono text-[11px] uppercase tracking-widest text-[#1C1B1A]/70">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#A63A24]">VOL. 2026</span>
            <span>•</span>
            <span>ISSUE N° 04</span>
          </div>
          <div className="font-serif italic text-[#1C1B1A]">Computer Science & Artificial Intelligence Journal</div>
          <div>HYDERABAD, INDIA</div>
        </div>

        {/* Oversized Magazine Heading */}
        <div className="py-8 text-center lg:text-left border-b border-[#1C1B1A]/20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl sm:text-7xl lg:text-9xl font-normal leading-[0.88] text-[#1C1B1A] tracking-tight uppercase"
          >
            PORTFOLIO
          </motion.h1>
        </div>

        {/* Magazine Cover Spread Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-10">
          
          {/* Left Column: Magazine Framed Photograph & Metadata */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="editorial-card p-3 bg-white shadow-editorial">
              {/* Photo Container */}
              <div className="aspect-[4/5] overflow-hidden bg-[#F4F0E8] relative border border-[#1C1B1A]/10">
                <img
                  src={
                    profile?.profileImage ||
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
                  }
                  alt={name}
                  className="w-full h-full object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
                />

                {/* Decorative Photo Tag */}
                <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-sm border border-[#1C1B1A]/30 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-[#1C1B1A]">
                  ✦ COVER FEATURE
                </div>
              </div>

              {/* Photo Caption */}
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#1C1B1A]/70 pt-2 border-t border-[#1C1B1A]/15">
                <span>FIG 1.1 — BULUSU V. AISWARYA</span>
                <span className="font-bold text-[#A63A24]">B.TECH CSE & AI</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Name, Statement, Introduction & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7 space-y-6 flex flex-col justify-between h-full"
          >
            <div className="space-y-5">
              
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A63A24]">
                  ENGINEER • RESEARCHER • DEVELOPER
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1B1A] leading-tight">
                  {name}
                </h2>
              </div>

              {/* Headline */}
              <p className="font-display italic text-2xl sm:text-3xl text-[#1C1B1A]/90 leading-snug">
                "{headline}"
              </p>

              {/* Bio */}
              <p className="text-base text-[#1C1B1A]/80 leading-relaxed font-sans max-w-2xl">
                {bio}
              </p>

              {/* Focus Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['AI / ML', 'Computer Vision', 'Data Science', 'Full Stack', 'Cyber Security'].map((tag) => (
                  <span key={tag} className="editorial-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Resume Download & Socials CTA */}
            <div className="pt-6 border-t border-[#1C1B1A]/20 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={getResumeDownloadUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-primary text-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD RESUME (PDF)</span>
                </a>

                <a href="#projects" className="btn-editorial-secondary text-xs">
                  <span>EXPLORE WORK</span>
                  <ArrowDownRight className="w-4 h-4" />
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-2 font-mono text-xs">
                <span className="text-[#1C1B1A]/60 uppercase tracking-widest text-[10px]">
                  CONNECT:
                </span>
                <div className="flex items-center gap-2">
                  {socialLinks.length > 0 ? (
                    socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-[#1C1B1A]/30 hover:border-[#1C1B1A] bg-white text-[#1C1B1A] hover:bg-[#FAF8F5] transition-colors"
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
                        className="p-2 border border-[#1C1B1A]/30 hover:border-[#1C1B1A] bg-white text-[#1C1B1A] hover:bg-[#FAF8F5] transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href="https://linkedin.com/in/aishwarya-bulusu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-[#1C1B1A]/30 hover:border-[#1C1B1A] bg-white text-[#1C1B1A] hover:bg-[#FAF8F5] transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href="mailto:aishwaryabulusu2006@gmail.com"
                        className="p-2 border border-[#1C1B1A]/30 hover:border-[#1C1B1A] bg-white text-[#1C1B1A] hover:bg-[#FAF8F5] transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
