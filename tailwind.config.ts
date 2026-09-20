import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        ink: "rgb(var(--tax-ink-rgb) / <alpha-value>)",
        "iris-teal": "rgb(var(--palette-slate-rgb) / <alpha-value>)",
        brass: {
          DEFAULT: "rgb(var(--palette-coral-rgb) / <alpha-value>)",
          light: "rgb(var(--palette-coral-rgb) / <alpha-value>)",
          subtle: "rgb(var(--palette-coral-rgb) / 0.12)",
        },
        paper: {
          DEFAULT: "rgb(var(--tax-paper-rgb) / <alpha-value>)",
          light: "rgb(var(--tax-paper-light-rgb) / <alpha-value>)",
        },
        folio: "rgb(var(--tax-folio-rgb) / <alpha-value>)",
        rule: {
          DEFAULT: "rgb(var(--tax-rule-rgb) / <alpha-value>)",
          light: "rgb(var(--tax-rule-rgb) / 0.12)",
        },
        "stamp-red": "rgb(var(--palette-coral-rgb) / <alpha-value>)",
        ash: {
          DEFAULT: "rgb(var(--tax-ash-rgb) / <alpha-value>)",
          light: "rgb(var(--tax-ash-light-rgb) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--palette-coral-rgb) / <alpha-value>)",
          strong: "rgb(var(--palette-coral-hover-rgb) / <alpha-value>)",
          surface: "rgb(var(--palette-coral-rgb) / 0.14)",
        },
        palette: {
          slate: "rgb(var(--palette-slate-rgb) / <alpha-value>)",
          sky: "rgb(var(--palette-sky-rgb) / <alpha-value>)",
          frost: "rgb(var(--palette-frost-rgb) / <alpha-value>)",
          coral: "rgb(var(--palette-coral-rgb) / <alpha-value>)",
          gunmetal: "rgb(var(--palette-gunmetal-rgb) / <alpha-value>)",
        },
        theme: {
          primary: "var(--theme-primary)",
          "primary-hover": "var(--theme-primary-hover)",
          surface: "var(--theme-surface)",
          "surface-raised": "var(--theme-surface-raised)",
          background: "var(--theme-background)",
          text: "var(--theme-text)",
          "text-secondary": "var(--theme-text-secondary)",
          "text-muted": "var(--theme-text-muted)",
          border: "var(--theme-border)",
          accent: "var(--theme-accent)",
          success: "var(--theme-success)",
          danger: "var(--theme-danger)",
          glass: "var(--theme-glass-bg)",
          "glass-border": "var(--theme-glass-border)",
        },
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },
      fontFamily: {
        sans: ["'IBM Plex Sans'", "system-ui", "-apple-system", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "Cambria", "serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
        urdu: ["'Noto Nastaliq Urdu'", "'Jameel Noori Nastaleeq'", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
