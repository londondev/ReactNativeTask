/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#030014",
      },
      spacing: {
        'safe': '40px',
        'section': '24px',
      },
      fontSize: {
        'header': '28px',
      },
    },
  },
  plugins: [],
}
