/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // All Star BJJ brand palette — matched from current allstarbjj.com
        brand: {
          navy: '#002D4D',          // primary — header, CTAs, accents
          'navy-dark': '#0B4269',   // hover state
          black: '#1B1D1B',         // body text, dark sections
          gold: '#fbbf24',          // accent (star icon, highlights)
          red: '#dc2626',           // secondary CTA accent
          gray: '#3B3B3B',          // body sub-text
          'gray-light': '#F8F8F8',  // section backgrounds
          'gray-mid': '#EAEAEA',    // divider lines
        },
      },
      fontFamily: {
        // Display — condensed, all-caps headings (like current site)
        display: ['"Roboto Condensed"', 'Impact', 'sans-serif'],
        // Body — clean, readable
        sans: ['Roboto', 'Arial', 'Helvetica', 'sans-serif'],
      },
      maxWidth: {
        'page': '1200px',
      },
    },
  },
  plugins: [],
};
