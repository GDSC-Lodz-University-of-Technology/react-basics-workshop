import catppuccin from "@catppuccin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
      },
    },
  },
  plugins: [
    catppuccin({
      defaultFlavour: "mocha",
    }),
  ],
};
