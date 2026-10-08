import React from 'react';
import { SocialLink } from '../types';
import { Github, Linkedin, Mail } from 'lucide-react';

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
    <footer className="py-8 bg-[#080808] font-mono text-xs text-[#A0A0A0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-serif italic font-bold text-sm text-white">
            Designed & Engineered by Bulusu Vyaghri Aiswarya ✦
          </p>
          <p className="text-[10px] text-[#A0A0A0] mt-1 uppercase tracking-widest">
            aishwaryabulusu2006@gmail.com • VOL. 2026 EDITION
          </p>
        </div>

        {/* Dynamic Social Links */}
        <div className="flex items-center gap-2">
          {socialLinks.length > 0 ? (
            socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.platform.toLowerCase() === 'email' && !link.url.startsWith('mailto:') ? `mailto:${link.url}` : link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#111111] border border-[#262626] rounded-full text-[#A0A0A0] hover:text-white hover:border-white transition-all"
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
                className="p-2.5 bg-[#111111] border border-[#262626] rounded-full text-[#A0A0A0] hover:text-white hover:border-white transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/aishwarya-bulusu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#111111] border border-[#262626] rounded-full text-[#A0A0A0] hover:text-white hover:border-white transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:aishwaryabulusu2006@gmail.com"
                className="p-2.5 bg-[#111111] border border-[#262626] rounded-full text-[#A0A0A0] hover:text-white hover:border-white transition-all"
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
