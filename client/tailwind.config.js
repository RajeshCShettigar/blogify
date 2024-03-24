/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode:true,
  theme: {
    extend: {
      backgroundImage: {
        'bg-image-contact': 'url(http://mrtaba.ir/image/bg2.jpg)',
        'bg-home': "url('./src/assets/home_background.png')"
      },
      fontFamily: {
        'ubuntu': ['Ubuntu', 'sans-serif'],
        'shantell': ['Shantell Sans', 'serif'] 
      },
    },
  },
  plugins: [
  ],
}