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


/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      lineHeight: {
        'sinhala': '1.6', // slightly larger for Sinhala text
      },
      letterSpacing: {
        'sinhala': '0.5px',
      },
    },
  },
  plugins: [],
}

module.exports = {
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        scroll: 'scroll 40s linear infinite',
      },
    },
  },
};
