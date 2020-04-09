const { polyfills, demandList, appsTypes } = require("./build/config");

module.exports = {
  presets: [
    [
      require("./build/plugin/babel/preset-app"),
      {
        polyfills,
        appsTypes,
        demandList,
        modules:"commonjs"
      }
    ]
  ]
};
