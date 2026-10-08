import React from 'react';

export const PixelHeart: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={`image-rendering-pixelated ${className}`} fill="none">
    <path d="M3 3h4v2H3zM9 3h4v2H9zM2 5h6v2H2zM8 5h6v2H8zM2 7h12v2H2zM3 9h10v2H3zM5 11h6v2H5zM7 13h2v2H7z" fill="#FF2E93" />
    <path d="M4 4h2v1H4zM10 4h2v1H10z" fill="#FF85A1" />
  </svg>
);

export const PixelCoin: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={`image-rendering-pixelated ${className}`} fill="none">
    <path d="M5 2h6v2H5zM3 4h10v2H3zM2 6h12v4H2zM3 10h10v2H3zM5 12h6v2H5z" fill="#FFD700" />
    <path d="M6 5h4v6H6z" fill="#FFF2A3" />
    <rect x="7" y="6" width="2" height="4" fill="#D97706" />
  </svg>
);

export const PixelKey: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={`image-rendering-pixelated ${className}`} fill="none">
    <path d="M2 2h6v6H2z" fill="#FFD700" />
    <rect x="4" y="4" width="2" height="2" fill="#0A0817" />
    <path d="M7 6h7v2H7z" fill="#FFD700" />
    <path d="M11 8h2v3h-2zM13 8h2v2h-2z" fill="#D97706" />
  </svg>
);

export const PixelGem: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={`image-rendering-pixelated ${className}`} fill="none">
    <path d="M4 3h8v2H4zM2 5h12v3H2zM4 8h8v2H4zM6 10h4v2H6zM7 12h2v2H7z" fill="#00F0FF" />
    <path d="M5 4h3v3H5z" fill="#E0F2FE" />
  </svg>
);

export const PixelTrophy: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={`image-rendering-pixelated ${className}`} fill="none">
    <path d="M3 2h10v6H3z" fill="#FFD700" />
    <path d="M1 3h2v3H1zM13 3h2v3h-2z" fill="#FFD700" />
    <path d="M5 8h6v2H5zM6 10h4v2H6zM4 12h8v2H4z" fill="#D97706" />
    <path d="M5 3h3v4H5z" fill="#FFF2A3" />
  </svg>
);

export const PixelStar: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={`image-rendering-pixelated ${className}`} fill="none">
    <path d="M7 1h2v3H7zM5 4h6v2H5zM1 6h14v2H1zM3 8h10v2H3zM4 10h8v2H4zM3 12h4v3H3zM9 12h4v3H9z" fill="#FFD700" />
    <path d="M7 3h2v3H7z" fill="#FFF2A3" />
  </svg>
);

export const PixelCloud: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size / 2} viewBox="0 0 32 16" className={`image-rendering-pixelated ${className}`} fill="none">
    <path d="M8 4h16v2H8zM4 6h24v2H4zM2 8h28v6H2zM6 14h20v2H6z" fill="#2A2650" opacity="0.6" />
    <path d="M8 3h16v2H8zM4 5h24v2H4zM2 7h28v5H2z" fill="#4C4680" />
    <path d="M9 4h12v1H9zM5 6h20v1H5z" fill="#6B64A6" />
  </svg>
);

export const PixelShield: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={`image-rendering-pixelated ${className}`} fill="none">
    <path d="M2 2h12v6H2zM3 8h10v4H3zM5 12h6v2H5zM7 14h2v1H7z" fill="#3B82F6" />
    <path d="M7 3h2v10H7zM3 7h10v2H3z" fill="#60A5FA" />
    <rect x="7" y="7" width="2" height="2" fill="#FFD700" />
  </svg>
);

export const PixelPotion: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={`image-rendering-pixelated ${className}`} fill="none">
    <rect x="6" y="2" width="4" height="2" fill="#78350F" />
    <rect x="7" y="4" width="2" height="2" fill="#E2E8F0" />
    <path d="M4 6h8v7H4z" fill="#00FF66" />
    <path d="M5 13h6v1H5z" fill="#009933" />
    <rect x="6" y="8" width="2" height="2" fill="#DCFCE7" />
  </svg>
);

export const PixelSword: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={`image-rendering-pixelated ${className}`} fill="none">
    <path d="M12 2h2v2h-2zM10 4h2v2h-2zM8 6h2v2H8zM6 8h2v2H6z" fill="#E2E8F0" />
    <path d="M13 3h1v1h-1zM11 5h1v1h-1zM9 7h1v1h-1z" fill="#FFFFFF" />
    <path d="M4 10h4v2H4zM6 8h2v4H6z" fill="#FF2E93" />
    <path d="M2 12h3v3H2z" fill="#78350F" />
  </svg>
);

