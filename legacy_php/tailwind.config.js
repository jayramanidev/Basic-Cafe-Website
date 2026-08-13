/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.php",
    "./assets/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#1a1f1a',
        'brand-green': '#1a3622',
        'brand-gold': '#d4af37',
        'brand-accent': '#e67e22',
        'brand-light': '#fdfbf7',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 15px rgba(212, 175, 55, 0.4)',
      }
    },
  },
  plugins: [],
}
