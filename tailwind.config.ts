import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",    // All JavaScript, TypeScript, JSX, TSX, and MDX files in src and its subdirectories
    "./components/**/*.{js,ts,jsx,tsx,mdx}",  // All JavaScript, TypeScript, JSX, TSX, and MDX files in components and its subdirectories
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",  // All JavaScript, TypeScript, JSX, TSX, and MDX files in pages and its subdirectories
    "./app/**/*.{js,ts,jsx,tsx,mdx}",    // All JavaScript, TypeScript, JSX, TSX, and MDX files in app and its subdirectories
    "./admin/**/*.{js,ts,jsx,tsx,mdx}"   // All JavaScript, TypeScript, JSX, TSX, and MDX files in admin and its subdirectories
    
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('daisyui'), 
    require('@tailwindcss/aspect-ratio')
  ],
  daisyui: {
    themes: ["light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset"],
  },
};
export default config;
