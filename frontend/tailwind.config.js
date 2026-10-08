/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rpg: {
          dark: '#0A0817',      // Primary background (Deep space night)
          card: '#121026',      // Dark card surface
          border: '#2A2650',    // Pixel border
          accent: '#FF2E93',    // Bright Pink / Magenta
          neon: '#00FF66',      // Neon Green
          gold: '#FFD700',      // Pixel Gold
          cyan: '#00F0FF',      // Cyan / Blue
          purple: '#A855F7',    // RPG Purple
          muted: '#8B8BAE',     // Muted text
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'monospace'],
        retro: ['"VT323"', '"Press Start 2P"', 'monospace'],
        silk: ['"Silkscreen"', 'monospace'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pixel-bounce': 'pixelBounce 1s steps(2, end) infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1s steps(2, start) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pixelBounce: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      },
      boxShadow: {
        'pixel-sm': '2px 2px 0px 0px #000',
        'pixel': '4px 4px 0px 0px #000',
        'pixel-lg': '6px 6px 0px 0px #000',
        'pixel-neon': '4px 4px 0px 0px #00FF66',
        'pixel-pink': '4px 4px 0px 0px #FF2E93',
        'pixel-gold': '4px 4px 0px 0px #FFD700',
        'pixel-cyan': '4px 4px 0px 0px #00F0FF',
      }
    },
  },
  plugins: [],
}

