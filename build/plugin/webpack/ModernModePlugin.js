const fs = require('fs-extra')
const path = require('path')

// https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc
const safariFix = `!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();`

class ModernModePlugin {
  constructor({ targetDir, isModernBuild, unsafeInline, publicPath }) {
    this.targetDir = targetDir
    this.isModernBuild = isModernBuild
    this.unsafeInline = unsafeInline
    this.publicPath = publicPath
  }
  apply(compiler) {
    if (!this.isModernBuild) {
      this.applyLegacy(compiler)
    } else {
      this.applyModern(compiler)
    }
  }

  applyLegacy(compiler) {
    const ID = `my-cli-legacy-bundle`
    compiler.hooks.compilation.tap(ID, compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(ID, async (data, cb) => {
        // get stats, write to disk
        await fs.ensureDir(this.targetDir)
        const htmlName = path.basename(data.plugin.options.filename)

        // Watch out for output files in sub directories
        const htmlPath = path.dirname(data.plugin.options.filename)
        const tempFilename = path.join(this.targetDir, htmlPath, `legacy-assets-${htmlName}.json`)
        const constFilename = path.join(__dirname, `const.json`)
        await fs.mkdirp(path.dirname(tempFilename))
        await Promise.all([fs.writeFile(tempFilename, JSON.stringify(data.body)), fs.writeFile(constFilename, JSON.stringify({ appName: process.env.APP_NAME, isReport: process.argv.includes("--report"), isTiny: process.argv.includes("--tiny") }))])
        cb()
      })
    })
  }

  applyModern(compiler) {
    const ID = `my-cli-modern-bundle`
    compiler.hooks.compilation.tap(ID, compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(ID, async (data, cb) => {
        // use <script type="module"> for modern assets
        data.body.forEach(tag => {
          if (tag.tagName === 'script' && tag.attributes) {
            tag.attributes.type = 'module'
          }
        })

        // use <link rel="modulepreload"> instead of <link rel="preload">
        // for modern assets
        data.head.forEach(tag => {
          if (tag.tagName === 'link' &&
            tag.attributes.rel === 'preload' &&
            tag.attributes.as === 'script') {
            tag.attributes.rel = 'modulepreload'
          }
        })

        // inject links for legacy assets as <script nomodule>
        const htmlName = path.basename(data.plugin.options.filename)
        // Watch out for output files in sub directories
        const htmlPath = path.dirname(data.plugin.options.filename)
        const tempFilename = path.join(this.targetDir, htmlPath, `legacy-assets-${htmlName}.json`)
        const constFilename = path.join(__dirname, `const.json`)
        const legacyAssets = JSON.parse(await fs.readFile(tempFilename, 'utf-8'))
          .filter(a => a.tagName === 'script' && a.attributes)
        legacyAssets.forEach(a => { a.attributes.nomodule = '' })

        if (this.unsafeInline) {
          // inject inline Safari 10 nomodule fix
          data.body.push({
            tagName: 'script',
            closeTag: true,
            innerHTML: safariFix
          })
        } else {
          // inject the fix as an external script
          const safariFixPath = legacyAssets[0].attributes.src.replace(new RegExp(`^${this.publicPath}`), '')
            .split('/')
            .slice(0, -1)
            .concat(['safari-nomodule-fix.js'])
            .join('/')

          compilation.assets[safariFixPath] = {
            source: function () {
              return new Buffer(safariFix)
            },
            size: function () {
              return Buffer.byteLength(safariFix)
            }
          }
          data.body.push({
            tagName: 'script',
            closeTag: true,
            attributes: {
              src: this.publicPath + '' + safariFixPath
            }
          })
        }

        data.body.push(...legacyAssets)
        await Promise.all([fs.remove(tempFilename), fs.remove(constFilename)])
        cb()
      })

      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(ID, data => {
        data.html = data.html.replace(/\snomodule="">/g, ' nomodule>')
      })
    })
  }
}

ModernModePlugin.safariFix = safariFix
module.exports = ModernModePlugin
