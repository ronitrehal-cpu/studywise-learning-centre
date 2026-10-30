/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#17325C', // primary: headings, buttons, footer
          navyDark: '#0E2243', // hover
          ink: '#16202E', // strong text, top rules
          slate: '#3E4A5B', // body text
          muted: '#5A6575', // captions, small labels
          sky: '#6FB3E0', // logo and illustration only, never text
          mist: '#F3F8FC', // alternate section background
          photo: '#DCE8F2', // image placeholders
          orange: '#C4531B', // rare accent only
          rule: '#C9D3DD', // light divider lines
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
