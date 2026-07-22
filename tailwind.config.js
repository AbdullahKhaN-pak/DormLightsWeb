/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#ffd584",
        "primary-container": "#f4b400",
        "primary-fixed": "#ffdea3",
        "primary-fixed-dim": "#fdbc13",
        "on-primary": "#402d00",
        "on-primary-container": "#654800",
        "background": "#131313",
        "on-background": "#e5e2e1",
        "surface": "#131313",
        "surface-container-lowest": "#0e0e0e",
        "surface-container-low": "#1c1b1b",
        "surface-container": "#201f1f",
        "surface-container-high": "#2a2a2a",
        "surface-container-highest": "#353534",
        "surface-bright": "#3a3939",
        "on-surface": "#e5e2e1",
        "on-surface-variant": "#d4c4ac",
        "secondary": "#c6c6c7",
        "secondary-container": "#454747",
        "on-secondary": "#2f3131",
        "tertiary": "#dddad9",
        "outline": "#9d8f78",
        "outline-variant": "#504533",
        "error": "#ffb4ab",
        "error-container": "#93000a"
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      spacing: {
        "container-max": "1440px",
        "edge-margin-desktop": "80px",
        "edge-margin-mobile": "24px",
        "gutter": "32px",
        "stack-xl": "120px",
        "stack-md": "64px"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        geist: ["Geist", "sans-serif"],
        display: ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}
