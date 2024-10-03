import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        greenCustom: "#0eca59",
        grayCustom: "#f5f5f5",
        greenDarkCustom: "#13af36",
        yellowCustom: '#d9aa28'
      },
      // container: {
      //   center: true,
      //   screens: {
      //     sm: "90%",   // Màn hình nhỏ
      //     md: "100%",   // Màn hình vừa
      //     lg: "1220px", // Màn hình lớn (từ 1024px trở lên)
      //     xl: "1220px", // Màn hình rất lớn (từ 1280px trở lên)
      //     '2xl': "1220px", // Màn hình cực lớn (từ 1536px trở lên)
      //   },
      // },
    },
  },
  plugins: [],
};
export default config;
