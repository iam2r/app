module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    'plugin:vue/strongly-recommended',
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
