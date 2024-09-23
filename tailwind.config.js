/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/popup.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [],
  corePlugins: {
    preflight: false // injects Tailwind's base/reset styles will destroy miro's default style
  }
}
