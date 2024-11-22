import type { Config } from "tailwindcss";

export default {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brown: {
          // 50: "#f7ede2",
          100: "#e3d5c6",
          // 200: "#c9b5a0",
          // 300: "#af947a",
          // 400: "#91775b",
          // 500: "#745a40",
          // 600: "#5b4632",
          // 700: "#423324",
          // 800: "#2a2117",
          // 900: "#15100b",
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
