/** @type {import('tailwindcss').Config} */
// Tema Kuiz Tauhid: zamrud + biru malam + emas (sepadan dengan halaman jualan)
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        zamrud: { 50: '#E8F5EF', 100: '#CFEBDD', 200: '#A3D9C0', 300: '#6FC29F', 400: '#35A57B', 500: '#148A64', 600: '#0E7A5A', 700: '#0B5E46', 800: '#0B4A38', 900: '#0B3B2E', 950: '#062219' },
        malam: { 700: '#27385A', 800: '#1B2A44', 900: '#0F1B2D', 950: '#0A1220' },
        emas: { 50: '#FBF6E8', 100: '#F6E7C1', 200: '#EDD493', 300: '#E2BE62', 400: '#D6A73A', 500: '#C99A2E', 600: '#A67C22', 700: '#7F5E1A' },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        arab: ['"Amiri"', '"Scheherazade New"', 'serif'],
      },
      boxShadow: { kad: '0 1px 2px rgba(15,27,45,.05), 0 8px 24px rgba(15,27,45,.07)' },
    },
  },
  plugins: [],
};
