/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // All Star BJJ brand palette
        brand: {
          red: '#dc2626',          // primary CTAs, accents
          'red-dark': '#991b1b',   // hover state
          black: '#0a0a0a',        // headers, dark sections
          gray: '#1f2937',         // softer dark
          gold: '#fbbf24',         // star icon, highlights
          cream: '#fef9f5',        // soft off-white background
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        'page': '1200px',
      },
    },
  },
  plugins: [],
};
