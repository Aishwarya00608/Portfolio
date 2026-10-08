import React, { useState } from 'react';
import { PixelHeart, PixelTrophy, PixelStar } from './pixel/PixelDecorations';
import { playSelectSound, isSoundEnabled, toggleSound } from '../utils/sound';
import { PortfolioStats, Profile } from '../types';

interface GameHUDProps {
  stats: PortfolioStats | null;
  profile: Profile | null;
  onOpenStartScreen?: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({ stats, profile, onOpenStartScreen }) => {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) {
      playSelectSound();
    }
  };

  const navItems = [
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CERTS', href: '#certifications' },
    { label: 'HACKATHONS', href: '#hackathons' },
    { label: 'ACHIEVEMENTS', href: '#achievements' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    playSelectSound();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0817]/95 backdrop-blur-md border-b-4 border-[#2A2650] shadow-[0_4px_0_#000]">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between font-pixel text-xs">
        {/* Left: Player Info & XP */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSelectSound();
              if (onOpenStartScreen) onOpenStartScreen();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FF2E93] text-white border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#E0257F] transition-all"
            title="Return to Start Screen"
          >
            <span>🎮</span>
            <span className="hidden sm:inline">START</span>
          </button>

          <div className="hidden lg:flex items-center gap-2 bg-[#121026] px-3 py-1 border-2 border-black">
            <span className="text-[#8B8BAE]">PLAYER:</span>
            <span className="text-white line-clamp-1 max-w-[120px]">
              {profile?.fullName ? profile.fullName.split(' ')[0].toUpperCase() : 'AISWARYA'}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#121026] px-3 py-1 border-2 border-black">
            <span className="text-[#FF2E93]">XP:</span>
            <span className="text-[#00FF66]">2026</span>
          </div>

          {/* Hearts Display */}
          <div className="hidden md:flex items-center gap-1 ml-1">
            <PixelHeart size={16} />
            <PixelHeart size={16} />
            <PixelHeart size={16} />
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-4 text-[10px]">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-[#E0E7FF] hover:text-[#00FF66] transition-colors py-1 px-1"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Dynamic HUD Counts, Sound Toggle & Admin Link */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Collectible Stats Badge */}
          <div className="hidden sm:flex items-center gap-2 bg-[#1E1A3C] px-2.5 py-1 border-2 border-black text-[10px]">
            <span className="text-[#FFD700] flex items-center gap-1">
              <PixelTrophy size={12} /> {stats?.certifications ?? 0}
            </span>
            <span className="text-[#00F0FF] flex items-center gap-1">
              <PixelStar size={12} /> {stats?.projects ?? 0}
            </span>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={handleSoundToggle}
            className="p-1.5 bg-[#1E1A3C] text-[#FFD700] border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#2A2650] text-[10px]"
            title="Toggle Sound"
          >
            {soundOn ? '🔊 ON' : '🔇 OFF'}
          </button>

          {/* Admin Login Button */}
          <a
            href="/admin/login"
            onClick={() => playSelectSound()}
            className="hidden sm:inline-block px-2.5 py-1 bg-[#1E1A3C] text-[#8B8BAE] hover:text-[#00FF66] border-2 border-black shadow-[2px_2px_0px_#000] text-[10px]"
          >
            ⚙ ADMIN
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              playSelectSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="xl:hidden px-2.5 py-1 bg-[#1E1A3C] text-[#00FF66] border-2 border-black shadow-[2px_2px_0px_#000]"
          >
            {mobileMenuOpen ? '✕' : '☰ MENU'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#121026] border-t-4 border-black p-4 font-pixel text-xs space-y-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="w-full text-left px-3 py-2 bg-[#1E1A3C] text-[#E0E7FF] hover:bg-[#FF2E93] hover:text-white border-2 border-black shadow-[2px_2px_0px_#000]"
              >
                ▶ {item.label}
              </button>
            ))}
          </div>
          <div className="pt-2 flex items-center justify-between border-t border-[#2A2650] text-[10px]">
            <a
              href="/admin/login"
              className="text-[#00FF66] hover:underline"
            >
              [ ⚙ ADMIN LOGIN ]
            </a>
            <span className="text-[#8B8BAE]">AISWARYA 2026</span>
          </div>
        </div>
      )}
    </header>
  );
};
