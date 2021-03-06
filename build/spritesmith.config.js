const SpritesmithPlugin = require("webpack-spritesmith");
const path = require("path");
const { apps } = require("./const");
let plugins = [];

switch (process.env.APP_NAME) {
  case apps.home:
  case apps.birthday:
    var assetsName = "main";
    var assetsPath = `${process.env.APP_ROOT}/assets/images`;
    plugins = [
      new SpritesmithPlugin({
        spritesmithOptions: {
          padding: 1
        },
        src: {
          cwd: assetsPath,
          glob: ["*.png", "*.jpg"]
        },
        target: {
          image: `${assetsPath}/_spritesmith/${assetsName}.png`,
          css: [[`${assetsPath}/_spritesmith/${assetsName}.scss`]]
        },

        apiOptions: {
          cssImageRef: `~app.root/assets/images/_spritesmith/${assetsName}.png`,
          spritesheet_info: {
            name: assetsName + "-spritesheet"
          },
          generateSpriteName: fileName => {
            return (
              "sprite_" + path.parse(path.relative(assetsPath, fileName)).name
            );
          }
        }
      })
    ];
    break;
  case apps.treasure_hunter:
    const assetsList = ["main", "bg"];
    assetsList.forEach(assetsName => {
      const assetsPath = `${process.env.APP_ROOT}/assets/sprites/${assetsName}`;
      plugins.push(
        new SpritesmithPlugin({
          spritesmithOptions: {
            padding: 1
          },
          src: {
            cwd: assetsPath,
            glob: ["*.png", "*.jpg"]
          },
          target: {
            image: `${assetsPath}/_spritesmith/${assetsName}.png`,
            css: [
              [
                `${assetsPath}/_spritesmith/${assetsName}.sprites.json`,
                {
                  format: "json_texture"
                }
              ]
            ]
          },

          apiOptions: {
            cssImageRef: `${assetsName}.png`
          }
        })
      );
    });

    break;
  default:
    break;
}

module.exports = {
  plugins
};
