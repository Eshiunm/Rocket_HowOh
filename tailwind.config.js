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
      "2xl": "1344px",
    },
    fontFamily: {
      "Dela-Gothic-One": ["Dela Gothic One", "sans-serif"],
      "Noto-Sans-TC": ["Noto Sans TC", "sans-serif"],
    },
    extend: {
      colors: {
        Brand: {
          10: "#001F23",
          20: "#00363B",
          30: "#004F56",
          40: "#006972",
          50: "#00848F",
          60: "#189FAC",
          70: "#44BBC7",
          80: "#65D6E4",
          90: "#90F2FE",
          95: "#CBF9FF",
          99: "#F5FEFF",
        },
        Neutral: {
          10: "#151D1E",
          20: "#2A3233",
          30: "#404849",
          40: "#586061",
          50: "#70797A",
          60: "#8A9293",
          70: "#A4ADAE",
          80: "#C0C8C9",
          90: "#DCE4E5",
          95: "#E7E7E7",
          99: "#F8F8F8",
        },
        Tenant: {
          10: "#081F21",
          20: "#1F3436",
          30: "#354A4D",
          40: "#4D6265",
          50: "#657B7E",
          60: "#7E9598",
          70: "#99AFB2",
          80: "#B4CBCE",
          90: "#CFE7EA",
          95: "#DEF5F8",
          99: "#EAFAFD",
        },
        Landlord: {
          10: "#0F1B33",
          20: "#243049",
          30: "#3B4761",
          40: "#525E7A",
          50: "#6B7794",
          60: "#8590AE",
          70: "#9FABCA",
          80: "#BAC6E6",
          90: "#D8E2FF",
          95: "#F4F6FF",
          99: "#F6F8FE",
        },
        Alert: {
          10: "#410002",
          20: "#690005",
          30: "#93000A",
          40: "#BA1A1A",
          50: "#DE3730",
          60: "#FF5449",
          70: "#FF897D",
          80: "#FFB4AB",
          90: "#FFDAD6",
          95: "#FFEDEA",
          99: "#FFFBFF",
        },
      },
      fontSize: {
        "dela-display1": [
          "64px",
          {
            lineHeight: "1.5",
            letterSpacing: "0.08em",
          },
        ],
        "dela-display2": [
          "56px",
          {
            lineHeight: "1.5",
            letterSpacing: "0.08em",
          },
        ],
        "dela-display3": [
          "40px",
          {
            lineHeight: "1.5",
            letterSpacing: "0.08em",
          },
        ],
        "dela-display4": [
          "32px",
          {
            lineHeight: "1.5",
            letterSpacing: "0.08em",
          },
        ],
        "sans-display1": [
          "64px",
          {
            lineHeight: "1.2",
            letterSpacing: "0.04em",
          },
        ],
        "sans-display2": [
          "48px",
          {
            lineHeight: "1.2",
            letterSpacing: "0.04em",
          },
        ],
        "sans-h1": [
          "40px",
          {
            lineHeight: "1.2",
            letterSpacing: "0.04em",
          },
        ],
        "sans-h2": [
          "38px",
          {
            lineHeight: "1.2",
            letterSpacing: "0.04em",
          },
        ],
        "sans-h3": [
          "32px",
          {
            lineHeight: "1.2",
            letterSpacing: "0.04em",
          },
        ],
        "sans-h4": [
          "28px",
          {
            lineHeight: "1.2",
            letterSpacing: "0.04em",
          },
        ],
        "sans-h5": [
          "24px",
          {
            lineHeight: "1.2",
            letterSpacing: "0.04em",
          },
        ],
        "sans-h6": [
          "20px",
          {
            lineHeight: "1.2",
            letterSpacing: "0.04em",
          },
        ],
        "sans-body1": ["16px", "1.5"],
        "sans-body2": ["14px", "1.5"],
        "sans-caption": ["12px", "1.5"],
        "sans-b-display1": [
          "64px",
          {
            lineHeight: "1.2",
            fontWeight: "700",
            letterSpacing: "0.04em",
          },
        ],
        "sans-b-display2": [
          "48px",
          {
            lineHeight: "1.2",
            fontWeight: "700",
            letterSpacing: "0.04em",
          },
        ],
        "sans-b-h1": [
          "40px",
          {
            lineHeight: "1.2",
            fontWeight: "700",
            letterSpacing: "0.04em",
          },
        ],
        "sans-b-h2": [
          "38px",
          {
            lineHeight: "1.2",
            fontWeight: "700",
            letterSpacing: "0.04em",
          },
        ],
        "sans-b-h3": [
          "32px",
          {
            lineHeight: "1.2",
            fontWeight: "700",
            letterSpacing: "0.04em",
          },
        ],
        "sans-b-h4": [
          "28px",
          {
            lineHeight: "1.2",
            fontWeight: "700",
            letterSpacing: "0.04em",
          },
        ],
        "sans-b-h5": [
          "24px",
          {
            lineHeight: "1.2",
            fontWeight: "700",
            letterSpacing: "0.04em",
          },
        ],
        "sans-b-h6": [
          "20px",
          {
            lineHeight: "1.2",
            fontWeight: "700",
            letterSpacing: "0.04em",
          },
        ],
        "sans-b-body1": [
          "16px",
          {
            lineHeight: "1.5",
            fontWeight: "700",
            letterSpacing: "0.04em",
          },
        ],
        "sans-b-body2": [
          "14px",
          {
            lineHeight: "1.5",
            fontWeight: "700",
            letterSpacing: "0.04em",
          },
        ],
        "sans-b-caption": [
          "12px",
          {
            lineHeight: "1.5",
            fontWeight: "700",
            letterSpacing: "0.04em",
          },
        ],
      },
      backgroundImage: {
        homeSearchImg:
          "url('/src/assets/imgs/homePage/home_search_backgroundImg.png')",
        aboutMeImg_1: "url('/src/assets/imgs/homePage/aboutMe_bgImg_1.jpg')",
        aboutMeImg_2: "url('/src/assets/imgs/homePage/aboutMe_bgImg_2.jpg')",
        aboutMeImg_3: "url('/src/assets/imgs/homePage/aboutMe_bgImg_3.jpg')",
        tenantLoginImg: "url('/src/assets/imgs/login/tenantLoginImg.svg')",
        landLordLoginImg: "url('/src/assets/imgs/login/landLordLoginImg.svg')",
        articleBannerImg_1: "url('/src/assets/imgs/article/bannerImg_1.jpg')",
      },
    },
  },
  plugins: [flow_bite.plugin()],
};
