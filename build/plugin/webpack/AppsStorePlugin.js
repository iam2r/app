const fs = require('fs-extra')
const path = require('path')

class AppsStorePlugin {

    constructor({
        targetDir,
        reset
    }) {
        this.targetDir = targetDir;
        this.reset = reset;
    }
    apply(compiler) {
        this.init(compiler)
    }

    init(compiler) {
        const ID = `my-cli-apps-store`
        compiler.hooks.compilation.tap(ID, compilation => {
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(ID, async (data, cb) => {
                await fs.ensureDir(this.targetDir);
                const tempFilename = path.join(this.targetDir, `apps.json`);

                let content = {
                    apps: [process.env.APP_NAME]
                }

                if (await fs.exists(tempFilename)) {
                    if (this.reset) {
                        await fs.remove(tempFilename)
                    } else {
                        content = JSON.parse(await fs.readFile(tempFilename, 'utf-8'));
                    }
                }

                !content.apps.includes(process.env.APP_NAME) && content.apps.push(process.env.APP_NAME);
                await fs.writeFile(tempFilename, JSON.stringify(content));
                cb()
            })
        })
    }
}

module.exports = AppsStorePlugin