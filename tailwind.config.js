/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#43665E',
          green65: 'rgba(67, 102, 94, 0.65)',
          DEFAULT: '#3E655E',
        },
        secondary: {
          peach: '#C59574',
          mint: '#B5C8C2',
        },
        accent: {
          red: '#982F18',
        },
        //surface: '#FCF5ED',
        surface: '#FAF5EF',
        background: '#FFFCF0',
      },
      borderRadius: {
        'app': '14px',
      },
    },
  },
  plugins: [],
}


