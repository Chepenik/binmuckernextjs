module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        currencyGreen: '#85BB65',
        treasuryGold: '#BF9B30',
        gradientStart: '#6EE7B7',
        gradientEnd: '#3B82F6',
      },
      spacing: {
        '18': '4.5rem',
        '108': '27rem',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
