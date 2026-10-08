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
        dark: {
          bg: '#080808',       // Outer dark background
          panel: '#111111',    // Rounded magazine panel surface
          card: '#181818',     // Sub-card background
          border: '#262626',   // Thin elegant border
          borderLight: '#333333',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#F5F5F5',
          muted: '#A0A0A0',
        },
        accent: {
          pink: '#DB2777',
          cream: '#FAF8F5',
          sage: '#8A9A86',
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
        'panel': '0 20px 50px rgba(0, 0, 0, 0.8)',
        'card-glow': '0 0 30px rgba(255, 255, 255, 0.03)',
      }
    },
  },
  plugins: [],
}



