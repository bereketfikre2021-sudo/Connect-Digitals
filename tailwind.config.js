/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'system-ui', 'sans-serif'],
        'display': ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        accentRed: '#EC1C24',
        primaryNavy: '#000F33',
        gold: '#D4AF37',
        cream: '#F8F4EF',
        neutralDark: '#222222'
      },
      animation: {
        'scroll': 'scroll 60s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-384px * 6 - 2rem * 5))' },
        }
      }
    }
  },
  plugins: []
}
