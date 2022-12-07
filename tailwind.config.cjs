/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        task: "rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px;",
      },
      colors: {
        'cultured': '#F8F5F2',
      },
      minHeight: {
        'column': '5rem',
      }
    },
  },
  plugins: [],
};
