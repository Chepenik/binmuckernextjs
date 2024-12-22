/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    // plus any other folders containing your components
  ],
  theme: {
    extend: {
      colors: {
        currencyGreen: '#85BB65',      // Lighter bill green
        federalGreen: '#156B45',       // Darker bill green
        treasuryGold: '#BF9B30',       // Metallic gold
        certificateGold: '#D4AF37',    // Brighter gold
        securityBlue: '#1B3E87',       // Security thread blue
      },
    },
  },
  plugins: [],
};