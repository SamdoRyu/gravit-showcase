/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        space: { 950: '#060914', 900: '#0a0f20', 800: '#111831', 700: '#1b2546' },
        ink: '#e8ecf6',
        muted: '#98a3c2',
        hull: '#f2a65a',
        glow: '#7dd3c8',
      },
      fontFamily: {
        sans: ['Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', 'system-ui', 'sans-serif'],
      },
    },
  },
}
