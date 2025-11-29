/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f8f0',
          100: '#e8f0e0',
          200: '#d1e1c1',
          300: '#b2c99a',
          400: '#81a46a',
          500: '#81b29a', // Main brand color
          600: '#5a8f6f',
          700: '#4a735c',
          800: '#3d5c4d',
          900: '#344d41',
        },
        accent: {
          50: '#fef5f2',
          100: '#fde8e0',
          200: '#fbd0c0',
          300: '#f7b09a',
          400: '#f2856f',
          500: '#e07a5f', // Accent color
          600: '#cd5f4a',
          700: '#ab4c3c',
          800: '#8f4034',
          900: '#773a2f',
        },
        neutral: {
          50: '#f4f1ed',
          100: '#f2ede6',
          200: '#f2cc8f',
          300: '#e0a87f',
          400: '#d4a68f',
          500: '#c4a68f',
        },
        dark: {
          50: '#9ca3af',
          100: '#6b7280',
          200: '#4b5563',
          300: '#374151',
          400: '#1f2937',
          500: '#3d405b', // Dark text color
        },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        body: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

