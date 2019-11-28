const loaderUtils = require('loader-utils');
const path = require("path");
const utils = require("./utils");
const {
    sync
} = require('glob');
const readAtlas = async (loaderContext, atlasSrc, name) => {
    const options = loaderUtils.getOptions(loaderContext) || {};
    const contextDir = path.dirname(atlasSrc);
    const basename = path.basename(loaderContext.resourcePath, ".spine.json");
    const atlasName = name || (options.name ? options.name.replace('[name]', basename).replace('[ext]', 'atlas') : '[contenthash].png');
    const atlasContext = await utils.readJsonFile(atlasSrc);
    const atlasContextArr = atlasContext.split('\n');
    let newAtlasContextArr = JSON.parse(JSON.stringify(atlasContextArr));
    for (let i = 0; i < atlasContextArr.length; i++) {
        const line = atlasContextArr[i].trimRight();
        if (/\.png$/.test(line)) {
            const pngUrl = path.join(contextDir, line);
            const pngName = options.name ? options.name.replace('[name]', line.replace(".png", "")).replace('[ext]', 'png') : '[contenthash].png';
            const pngContext = await utils.readFile(pngUrl);
            newAtlasContextArr[i] = path.basename(utils.getOutputPath(utils.emitFile(loaderContext, pngContext, pngName)))
        } else if (/\.atlas$/.test(line)) {
            const lines = /\[lan\]\//.test(line) ? sync(path.resolve(contextDir, '*')).map(path => {
                let result = path.match(/[a-z]{2}_[a-z]{2}/);
                return {
                    lan: result && result[0],
                    line: result && line.replace('[lan]', result[0])
                }
            }).filter(({
                lan
            }) => Boolean(lan)) : [{
                lan: '',
                line,
            }];

            for (let j = 0; j < lines.length; j++) {
                let {
                    lan,
                    line
                } = lines[j];
                const src = path.join(contextDir, line);
                lan = lan ? '.' + lan : lan
                const atlasName = options.name ? options.name.replace('[name]', basename + lan).replace('[ext]', 'atlas') : `[contenthash]${lan}.png`;
                newAtlasContextArr[i + j] = path.basename(await readAtlas(loaderContext, src, atlasName))
            }
        }
    }
    return utils.getOutputPath(utils.emitFile(loaderContext, newAtlasContextArr.join('\n'), atlasName));
}

module.exports = async function (content) {
    const options = loaderUtils.getOptions(this) || {};
    const basename = path.basename(this.resourcePath, options.suffix);
    const atlasSrc = path.join(this.context, basename + ".atlas");
    const jsonName = (await readAtlas(this, atlasSrc)).replace(".atlas", ".json");
    return utils.emitFile(this, content, jsonName);
}