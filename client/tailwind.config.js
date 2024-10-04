/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      'outfit-regular': ['OutfitRegular', 'sans-serif'],
      'outfit-bold': ['OutfitBold', 'sans-serif'],
      'outfit-semibold': ['OutfitSemiBold', 'sans-serif'],
    },
    extend: {
      screens: {
        mobile: '320px',
        tablet: '768px',
        desktop: '1024px',
      },
    },
  },
  plugins: [lineClamp],
};
