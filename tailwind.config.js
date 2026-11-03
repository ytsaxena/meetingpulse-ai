/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clickup: {
          purple: '#7b68ee',
          violet: '#7340ff',
          pink: '#ff007a',
          fuchsia: '#ec4899',
          dark: '#0e0f12',
          surface: '#1a1c23',
          card: '#1e2029',
          border: '#2b2d38',
          hover: '#252834',
        },
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7340ff',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        }
      }
    },
  },
  plugins: [],
}
