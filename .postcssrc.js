let plugins = {
  autoprefixer: {},
};
switch (process.env.APP_NAME) {
  case "blog":
    plugins = {
      ...plugins,
      autoprefixer: {},
      "postcss-px-to-viewport": {
        viewportWidth: 375,
      },
    };
    break;
  case "birthday":
    plugins = {
      ...plugins,
      autoprefixer: {},
      "postcss-px2rem-exclude": {
        remUnit: 100,
      }
    };
    break;
  default:
    break;
}

module.exports = {
  plugins,
};
