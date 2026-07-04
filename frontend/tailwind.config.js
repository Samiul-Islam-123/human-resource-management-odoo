/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#752df1ff', // Purple accent
          hover: '#6d28d9',
          light: '#ede9fe',
        },
        surface: '#ffffff',
        background: '#f8fafc',
        success: '#10b981', // Green
        warning: '#f59e0b', // Yellow
        danger: '#ef4444', // Red
        info: '#3b82f6', // Blue
        text: {
          main: '#0f172a',
          muted: '#64748b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
}
