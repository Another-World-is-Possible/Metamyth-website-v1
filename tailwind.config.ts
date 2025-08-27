import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'deep-black': "var(--deep-black)",
        'forest-green': "var(--forest-green)",
        'ancient-gold': "var(--ancient-gold)",
        'silver': "var(--silver)",
        'mystical-teal': "var(--mystical-teal)",
        'crimson': "var(--crimson)",
        'dark-wine': "var(--dark-wine)",
        'cream-white': "var(--cream-white)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
      },
      fontFamily: {
        edensor: ["Edensor", "Alice", "serif"],
        alice: ["Alice", "serif"],
        angle: ["AngleFairy2024", "serif"],
        game: ["Thornelia2024", "serif"],
        king: ["KingSans2024", "sans-serif"],
        kardige: ["Kardige2024", "sans-serif"],
        sans: ["Mugient2024", "serif"],
        serif: ["AngleFairy2024", "serif"],
      },
      animation: {
        "spin-slow": "spin-slow 8s linear infinite",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "flicker": "flicker 3s ease-in-out infinite",
        "burn": "burn 0.8s ease-out forwards",
        "thread": "thread 1.2s ease-in-out forwards",
        "flash": "flash 0.6s ease-out forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
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
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
