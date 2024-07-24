const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./**/*.{html,jsx,js}",
    "./src/**/*.{html,jsx,js}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: "0.75rem", // 12px
        xxs: "0.625rem", // 10px
        xxxs: "0.5rem", // 8px
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
