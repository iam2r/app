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

  isDev() {
    return process.env.NODE_ENV === "development";
  };

  isDll() {
    return process.argv.includes("--dll");
  }

  isModernBuild(){
    return process.env.BUILD_MODE == 'modernBuild'
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

  getModernConfig() {
    return {
      isModern: process.argv.includes("--modern"),
      isModernBuild: process.argv.includes("--modern") && !process.argv.includes("legacy")
    }
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