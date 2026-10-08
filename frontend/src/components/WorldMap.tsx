import React, { useState, useEffect } from 'react';
import { PixelAvatar } from './pixel/PixelAvatar';
import { playSelectSound } from '../utils/sound';

export interface LevelNode {
  id: string;
  levelNum: string;
  name: string;
  icon: string;
  color: string;
}

const LEVELS: LevelNode[] = [
  { id: 'about', levelNum: '01', name: 'ABOUT ME', icon: '🏡', color: '#00FF66' },
  { id: 'skills', levelNum: '02', name: 'SKILL LAB', icon: '🧪', color: '#00F0FF' },
  { id: 'projects', levelNum: '03', name: 'PROJECT WORLD', icon: '🏰', color: '#FF2E93' },
  { id: 'experience', levelNum: '04', name: 'EXPERIENCE', icon: '📜', color: '#FFD700' },
  { id: 'certifications', levelNum: '05', name: 'TROPHY ROOM', icon: '🏆', color: '#A855F7' },
  { id: 'hackathons', levelNum: '06', name: 'BATTLE ARENA', icon: '⚔', color: '#EF4444' },
  { id: 'achievements', levelNum: '07', name: 'ACHIEVEMENTS', icon: '★', color: '#F59E0B' },
  { id: 'education', levelNum: '08', name: 'EDUCATION', icon: '🎓', color: '#3B82F6' },
  { id: 'contact', levelNum: 'FINAL', name: 'CONTACT', icon: '🚪', color: '#10B981' },
];

export const WorldMap: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('about');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (let i = LEVELS.length - 1; i >= 0; i--) {
        const el = document.getElementById(LEVELS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(LEVELS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNodeClick = (id: string) => {
    playSelectSound();
    setActiveId(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeIndex = LEVELS.findIndex((l) => l.id === activeId);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="bg-[#121026] border-4 border-[#2A2650] shadow-[6px_6px_0px_0px_#000] p-4 sm:p-6 relative overflow-hidden">
        {/* Map Header */}
        <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-3">
          <div className="flex items-center gap-2 font-pixel text-xs text-[#00FF66]">
            <span>🗺 PORTFOLIO WORLD MAP</span>
            <span className="text-[10px] text-[#8B8BAE] hidden sm:inline">(CLICK A LEVEL TO JUMP)</span>
          </div>
          <span className="font-pixel text-[10px] bg-[#1E1A3C] text-[#FFD700] px-2 py-1 border border-black">
            LEVEL: {LEVELS[activeIndex < 0 ? 0 : activeIndex].levelNum}
          </span>
        </div>

        {/* Level Map Grid / Nodes */}
        <div className="relative flex items-center justify-between gap-2 overflow-x-auto pb-4 pt-2 scrollbar-none">
          {/* Connecting Map Path Line */}
          <div className="absolute top-1/2 left-6 right-6 h-2 bg-[#1E1A3C] border-y border-black -translate-y-1/2 z-0 hidden md:block" />

          {LEVELS.map((level, idx) => {
            const isActive = activeId === level.id;
            return (
              <button
                key={level.id}
                onClick={() => handleNodeClick(level.id)}
                className={`relative z-10 flex-shrink-0 flex flex-col items-center group transition-transform ${
                  isActive ? 'scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Active Player Sprite above target level */}
                {isActive && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce z-20">
                    <PixelAvatar size="sm" animated={false} />
                  </div>
                )}

                {/* Level Node Box */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-xl sm:text-2xl border-4 border-black shadow-[3px_3px_0px_0px_#000] transition-colors ${
                    isActive ? 'bg-[#FF2E93] text-white animate-pulse' : 'bg-[#1E1A3C] hover:bg-[#25204C]'
                  }`}
                  style={{ borderColor: isActive ? level.color : '#000' }}
                >
                  {level.icon}
                </div>

                {/* Level Title */}
                <span className="font-pixel text-[9px] sm:text-[10px] mt-2 px-1 text-center whitespace-nowrap" style={{ color: isActive ? level.color : '#E0E7FF' }}>
                  L{level.levelNum} • {level.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
