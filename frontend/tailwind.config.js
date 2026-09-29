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
        pastel: {
          pink: '#FDE2E4',
          lavender: '#E2E2FF',
          purple: '#E8DFF5',
          mint: '#E2F0CB',
          cream: '#FFFDFB',
          rose: '#F472B6',
          violet: '#C084FC',
        },
        dark: {
          bg: '#0F172A',
          card: '#1E293B',
          border: '#334155',
          accent: '#A855F7',
          pink: '#EC4899',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.4, transform: 'scale(0.85)' },
        }
      },
      boxShadow: {
        'cute': '0 10px 25px -5px rgba(244, 114, 182, 0.15), 0 8px 10px -6px rgba(192, 132, 252, 0.1)',
        'cute-lg': '0 20px 35px -10px rgba(244, 114, 182, 0.25), 0 10px 15px -5px rgba(192, 132, 252, 0.15)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      }
    },
  },
  plugins: [],
}
