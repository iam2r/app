import { loadImage2Blob } from "@/common/Utils";
import { throttle } from "lodash";
export const LazyLoaderBlob = {
  install: (Vue: any, options: any) => {
    const prototype = Array.prototype as any;
    if (!prototype.remove) {
      prototype.remove = function (item) {
        if (!this.length) return;

        const index = this.indexOf(item);

        if (index > -1) {
          this.splice(index, 1);

          return this;
        }
      };
    }
    options = options || {
      default:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAACJCAMAAAAmEUuBAAACUlBMVEUAAAD/MzP/NTX/////MzP/NTX/////9fX/////MzP/MzP/////////NDT/////MzP/////MzP/MzP/////9/f/MzP/MzP/MzP/MzP/MzP/////////MzP/////MzP//v7/Skr/////MzP/MzP/////MzP/MzP/////////MzP/////MzP/////////////////MzP/MzP/MzP/////MzP/MzP/////MzP/////////////MzP/MzP/////MzP/MzP/////////////////////MzP/MzP/////MzP/yMj/MzP/MzP/////MzP/////MzP/////MzP/MzP/////////////////////MzP/////MzP/////MzP/////////////MzP/MzP/////////////MzP/MzP/////////MzP/////////////////////NDT/////MzP/////////////MzP/MzP/////MzP/////////MzP/Pz//////RET/UlL/////X1//////////MzP/////fX3/////MzP/MzP/MzP/////fn7/MzP/MzP/MzP/t7f/MzP/MzP/kpL/MzP/////r6//MzP/MzP/MzP/MzP/enr/Z2f/MzP/1NT/hYX/MzP/dnb/////WVn/QkL/bGz/SUn/ZWX/dXX/cXH/XFz/U1P/i4v/mJj/gYH/jIz/pKT/ZWX/f3//paX/nZ3/W1v/3Nz/MzP/0dH/oqL/np7/bm7/bW3/YWH/XV3/sbH/1dX/wcH/Xl7/MzP/////NTXJIoIxAAAAw3RSTlMA/QUBAQ79BQkCCvgUCAcDAvwXDw0M9jHy2Br07uImEv3s6tvTo2xqQjYeGgP65tzOvpGOjWdiTjskFxTi19OHb2ZPSkZEPzYgHPjm2sLBta6um5KCfXdaMyAS7t7MyLKxqJyXiF1aVlJHPjIt8dDMxcW3qKCfb19SKCYV/fz49unQvrq5qqmkloN8c2dhVkpEOBwWybmJfnZjYFlPOzIqHQ0L/Pjy7evo5OHX0svGnZiWj312dD8tLLuzsK6loY06JCEsYyRKAAAHgUlEQVR42u3bB1fTUBQH8EvakI50L9paClJpaSurgLSAshFFAZmCgAwFAffee++99957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",
    };

    const listenList = [];
    const imageCacheList = [];

    const isAlredyLoad = (imageSrc: string) => {
      return imageCacheList.find((it) => it.src == imageSrc);
    };
    const isCanShow = (item) => {
      const ele: HTMLImageElement = item.ele;
      const src = item.src;
      const top = ele.getBoundingClientRect().top;
      if (top < window.innerHeight && !(ele as any)._isDownloading) {
        (ele as any)._isDownloading = true;
        loadImage2Blob(src)
          .then((blobUrl: any) => {
            ele.style.opacity = "0";
            ele.src = blobUrl;
            ele.setAttribute("data-src", src);
            ele.setAttribute("lazy", "loaded");
            imageCacheList.push({ src, blobUrl });
            (listenList as any).remove(item);
            setTimeout(() => {
              ele.style.transition = "opacity 0.3s";
              ele.style.opacity = "";
              const transitionEnd = () => {
                ele.style.transition = "";
                ele.removeEventListener("transitionend", transitionEnd);
              };
              ele.addEventListener("transitionend", transitionEnd);
            }, 10);
          })
          .catch((e) => {
            ele.setAttribute("lazy", "error");
            (listenList as any).remove(item);
          })
          .finally(() => {
            (ele as any)._isDownloading = false;
          });

        return true;
      } else {
        return false;
      }
    };

    const update = () => {
      const length = listenList.length;
      if (length == 0) return;
      for (let i = 0; i < length; i++) {
        isCanShow(listenList[i]);
      }
    };

    const onListenScroll = () => {
      [
        "scroll",
        "wheel",
        "mousewheel",
        "resize",
        "animationend",
        "transitionend",
        "touchmove",
      ].forEach((event) => {
        window.addEventListener(event, throttle(update));
      });
    };

    onListenScroll();

    const addListener = (ele, binding) => {
      const imageSrc = binding.value;
      const cache = isAlredyLoad(imageSrc);
      if (cache) {
        ele.src = cache.blobUrl;
        return false;
      }
      const item = {
        ele: ele,
        src: imageSrc,
      };
      ele.setAttribute("lazy", "loading");
      ele.src = options.default;
      if (isCanShow(item)) return;
      listenList.push(item);
    };

    Vue.directive("lazyload", {
      inserted: addListener,
      updated: addListener,
    });
  },
};
