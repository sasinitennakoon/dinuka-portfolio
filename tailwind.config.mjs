export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 1s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
}

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        playfair_display: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        abhaya: ['"Abhaya Libre"', 'serif'],
      },
    },
  },
};
