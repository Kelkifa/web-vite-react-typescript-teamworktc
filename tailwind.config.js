module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'main': "url('/public/images/todo-bg-2.jpg')",
        "home": "url('/public/images/Ornament.svg')"
      },
      aspectRatio: {
        "bg": "2880/1619"
      },
      fontFamily: {
        "icon": "Inter, sans-serif",
        "small": "Nunito Sans, sans-serif",
      },
      colors: {
        "mygreen": "#A8FF35",
        "mygreendark1": "#87D322",
        "mygreendark2": "#8CC83A",
        "myorange": "#EB4921",
        "myorangedark": "#9E2B0E",
        "mygray": "#2B2B2B",
        "bgColor": "#000000ad",
        "footerBg": "#171717",
        "baseRed": "#EF4444",
        "baseText": "#CBD5E1",
        "baseOrange": "#fb923c",
        "tim": "rgba(112,9,73)"
      },
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))'
      },
      fontSize: {
        myMd: "18px",
        base: "14px",
        h: "1.5rem",
        mobile: "7px"
      },
      spacing: {
        ptheader: "11rem"
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
