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
      case 'email':
      case 'mail':
        return <Mail className="w-4 h-4" />;
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
    <section className="relative pt-28 pb-20 border-b border-[#1C1B1A]/15 dark:border-[#EAE7E1]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Magazine Issue & Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20 font-mono text-xs uppercase tracking-widest text-[#1C1B1A]/70 dark:text-[#EAE7E1]/70">
          <div>EDITION 2026 • ISSUE N° 04</div>
          <div>COMPUTER SCIENCE & ARTIFICIAL INTELLIGENCE</div>
          <div>HYDERABAD, INDIA</div>
        </div>

        {/* Oversized Portfolio Heading */}
        <div className="py-8 text-center lg:text-left border-b border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-6xl sm:text-8xl lg:text-[10rem] font-normal leading-[0.88] text-[#1C1B1A] dark:text-[#EAE7E1] tracking-tight uppercase"
          >
            PORTFOLIO
          </motion.h1>
        </div>

        {/* Editorial Asymmetric Grid: Profile Image + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-12">
          
          {/* Left / Major Visual Element: Large Editorial Profile Picture Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative border border-[#1C1B1A] dark:border-[#EAE7E1] p-3 bg-white dark:bg-[#1C1B1A] shadow-editorial dark:shadow-editorial-dark">
              <div className="aspect-[4/5] overflow-hidden bg-[#E8E4DC] dark:bg-[#262422] relative">
                <img
                  src={
                    profile?.profileImage ||
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
                  }
                  alt={name}
                  className="w-full h-full object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Caption Overlay */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#1C1B1A]/70 dark:text-[#EAE7E1]/70 pt-2 border-t border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20">
                <span>FIG 1.1 — BULUSU V. AISWARYA</span>
                <span>B.TECH CSE</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Name, Tagline, Introduction & Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7 space-y-8 flex flex-col justify-between h-full"
          >
            <div className="space-y-6">
              {/* Prominent Name */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#1C1B1A]/60 dark:text-[#EAE7E1]/60">
                  DEVELOPER & RESEARCHER
                </span>
                <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1C1B1A] dark:text-[#EAE7E1] leading-tight">
                  {name}
                </h2>
              </div>

              {/* Short Tagline */}
              <p className="font-display italic text-2xl sm:text-3xl text-[#1C1B1A]/90 dark:text-[#EAE7E1]/90 leading-snug">
                "{headline}"
              </p>

              {/* Short Introduction */}
              <p className="text-base text-[#1C1B1A]/75 dark:text-[#EAE7E1]/75 leading-relaxed font-sans max-w-2xl">
                {bio}
              </p>
            </div>

            {/* Social Links & Download Resume CTA */}
            <div className="pt-8 border-t border-[#1C1B1A]/20 dark:border-[#EAE7E1]/20 space-y-6">
              
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={getResumeDownloadUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-primary"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </a>

                <a href="#projects" className="btn-editorial-secondary">
                  <span>Explore Work</span>
                  <ArrowDownRight className="w-4 h-4" />
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-6 pt-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#1C1B1A]/60 dark:text-[#EAE7E1]/60">
                  Connect:
                </span>
                <div className="flex items-center gap-3">
                  {socialLinks.length > 0 ? (
                    socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-[#1C1B1A]/30 dark:border-[#EAE7E1]/30 hover:border-[#1C1B1A] dark:hover:border-[#EAE7E1] text-[#1C1B1A] dark:text-[#EAE7E1] transition-colors"
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
                        className="p-2 border border-[#1C1B1A]/30 dark:border-[#EAE7E1]/30 hover:border-[#1C1B1A] dark:hover:border-[#EAE7E1] text-[#1C1B1A] dark:text-[#EAE7E1] transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href="https://linkedin.com/in/aishwarya-bulusu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-[#1C1B1A]/30 dark:border-[#EAE7E1]/30 hover:border-[#1C1B1A] dark:hover:border-[#EAE7E1] text-[#1C1B1A] dark:text-[#EAE7E1] transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href="mailto:aishwaryabulusu2006@gmail.com"
                        className="p-2 border border-[#1C1B1A]/30 dark:border-[#EAE7E1]/30 hover:border-[#1C1B1A] dark:hover:border-[#EAE7E1] text-[#1C1B1A] dark:text-[#EAE7E1] transition-colors"
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
