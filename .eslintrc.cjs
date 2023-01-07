module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parser: "vue-eslint-parser",
  plugins: ["vue"],
  rules: {},
  ignorePatterns: ["Trial.vue", "backend/"],
};
