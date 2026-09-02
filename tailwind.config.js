/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#05070E',
          dark: '#030408',
          subtle: '#080C17',
          card: '#0A0E1F',
          code: '#0B0F24',
        },
        evervault: {
          purple: '#7C3AED',
          violet: '#8B5CF6',
          indigo: '#6366F1',
          accent: '#A78BFA',
          glow: 'rgba(124, 58, 237, 0.45)',
          light: '#C4B5FD',
        },
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.03)',
          border: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.06)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'evervault-ambient': 'radial-gradient(ellipse 100% 70% at 50% 120%, rgba(124, 58, 237, 0.4), rgba(99, 102, 241, 0.15), transparent 70%)',
        'card-glow-left': 'radial-gradient(circle at 10% 20%, rgba(124, 58, 237, 0.28), transparent 45%)',
        'card-glow-right': 'radial-gradient(circle at 90% 20%, rgba(99, 102, 241, 0.28), transparent 45%)',
        'subtle-grid': 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '40px',
      },
      boxShadow: {
        'evervault-glow': '0 0 60px -15px rgba(124, 58, 237, 0.5)',
        'card-subtle': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'btn-glow': '0 0 25px rgba(124, 58, 237, 0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
