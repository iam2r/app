const { demandList, appsTypes } = require("./build/config");

module.exports = {
  presets: [
    [
      require("./build/plugin/babel/preset-app"),
      {
        appsTypes,
        demandList,
      }
    ]
  ]
};
