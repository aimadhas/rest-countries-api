/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html","information.html","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily : {
        roboto:['Roboto', 'sans-serif']
      },
      colors: {
        'origin1': '#ffffff',
        'secounder1': '#fafafa',
        'origin': '#2b3743',
        'secounder': '#202d36',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}