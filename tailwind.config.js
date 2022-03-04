module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'main': "url('/public/images/todo-bg-2.jpg')",
      },
      aspectRatio: {
        "bg": "2880/1619"
      },
      fontFamily: {
        "userBtn": ["-apple-system,BlinkMacSystemFont", "Segoe UI", "Helvetica", "Arial", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji"],
        "fontBase": ["Inter var", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
        "header": ["Roboto", "sans-serif"],
      },
      colors: {
        "bgColor": "#00000098",
        "footerBg": "#171717",
        "baseRed": "#EF4444",
        "baseText": "#CBD5E1",
        "tim": "rgba(112,9,73)"
      },
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))'
      },
      fontSize: {
        // "body":""
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
