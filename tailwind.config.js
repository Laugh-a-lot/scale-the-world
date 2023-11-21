/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      secondary: "#aec2c7",
      lagoon:
        "radial-gradient( circle at 50% 50%, rgb(var(--dt_color-plt-lagoon-10)) 20%, transparent 80% ), conic-gradient( from 45deg at 50% 50%, rgb(var(--dt_color-plt-lagoon-0)) 0%, rgb(var(--dt_color-plt-lagoon-10)) 25%, rgb(var(--dt_color-plt-lagoon-0)) 50%, rgb(var(--dt_color-plt-lagoon-10)) 75%, rgb(var(--dt_color-plt-lagoon-0)) 100% )",
      "dark-slate-gray": "#3c5c61",
      "light-slate-gray": "#1e262c",
      arsenic: "#3b5c65",
    },
    extend: {
      backgroundImage: {
        background: "linear-gradient(to top right, #3c5c61, #1e262c)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
