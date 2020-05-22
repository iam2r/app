const { apps } = require("./build/const");
let plugins = {
  autoprefixer: {},
};
switch (process.env.APP_NAME) {
  case apps.blog:
    plugins = {
      ...plugins,
      autoprefixer: {},
      "postcss-px-to-viewport": {
        viewportWidth: 375,
      },
    };
    break;
  case apps.birthday:
    plugins = {
      ...plugins,
      autoprefixer: {},
      "postcss-px2rem-exclude": {
        remUnit: 100,
        exclude:/_adapter/
      }
    };
    break;
  default:
    break;
}

module.exports = {
  plugins,
};
