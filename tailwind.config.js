/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07080a',
        charcoal: '#111317',
        graphite: '#1b1e24',
        line: '#2a2e36',
        ember: '#e11d2e', // ARS signature crimson (kept token name for existing components)
        crimson: '#e11d2e',
        ivory: '#f4f1ea',
        gold: '#c9a96a',
        mist: '#9aa0aa',
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: { marquee: 'marquee 40s linear infinite' },
    },
  },
  plugins: [],
};
