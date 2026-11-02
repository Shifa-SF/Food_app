/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#FF6B35',
          secondary: '#FF9F43',
          charcoal: '#202124',
          cream: '#FFF9F2',
          background: '#F7F5F0',
          success: '#249B62',
          text: '#252525',
          lightGrey: '#EAEAEA',
          cardBg: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(32, 33, 36, 0.06), 0 2px 6px -1px rgba(32, 33, 36, 0.04)',
        'hover': '0 12px 30px -4px rgba(255, 107, 53, 0.15), 0 4px 12px -2px rgba(32, 33, 36, 0.06)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.04)',
        'modal': '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
