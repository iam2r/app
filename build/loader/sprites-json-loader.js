const loaderUtils = require('loader-utils');
const path = require("path");
const utils = require("./utils");

module.exports = async function (content) {
    const options = loaderUtils.getOptions(this) || {};
    const basename = path.basename(this.resourcePath, ".sprites.json");
    const pngSrc = path.join(this.context, basename + ".png");  
    let pngName = options.name ? options.name.replace('[name]', basename).replace('[ext]', 'png') : '[contenthash].png';
    let pngContext = await utils.readFile(pngSrc);
    let oldPngName = basename + ".png";
    let newPngName = path.basename(utils.getOutputPath(utils.emitFile(this, pngContext, pngName)));
    return utils.emitFile(this, content.replace(oldPngName, newPngName));
}