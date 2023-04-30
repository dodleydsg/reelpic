/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-neusa)", ...fontFamily.sans],
        logo: ["var(--font-grandHotel)"],
      },
      colors: {
        primary: {
          default: "#651FFF",
        },
        logoBlue: "#1F0063",
        danger: {
          default: "#D90429",
        },
        dark: {
          default: "#36383a",
        },
        light: {
          default: "#FCFBFE",
        },
        warning: {
          default: "#FCA311",
        },
      },
    },
  },
  plugins: [],
};
