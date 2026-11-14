/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9', // Primary violet
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
        },
        sidebar: {
          DEFAULT: '#0F172A', // Slate 900
          hover: '#1E293B',
          border: '#334155',
          muted: '#94A3B8',
        },
        accent: {
          amber: '#F59E0B',
          hover: '#D97706',
          light: '#FEF3C7',
        },
        softgray: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(109, 40, 217, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-hover': '0 10px 25px -3px rgba(109, 40, 217, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.06)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
        'glow': '0 0 25px -5px rgba(109, 40, 217, 0.35)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #6D28D9 0%, #4F46E5 100%)',
        'brand-gradient-hover': 'linear-gradient(135deg, #7C3AED 0%, #4338CA 100%)',
        'accent-gradient': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        'hero-gradient': 'radial-gradient(ellipse at top, rgba(109, 40, 217, 0.15), transparent 70%), radial-gradient(ellipse at bottom, rgba(79, 70, 229, 0.1), transparent 70%)',
      }
    },
  },
  plugins: [],
}

