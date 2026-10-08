import React from 'react';

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
      <div className={`relative overflow-hidden bg-[#0A0817] border-b-4 border-black ${className}`}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0817] via-transparent to-transparent opacity-60" />
      </div>
    );
  }

  // Otherwise, compute a unique, project-specific seed from title & category
  const seed = stringHash(`${title}_${category}`);
  
  // Palette options for pixel fallback art
  const colorPalettes = [
    { bg: '#0F172A', accent: '#00FF66', secondary: '#00F0FF', grid: '#1E293B', icon: 'AI_BRAIN' },
    { bg: '#1E1B4B', accent: '#FF2E93', secondary: '#FFD700', grid: '#312E81', icon: 'VISION_EYE' },
    { bg: '#172554', accent: '#38BDF8', secondary: '#00FF66', grid: '#1E3A8A', icon: 'CYBER_CITY' },
    { bg: '#31124B', accent: '#A855F7', secondary: '#FF2E93', grid: '#4C1D95', icon: 'DATA_MATRIX' },
    { bg: '#064E3B', accent: '#34D399', secondary: '#FACC15', grid: '#065F46', icon: 'CLIMATE_GLOBE' },
    { bg: '#451A03', accent: '#F59E0B', secondary: '#00F0FF', grid: '#78350F', icon: 'SHIELD_SECURITY' },
  ];

  const palette = colorPalettes[seed % colorPalettes.length];
  const patternId = `grid_${seed}`;

  return (
    <div className={`relative overflow-hidden border-b-4 border-black flex flex-col items-center justify-center ${className}`} style={{ backgroundColor: palette.bg }}>
      {/* Background SVG Grid & Pixel Artifacts */}
      <svg className="absolute inset-0 w-full h-full opacity-30 image-rendering-pixelated" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={patternId} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke={palette.grid} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* Floating pixel particles unique to seed */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => {
          const top = ((seed * (i + 1) * 17) % 80) + 10;
          const left = ((seed * (i + 1) * 23) % 80) + 10;
          return (
            <div
              key={i}
              className="absolute w-2 h-2 border border-black shadow-[2px_2px_0px_#000]"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                backgroundColor: i % 2 === 0 ? palette.accent : palette.secondary,
              }}
            />
          );
        })}
      </div>

      {/* Main Project Centerpiece Pixel Art */}
      <div className="relative z-10 flex flex-col items-center p-4 text-center">
        {/* Dynamic Seeded SVG Illustration */}
        <div className="w-16 h-16 mb-2 flex items-center justify-center p-2 bg-[#0A0817] border-4 border-black shadow-[4px_4px_0px_0px_#000]">
          <svg viewBox="0 0 32 32" className="w-full h-full image-rendering-pixelated" fill="none">
            {/* Outline box */}
            <rect x="2" y="2" width="28" height="28" stroke={palette.accent} strokeWidth="2" fill="#0A0817" />
            
            {/* Center icon based on seed */}
            {palette.icon === 'AI_BRAIN' && (
              <>
                <path d="M10 8h12v4H10zM8 12h16v8H8zM12 20h8v4h-8z" fill={palette.accent} />
                <rect x="12" y="14" width="3" height="3" fill="#0A0817" />
                <rect x="17" y="14" width="3" height="3" fill="#0A0817" />
              </>
            )}

            {palette.icon === 'VISION_EYE' && (
              <>
                <path d="M6 14h20v4H6zM10 10h12v4H10zM10 18h12v4H10z" fill={palette.accent} />
                <rect x="14" y="14" width="4" height="4" fill={palette.secondary} />
                <rect x="15" y="15" width="2" height="2" fill="#0A0817" />
              </>
            )}

            {palette.icon === 'CYBER_CITY' && (
              <>
                <rect x="6" y="14" width="6" height="12" fill={palette.accent} />
                <rect x="14" y="8" width="6" height="18" fill={palette.secondary} />
                <rect x="22" y="18" width="4" height="8" fill={palette.accent} />
              </>
            )}

            {palette.icon === 'DATA_MATRIX' && (
              <>
                <rect x="6" y="6" width="6" height="6" fill={palette.accent} />
                <rect x="14" y="6" width="6" height="6" fill={palette.secondary} />
                <rect x="22" y="6" width="4" height="6" fill={palette.accent} />
                <rect x="6" y="14" width="20" height="10" fill={palette.accent} />
              </>
            )}

            {palette.icon === 'CLIMATE_GLOBE' && (
              <>
                <circle cx="16" cy="16" r="10" fill={palette.accent} />
                <path d="M10 12h12v2H10zM8 16h16v2H8zM12 20h8v2h-8z" fill={palette.secondary} />
              </>
            )}

            {palette.icon === 'SHIELD_SECURITY' && (
              <>
                <path d="M8 8h16v8H8zM10 16h12v6H10zM14 22h4v4h-4z" fill={palette.accent} />
                <rect x="14" y="12" width="4" height="6" fill={palette.secondary} />
              </>
            )}
          </svg>
        </div>

        {/* Category & Title Banner */}
        <span className="font-pixel text-[9px] uppercase px-2 py-0.5 mb-1 bg-[#0A0817] text-[#00FF66] border border-black">
          {category}
        </span>
        <h4 className="font-pixel text-xs text-white line-clamp-1 max-w-[220px] drop-shadow-[1px_1px_0px_#000]">
          {title}
        </h4>
      </div>

      {/* Decorative Bottom Bar */}
      <div className="w-full h-2 flex">
        <div className="h-full flex-1" style={{ backgroundColor: palette.accent }} />
        <div className="h-full flex-1" style={{ backgroundColor: palette.secondary }} />
        <div className="h-full flex-1" style={{ backgroundColor: palette.grid }} />
      </div>
    </div>
  );
};
