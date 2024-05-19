module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        purpleTheme: "hsl(259.63, 39%, 41%)",
        yellowTheme: "hsl(40, 88%, 55%)",
        darkYellowFontColor: "#AA8357",
        grayTheme: "#EFEFED",
      },
    },
  },
  plugins: [],
};
