import FontFaceObserver from "fontfaceobserver";
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

export const loadImage = (url: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      console.timeEnd(url);
      resolve(img);
    };

    img.onerror = () => {
      reject("load error:" + url);
    };

    img.src = url;
  });
};

export const loadFont = (families: string[]) => {
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
        observers.push(new FontFaceObserver(family, { style, weight }).load());
      }
    });
  });
  return Promise.all(observers);
};
