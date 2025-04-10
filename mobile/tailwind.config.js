/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#1D4ED8',
          light: '#93C5FD',
        },
        secondary: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#6EE7B7',
        },
        background: {
          DEFAULT: '#F9FAFB',
          dark: '#1F2937',
        },
        text: {
          DEFAULT: '#1F2937',
          light: '#F9FAFB',
          muted: '#6B7280',
        },
      },
    },
  },
  plugins: [],
  presets: [require('nativewind/preset')],
};
