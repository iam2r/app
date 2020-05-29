export const setCookie = (name: string, value: any, days: number) => {
  const exp = new Date();
  exp.setDate(exp.getDate() + days);
  document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp;
};

export const getCookie = (name: string) => {
  let arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return decodeURIComponent(arr[2]);
  else return null;
};

export const delCookie = (name: string) => {
  setCookie(name, "", -1);
};

export default class Utils {
  static updateObject(
    obj: { [key: string]: any },
    ...objArr: { [key: string]: any }[]
  ) {
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
  }

  static formatAmount(value: number, fractionDigets = 2, currency?: string) {
    currency = currency ? currency : "";
    value = Number.parseFloat(value.toFixed(6));
    value = Math.floor(value * 100) / 100;
    const str = value.toFixed(fractionDigets);
    let arr = str.split("."),
      p = arr[0],
      temp = [];
    arr[1] = arr[1] || "";
    while (p.length > 2) {
      const len = p.length - 3;
      temp.push(p.substr(len));
      p = p.substr(0, len);
    }
    p && temp.push(p);
    if (fractionDigets === 0) {
      return (currency + temp.reverse().join(",")).replace("-,", "-");
    }
    return (currency + temp.reverse().join(",") + "." + arr[1]).replace(
      "-,",
      "-"
    );
  }

  static setStore(name: string, content: string) {
    try {
      sessionStorage.setItem(name, content);
    } catch (error) {
      setCookie(name, content, 1);
    }
  }

  static getStore(name: string) {
    try {
      sessionStorage.setItem("test", "test"); //若为无痕则会触发catich
      sessionStorage.removeItem("test"); //若正常 直接删除
      return sessionStorage.getItem(name);
    } catch (error) {
      return getCookie(name);
    }
  }

  static removeStore(name: string) {
    try {
      sessionStorage.removeItem(name);
    } catch (error) {
      delCookie(name);
    }
  }

  static toLocalTimeByTimeZone(time: number, zoneNum: number) {
    const d = new Date(time); //创建一个Date对象 time时间 offset 时区  中国为  8
    d.setHours(d.getHours() - zoneNum); //转化时间为UTC时间
    const offset = Math.floor(new Date().getTimezoneOffset() * 60000);
    d.setTime(d.getTime() - offset);
    return d.getTime();
  }
}
