/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/css/**/*.css',              // ✅ ครอบคลุม CSS files  Component ย่อย
    './public/**/*.{html,js}',
    './src/**/*.{js,jsx,ts,tsx}',        // ✅ ครอบคลุม src directory
    './node_modules/@adminjs/design-system/**/*.{js,jsx,ts,tsx}',
    './node_modules/adminjs/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
