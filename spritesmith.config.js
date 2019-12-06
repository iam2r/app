const SpritesmithPlugin = require('webpack-spritesmith');
let plugins = [

]

switch (process.env.APP_NAME) {
    case 'spritesmith':
        var assetsName = 'emoji';
        var assetsPath = `${process.env.APP_ROOT}/assets/${assetsName}`
        plugins = [
            new SpritesmithPlugin({
                spritesmithOptions: {
                    padding: 1,
                },
                src: {
                    cwd: assetsPath,
                    glob: '*.png'
                },
                target: {
                    image: `${assetsPath}/_spritesmith/${assetsName}.png`,
                    css: [
                        `${assetsPath}/_spritesmith/${assetsName}.css`,
                        `${assetsPath}/_spritesmith/${assetsName}.less`,
                        `${assetsPath}/_spritesmith/${assetsName}.scss`,
                    ]
                },
                apiOptions: {
                    cssImageRef: `~app.root/assets/${assetsName}/_spritesmith/${assetsName}.png`
                }
            })
        ]
        break;
    case 'treasure-hunter':
        var assetsName = 'main';
        var assetsPath = `${process.env.APP_ROOT}/assets/sprites/${assetsName}`
        plugins = [
            new SpritesmithPlugin({
                spritesmithOptions: {
                    padding: 1,
                },
                src: {
                    cwd: assetsPath,
                    glob: '*.png'
                },
                target: {
                    image: `${assetsPath}/_spritesmith/${assetsName}.png`,
                    css: [
                        [`${assetsPath}/_spritesmith/${assetsName}.sprites.json`, {
                            format: 'json_texture'
                        }]
                    ]
                },

                apiOptions: {
                    cssImageRef: `${assetsName}.png`
                }
            })
        ]
    case 'home':
        var assetsName = 'main';
        var assetsPath = `${process.env.APP_ROOT}/assets/images`
        plugins = [
            new SpritesmithPlugin({
                spritesmithOptions: {
                    padding: 1,
                },
                src: {
                    cwd: assetsPath,
                    glob: '*.png'
                },
                target: {
                    image: `${assetsPath}/_spritesmith/${assetsName}.png`,
                    css: [
                        [`${assetsPath}/_spritesmith/${assetsName}.scss`]
                    ]
                },

                apiOptions: {
                    cssImageRef: `~app.root/assets/images/_spritesmith/${assetsName}.png`
                }
            })
        ]
    default:
        break;
}

module.exports = {
    plugins
}