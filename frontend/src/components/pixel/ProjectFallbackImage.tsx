import React from 'react';
import { Cpu, Code2, Eye, ShieldCheck, Globe, Database, Terminal, Sparkles } from 'lucide-react';

interface ProjectFallbackImageProps {
  imageUrl?: string | null;
  title: string;
  category?: string;
  className?: string;
}

// Simple hash function for seed generation
function stringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export const ProjectFallbackImage: React.FC<ProjectFallbackImageProps> = ({
  imageUrl,
  title,
  category = 'Project',
  className = '',
}) => {
  // If actual custom image exists in CMS, use it!
  if (imageUrl && imageUrl.trim() !== '') {
    return (
      <div className={`relative overflow-hidden bg-[#FAF7F2] border-b-2 border-[#CBD5E1] ${className}`}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    );
  }

  // Otherwise, compute a unique, project-specific seed from title & category
  const seed = stringHash(`${title}_${category}`);
  
  // Pastel Scrapbook Palette options
  const colorPalettes = [
    { bg: '#E0F2FE', headerBg: '#BAE6FD', text: '#0369A1', border: '#7DD3FC', tagBg: '#F0F9FF', icon: <Cpu className="w-8 h-8 text-[#0284C7]" /> },
    { bg: '#FCE7F3', headerBg: '#FBCFE8', text: '#BE185D', border: '#F472B6', tagBg: '#FFF1F2', icon: <Eye className="w-8 h-8 text-[#E11D48]" /> },
    { bg: '#F3E8FF', headerBg: '#E9D5FF', text: '#7E22CE', border: '#C084FC', tagBg: '#FAF5FF', icon: <Sparkles className="w-8 h-8 text-[#9333EA]" /> },
    { bg: '#DCFCE7', headerBg: '#BBF7D0', text: '#15803D', border: '#86EFAC', tagBg: '#F0FDF4', icon: <Globe className="w-8 h-8 text-[#16A34A]" /> },
    { bg: '#FFEDD5', headerBg: '#FED7AA', text: '#C2410C', border: '#FDBA74', tagBg: '#FFF7ED', icon: <ShieldCheck className="w-8 h-8 text-[#EA580C]" /> },
    { bg: '#FEF3C7', headerBg: '#FDE68A', text: '#B45309', border: '#FCD34D', tagBg: '#FFFBEB', icon: <Database className="w-8 h-8 text-[#D97706]" /> },
  ];

  const palette = colorPalettes[seed % colorPalettes.length];

  return (
    <div className={`relative overflow-hidden border-b-2 border-[#CBD5E1] flex flex-col justify-between p-4 shadow-inner ${className}`} style={{ backgroundColor: palette.bg }}>
      
      {/* Top Window Strip */}
      <div className="flex items-center justify-between pb-2 border-b border-white/60">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
          <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
          <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
        </div>
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#64748B]">
          {category}
        </span>
      </div>

      {/* Main Center Graphic */}
      <div className="flex flex-col items-center justify-center my-3 text-center space-y-2">
        <div className="p-3 bg-white/90 rounded-2xl shadow-sticker border border-white">
          {palette.icon}
        </div>
        <h4 className="font-serif font-bold text-sm text-[#1E293B] line-clamp-1 max-w-[200px]">
          {title}
        </h4>
        <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-white/80 text-[#64748B] border border-white/80">
          CASE STUDY #{seed % 99 + 1}
        </span>
      </div>

      {/* Bottom Scrapbook Strip */}
      <div className="pt-2 border-t border-white/60 flex items-center justify-between font-hand text-xs font-bold text-[#64748B]">
        <span>✦ AI / ML Project</span>
        <span>Aiswarya's Work</span>
      </div>

    </div>
  );
};
