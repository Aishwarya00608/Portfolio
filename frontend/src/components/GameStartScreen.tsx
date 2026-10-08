import React, { useState } from 'react';
import { PixelAvatar } from './pixel/PixelAvatar';
import { PixelCloud, PixelStar, PixelCoin, PixelGem, PixelHeart } from './pixel/PixelDecorations';
import { playStartSound, playSelectSound, isSoundEnabled, toggleSound } from '../utils/sound';

interface GameStartScreenProps {
  onStart: () => void;
}

export const GameStartScreen: React.FC<GameStartScreenProps> = ({ onStart }) => {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [transitioning, setTransitioning] = useState(false);

  const handleStartGame = () => {
    playStartSound();
    setTransitioning(true);
    setTimeout(() => {
      onStart();
    }, 600);
  };

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) {
      playSelectSound();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0A0817] scanlines flex flex-col items-center justify-between p-6 transition-opacity duration-500 overflow-hidden select-none ${
        transitioning ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Top Header Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between z-10 font-pixel text-xs">
        <div className="flex items-center gap-3 bg-[#121026] px-4 py-2 border-2 border-black shadow-[3px_3px_0px_#000]">
          <span className="text-[#FF2E93]">XP:</span>
          <span className="text-[#00FF66]">AI/ML LEVEL 04</span>
        </div>
        
        {/* Sound Toggle */}
        <button
          onClick={handleSoundToggle}
          className="flex items-center gap-2 px-3 py-2 bg-[#1E1A3C] text-[#FFD700] border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#2A2650]"
        >
          <span>{soundOn ? '🔊 SOUND: ON' : '🔇 SOUND: OFF'}</span>
        </button>
      </div>

      {/* Floating Animated Clouds & Stars in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-12 left-10 animate-float opacity-80">
          <PixelCloud size={80} />
        </div>
        <div className="absolute top-20 right-16 animate-float opacity-70" style={{ animationDelay: '1.5s' }}>
          <PixelCloud size={100} />
        </div>
        <div className="absolute top-40 left-1/3 animate-float opacity-50" style={{ animationDelay: '0.8s' }}>
          <PixelCloud size={60} />
        </div>

        {/* Scattered Stars */}
        <div className="absolute top-16 left-1/4 animate-pulse"><PixelStar size={16} /></div>
        <div className="absolute top-32 right-1/4 animate-pulse" style={{ animationDelay: '1s' }}><PixelStar size={20} /></div>
        <div className="absolute top-24 left-3/4 animate-pulse" style={{ animationDelay: '0.5s' }}><PixelGem size={16} /></div>
        <div className="absolute top-48 left-12 animate-pulse" style={{ animationDelay: '1.2s' }}><PixelCoin size={16} /></div>
      </div>

      {/* Centerpiece Hero Title */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-[#FF2E93]/20 text-[#FF2E93] border border-[#FF2E93] font-pixel text-[10px]">
          <PixelHeart size={14} /> RETRO 8-BIT DEVELOPER PORTFOLIO <PixelHeart size={14} />
        </div>

        {/* Year 2026 Header */}
        <p className="font-pixel text-xl sm:text-2xl text-[#00F0FF] mb-2 tracking-widest drop-shadow-[3px_3px_0px_#000]">
          2026
        </p>

        {/* Main Title */}
        <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-[#FFD700] mb-4 tracking-wider leading-tight drop-shadow-[5px_5px_0px_#000]">
          AISWARYA'S
        </h1>
        <h2 className="font-pixel text-2xl sm:text-4xl md:text-5xl text-white mb-8 tracking-wider drop-shadow-[5px_5px_0px_#000]">
          PORTFOLIO GAME
        </h2>

        {/* Avatar Display on Grassy Platform */}
        <div className="relative my-4 flex flex-col items-center">
          <PixelAvatar size="xl" animated={true} />
          <div className="w-48 h-6 bg-[#16A34A] border-4 border-black shadow-[4px_4px_0px_#000] -mt-2 flex items-center justify-center">
            <div className="w-full h-2 bg-[#15803D] border-t-2 border-black" />
          </div>
          <p className="font-pixel text-[10px] text-[#00FF66] mt-2">
            PLAYER 1: CSE STUDENT & AI ENGINEER
          </p>
        </div>

        {/* Start Game Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button
            onClick={handleStartGame}
            className="btn-pixel-primary text-sm sm:text-base px-8 py-4 animate-pulse"
          >
            ⚔ START GAME
          </button>
          <button
            onClick={handleStartGame}
            className="btn-pixel-secondary text-xs sm:text-sm px-6 py-4"
          >
            📜 ENTER PORTFOLIO
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="z-10 font-pixel text-[10px] text-[#8B8BAE] text-center">
        PRESS START OR CLICK ANYWHERE TO EXPLORE THE PORTFOLIO WORLD • HYDERABAD, INDIA
      </div>
    </div>
  );
};
