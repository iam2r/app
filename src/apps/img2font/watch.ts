export const generateUUID = () => {
  let d = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
  return uuid;
};



//主题对象Dep有两个方法，增加订阅者  和  发布消息
class Dep {
  static target: Watcher | null
  public id: string = ''
  public subs: Watcher[]
  constructor() {
    Dep.target = null;
    this.id = generateUUID();
    this.subs = [];
  }

  addSub(sub: Watcher) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach(sub => sub.update());
  }
}

class Watcher {
  public obj: any
  public key: string | number
  public handler: Function
  public val: any//val变量判断值是否有变化
  public depIds: any = {};
  constructor(obj: object, key: string | number, handler: Function) {
    this.obj = obj;
    this.key = key;
    this.handler = handler;
    this.val = this.get();
  }
  update() {
    const newVal = this.get();
    if (newVal === this.val) return
    this.val = newVal;
    typeof this.handler == "function" && this.handler()
  }
  get() {
    Dep.target = this;
    const val = this.obj[this.key];//触发getter
    Dep.target = null;
    return val;
  }
}


class Observer {
  constructor(obj: any) {
    this.walk(obj);
  }
  // 遍历属性值并监听
  walk(obj: any) {
    Object.keys(obj).forEach(key => this.defineReactive(obj, key, obj[key]));
  }

  defineReactive(obj: object, key: string | number, val: any) {

    //这里用到了观察者(订阅/发布)模式,它定义了一种一对多的关系，让多个观察者监听一个主题对象，这个主题对象的状态发生改变时会通知所有观察者对象，观察者对象就可以更新自己的状态。
    //实例化一个主题对象，对象中有空的观察者列表
    const dep = new Dep();
    // 给当前属性的值添加监听
    this.deepObserver(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        // 如果Dep类存在target属性，将其添加到dep实例的subs数组中
        // target指向一个Watcher实例，每个Watcher都是一个订阅者
        // Watcher实例在实例化过程中，会读取data中的某个属性，从而触发当前get方法
        let watcher = Dep.target;
        if (watcher) {
          if (!watcher.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(watcher);
            watcher.depIds[dep.id] = dep;
          }
        }
        return val;
      },
      set: newVal => {
        if (val === newVal) return;
        val = newVal;
        // 对新值进行监听
        this.deepObserver(newVal);
        // 通知所有订阅者，数值被改变了
        dep.notify();
      },
    });
  }

  deepObserver(value: any) {
    // 当值不存在，或者不是复杂数据类型时，不再需要继续深入监听
    if (!value || typeof value !== 'object') {
      return;
    }
    return new Observer(value);
  }


}


let data = {
  a: 'a',
  b: 'b',
  c: {
    d: 'd',
    e: 'e'
  }
}


new Observer(data);


new Watcher(data, 'a', () => {
  console.log('订阅者1')
})

new Watcher(data, 'a', () => {

  console.log('订阅的c改变了')
})




data.a = 'ddd'


class EventEmitter {
  private handlers: any = {};
  on(eventType: string, handler: Function) {
    if (!(eventType in this.handlers)) {
      this.handlers[eventType] = [];
    }
    this.handlers[eventType].push(handler);
    return this;
  }
  once(eventType: string, handler: Function) {
    let offFun = (...rest: any[]) => {
      handler.call(this, ...rest)
      this.off(eventType, offFun)
    }
    this.on(eventType, offFun)
    return this;
  }
  emit(eventType: string, ...rest: any[]) {
    let currentEvent = this.handlers[eventType];
    currentEvent && currentEvent.forEach((handler: Function) => handler.call(this, ...rest))
    return this;
  }
  off(eventType: string, handler: Function) {
    let currentEvent = this.handlers[eventType];
    let offHandler = handler;
    currentEvent = currentEvent && currentEvent.filter((handler: Function) => offHandler != handler)
    return this;
  }

}


// var Publisher = new EventEmitter();
// Publisher.on('a', (...data:any)=>{
//   console.log(data)
// })


// //触发事件a
// Publisher.emit('a', '我是第1次参数1', '我是第1次参数2');








const newObj = new Proxy([0, 1, 2, 3], {
  get: (target: any, key: string | number, receiver: Function) => {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: (target: any, key: string | number, value: any, receiver: Function) => {
    console.log(target, key, value, receiver);
    if (key === 'text') {

    }
    return Reflect.set(target, key, value, receiver);
  },
});




