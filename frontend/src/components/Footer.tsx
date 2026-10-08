import React from 'react';
import { SocialLink } from '../types';
import { Github, Linkedin, Mail } from 'lucide-react';
import { playSelectSound } from '../utils/sound';

interface FooterProps {
  socialLinks: SocialLink[];
}

export const Footer: React.FC<FooterProps> = ({ socialLinks }) => {
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

  return (
    <footer className="py-8 bg-[#0A0817] border-t-4 border-[#2A2650] font-pixel text-xs text-[#8B8BAE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-[#FFD700] text-xs">
            GAME OVER • PORTFOLIO 2026 EDITION
          </p>
          <p className="text-[10px] text-[#00FF66]">
            DESIGNED & ENGINEEERED BY BULUSU VYAGHRI AISWARYA 🎮
          </p>
          <p className="text-[9px] text-[#8B8BAE]">
            aishwaryabulusu2006@gmail.com
          </p>
        </div>

        {/* Dynamic Social Links */}
        <div className="flex items-center gap-3">
          {socialLinks.length > 0 ? (
            socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.platform.toLowerCase() === 'email' && !link.url.startsWith('mailto:') ? `mailto:${link.url}` : link.url}
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
    </footer>
  );
};
