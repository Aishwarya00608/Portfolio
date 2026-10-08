import React from 'react';

interface PixelAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export const PixelAvatar: React.FC<PixelAvatarProps> = ({
  size = 'md',
  animated = true,
  className = '',
}) => {
  const dimensions = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  }[size];

  return (
    <div className={`relative inline-block ${dimensions} ${animated ? 'animate-pixel-bounce' : ''} ${className}`}>
      {/* 8-Bit Pixel Character Avatar (SVG Scalable) */}
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full drop-shadow-[2px_4px_0px_rgba(0,0,0,0.8)] image-rendering-pixelated"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background aura / glow */}
        <rect x="6" y="6" width="20" height="20" fill="#2A2650" opacity="0.4" />

        {/* Hair Back */}
        <path d="M9 5h14v10H9z" fill="#2E1065" />
        <path d="M8 7h16v6H8z" fill="#3B0764" />

        {/* Head / Skin Tone */}
        <path d="M11 9h10v10H11z" fill="#FFD1B3" />
        <path d="M12 10h8v8h-8z" fill="#FFE5D4" />

        {/* Cheeks / Blush */}
        <rect x="12" y="15" width="2" height="1" fill="#FF85A1" />
        <rect x="18" y="15" width="2" height="1" fill="#FF85A1" />

        {/* Eyes (Pixel glasses / stylish eyes) */}
        <rect x="12" y="12" width="3" height="2" fill="#0F172A" />
        <rect x="17" y="12" width="3" height="2" fill="#0F172A" />
        <rect x="13" y="12" width="1" height="1" fill="#00FF66" />
        <rect x="18" y="12" width="1" height="1" fill="#00FF66" />
        {/* Glasses bridge */}
        <rect x="15" y="12" width="2" height="1" fill="#FF2E93" />

        {/* Smile */}
        <path d="M14 17h4v1h-4z" fill="#D97706" />

        {/* Hair Front / Bangs (Distinctive Magenta Highlighted Bangs) */}
        <path d="M9 5h14v4H9z" fill="#4C1D95" />
        <path d="M10 4h7v3h-7z" fill="#7E22CE" />
        <rect x="9" y="8" width="3" height="5" fill="#FF2E93" />
        <rect x="20" y="8" width="3" height="5" fill="#7E22CE" />

        {/* Outfit - Cyber Hoodie */}
        <path d="M8 19h16v10H8z" fill="#0F172A" />
        <path d="M10 19h12v10H10z" fill="#1E1B4B" />

        {/* Neon Accents on Hoodie */}
        <rect x="11" y="21" width="10" height="2" fill="#FF2E93" />
        <rect x="15" y="20" width="2" height="8" fill="#00FF66" />
        <rect x="12" y="24" width="3" height="1" fill="#00F0FF" />
        <rect x="17" y="24" width="3" height="1" fill="#00F0FF" />

        {/* Developer Badge / Headphones */}
        <rect x="7" y="11" width="2" height="5" fill="#FF2E93" />
        <rect x="23" y="11" width="2" height="5" fill="#FF2E93" />
        <rect x="8" y="7" width="16" height="2" fill="#FF2E93" />

        {/* Hands / Pixel Controller Touch */}
        <rect x="8" y="26" width="3" height="3" fill="#FFE5D4" />
        <rect x="21" y="26" width="3" height="3" fill="#FFE5D4" />

        {/* Ground shadow */}
        <ellipse cx="16" cy="30" rx="10" ry="2" fill="#000000" opacity="0.6" />
      </svg>
    </div>
  );
};
