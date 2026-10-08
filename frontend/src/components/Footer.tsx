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
    <footer className="py-8 bg-[#FAF7F2] border-t-2 border-[#CBD5E1] font-mono text-xs text-[#64748B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-serif italic font-bold text-sm text-[#1E293B]">
            Aiswarya's Digital Workspace ✦ AI / ML / Computer Science
          </p>
          <p className="text-[10px] text-[#64748B] mt-1 uppercase tracking-widest">
            aishwaryabulusu2006@gmail.com • VOL. 2026 DIGITAL SCRAPBOOK
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
                className="p-2.5 bg-white border border-[#CBD5E1] rounded-full text-[#64748B] hover:text-[#1E293B] hover:border-[#1E293B] shadow-sticker transition-all"
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
                className="p-2.5 bg-white border border-[#CBD5E1] rounded-full text-[#64748B] hover:text-[#1E293B] hover:border-[#1E293B] shadow-sticker transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/aishwarya-bulusu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white border border-[#CBD5E1] rounded-full text-[#64748B] hover:text-[#1E293B] hover:border-[#1E293B] shadow-sticker transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:aishwaryabulusu2006@gmail.com"
                className="p-2.5 bg-white border border-[#CBD5E1] rounded-full text-[#64748B] hover:text-[#1E293B] hover:border-[#1E293B] shadow-sticker transition-all"
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
