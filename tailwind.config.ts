import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ussh: {
          navy: {
            DEFAULT: '#0F2C59',
            deep: '#081730',
            dark: '#0A2042',
            light: '#1A3F7A',
            subtle: '#EDF3FB',
          },
          accent: {
            DEFAULT: '#B93815',
            hover: '#9E2A0B',
            light: '#FEF3F2',
            warm: '#D9531E',
          },
          cream: {
            50: '#FDFCF9',
            100: '#FBF8F1',
            200: '#F4ECE1',
            300: '#EADBC8',
          },
          gold: {
            DEFAULT: '#D97706',
            light: '#FEF3C7',
            dark: '#B45309',
          },
          border: '#E8DFD5',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(15, 44, 89, 0.06), 0 2px 6px -1px rgba(15, 44, 89, 0.04)',
        card: '0 10px 30px -4px rgba(15, 44, 89, 0.08), 0 4px 10px -2px rgba(15, 44, 89, 0.04)',
        hover: '0 20px 35px -4px rgba(15, 44, 89, 0.12), 0 8px 16px -2px rgba(15, 44, 89, 0.06)',
      },
      borderRadius: {
        '2xl': '1.25rem', // 20px
        '3xl': '1.5rem',   // 24px
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        ticker: 'ticker 28s linear infinite',
        'pulse-slow': 'pulseSlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
