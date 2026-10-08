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
        cream: {
          50: '#FFFDFA',
          100: '#FAF8F5',
          200: '#F4F0E8',
          300: '#E8E1D5',
          800: '#2A2724',
          900: '#141312',
        },
        blush: {
          50: '#FFF8F9',
          100: '#FDF2F4',
          200: '#FADEE1',
          500: '#D98293',
          700: '#C26D7F',
        },
        sage: {
          100: '#F1F4F0',
          500: '#8A9A86',
          700: '#5A6B56',
        },
        editorial: {
          bg: '#FAF8F5',
          card: '#FFFFFF',
          text: '#1C1B1A',
          accent: '#A63A24', // Rust crimson accent
          muted: '#78716C',
          border: 'rgba(28, 27, 26, 0.18)',
          tape: 'rgba(232, 225, 213, 0.7)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Instrument Serif', 'Playfair Display', 'serif'],
        mono: ['Fira Code', 'monospace'],
        hand: ['Caveat', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'editorial': '4px 4px 0px 0px rgba(28, 27, 26, 0.85)',
        'editorial-hover': '6px 6px 0px 0px rgba(28, 27, 26, 1)',
        'editorial-soft': '0 10px 30px -5px rgba(28, 27, 26, 0.08)',
      }
    },
  },
  plugins: [],
}


