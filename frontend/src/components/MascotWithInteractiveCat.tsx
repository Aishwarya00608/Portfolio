import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const MascotWithInteractiveCat: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position state relative to the cat's center
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [headRotation, setHeadRotation] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Cat center position in viewport
      const catX = rect.left + rect.width * 0.78;
      const catY = rect.top + rect.height * 0.65;
      
      const deltaX = e.clientX - catX;
      const deltaY = e.clientY - catY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.hypot(deltaX, deltaY), 300);
      
      // Max eye pupil shift is 3.5px
      const pupilShift = (distance / 300) * 3.5;
      const pupilX = Math.cos(angle) * pupilShift;
      const pupilY = Math.sin(angle) * pupilShift;

      // Subtle head rotation max 8 degrees
      const rotation = (deltaX / window.innerWidth) * 8;

      setEyePos({ x: pupilX, y: pupilY });
      setHeadRotation(rotation);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Random Cat Blinking timer
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 220);
      }
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-md mx-auto aspect-[4/3.5] bg-gradient-to-b from-[#F0F7FF] to-[#FFFBEB] rounded-3xl p-4 border-2 border-[#CBD5E1] shadow-window overflow-hidden select-none"
    >
      {/* Decorative Browser Top Strip */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] font-mono text-[10px] text-[#64748B]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>
        <div className="bg-white/80 px-3 py-0.5 rounded-full border border-[#E2E8F0] font-bold text-[#1E293B]">
          mascot_workspace.svg
        </div>
        <div className="font-hand font-bold text-[#F472B6] text-xs">✦ AISWARYA'S BOT</div>
      </div>

      {/* Main Illustration Scene */}
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Pastel Elements & Grid */}
        <pattern id="dotGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#CBD5E1" opacity="0.6" />
        </pattern>
        <rect x="0" y="30" width="400" height="270" fill="url(#dotGrid)" />

        {/* Desk Surface */}
        <path d="M 20 250 L 380 250 L 390 280 L 10 280 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
        <rect x="15" y="275" width="370" height="10" rx="3" fill="#CBD5E1" />

        {/* Floating Pastel Sticky Notes */}
        <g transform="translate(30, 50) rotate(-6)">
          <rect width="65" height="55" rx="6" fill="#FEF08A" stroke="#EAB308" strokeWidth="1.5" />
          <text x="8" y="20" fontFamily="Caveat, cursive" fontSize="13" fontWeight="bold" fill="#854D0E">AI/ML Log ✦</text>
          <text x="8" y="36" fontFamily="Fira Code, monospace" fontSize="8" fill="#A16207">val_loss: 0.02</text>
        </g>

        <g transform="translate(305, 45) rotate(8)">
          <rect width="60" height="50" rx="6" fill="#FCE7F3" stroke="#F472B6" strokeWidth="1.5" />
          <text x="8" y="20" fontFamily="Caveat, cursive" fontSize="13" fontWeight="bold" fill="#9D174D">CV Model</text>
          <text x="8" y="36" fontFamily="Fira Code, monospace" fontSize="8" fill="#BE185D">OpenCV + Dlib</text>
        </g>

        {/* Desk Lamp */}
        <g transform="translate(45, 140)">
          <path d="M 20 110 L 20 50 L 45 20" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="20" cy="110" rx="14" ry="5" fill="#475569" />
          <path d="M 35 10 L 60 25 L 45 35 Z" fill="#F472B6" />
          <polygon points="50,25 150,110 90,110" fill="#FEF08A" opacity="0.25" />
        </g>

        {/* Coffee Mug */}
        <g transform="translate(110, 225)">
          <rect x="0" y="0" width="18" height="24" rx="4" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
          <path d="M 18 6 C 24 6, 24 18, 18 18" stroke="#0284C7" strokeWidth="1.5" fill="none" />
          <path d="M 4 -6 Q 6 -12 8 -6" stroke="#94A3B8" strokeWidth="1.5" fill="none" opacity="0.6" />
        </g>

        {/* Laptop */}
        <g transform="translate(145, 175)">
          {/* Laptop Base */}
          <path d="M -10 65 L 110 65 L 120 75 L -20 75 Z" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
          {/* Laptop Screen */}
          <rect x="0" y="0" width="100" height="65" rx="6" fill="#1E293B" stroke="#475569" strokeWidth="2" />
          {/* Glowing Display Content */}
          <rect x="4" y="4" width="92" height="57" rx="4" fill="#0F172A" />
          {/* Code lines on screen */}
          <text x="10" y="18" fontFamily="Fira Code, monospace" fontSize="7" fill="#38BDF8">const model = new AI();</text>
          <text x="10" y="28" fontFamily="Fira Code, monospace" fontSize="7" fill="#F472B6">await model.predict();</text>
          <text x="10" y="38" fontFamily="Fira Code, monospace" fontSize="7" fill="#4ADE80">// Accuracy: 99.4%</text>
          <text x="10" y="48" fontFamily="Fira Code, monospace" fontSize="7" fill="#FDE047">status: "ACTIVE ✦"</text>
          {/* Logo on Laptop Back */}
          <circle cx="50" cy="32" r="6" fill="#E2E8F0" opacity="0.15" />
        </g>

        {/* --- ORIGINAL TOY-LIKE MINIATURE MASCOT --- */}
        <g transform="translate(185, 100)">
          {/* Headphone Band */}
          <path d="M 5 28 C 5 -12, 55 -12, 55 28" stroke="#EC4899" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Headphone Ear Cups */}
          <rect x="0" y="22" width="10" height="16" rx="4" fill="#F472B6" />
          <rect x="50" y="22" width="10" height="16" rx="4" fill="#F472B6" />

          {/* Toy Block Head */}
          <rect x="10" y="10" width="40" height="36" rx="10" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
          
          {/* Toy Hair / Cap */}
          <path d="M 10 20 C 10 10, 50 10, 50 20 Z" fill="#78350F" />

          {/* Cute Toy Eyes */}
          <circle cx="22" cy="26" r="3" fill="#1E293B" />
          <circle cx="38" cy="26" r="3" fill="#1E293B" />
          <circle cx="23" cy="25" r="1" fill="#FFFFFF" />
          <circle cx="39" cy="25" r="1" fill="#FFFFFF" />

          {/* Cheeks */}
          <circle cx="18" cy="31" r="3" fill="#F472B6" opacity="0.5" />
          <circle cx="42" cy="31" r="3" fill="#F472B6" opacity="0.5" />

          {/* Happy Smile */}
          <path d="M 26 31 Q 30 35 34 31" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Toy Body / Tech Hoodie */}
          <path d="M 8 48 L 52 48 L 56 95 L 4 95 Z" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
          {/* Hoodie Pocket & Zipper */}
          <line x1="30" y1="48" x2="30" y2="85" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M 18 70 L 42 70" stroke="#0284C7" strokeWidth="1.5" />

          {/* Arms resting on desk keyboard */}
          <path d="M 6 55 Q -4 75 14 80" stroke="#BAE6FD" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M 54 55 Q 64 75 46 80" stroke="#BAE6FD" strokeWidth="8" strokeLinecap="round" fill="none" />
          <circle cx="14" cy="80" r="4" fill="#FEF3C7" />
          <circle cx="46" cy="80" r="4" fill="#FEF3C7" />
        </g>

        {/* --- ORIGINAL CUTE INTERACTIVE CAT --- */}
        <g transform={`translate(295, 170) rotate(${headRotation})`}>
          {/* Cat Tail */}
          <motion.path
            d="M 55 55 Q 75 45 65 25"
            stroke="#F97316"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            animate={{ d: isHovered ? ["M 55 55 Q 75 45 65 25", "M 55 55 Q 80 35 70 15", "M 55 55 Q 75 45 65 25"] : "M 55 55 Q 75 45 65 25" }}
            transition={{ repeat: Infinity, duration: 2 }}
          />

          {/* Cat Body */}
          <ellipse cx="35" cy="50" rx="22" ry="18" fill="#FFEDD5" stroke="#F97316" strokeWidth="2" />

          {/* Cat Ears */}
          <polygon points="18,18 26,0 34,16" fill="#FFEDD5" stroke="#F97316" strokeWidth="2" />
          <polygon points="21,16 26,5 31,15" fill="#F472B6" />
          <polygon points="38,16 46,0 54,18" fill="#FFEDD5" stroke="#F97316" strokeWidth="2" />
          <polygon points="41,15 46,5 51,16" fill="#F472B6" />

          {/* Cat Head */}
          <circle cx="36" cy="26" r="18" fill="#FFEDD5" stroke="#F97316" strokeWidth="2" />

          {/* Cat Whiskers */}
          <line x1="12" y1="26" x2="2" y2="23" stroke="#F97316" strokeWidth="1.5" />
          <line x1="12" y1="30" x2="2" y2="31" stroke="#F97316" strokeWidth="1.5" />
          <line x1="60" y1="26" x2="70" y2="23" stroke="#F97316" strokeWidth="1.5" />
          <line x1="60" y1="30" x2="70" y2="31" stroke="#F97316" strokeWidth="1.5" />

          {/* Cat Eyes (Interactive Pupil Following Cursor) */}
          {isBlinking ? (
            <>
              <line x1="22" y1="24" x2="30" y2="24" stroke="#431407" strokeWidth="2" strokeLinecap="round" />
              <line x1="42" y1="24" x2="50" y2="24" stroke="#431407" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Left Eye White & Pupil */}
              <circle cx="26" cy="24" r="5" fill="#FFFFFF" stroke="#431407" strokeWidth="1" />
              <circle cx={26 + eyePos.x} cy={24 + eyePos.y} r="2.5" fill="#15803D" />
              <circle cx={27 + eyePos.x} cy={23 + eyePos.y} r="0.8" fill="#FFFFFF" />

              {/* Right Eye White & Pupil */}
              <circle cx="46" cy="24" r="5" fill="#FFFFFF" stroke="#431407" strokeWidth="1" />
              <circle cx={46 + eyePos.x} cy={24 + eyePos.y} r="2.5" fill="#15803D" />
              <circle cx={47 + eyePos.x} cy={23 + eyePos.y} r="0.8" fill="#FFFFFF" />
            </>
          )}

          {/* Cat Nose & Mouth */}
          <polygon points="34,30 38,30 36,33" fill="#F472B6" />
          <path d="M 33 34 Q 36 37 39 34" stroke="#431407" strokeWidth="1.2" strokeLinecap="round" fill="none" />

          {/* Cat Paws resting on desk */}
          <ellipse cx="26" cy="62" rx="6" ry="4" fill="#FFEDD5" stroke="#F97316" strokeWidth="1.5" />
          <ellipse cx="44" cy="62" rx="6" ry="4" fill="#FFEDD5" stroke="#F97316" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Floating Scrapbook Label */}
      <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-sm border border-[#CBD5E1] px-3 py-1 rounded-full text-[10px] font-mono text-[#1E293B] shadow-sticker flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
        <span>MASCOT & CAT LOG ✦ MOUSE TRACKER ONLINE</span>
      </div>
    </div>
  );
};
