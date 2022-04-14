module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backdropBrightness: {
        25: '.25',
        35: '.35',
        45: '.45',
      }
    },
  },
  plugins: [require("daisyui")],
};