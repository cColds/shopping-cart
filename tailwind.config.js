/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#2B5842",
        "body-color": "#475569",
        dark: "#2B3440",
      },
      fontFamily: {
        "poppins-reg": ["Poppins", "system-ui"],
        "poppins-bold": ["Poppins-Bold", "system-ui"],
      },

      backgroundColor: {
        modal: "rgba(0, 0, 0, 0.3)",
        "card-gray": "#e2e8f0",
      },
    },
  },
  plugins: [],
};
