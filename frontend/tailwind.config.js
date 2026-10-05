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
          50: '#FAF8F5',
          100: '#F4F0E8',
          200: '#E8E1D5',
          300: '#D6CBC0',
          800: '#2A2724',
          900: '#141312',
        },
        charcoal: {
          50: '#F5F5F4',
          800: '#262422',
          900: '#1C1B1A',
        },
        editorial: {
          accent: '#A63A24', // Rust/Crimson accent
          muted: '#8C857B',
          border: 'rgba(28, 27, 26, 0.15)',
          borderDark: 'rgba(234, 231, 225, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Instrument Serif', 'Playfair Display', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'editorial': '4px 4px 0px 0px rgba(28, 27, 26, 0.9)',
        'editorial-hover': '6px 6px 0px 0px rgba(28, 27, 26, 1)',
        'editorial-dark': '4px 4px 0px 0px rgba(234, 231, 225, 0.8)',
      }
    },
  },
  plugins: [],
}
