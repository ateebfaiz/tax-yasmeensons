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
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        theme: {
          primary: "var(--theme-primary)",
          "primary-hover": "var(--theme-primary-hover)",
          "primary-subtle": "var(--theme-primary-subtle)",
          surface: "var(--theme-surface)",
          "surface-raised": "var(--theme-surface-raised)",
          background: "var(--theme-background)",
          muted: "var(--theme-muted)",
          text: "var(--theme-text)",
          "text-secondary": "var(--theme-text-secondary)",
          "text-muted": "var(--theme-text-muted)",
          "text-inverse": "var(--theme-text-inverse)",
          border: "var(--theme-border)",
          "border-light": "var(--theme-border-light)",
          "border-focus": "var(--theme-border-focus)",
          success: "var(--theme-success)",
          "success-subtle": "var(--theme-success-subtle)",
          danger: "var(--theme-danger)",
          "danger-subtle": "var(--theme-danger-subtle)",
          warning: "var(--theme-warning)",
          "warning-subtle": "var(--theme-warning-subtle)",
          info: "var(--theme-info)",
          "info-subtle": "var(--theme-info-subtle)",
          glass: "var(--theme-glass-bg)",
          "glass-border": "var(--theme-glass-border)",
        },
      },
      borderRadius: {
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2.25rem",
        full: "9999px",
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        urdu: ["'Noto Nastaliq Urdu'", "'Jameel Noori Nastaleeq'", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
