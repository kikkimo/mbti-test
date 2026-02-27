/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E67E22',
        secondary: '#D35400',
        accent: '#F39C12',
        background: '#FFF8F0',
        card: '#FFFBF7',
        text: '#4A3728',
        answered: '#27AE60',
        unanswered: '#E5E7EB',
        current: '#E67E22',
      },
    },
  },
  plugins: [],
}
