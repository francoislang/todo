const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        backgroundPrimary: '#F5F7F9',
        'litepie-primary': colors.indigo, // color system for light mode
        'litepie-secondary': colors.gray, // color system for dark mode
      },
    },
  },
}
