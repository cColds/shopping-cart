/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#2B5842",
        "body-color": "#475569",
        //  "modal": "rgba(255, 255, 255, 0.5)"
      },
      fontFamily: {
        "poppins-reg": ["Poppins", "system-ui"],
        "poppins-bold": ["Poppins-Bold", "system-ui"],
      },

      backgroundColor: {
        modal: "rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
