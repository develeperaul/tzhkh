/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{pug,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        7.5: "1.875rem",
      },
      fontSize: {
        text_10: ["3rem", "auto"],
        text_20: ["2.75rem", "130%"],
        text_21: ["1.375rem", "130%"],
        text_30: ["1.25rem", "130%"],
        text_22: ["1.5rem", "130%"],
        text_40: ["0.875rem", "130%"],
        text_base: ["1rem", "130%"],
        m_text_20: ["1.75rem", "130%"],
        m_text_10: ['0.625rem', '130%'],
        m_text_21: ["1.25rem", "130%"],
      },
      colors: {
        primary: "rgba(252, 182, 99, 1)",
        

        primary_07: "rgba(252, 182, 99, 0.7)",
        primary_92: "rgba(240, 174, 96, 0.92)",
        secondary: "rgba(149, 206, 116, 1)",
        secondary_hover: "rgba(169, 211, 144, 1)",
        light_green: "rgba(240, 255, 231, 1)",
        accept: "rgba(34, 80, 112, 1)",
        accept_08: "rgba(70, 112, 132, 0.8)",
        accept_blue: "rgba(74, 134, 162, 1)",
        accept_blue: "rgba(74, 134, 162, 1)",
        
        light_blue: "rgba(239, 251, 255, 1)",
        black: "rgba(0, 0, 0, 1)",
        doc: "rgba(123, 147, 167, 1)",
        white: "rgba(255, 255, 255, 1)",
        border: "rgba(160, 209, 232, 1)",
        link: 'rgba(0, 139, 203, 1)'
      },
    },
    fontFamily: {
      gilroy: "gilroy",
    },
    screens: {
      md: "768px",
      lg: "1024px",
      xl: "1200px",
      xxl: "1920px",
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "1440px",
          padding: "0px",
          marginRight: "auto",
          marginLeft: "auto",
          "@screen xl": {
            padding: "0 42px",
          },
        },
        ".container2": {
          maxWidth: "1440px",
          marginRight: "auto",
          marginLeft: "auto",
          "@screen xl": {
            padding: "0 80px",
          },
        },
        ".wrapper": {
          maxWidth: "1990px",
          marginRight: "auto",
          marginLeft: "auto",
          padding: "0 24px",
          "@screen xl": {
            padding: "0 80px",
          },
        },
        ".trans-300": {
          transition: "all 0.3s ease",
        },
      });
    },
  ],
};
