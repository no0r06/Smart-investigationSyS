export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          background: '#050816',
          surface: '#0f172a',
          crimson: '#ff3b3f',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,59,63,0.16), 0 24px 80px rgba(255,59,63,0.18)',
      },
    },
  },
  plugins: [],
}
