/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#3B48DC",
        red: "#DD2828",
        yellow: "#F5B205",
      },
      zIndex: {
        90: "90",

        100: "100",
      },
    },
  },
  plugins: [],
};
