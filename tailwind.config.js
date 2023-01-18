export default {
  darkMode: "class",
  content: ["./module/src/runtime/components/**/*.vue"],
  theme: {
    screens: {
      sm: "640px",
      md: "750px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "layered-waves-bottom": "url('/layered-waves-bottom.svg')",
      },
      keyframes: {
        "indeterminate-first": {
          "0%": {
            left: "-100%",
            width: "100%",
          },
          "100%": {
            left: "100%",
            width: "10%",
          },
        },
        "indeterminate-second": {
          "0%": {
            left: "-150%",
            width: "100%",
          },
          "100%": {
            left: "100%",
            width: "10%",
          },
        },
      },
      animation: {
        indeterminatebefore: "indeterminate-first 1.5s infinite ease-out",
        indeterminateafter: "indeterminate-second 1.5s infinite ease-in",
      },
      colors: {
        primary: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        secondary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
      },
    },
  },
};
