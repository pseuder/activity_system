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
        "explore-bg-large": "url('/src/assets/image/mainBG.svg')",
        "facebook-icon": "url('/src/assets/image/Facebook.svg')",
        "google-icon": "url('/src/assets/image/Google.svg')",
        "linkedin-icon": "url('/src/assets/image/Linkedin.svg')",
      },
    },
  },
  plugins: [
    require("tw-elements/dist/plugin"),
    ({ addBase, addUtilities, addComponents }) => {
      addBase({
        h1: { "@apply text-4xl font-bold": {} },
        a: { "@apply cursor-pointer text-primary": {} },
        button: {
          "@apply cursor-pointer rounded-md  py-2 px-4 font-semibold text-white hover:bg-todark":
            {},
        },
      });

      addUtilities({
        /* text */
        ".text-shadow": { "text-shadow": "2px 2px 2px black;" },
        ".text-primary": { color: "#0d6efd" },
        ".text-gray": { "@apply text-gray-500": {} },
        /* background */
        ".bg-primary": { "background-color": "#0d6efd" },
        ".bg-warning": {
          background:
            "linear-gradient( 0deg, rgba(255, 255, 255, 0.8),rgba(255, 255, 255, 0.8)),#ffc107;",
        },
        ".bg-error": {
          background: "#F56C6C",
        },

        ".bg-gray": { "@apply  bg-gray-500": {} },
        ".bg-lightgray": { "@apply  bg-gray-300": {} },
        ".bg-todark": { "@apply filter brightness-90": {} },
        ".bg-tobright": { "@apply filter brightness-105": {} },
        /* border */
        ".border-primary": { "@apply border-[#0d6efd] border-2": "" },
      });

      addComponents({
        ".alert": {
          "@apply rounded-md py-2 px-4 hover:bg-tobright": {
            "box-shadow":
              "0px 4px 8px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.18);",
          },
        },
        ".alert-message": {
          "@apply rounded-md p-2 text-black  absolute top-10 w-[90%] left-1/2 z-[1]   max-w-lg -translate-x-1/2":
            {},
        },
        ".alert-primary": {
          color: "#004085",
          "background-color": "#cce5ff",
          "border-color": "#b8daff",
        },
        ".alert-warning": {
          color: "#856404",
          "background-color": "#fff3cd",
          "border-color": "#ffeeba",
        },
        ".alert-error": {
          color: "#721c24",
          "background-color": "#f8d7da",
          "border-color": "#f5c6cb",
        },
        ".main-bg": {
          "@apply overflow-auto bg-explore-bg-large bg-cover bg-fixed bg-center bg-no-repeat":
            {},
        },
        ".tag": {
          "@apply cursor-pointer  justify-center rounded-xl bg-gray-300 px-2 py-1 text-gray-500 hover:bg-todark":
            {},
        },
        ".dropdown-menu": {
          "@apply absolute z-50 float-left m-0 mt-1 hidden min-w-max list-none rounded-lg border-none bg-white bg-clip-padding py-2 text-left text-base shadow-lg":
            {},
        },
        ".dropdown-item": {
          "@apply block w-full whitespace-nowrap bg-transparent py-2 px-4  text-base font-normal text-gray-700 hover:bg-gray-100":
            {},
        },
        ".ant-btn-primary": {
          background: "#1890ff;",
        },
      });
    },
  ],
};
