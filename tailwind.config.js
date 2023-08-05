/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#3B48DC",
        blueLight: "rgba(62,147,252,0.8)",
        red: "#DD2828",
        yellow: "#F5B205",
        green200: "rgb(187 247 208)",
        purple: "rgba(184,77,235,1)",
      },
      zIndex: {
        90: "90",

        100: "100",
      },
      backgroundImage: (theme) => ({
        "gradient-primary": `linear-gradient(to right, ${theme(
          "colors.blueLight"
        )} 12.9%, ${theme("colors.green200")} 91.2% )`,
        "gradient-secondary": `linear-gradient(to right, ${theme(
          "colors.blueLight"
        )} 12.9%, ${theme("colors.purple")} 91.2% )`,
      }),
    },
  },
  plugins: [],
};
