/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Colours taken from the Studywise crest
          navy: '#16496A', // deep crest blue: headings, buttons, footer
          navyDark: '#0F3550', // hover
          ink: '#15222E', // strong text, top rules
          slate: '#3A4A58', // body text
          muted: '#56636F', // captions, small labels
          sky: '#2988BC', // crest blue: thin accent lines and timeline markers only, never small text
          mist: '#EAF4FA', // pale crest-blue section backgrounds
          photo: '#DCE8F2', // image placeholders
          orange: '#E36531', // crest orange: fills, lines and markers
          orangeText: '#B84A1C', // orange for text (passes contrast)
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
