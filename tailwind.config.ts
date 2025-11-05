import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        // Trust Blue - Primary Medical Color
        'trust-blue': {
          DEFAULT: '#0077be',
          dark: '#005a8b',
          light: '#e6f2f8',
          50: '#f0f8ff',
          100: '#e6f2f8',
          500: '#0077be',
          700: '#005a8b',
          900: '#003d5c',
        },
        
        // Success Green - Medical Safety
        'success-green': {
          DEFAULT: '#4caf50',
          dark: '#388e3c',
          light: '#e8f5e9',
          50: '#f1f8f4',
          100: '#e8f5e9',
          500: '#4caf50',
          700: '#388e3c',
        },
        
        // Prestige Gold - Premium Indicators
        'prestige-gold': {
          DEFAULT: '#d4af37',
          dark: '#b8941f',
          light: '#f5edd6',
        },
        
        // Morocco Cultural Colors
        'morocco-green': '#006233',
        'sahara-warm': '#e8d5b7',
        
        // Neutral Palette (Extended)
        'neutral': {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        
        // Existing shadcn/ui colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          50: "hsl(var(--primary-50))",
          100: "hsl(var(--primary-100))",
          200: "hsl(var(--primary-200))",
          300: "hsl(var(--primary-300))",
          400: "hsl(var(--primary-400))",
          500: "hsl(var(--primary-500))",
          600: "hsl(var(--primary-600))",
          700: "hsl(var(--primary-700))",
          800: "hsl(var(--primary-800))",
          900: "hsl(var(--primary-900))",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        success: {
          50: "hsl(var(--success-50))",
          100: "hsl(var(--success-100))",
          500: "hsl(var(--success-500))",
          600: "hsl(var(--success-600))",
          700: "hsl(var(--success-700))",
        },
        warning: {
          50: "hsl(var(--warning-50))",
          100: "hsl(var(--warning-100))",
          500: "hsl(var(--warning-500))",
          600: "hsl(var(--warning-600))",
        },
        error: {
          50: "hsl(var(--error-50))",
          100: "hsl(var(--error-100))",
          500: "hsl(var(--error-500))",
          600: "hsl(var(--error-600))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.04)',
        medium: '0 4px 12px rgba(0, 0, 0, 0.08)',
        strong: '0 8px 24px rgba(0, 0, 0, 0.12)',
        'glow-blue': '0 0 20px rgba(0, 119, 190, 0.3)',
        'glow-green': '0 0 20px rgba(76, 175, 80, 0.3)',
      },
      
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        // Apple-inspired animations
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.95' },
        },
        'count-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        
        // Existing shadcn animations
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        // Apple-inspired animations
        'breathe': 'breathe 2s ease-in-out infinite',
        'count-up': 'count-up 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-in-left': 'slide-in-left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'shake': 'shake 0.5s ease-in-out',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        
        // Existing shadcn animations
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
  ],
} satisfies Config;
