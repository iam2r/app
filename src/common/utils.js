"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var _this = this;
exports.__esModule = true;
exports.updateUrl2Blob = exports.updateObject = exports.$typeof = exports.loadFont = exports.loadImage2Blob = exports.loadImage = exports.loadSound = exports.loadJson = exports.loadScripts = void 0;
exports.loadScripts = function (scripts, parallel) {
  if (parallel === void 0) {
    parallel = false;
  }
  return __awaiter(void 0, void 0, void 0, function () {
    var loadScript, result, index, _a, _b;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          scripts = Array.isArray(scripts) ? scripts : [scripts];
          loadScript = function (script) {
            return new Promise(function (resolve, reject) {
              var $script = document.createElement("script");
              var $fjs = document.querySelector("script");
              for (var key in script) {
                $script.setAttribute(key, script[key]);
              }
              $fjs.parentNode.insertBefore($script, $fjs);
              $script.onload = function () {
                resolve($script);
              };
            });
          };
          if (!parallel) return [3 /*break*/, 1];
          return [
            2 /*return*/,
            Promise.all(
              scripts.map(function (script) {
                return loadScript(script);
              })
            ),
          ];
        case 1:
          result = [];
          index = 0;
          _c.label = 2;
        case 2:
          if (!(index < scripts.length)) return [3 /*break*/, 5];
          _a = result;
          _b = index;
          return [4 /*yield*/, loadScript(scripts[index])];
        case 3:
          _a[_b] = _c.sent();
          _c.label = 4;
        case 4:
          index++;
          return [3 /*break*/, 2];
        case 5:
          return [2 /*return*/, result];
      }
    });
  });
};
exports.loadJson = function (url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(JSON.parse(xhr.response));
      }
    };
  });
};
exports.loadSound = function (url) {
  return new Promise(function (resolve, reject) {
    var media = new Audio();
    media.oncanplay = function () {
      resolve(media);
    };
    media.onerror = function () {
      reject("load error:" + url);
    };
    media.src = url;
    if (navigator.userAgent.match(/iPhone|iPod|iPad/i) != null) {
      setTimeout(function () {
        //兼容ios不触发oncanplay
        media.load();
      }, 0);
    }
  });
};
exports.loadImage = function (url, isBlob) {
  if (isBlob === void 0) {
    isBlob = false;
  }
  return new Promise(function (resolve, reject) {
    if (isBlob) {
      var xhr_1 = new XMLHttpRequest();
      xhr_1.open("GET", url, true);
      xhr_1.responseType = "blob";
      xhr_1.onreadystatechange = function () {
        if (xhr_1.readyState == 4 && xhr_1.status == 200) {
          resolve(URL.createObjectURL(xhr_1.response));
        }
      };
      xhr_1.send();
    } else {
      var img_1 = new Image();
      img_1.onload = function () {
        resolve(img_1);
      };
      img_1.onerror = function () {
        reject("load error:" + url);
      };
      img_1.src = url;
    }
  });
};
exports.loadImage2Blob = function (url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        var blob = URL.createObjectURL(this.response);
        resolve(blob);
      } else {
        reject();
      }
    };
    xhr.responseType = "blob";
    xhr.send();
  });
};
exports.loadFont = function (tools, families) {
  var observers = [];
  families.forEach(function (str) {
    var strModel = str.split(":");
    var family = strModel[0];
    var variations = strModel[1] ? strModel[1].split(",") : ["n4"];
    variations.forEach(function (variation) {
      var match = variation.match(/^([nio])([1-9])$/i);
      if (match) {
        var style =
          match[1] == "n" ? "normal" : match[1] == "i" ? "italic" : "oblique";
        var weight = parseInt(match[2], 10) + "00";
        observers.push(
          new tools(family, { style: style, weight: weight }).load()
        );
      }
    });
  });
  return Promise.all(observers);
};
exports.$typeof = function (target) {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
};
exports.updateObject = function (obj) {
  var objArr = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    objArr[_i - 1] = arguments[_i];
  }
  if (!objArr) return;
  objArr.forEach(function (ob) {
    for (var k in ob) {
      if (obj[k] instanceof Array) {
        obj[k] = ob[k];
      } else if (typeof obj[k] === "object") {
        _this.updateObject(obj[k], ob[k]);
      } else {
        obj[k] = ob[k];
      }
      ob[k] = null;
    }
  });
};
exports.updateUrl2Blob = function (url, blob) {
  Array.from(document.styleSheets).forEach(function (styleSheet) {
    Array.from(styleSheet.rules)
      .filter(function (cssRule) {
        return cssRule.cssText.includes(url);
      })
      .forEach(function (cssRule) {
        return (cssRule.style.backgroundImage = "url(" + blob + ")");
      });
  });
};

export const loadScripts = async (scripts, parallel = false) => {
  scripts = Array.isArray(scripts) ? scripts : [scripts];

  const loadScript = (script) =>
    new Promise((resolve, reject) => {
      const $script = document.createElement("script");
      const $fjs = document.querySelector("script");
      for (const key in script) {
        $script.setAttribute(key, script[key]);
      }
      $fjs.parentNode.insertBefore($script, $fjs);
      $script.onload = () => {
        resolve($script);
      };
    });

  if (parallel) {
    return Promise.all(scripts.map((script) => loadScript(script)));
  } else {
    const result = [];
    for (let index = 0; index < scripts.length; index++) {
      result[index] = await loadScript(scripts[index]);
    }
    return result;
  }
};
