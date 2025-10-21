/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // gray-200
        input: "var(--color-input)", // gray-50
        ring: "var(--color-ring)", // blue-500
        background: "var(--color-background)", // white
        foreground: "var(--color-foreground)", // slate-800
        primary: {
          DEFAULT: "var(--color-primary)", // green-900
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // orange-600
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-500
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // gray-50
          foreground: "var(--color-muted-foreground)", // gray-500
        },
        accent: {
          DEFAULT: "var(--color-accent)", // blue-500
          foreground: "var(--color-accent-foreground)", // white
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white
          foreground: "var(--color-popover-foreground)", // slate-800
        },
        card: {
          DEFAULT: "var(--color-card)", // white
          foreground: "var(--color-card-foreground)", // slate-800
        },
        success: {
          DEFAULT: "var(--color-success)", // green-500
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // yellow-500
          foreground: "var(--color-warning-foreground)", // white
        },
        error: {
          DEFAULT: "var(--color-error)", // red-500
          foreground: "var(--color-error-foreground)", // white
        },
        // Brand-specific colors
        "harvest-orange": {
          DEFAULT: "var(--color-harvest-orange)", // orange-500
          foreground: "var(--color-harvest-orange-foreground)", // white
        },
        "trust-blue": {
          DEFAULT: "var(--color-trust-blue)", // blue-700
          foreground: "var(--color-trust-blue-foreground)", // white
        },
        "conversion-cta": {
          DEFAULT: "var(--color-conversion-cta)", // deep-orange-500
          foreground: "var(--color-conversion-cta-foreground)", // white
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 2vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 2.5vw, 1rem)',
        'fluid-base': 'clamp(1rem, 3vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 3.5vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 4vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 4.5vw, 2rem)',
        'fluid-3xl': 'clamp(2rem, 5vw, 3rem)',
        'fluid-hero': 'clamp(1.2rem, 4vw, 3.2rem)',
      },
      spacing: {
        'golden-xs': 'var(--spacing-xs)', // 8px
        'golden-sm': 'var(--spacing-sm)', // 13px
        'golden-md': 'var(--spacing-md)', // 21px
        'golden-lg': 'var(--spacing-lg)', // 34px
        'golden-xl': 'var(--spacing-xl)', // 55px
      },
      animation: {
        'community-pulse': 'communityPulse 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
        'availability-pulse': 'availabilityPulse 2s ease-in-out infinite',
        'color-breathe': 'colorBreathe 5s ease-in-out infinite',
      },
      keyframes: {
        communityPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
        availabilityPulse: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        colorBreathe: {
          '0%, 100%': { filter: 'hue-rotate(0deg)' },
          '50%': { filter: 'hue-rotate(14deg)' },
        },
      },
      boxShadow: {
        'organic': '0 2px 4px rgba(45, 80, 22, 0.1), 0 8px 16px rgba(45, 80, 22, 0.1)',
        'organic-lg': '0 4px 8px rgba(45, 80, 22, 0.12), 0 12px 24px rgba(45, 80, 22, 0.12)',
        'trust-glow': '0 0 20px rgba(45, 80, 22, 0.3)',
      },
      transitionTimingFunction: {
        'organic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'progress': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}