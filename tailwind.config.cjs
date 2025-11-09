/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}","./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        up:   "#16a34a",   // green-600
        down: "#dc2626",   // red-600
        ink:  "#111827",   // gray-900
        muted:"#6B7280",   // gray-500
        wash: "#F3F4F6",   // gray-100
        line: "#E5E7EB"    // gray-200
      }
    }
  },
  plugins: []
}
