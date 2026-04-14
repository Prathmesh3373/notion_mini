/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        notelite: {
          bg: "#0b0b0c",
          panel: "#141416",
          panelSoft: "#1b1b1f",
          card: "#202026",
          border: "#2d2d33",
          muted: "#9b9aa3",
          faint: "#686873",
          accent: "#d8d8df",
        },
      },
      boxShadow: {
        glow: "0 24px 80px rgba(0, 0, 0, 0.34)",
      },
    },
  },
  plugins: [],
};
