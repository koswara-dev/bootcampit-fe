/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ef6c00", // Using an orange hue matching the mockup images
      },
    },
  },
  plugins: [],
}

