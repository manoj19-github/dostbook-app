/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#0087ff',
        lightAvatar: '#e6fff3',
        darkAvatarText: '#1AC96F',
        backgroundLight: '#eaf4fb',
        error: '#fc4236',
        background: '#fff',
        lightText: '#c5c5c7',
        border: '#f5f6f8',
      },
    },
  },
  plugins: [],
};
