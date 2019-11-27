const fs = require('fs');
const loaderUtils = require('loader-utils');
const isFileExists = dir => {
    return new Promise((resolve, reject) => {
        fs.access(dir, err => {
            if (err) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    });
}

const readFile = (dir, type) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dir, type, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

const readJsonFile = dir => {
    return readFile(dir, "utf-8");
}

const emitFile = (loaderContext, content, name) => {
    const options = loaderUtils.getOptions(loaderContext) || {};
    const context = options.context || loaderContext.rootContext;
    const url = loaderUtils.interpolateName(
        loaderContext,
        name || options.name || '[contenthash].[ext]', {
            context,
            content,
            regExp: options.regExp,
        }
    );

    let outputPath = url;
    if (options.outputPath) {
        if (typeof options.outputPath === 'function') {
            outputPath = options.outputPath(url, loaderContext.resourcePath, context);
        } else {
            outputPath = path.posix.join(options.outputPath, url);
        }
    }

    let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

    if (options.publicPath) {
        if (typeof options.publicPath === 'function') {
            publicPath = options.publicPath(url, loaderContext.resourcePath, context);
        } else {
            publicPath = `${
            options.publicPath.endsWith('/')
              ? options.publicPath
              : `${options.publicPath}/`
          }${url}`;
        }

        publicPath = JSON.stringify(publicPath);
    }

    if (options.postTransformPublicPath) {
        publicPath = options.postTransformPublicPath(publicPath);
    }

    if (typeof options.emitFile === 'undefined' || options.emitFile) {
        loaderContext.emitFile(outputPath, content);
    }

    return `module.exports=${publicPath}`;

}

const getOutputPath = (str) => {
    return str.match(/\"(.+?)\"/)[1]
}

module.exports = {
    isFileExists,
    readFile,
    readJsonFile,
    emitFile,
    getOutputPath
};