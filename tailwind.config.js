/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        // Light
        background: "#FFFFFF",
        text: "#000000",
        primary: "#000000",
        secondary: "#3A3A3A",
        card: "#F5F5F5",

        // Dark
        backgroundDark: "#000000",
        textDark: "#FFFFFF",
        primaryDark: "#FFFFFF",
        secondaryDark: "#C9C9C9",
        cardDark: "#1A1A1A",
      },

      // ⭐ Add reusable text classes here
      fontSize: {
        headline: ["32px", { lineHeight: "40px", fontWeight: "700" }],
        title: ["22px", { lineHeight: "32px", fontWeight: "700" }],
        subtitle: ["18px", { lineHeight: "24px", fontWeight: "500" }],
        body: ["16px", { lineHeight: "22px" }],
        small: ["14px", { lineHeight: "20px" }],
        caption: ["12px", { lineHeight: "16px" }],
      },
    },
  },

  plugins: [],
};
