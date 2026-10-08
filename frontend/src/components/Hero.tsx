import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ArrowDownRight, Sparkles } from 'lucide-react';
import { Profile, SocialLink } from '../types';
import { getResumeDownloadUrl } from '../services/api';
import { MascotWithInteractiveCat } from './MascotWithInteractiveCat';

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

  const headline = profile?.headline || 'Computer Science Engineer | Data Science & AI/ML Enthusiast';
  const bio =
    profile?.shortBio ||
    '4th-year B.Tech Computer Science student specializing in Data Science, AI/ML, Computer Vision, Data Analytics, Full-Stack Engineering, and Cyber Security.';

  return (
    <section id="hero" className="pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Large Pastel Browser-Window Hero Panel */}
        <div className="bg-[#FAF7F2] border-2 border-[#CBD5E1] rounded-3xl p-6 sm:p-10 shadow-window relative overflow-hidden">
          
          {/* Browser Top Window Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#CBD5E1] font-mono text-xs text-[#64748B]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              </div>
              <span className="bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] px-3 py-1 rounded-full font-bold text-[11px] ml-2">
                https://aiswarya-portfolio.dev
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse inline-block" />
              <span className="text-[#1E293B] font-bold">2026 EDITION</span>
              <span>• HYDERABAD, INDIA</span>
            </div>
          </div>

          {/* Hero Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8">
            
            {/* Left: Oversized Typography & Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 bg-[#FCE7F3] border border-[#F472B6] px-3.5 py-1 rounded-full text-xs font-hand font-bold text-[#9D174D] shadow-sticker">
                  <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
                  <span>Welcome to Aiswarya's Digital Workspace</span>
                </div>
                
                <h1 className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-8xl text-[#1E293B] tracking-tighter uppercase leading-none pt-2">
                  AISWARYA'S
                  <span className="block font-serif italic text-4xl sm:text-6xl text-[#EC4899] normal-case tracking-normal">
                    Portfolio
                  </span>
                </h1>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-2">
                  <span className="font-mono text-xs font-bold text-[#0369A1] bg-[#E0F2FE] border border-[#BAE6FD] px-3 py-1 rounded-full">
                    AI / ML
                  </span>
                  <span className="font-mono text-xs font-bold text-[#9D174D] bg-[#FCE7F3] border border-[#F472B6] px-3 py-1 rounded-full">
                    COMPUTER VISION
                  </span>
                  <span className="font-mono text-xs font-bold text-[#7E22CE] bg-[#F3E8FF] border border-[#C084FC] px-3 py-1 rounded-full">
                    DATA SCIENCE
                  </span>
                  <span className="font-mono text-xs font-bold text-[#15803D] bg-[#DCFCE7] border border-[#86EFAC] px-3 py-1 rounded-full">
                    FULL STACK
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-sans max-w-xl">
                  {bio}
                </p>
              </div>

              {/* Direct Email Address */}
              <div className="font-mono text-xs text-[#64748B] pt-2 flex items-center gap-2">
                <span className="font-bold text-[#1E293B]">EMAIL DISPATCH:</span>
                <a
                  href="mailto:aishwaryabulusu2006@gmail.com"
                  className="text-[#0284C7] hover:underline font-bold bg-[#E0F2FE] px-2.5 py-0.5 rounded-md border border-[#BAE6FD]"
                >
                  aishwaryabulusu2006@gmail.com
                </a>
              </div>

              {/* Resume & Actions */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href={getResumeDownloadUrl()}
                  download="Aiswarya_Bulusu_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1E293B] text-[#FAF7F2] text-xs font-mono font-bold uppercase tracking-widest rounded-full hover:bg-[#0F172A] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4 text-[#F472B6]" />
                  <span>DOWNLOAD RESUME (PDF)</span>
                </a>

                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#1E293B] text-xs font-mono font-bold uppercase tracking-widest rounded-full border border-[#CBD5E1] hover:border-[#1E293B] hover:bg-[#F8FAFC] transition-all cursor-pointer shadow-sm"
                >
                  <span>MY WORK</span>
                  <ArrowDownRight className="w-4 h-4 text-[#0284C7]" />
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
                        className="p-3 bg-white border border-[#CBD5E1] rounded-full text-[#64748B] hover:text-[#1E293B] hover:border-[#1E293B] shadow-sticker transition-all"
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
                        className="p-3 bg-white border border-[#CBD5E1] rounded-full text-[#64748B] hover:text-[#1E293B] hover:border-[#1E293B] shadow-sticker transition-all"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href="https://linkedin.com/in/aishwarya-bulusu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white border border-[#CBD5E1] rounded-full text-[#64748B] hover:text-[#1E293B] hover:border-[#1E293B] shadow-sticker transition-all"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href="mailto:aishwaryabulusu2006@gmail.com"
                        className="p-3 bg-white border border-[#CBD5E1] rounded-full text-[#64748B] hover:text-[#1E293B] hover:border-[#1E293B] shadow-sticker transition-all"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right: Original Toy Mascot with Mouse-Interactive Cat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <MascotWithInteractiveCat />
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
