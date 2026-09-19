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
        ink: "var(--tax-ink)",
        "iris-teal": "var(--tax-iris-teal)",
        brass: {
          DEFAULT: "var(--tax-brass)",
          light: "var(--tax-brass-light)",
          subtle: "var(--tax-brass-subtle)",
        },
        paper: {
          DEFAULT: "var(--tax-paper)",
          light: "var(--tax-paper-light)",
        },
        folio: "var(--tax-folio)",
        rule: {
          DEFAULT: "var(--tax-rule)",
          light: "var(--tax-rule-light)",
        },
        "stamp-red": "var(--tax-stamp-red)",
        ash: {
          DEFAULT: "var(--tax-ash)",
          light: "var(--tax-ash-light)",
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
