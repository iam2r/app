(window.webpackJsonp=window.webpackJsonp||[]).push([["loader"],{"02a2":function(e,t,n){},1733:function(e,t,n){"use strict";var i=n("faa1"),r=n("fd0b");class o{constructor(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;this.width=e,this.height=t}get center(){return{x:this.width/2,y:this.height/2}}get ratio(){return this.width/this.height}}var s={size:{width:800,height:600}};n.d(t,"d",(function(){return a})),n.d(t,"c",(function(){return c})),n.d(t,"e",(function(){return u})),n.d(t,"a",(function(){return s}));var a=new i.EventEmitter,c=new class{constructor(){this.phone={iphonex:!1,iphonexr:!1,iphonexsmax:!1},this.browser={chrome:!1,safari:!1,firefox:!1,ie:!1,edge:!1,opera:!1,qq:!1,360:!1},this.mobile={device:!1,ios:!1,andriod:!1,tablet:!1},this.mobile=this.initMobileData(),this.version=this.getVersion(),this.webkit=this.iosWKWebView(),this.notchScreen=this.isNotchScreen(),this.browser=this.initBrowserData()}initMobileData(){var e=navigator.userAgent,t=e.indexOf("Android")>-1||e.indexOf("Adr")>-1,n=!!/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()),i=/(?:iPad|PlayBook)/.test(e)||t&&!/(?:Mobile)/.test(e)||/(?:Firefox)/.test(e)&&/(?:Tablet)/.test(e);return{ios:n,andriod:t,tablet:i,device:t||n||i}}getVersion(){return(navigator.userAgent.toLocaleLowerCase().match(/os [\d._]*/gi)+"").replace(/[^0-9|_.]/gi,"").replace(/_/gi,".")}iosWKWebView(){return this.mobile.ios&&-1==navigator.userAgent.indexOf("Safari")}isNotchScreen(){var e=this.mobile.ios,t=screen.width,n=screen.height;return this.phone.iphonex=e&&375==t&&812==n&&3==devicePixelRatio,this.phone.iphonexr=e&&414==t&&896==n&&2==devicePixelRatio,this.phone.iphonexsmax=e&&414==t&&896==n&&3==devicePixelRatio,this.phone.iphonex||this.phone.iphonexr||this.phone.iphonexsmax}initBrowserData(){var e=navigator.userAgent;return{chrome:e.indexOf("Chrome")>-1&&e.indexOf("Safari")>-1,safari:e.indexOf("Safari")>-1&&-1==e.indexOf("Chrome")&&void 0===window.external,firefox:e.indexOf("Firefox")>-1,ie:!!window.ActiveXObject||"ActiveXObject"in window,edge:e.indexOf("Edge")>-1,opera:e.indexOf("Opera")>-1,qq:e.indexOf("qqbrowse")>-1,360:((e,t)=>{var n=navigator.mimeTypes;for(var i in n)if("application/vnd.chromium.remoting-viewer"==n[i].type)return!0;return!1})()}}get osName(){var e="Unknow",t="",n=[],i=navigator.userAgent,r=navigator.appVersion,o=navigator.platform;return this.mobile.andriod&&(t=(n=/android (\d+(?:\.\d+)+)/i.exec(i)||/android (\d+(?:\.\d+)+)/i.exec(o))?n[1]:""),this.mobile.ios&&(t=(n=/(iPad|iPhone|iPod).*OS ((\d+_?){2,3})/i.exec(i))?n[2]:""),this.getWinOSName()?e=this.getWinOSName():this.mobile.ios?e="iOS_"+t:-1!==r.indexOf("Mac")?e="OS X_":-1!==r.indexOf("X11")&&-1===r.indexOf("Linux")?e="OS X":this.mobile.andriod?e="Android_"+t:-1!==r.indexOf("Linux")&&(e="Linux"),e}getWinOSName(){if(-1!=navigator.appVersion.indexOf("Win")&&/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(navigator.userAgent)&&"NT"==RegExp.$1)switch(RegExp.$2){case"5.1":return"WindowsXP";case"6.0":return"WindowsVista";case"6.1":return"Windows7";case"6.2":return"Windows8";case"10.0":return"Windows10";default:return"NT"}return""}get screenState(){var e=r.b.WEB;(e=this.mobile.device?90==window.orientation||-90==window.orientation?r.b.LANDSCAPE:r.b.PORTRAIT:window.innerWidth>1100?r.b.WEB:window.innerWidth/window.innerHeight<.73?r.b.PORTRAIT:r.b.LANDSCAPE,this.mobile.ios&&parseInt(this.version.split(".")[0])<9)&&(e=document.documentElement.clientWidth>document.documentElement.clientHeight?r.b.LANDSCAPE:r.b.PORTRAIT);return this.mobile.tablet&&(e=r.b.LANDSCAPE),e}},u=new class{constructor(){this.scale=1;var e=s.size;this.size=new o(e.width,e.height),window.addEventListener("resize",()=>this.onResize()),window.addEventListener("orientationchange",()=>this.onResize()),a.once(r.a.GAME_ENTER,()=>{this.onResize(),a.emit(r.a.STATE_CHANGE,this.state)}),this.onResize()}onResize(){this.doState(),this.doResize()}doState(){var e=c.screenState;if(e!==this.state){var t=this.state;this.state=e,this.size=this.isPortrait?new o(s.size.height,s.size.width):new o(s.size.width,s.size.height),document.querySelector("body").setAttribute("data-screen",this.state),a.emit(r.a.STATE_CHANGE,this.state,t)}}doResize(){var e=new o(innerWidth,innerHeight),t=this.size,n=e.ratio>t.ratio?e.height/t.height:e.width/t.width,i=new o(t.width*n,t.height*n);this.scale=n,this.renderSize=i,a.emit(r.a.RESIZE,n,this.renderSize)}get isPortrait(){return this.state===r.b.PORTRAIT}get isLandscape(){return this.state===r.b.LANDSCAPE}};t.b={app:void 0,appVue:void 0,scence:void 0,resource:void 0,emitter:a,device:c,resolution:u,config:s}},"66b7":function(e,t,n){"use strict";var i;n.d(t,"a",(function(){return i})),function(e){e.LOAD="game-load",e.LOAD_PROGRESS="game-load-progress",e.LOAD_TEXT="game-load-text",e.LOAD_ERROR="game-load-error",e.LOAD_COMPLETE="game-load-complete",e.SOUND_LOAD_PROGRESS="game-sound-load-progress",e.SOUND_LOAD_COMPLETE="game-sound-load-complete",e.GAME_INIT="game-init",e.GAME_ENTER="game-enter",e.STATE_CHANGE="game-state",e.RESIZE="game-resize",e.TICKER="ticker"}(i||(i={}))},"91dd":function(e,t,n){"use strict";function i(e,t){return Object.prototype.hasOwnProperty.call(e,t)}e.exports=function(e,t,n,o){t=t||"&",n=n||"=";var s={};if("string"!=typeof e||0===e.length)return s;var a=/\+/g;e=e.split(t);var c=1e3;o&&"number"==typeof o.maxKeys&&(c=o.maxKeys);var u=e.length;c>0&&u>c&&(u=c);for(var h=0;h<u;++h){var d,l,f,v,p=e[h].replace(a,"%20"),m=p.indexOf(n);m>=0?(d=p.substr(0,m),l=p.substr(m+1)):(d=p,l=""),f=decodeURIComponent(d),v=decodeURIComponent(l),i(s,f)?r(s[f])?s[f].push(v):s[f]=[s[f],v]:s[f]=v}return s};var r=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}},b383:function(e,t,n){"use strict";t.decode=t.parse=n("91dd"),t.encode=t.stringify=n("e099")},c88f:function(e,t,n){},e099:function(e,t,n){"use strict";var i=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,t,n,a){return t=t||"&",n=n||"=",null===e&&(e=void 0),"object"==typeof e?o(s(e),(function(s){var a=encodeURIComponent(i(s))+n;return r(e[s])?o(e[s],(function(e){return a+encodeURIComponent(i(e))})).join(t):a+encodeURIComponent(i(e[s]))})).join(t):a?encodeURIComponent(i(a))+n+encodeURIComponent(i(e)):""};var r=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};function o(e,t){if(e.map)return e.map(t);for(var n=[],i=0;i<e.length;i++)n.push(t(e[i],i));return n}var s=Object.keys||function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return t}},f6a2:function(e,t,n){"use strict";n.r(t);var i=n("faa1"),r=n("b383"),o=n.n(r),s=n("fd0b"),a=n("1733");n("c88f");class c{constructor(){this.preventTouchEvent=!0,this.init(),this.onStateChange(),this.initEvents()}init(){var e=a.e.scale,t=this.element=document.createElement("div");t.className="fullscreen",t.innerHTML='\n            <div class="container">\n                <div class="icon-box" style="transform:scale('.concat(e,') translate(-50%,-50%)">\n                </div>\n            </div>'),this.element.style.visibility="hidden",document.body.appendChild(t)}onStateChange(){a.c.browser,window.external;var e=a.e.isPortrait;if(a.c.mobile.ios&&!a.c.mobile.tablet&&a.c.browser.safari){var t=document.documentElement.clientHeight,n=e?window.innerHeight==t:window.innerHeight<t,i=a.c.mobile.ios&&!a.c.mobile.tablet&&n;this.element.style.visibility=i?"visible":"hidden",document.body.style.overflow=i?"auto":"hidden",this.preventTouchEvent=!i,window.scrollTo(0,0)}}onTouchFullScreen(){var e=document.documentElement;e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullScreen&&e.webkitRequestFullScreen()}onPreventTouch(e){(this.preventTouchEvent||e.touches.length>1)&&e.preventDefault()}initEvents(e){var t=e?(e,t,n,i)=>{e.removeEventListener(t,n,i)}:(e,t,n,i)=>{e.addEventListener(t,n,i)};t(window,"touchstart",this,{passive:!1}),t(window,"touchend",this),t(window,"touchcancel",this),t(window,"resize",this),t(window,"orientationchange",this)}handleEvent(e){switch(e.type){case"touchstart":this.onPreventTouch(e);break;case"touchend":case"touchcancel":a.c.mobile.andriod&&this.onTouchFullScreen(),a.c.mobile.ios&&this.preventTouchEvent&&setTimeout(()=>{window.scrollTo(0,0)});break;case"resize":case"orientationchange":this.onStateChange()}}}n("02a2");n.d(t,"Loader",(function(){return u}));class u extends i.EventEmitter{init(){var e=o.a.parse(location.search.slice(1));document.body.setAttribute("data-browser",(()=>{for(var e in a.c.browser)if(a.c.browser[e])return e})()),document.body.innerHTML+='\n            <div class="loader-page">\n                <div class="container">\n                    <i class="logo"></i>\n                    <div class="progress">\n                        <span class="bar"></span>\n                    </div>\n                    <i class="message">'.concat("zh_CN"==e.language?"加载中...":"Loading...",'</i>\n                </div>\n                <div class="mask"></div>\n            </div>\n        '),this.elContainer=document.querySelector(".loader-page .container"),this.elProgress=document.querySelector(".loader-page .bar"),this.elText=document.querySelector(".loader-page .message"),this.resize()}load(){this.emit("load"),this.init(),this.bindEvents()}bindEvents(){var e=()=>this.resize(),t=e=>this.progress=e,n=e=>this.text=e,i=e=>this.text=e;a.d.on(s.a.RESIZE,e).on(s.a.LOAD_PROGRESS,t).on(s.a.LOAD_TEXT,n).on(s.a.LOAD_ERROR,i).once(s.a.GAME_ENTER,()=>{a.d.off(s.a.RESIZE,e).off(s.a.LOAD_PROGRESS,t).off(s.a.LOAD_TEXT,n).off(s.a.LOAD_ERROR,i),this.complete()}),window.addEventListener("contextmenu",e=>e.preventDefault())}set progress(e){this.elProgress.style.width=e+"%"}set text(e){this.elText.innerText=e}resize(){this.elContainer.style.transform="translate(-50%,-50%) scale("+a.e.scale+")",this.elContainer.style.width="".concat(100/a.e.scale,"% "),this.elContainer.style.height="".concat(100/a.e.scale,"% ")}complete(){var e=document.querySelector(".loader-page"),t=e.querySelector(".mask");t.style.opacity="1",t.addEventListener("transitionend",()=>{e.style.opacity="0",e.addEventListener("transitionend",()=>{document.querySelector("body").removeChild(e)})}),a.c.mobile.device&&new c}}},faa1:function(e,t,n){"use strict";var i,r="object"==typeof Reflect?Reflect:null,o=r&&"function"==typeof r.apply?r.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};i=r&&"function"==typeof r.ownKeys?r.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var s=Number.isNaN||function(e){return e!=e};function a(){a.init.call(this)}e.exports=a,a.EventEmitter=a,a.prototype._events=void 0,a.prototype._eventsCount=0,a.prototype._maxListeners=void 0;var c=10;function u(e){return void 0===e._maxListeners?a.defaultMaxListeners:e._maxListeners}function h(e,t,n,i){var r,o,s;if("function"!=typeof n)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof n);if(void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),o=e._events),s=o[t]),void 0===s)s=o[t]=n,++e._eventsCount;else if("function"==typeof s?s=o[t]=i?[n,s]:[s,n]:i?s.unshift(n):s.push(n),(r=u(e))>0&&s.length>r&&!s.warned){s.warned=!0;var a=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");a.name="MaxListenersExceededWarning",a.emitter=e,a.type=t,a.count=s.length,console&&console.warn}return e}function d(){for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);this.fired||(this.target.removeListener(this.type,this.wrapFn),this.fired=!0,o(this.listener,this.target,e))}function l(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=d.bind(i);return r.listener=n,i.wrapFn=r,r}function f(e,t,n){var i=e._events;if(void 0===i)return[];var r=i[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(r):p(r,r.length)}function v(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function p(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}Object.defineProperty(a,"defaultMaxListeners",{enumerable:!0,get:function(){return c},set:function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");c=e}}),a.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},a.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},a.prototype.getMaxListeners=function(){return u(this)},a.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var i="error"===e,r=this._events;if(void 0!==r)i=i&&void 0===r.error;else if(!i)return!1;if(i){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var a=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw a.context=s,a}var c=r[e];if(void 0===c)return!1;if("function"==typeof c)o(c,this,t);else{var u=c.length,h=p(c,u);for(n=0;n<u;++n)o(h[n],this,t)}return!0},a.prototype.addListener=function(e,t){return h(this,e,t,!1)},a.prototype.on=a.prototype.addListener,a.prototype.prependListener=function(e,t){return h(this,e,t,!0)},a.prototype.once=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.on(e,l(this,e,t)),this},a.prototype.prependOnceListener=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.prependListener(e,l(this,e,t)),this},a.prototype.removeListener=function(e,t){var n,i,r,o,s;if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);if(void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){s=n[o].listener,r=o;break}if(r<0)return this;0===r?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,r),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,s||t)}return this},a.prototype.off=a.prototype.removeListener,a.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,o=Object.keys(n);for(i=0;i<o.length;++i)"removeListener"!==(r=o[i])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},a.prototype.listeners=function(e){return f(this,e,!0)},a.prototype.rawListeners=function(e){return f(this,e,!1)},a.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):v.call(e,t)},a.prototype.listenerCount=v,a.prototype.eventNames=function(){return this._eventsCount>0?i(this._events):[]}},fd0b:function(e,t,n){"use strict";var i,r=n("66b7");!function(e){e.WEB="web",e.LANDSCAPE="landscape",e.PORTRAIT="portrait"}(i||(i={})),n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return r.a}))}}]);