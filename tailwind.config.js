/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {

      colors: {
        'custom-grey': '#242424',
        'nav-grey':"#1c1c1c"
        // You can add more custom colors here
      },
    },
  },
  plugins: [],
}
