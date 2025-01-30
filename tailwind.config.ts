import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-light": "var(--background-light)",
        "background-faded": "var(--background-faded)",
        foreground: "var(--foreground)",
        "foreground-light": "var(--foreground-light)",
        "foreground-faded": "var(--foreground-faded)",
        "accent": "var(--accent)",
      },
    },
  },
  plugins: [],
} satisfies Config;
