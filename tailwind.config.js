/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cyber-primary": "#00ff9f",
        "cyber-bg": "rgba(0, 0, 0, 0.3)",
        "cyber-bg-hover": "rgba(0, 0, 0, 0.4)",
        "cyber-bg-active": "rgba(0, 0, 0, 0.5)",
        "cyber-text": "#fff",
        "cyber-text-secondary": "rgba(255, 255, 255, 0.7)",
      },
      boxShadow: {
        cyber: "0 0 10px rgba(0, 255, 159, 0.2)",
        "cyber-active": "0 0 15px rgba(0, 255, 159, 0.3)",
        "cyber-elevated": "0 4px 12px rgba(0, 255, 159, 0.2)",
      },
      transitionProperty: {
        cyber: "all",
      },
      transitionDuration: {
        cyber: "300ms",
      },
      transitionTimingFunction: {
        cyber: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
