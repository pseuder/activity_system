/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "login-bg-large": "url('/src/assets/image/loginBG.svg')",
        "signup-bg-large": "url('/src/assets/image/signupBG.svg')",
        "login-bg-small": "url('/src/assets/image/loginBG_phone.svg')",
        "explore-bg-large": "url('/src/assets/image/exploreBG.svg')",
        "facebook-icon": "url('/src/assets/image/Facebook.svg')",
        "google-icon": "url('/src/assets/image/Google.svg')",
        "linkedin-icon": "url('/src/assets/image/Linkedin.svg')",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin"),],
};
