const fs = require("fs");
const path = require("path");
const config = require("./config");
const os = require('os')
class Utils {
  constructor() {

  }

  getArgvByKey(key) {
    /*
          can't find    =>undefined
          --key         =>true
          --key=value   =>value
          --key value   =>value
      */
    let value = undefined;
    for (let index = 0; index < process.argv.length; index++) {
      const cur = process.argv[index],
        next = process.argv[index + 1];
      if (new RegExp(`^--${key}(=\\w+)?$`).test(cur)) {
        if (new RegExp(`^--${key}$`).test(cur)) { //--key value
          value = (!next || (next && new RegExp(`^--\\w+(=\\w+)?$`).test(next))) ? true : next;
        } else { //--key=value
          value = cur.split("=")[1]
        }
        break
      }
    }
    return value
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
    if (this.getArgvByKey("modern") == true) {
      return process.env.APP_NAME || JSON.parse(fs.readFileSync(path.resolve(__dirname, './plugin/webpack/const.json'), 'utf-8')).appName
    } else {
      return process.env.APP_NAME || this.getArgvByKey("app") || appName;
    }
  }

  isDev() {
    return process.env.NODE_ENV === "development";
  };

  isDll() {
    return this.getArgvByKey("dll") == true;
  }

  isReport() {

    if (this.getArgvByKey("modern") == true) {
      return JSON.parse(fs.readFileSync(path.resolve(__dirname, './plugin/webpack/const.json'), 'utf-8')).isReport
    } else {
      return this.getArgvByKey("report") == true
    }

  }

  getBuildMode() {
    return {
      normal: !this.getArgvByKey("modern"),
      legacy: this.getArgvByKey("modern") == "legacy",
      modern: this.getArgvByKey("modern") == true,
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