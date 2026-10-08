import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { Profile, SocialLink } from '../types';
import { getResumeDownloadUrl } from '../services/api';
import { PixelAvatar } from './pixel/PixelAvatar';
import { PixelHeart, PixelCoin, PixelGem } from './pixel/PixelDecorations';
import { playSelectSound } from '../utils/sound';

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
    <section id="about" className="relative pt-12 pb-16 border-b-4 border-[#2A2650]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Level Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3 bg-[#121026] border-4 border-black shadow-[4px_4px_0px_0px_#000] font-pixel text-xs">
          <div className="flex items-center gap-2 text-[#00FF66]">
            <span>LEVEL 01</span>
            <span className="text-[#8B8BAE]">•</span>
            <span className="text-[#FF2E93]">MEET THE PLAYER</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-[#FFD700]">
            <span className="flex items-center gap-1"><PixelHeart size={14} /> HP: MAX</span>
            <span className="flex items-center gap-1"><PixelCoin size={14} /> CLASS: CSE STUDENT</span>
          </div>
        </div>

        {/* Level 01 Main Player Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Character Profile & Real Photo Frame */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="pixel-card p-4 bg-[#121026] space-y-4">
              
              {/* Retro Character Status Box */}
              <div className="flex items-center justify-between p-3 bg-[#1E1A3C] border-2 border-black font-pixel text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#00FF66] border border-black inline-block animate-pulse" />
                  <span className="text-[#00FF66]">STATUS: ONLINE</span>
                </div>
                <span className="text-[#00F0FF]">PLAYER_ID: AISWARYA_01</span>
              </div>

              {/* Display both Pixel Avatar & CMS Profile Photo side by side */}
              <div className="grid grid-cols-2 gap-3 items-center p-3 bg-[#0A0817] border-2 border-black">
                {/* Pixel Avatar */}
                <div className="flex flex-col items-center justify-center p-2 bg-[#1E1A3C] border border-black">
                  <PixelAvatar size="lg" animated={true} />
                  <span className="font-pixel text-[9px] text-[#FF2E93] mt-2">8-BIT SPRITE</span>
                </div>

                {/* Real CMS Photo */}
                <div className="flex flex-col items-center justify-center p-2 bg-[#1E1A3C] border border-black overflow-hidden">
                  <div className="w-full aspect-square overflow-hidden border border-black bg-slate-900">
                    <img
                      src={
                        profile?.profileImage ||
                        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
                      }
                      alt={name}
                      className="w-full h-full object-cover filter contrast-105 hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="font-pixel text-[9px] text-[#00F0FF] mt-2">CMS PHOTO</span>
                </div>
              </div>

              {/* Player Attributes Box */}
              <div className="p-3 bg-[#1E1A3C] border-2 border-black font-pixel text-[10px] space-y-2 text-[#E0E7FF]">
                <div className="flex justify-between border-b border-[#2A2650] pb-1">
                  <span className="text-[#8B8BAE]">CLASS:</span>
                  <span className="text-[#FFD700]">CSE STUDENT & ENGINEER</span>
                </div>
                <div className="flex justify-between border-b border-[#2A2650] pb-1">
                  <span className="text-[#8B8BAE]">SPECIALIZATION:</span>
                  <span className="text-[#00FF66]">AI / ML / COMPUTER VISION</span>
                </div>
                <div className="flex justify-between border-b border-[#2A2650] pb-1">
                  <span className="text-[#8B8BAE]">LOCATION:</span>
                  <span className="text-[#00F0FF]">HYDERABAD, INDIA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8B8BAE]">AFFILIATION:</span>
                  <span className="text-[#FF2E93]">JNTUH (8.7 CGPA)</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Player Introduction, Tagline & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Title & Tagline Box */}
            <div className="pixel-card p-6 bg-[#121026] space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#1E1A3C] text-[#00FF66] border border-black font-pixel text-[10px]">
                <PixelGem size={12} /> AISWARYA BULUSU VYAGHRI
              </div>

              <h1 className="font-pixel text-2xl sm:text-3xl text-[#FFD700] leading-snug drop-shadow-[2px_2px_0px_#000]">
                {name}
              </h1>

              <p className="font-pixel text-xs text-[#00F0FF] leading-relaxed border-l-4 border-[#FF2E93] pl-3 py-1">
                "{headline}"
              </p>

              <p className="text-sm text-[#E0E7FF] leading-relaxed font-sans">
                {bio}
              </p>
            </div>

            {/* Action Buttons & Socials */}
            <div className="pixel-card p-5 bg-[#121026] space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={getResumeDownloadUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSelectSound()}
                  className="btn-pixel-primary"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD RESUME (PDF)</span>
                </a>

                <a
                  href="#projects"
                  onClick={() => playSelectSound()}
                  className="btn-pixel-secondary"
                >
                  <span>EXPLORE QUESTS</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-3 border-t-2 border-black font-pixel text-xs">
                <span className="text-[#8B8BAE] text-[10px]">CONNECT:</span>
                <div className="flex items-center gap-2">
                  {socialLinks.length > 0 ? (
                    socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playSelectSound()}
                        className="p-2 bg-[#1E1A3C] text-[#00FF66] border-2 border-black hover:bg-[#FF2E93] hover:text-white shadow-[2px_2px_0px_#000] transition-colors"
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
                        onClick={() => playSelectSound()}
                        className="p-2 bg-[#1E1A3C] text-[#00FF66] border-2 border-black hover:bg-[#FF2E93] hover:text-white shadow-[2px_2px_0px_#000] transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href="https://linkedin.com/in/aishwarya-bulusu"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playSelectSound()}
                        className="p-2 bg-[#1E1A3C] text-[#00FF66] border-2 border-black hover:bg-[#FF2E93] hover:text-white shadow-[2px_2px_0px_#000] transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href="mailto:aishwaryabulusu2006@gmail.com"
                        onClick={() => playSelectSound()}
                        className="p-2 bg-[#1E1A3C] text-[#00FF66] border-2 border-black hover:bg-[#FF2E93] hover:text-white shadow-[2px_2px_0px_#000] transition-colors"
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
