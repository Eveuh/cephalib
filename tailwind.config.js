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
          DEFAULT: '#43665E',
        },
        secondary: {
          peach: '#DA906B',
          mint: '#ACC9C3',
        },
        accent: {
          red: '#B20300',
        },
        surface: '#FCF5ED',
        background: '#FFFCF0',
      },
      borderRadius: {
        'app': '14px',
      },
    },
  },
  plugins: [],
}