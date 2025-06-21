/** @type {import('tailwindcss').Config} */
/*
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
*/
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  safelist: [
    'bg-gray-400',
    'bg-blue-600',
    'hover:bg-blue-700'
  ],
  theme: { extend: {} },
  plugins: [],
};