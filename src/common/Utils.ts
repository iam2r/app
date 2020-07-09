export const loadScripts = async (
  scripts: { id: string; url: string } | { id: string; url: string }[],
  parallel = false
) => {
  scripts = Array.isArray(scripts) ? scripts : [scripts];

  const loadScript = (script: { id: string; url: string }) =>
    new Promise((resolve, reject) => {
      const $script = document.createElement("script");
      const $fjs = document.querySelector("script");
      $script.id = script.id;
      $script.src = script.url;
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

export const loadJson = (url: string) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(JSON.parse(xhr.response));
      }
    };
  });
};

export const loadSound = (url: string) => {
  return new Promise((resolve, reject) => {
    const media = new Audio();
    media.oncanplay = () => {
      resolve(media);
    };

    media.onerror = () => {
      reject("load error:" + url);
    };
    media.src = url;

    if (navigator.userAgent.match(/iPhone|iPod|iPad/i) != null) {
      setTimeout(() => {
        //兼容ios不触发oncanplay
        media.load();
      }, 0);
    }
  });
};

export const loadImage = (url: string, isBlob: boolean = false) => {
  return new Promise((resolve, reject) => {
    if (isBlob) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          resolve(URL.createObjectURL(xhr.response));
        }
      };
      xhr.send();
    } else {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };

      img.onerror = () => {
        reject("load error:" + url);
      };

      img.src = url;
    }
  });
};

export const loadFont = (tools: any, families: string[]) => {
  const observers = [];
  families.forEach((str: string) => {
    const strModel = str.split(":");
    const family = strModel[0];
    const variations = strModel[1] ? strModel[1].split(",") : ["n4"];
    variations.forEach((variation: string) => {
      const match = variation.match(/^([nio])([1-9])$/i);
      if (match) {
        const style =
          match[1] == "n" ? "normal" : match[1] == "i" ? "italic" : "oblique";
        const weight = parseInt(match[2], 10) + "00";
        observers.push(new tools(family, { style, weight }).load());
      }
    });
  });
  return Promise.all(observers);
};

export const $typeof = (target: any) =>
  Object.prototype.toString.call(target).slice(8, -1).toLowerCase();

export const updateObject = (
  obj: { [key: string]: any },
  ...objArr: { [key: string]: any }[]
) => {
  if (!objArr) return;

  objArr.forEach((ob) => {
    for (const k in ob) {
      if (obj[k] instanceof Array) {
        obj[k] = ob[k];
      } else if (typeof obj[k] === "object") {
        this.updateObject(obj[k], ob[k]);
      } else {
        obj[k] = ob[k];
      }

      ob[k] = null;
    }
  });
};

export const updateUrl2Blob = (url: string, blob: string) => {
  Array.from(document.styleSheets).forEach((styleSheet: CSSStyleSheet) => {
    Array.from(styleSheet.rules)
      .filter((cssRule) => cssRule.cssText.includes(url))
      .forEach(
        (cssRule: CSSStyleRule) =>
          (cssRule.style.backgroundImage = `url(${blob})`)
      );
  });
};
