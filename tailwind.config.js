import flow_bite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flow_bite.content()],
  theme: {
    /*自訂斷點，蓋過官方預設值 */
    screens: {
      sm: "540px",
      md: "720px",
      lg: "960px",
      xl: "1140px",
      "2xl": "1320px",
      "3xl": "1536px",
      "4xl": "1632px",
    },
    extend: {},
  },
  plugins: [flow_bite.plugin()],
};

