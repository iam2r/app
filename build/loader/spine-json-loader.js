const loaderUtils = require('loader-utils');
const path = require("path");
const utils = require("./utils");

const readAtlas = async (self, atlasSrc, options, basePath) => {
    const basename = path.basename(self.resourcePath, ".spine.json");
    let atlasName = options.name ? options.name.replace('[name]', basename).replace('[ext]', 'atlas') : '[contenthash].png';
    let atlasContext = await utils.readJsonFile(atlasSrc);
    let atlasContextArr = atlasContext.split('\n');
    for (var i = 0; i < atlasContextArr.length; i++) {
        const line = atlasContextArr[i].trimRight();
        if (/\.png$/.test(line)) {
            let pngUrl = path.join(basePath || self.context, line);
            let pngName = options.name ? options.name.replace('[name]', line.replace(".png", "")).replace('[ext]', 'png') : '[contenthash].png';
            let pngContext = await utils.readFile(pngUrl);
            atlasContextArr[i] = path.basename(utils.getOutputPath(utils.emitFile(self, pngContext, pngName)))
        } else if (/\.atlas$/.test(line)) {
            let url = path.join(basePath || self.context, line);
            let childBasePath = url.slice(0, url.lastIndexOf("\\") + 1);
            atlasContextArr[i] = path.basename(readAtlas(self, url, options, childBasePath))
        }
    }
    atlasContext = atlasContextArr.join('\n');
    return utils.getOutputPath(utils.emitFile(self, atlasContext, atlasName));
}

module.exports = async function (content) {
    const options = loaderUtils.getOptions(this) || {};
    const basename = path.basename(this.resourcePath, ".spine.json");
    const atlasSrc = path.join(this.context, basename + ".atlas");
    await readAtlas(this, atlasSrc, options);
    return utils.emitFile(this, content);
}