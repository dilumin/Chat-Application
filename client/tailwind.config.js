/** @type {import('tailwindcss').Config} */

const { default: daisyui } = require('daisyui');
const { theme } = require('flowbite-react');
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", 
    
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin(), require('daisyui')],
  daisyui: {
    themes: [] // Disable all themes
  },
  presets: [
    require('flowbite-react/tailwind'),
  ],
}

