import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAF8",
        "primary-text": "#1a1a2e",
        accent: "#1e3a5f",
        gold: "#C9A227",
        "gold-light": "#E8C84A",
        "border-subtle": "#e5e7eb",
        card: "#ffffff",
        "card-hover": "#f9f9f7",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        float: "float 4s ease-in-out infinite",
      },
      opacity: {
        "8": "0.08",
        "15": "0.15",
      },
      typography: {
        editorial: {
          css: {
            "--tw-prose-body": "#1a1a2e",
            "--tw-prose-headings": "#1e3a5f",
            "--tw-prose-links": "#C9A227",
            "--tw-prose-bold": "#1a1a2e",
            "--tw-prose-code": "#1e3a5f",
            "--tw-prose-quotes": "#1e3a5f",
            "--tw-prose-quote-borders": "#C9A227",
            maxWidth: "72ch",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
