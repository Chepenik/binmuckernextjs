import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Preserve existing
        currencyGreen: '#85BB65',
        treasuryGold: '#BF9B30',
        gradientStart: '#6EE7B7',
        gradientEnd: '#3B82F6',

        // Luxury Golds
        gold: {
          50: '#FEF9E7',
          100: '#FCF0C4',
          200: '#F7E08A',
          300: '#F1C654',
          400: '#E8A912',
          500: '#D4920A',
          600: '#B87708',
          700: '#8B5A0B',
          800: '#6B4507',
          900: '#4A2F05',
        },
        metallic: '#FFD700',
        champagne: '#F7E7CE',
        bitcoin: '#F7931A',

        // Neon Accents
        neon: {
          cyan: '#00FFFF',
          blue: '#00D4FF',
          magenta: '#FF00FF',
          pink: '#FF10F0',
          purple: '#BF00FF',
          green: '#39FF14',
        },
        electric: '#0080FF',
        laser: '#FF073A',
        hologram: '#E0F7FF',

        // Dark Backgrounds
        void: '#000000',
        cyber: {
          black: '#0A0A0F',
          900: '#0D1117',
          800: '#161B22',
          700: '#21262D',
          600: '#30363D',
          500: '#484F58',
        },
        night: {
          purple: '#1A0A2E',
          blue: '#0A1628',
        },
      },

      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-orbitron)', 'Orbitron', 'Inter', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },

      spacing: {
        '18': '4.5rem',
        '108': '27rem',
      },

      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)',
        'neon-gold': '0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3)',
        'neon-magenta': '0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.3)',
        'neon-purple': '0 0 20px rgba(191, 0, 255, 0.5), 0 0 40px rgba(191, 0, 255, 0.3)',
        'neon-green': '0 0 20px rgba(57, 255, 20, 0.5), 0 0 40px rgba(57, 255, 20, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'inner-glow': 'inset 0 0 20px rgba(255, 215, 0, 0.1)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.1)',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-mesh': `radial-gradient(at 40% 20%, rgba(0,255,255,0.15) 0px, transparent 50%),
                       radial-gradient(at 80% 0%, rgba(255,215,0,0.1) 0px, transparent 50%),
                       radial-gradient(at 0% 50%, rgba(191,0,255,0.1) 0px, transparent 50%),
                       radial-gradient(at 80% 100%, rgba(0,255,255,0.1) 0px, transparent 50%)`,
        'cyber-grid': `linear-gradient(rgba(255, 215, 0, 0.03) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(255, 215, 0, 0.03) 1px, transparent 1px)`,
        'gold-gradient': 'linear-gradient(135deg, #F7931A 0%, #FFD700 50%, #D4920A 100%)',
        'neon-gradient': 'linear-gradient(90deg, #00FFFF, #FF00FF, #00FFFF)',
      },

      backgroundSize: {
        'grid': '50px 50px',
      },

      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'neon-flicker': 'neon-flicker 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'border-flow': 'border-flow 3s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },

      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.2)' },
        },
        'neon-flicker': {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.3' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.5' },
          '97%': { opacity: '1' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      backdropBlur: {
        xs: '2px',
      },

      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
