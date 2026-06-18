import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Centralised brand tokens - values come from CSS vars in globals.css (:root)
        "accent-strong": "var(--accent-strong)",
        "accent-hover": "var(--accent-hover-dark)",
        "underline-light": "var(--underline-light)",
        "underline-dark": "var(--underline-dark)",
        "card-surface": "rgb(var(--card-dark-rgb) / <alpha-value>)",
        "chip-surface": "var(--chip-dark)",
        // Brand accent: blue used across headings, highlights, and links.
        // Light mode uses the deep shade, dark mode the bright shade.
        accent: {
          DEFAULT: "var(--accent)",
          dark: "var(--accent-dark)",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
