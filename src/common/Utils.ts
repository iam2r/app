import FontFaceObserver from "fontfaceobserver";
export const loadJson = (url: string) => {
  return new Promise((resolve, reject) => {
    let xhr = (<any>window).XMLHttpRequest
      ? new (<any>window).XMLHttpRequest()
      : new ActiveXObject("Micosoft.XMLHttp");
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
    let media = new Audio();
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
    let img = new Image();
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
  let observers = [];
  families.forEach((str: string) => {
    let strModel = str.split(":");
    let family = strModel[0];
    let variations = strModel[1] ? strModel[1].split(",") : ['n4']
    variations.forEach((variation: string) => {
      let match = variation.match(/^([nio])([1-9])$/i);
      if(match){
        let style = match[1]=='n'?'normal':match[1]=='i'?'italic':'oblique';
        let weight = parseInt(match[2], 10)+'00';
        observers.push(new FontFaceObserver(family,{style,weight}).load())
      }
    })
  });
  return Promise.all(observers)
}
