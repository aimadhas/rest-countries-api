/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html"],
  theme: {
    extend: {
      fontFamily : {
        roboto:['Roboto', 'sans-serif']
      },
      colors: {
        'text-origin': '#ffffff',
        'text-secounder': '#fafafa',
        'text-origin1': '#2b3743',
        'text-secounder2': '#202d36',
      },
    },
  },
  plugins: [],
}