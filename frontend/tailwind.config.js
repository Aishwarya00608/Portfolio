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
          blue: '#E0F2FE',       // Powder blue
          blueHeader: '#BAE6FD', // Baby blue
          pink: '#FCE7F3',       // Soft blush pink
          rose: '#F472B6',       // Muted rose
          lavender: '#F3E8FF',   // Pale lavender
          cream: '#FAF7F2',      // Warm cream
          ivory: '#FFFBEB',      // Ivory
          peach: '#FFEDD5',      // Soft peach
          sage: '#DCFCE7',       // Muted sage
          beige: '#FEF3C7',      // Light beige
          yellow: '#FEF08A',     // Sticky note yellow
          charcoal: '#1E293B',   // Dark contrast text
          muted: '#64748B',      // Muted text
          border: '#CBD5E1',     // Soft border
          window: '#FFFFFF',     // Browser window body
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Instrument Serif', 'Playfair Display', 'serif'],
        mono: ['Fira Code', 'monospace'],
        hand: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'window': '0 20px 40px -15px rgba(30, 41, 59, 0.08), 0 8px 16px -8px rgba(30, 41, 59, 0.04)',
        'window-lg': '0 25px 50px -12px rgba(15, 23, 42, 0.12)',
        'sticker': '2px 4px 10px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
