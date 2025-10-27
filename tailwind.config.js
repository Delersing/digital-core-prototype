/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0e1a',
        card: '#151b2e',
        primary: '#e0e6f0',
        secondary: '#8b93a8',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        accent: '#06b6d4',
        purple: '#8b5cf6',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          from: { boxShadow: '0 0 5px #06b6d4, 0 0 10px #06b6d4, 0 0 15px #06b6d4' },
          to: { boxShadow: '0 0 10px #06b6d4, 0 0 20px #06b6d4, 0 0 30px #06b6d4' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
