const fs = require("fs");
const path = require("path");
const config = require("./config");
const os = require('os')
class Utils {
  constructor() {

  }



  getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (let devName in interfaces) {
      const iface = interfaces[devName];
      for (var i = 0; i < iface.length; i++) {
        var alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address;
        }
      }
    }
  }

  getFileNameList(path, suffix) {
    let fileList = [];
    let dirList = fs.readdirSync(path);
    dirList.forEach(item => {
      if (item.indexOf(suffix) > -1) {
        fileList.push(item.split(".")[0]);
      }
    });
    return fileList;
  }

  getAppName(appName) {
    if (process.argv.includes("--modern") && !process.argv.includes("legacy")) {
      return process.env.APP_NAME || JSON.parse(fs.readFileSync(path.resolve(__dirname, './plugin/webpack/const.json'), 'utf-8')).appName
    } else {
      return process.env.APP_NAME || (process.argv.includes("--app") && process.argv[process.argv.indexOf('--app') + 1]) || appName;
    }
  }

  isDev() {
    return process.env.NODE_ENV === "development";
  };

  isDll() {
    return process.argv.includes("--dll");
  }

  isReport() {

    if (process.argv.includes("--modern") && !process.argv.includes("legacy")) {
      return JSON.parse(fs.readFileSync(path.resolve(__dirname, './plugin/webpack/const.json'), 'utf-8')).isReport
    } else {
      return process.argv.includes("--report")
    }

  }

  getBuildMode() {
    return {
      normal: !process.argv.includes("--modern"),
      legacy: process.argv.includes("--modern") && process.argv.includes("legacy"),
      modern: process.argv.includes("--modern") && !process.argv.includes("modern"),
    }
  }

  getDllVendor() {
    const pkg = require("../package.json");
    return Object.keys(pkg.dependencies).reduce((pre, cur) => {
      let flag = true;
      let dllVendorBlackList = config.dllVendorBlackList;
      for (let index = 0; index < dllVendorBlackList.length; index++) {
        const reg = dllVendorBlackList[index];
        if (reg.test(cur)) {
          flag = false;
          break
        }
      }
      flag && pre.push(cur)
      return pre;
    }, []);
  }

  resolve(dir) {
    return path.join(__dirname, "..", dir);
  }

  assetsPath(_path_) {
    let assetsSubDirectory;
    if (!this.isDev()) {
      assetsSubDirectory = config.build.assetsSubDirectory; //可根据实际情况修改
    } else {
      assetsSubDirectory = config.dev.assetsSubDirectory;
    }
    return path.posix.join(assetsSubDirectory, _path_);
  }

  createHtmlChunks(cacheGroups) {
    return Object.entries(cacheGroups).reduce((pre, [key, val]) => {
      pre.push(val.name)
      return pre
    }, [])
  }

}

module.exports = new Utils();