(window.webpackJsonp=window.webpackJsonp||[]).push([["loader"],{"02a2":function(e,t,n){},"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}},"841c":function(e,t,n){"use strict";var o=n("d784"),i=n("825a"),r=n("1d80"),a=n("129f"),c=n("14c3");o("search",1,(function(e,t,n){return[function(t){var n=r(this),o=null==t?void 0:t[e];return void 0!==o?o.call(t,n):new RegExp(t)[e](String(n))},function(e){var o=n(t,e,this);if(o.done)return o.value;var r=i(e),s=String(this),u=r.lastIndex;a(u,0)||(r.lastIndex=0);var l=c(r,s);return a(r.lastIndex,u)||(r.lastIndex=u),null===l?-1:l.index}]}))},c88f:function(e,t,n){},f6a2:function(e,t,n){"use strict";n.r(t);n("a4d3"),n("e01a"),n("d28b"),n("e260"),n("fb6a"),n("b8bf"),n("7a82"),n("3410"),n("131a"),n("d3b7"),n("ac1f"),n("3ca3"),n("841c"),n("ddb0");var o=n("faa1"),i=n("b383"),r=n.n(i),a=n("fd0b"),c=n("1733");n("c88f");function s(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var u=function(){function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.init(),c.c.mobile.andriod&&"ontouchend"in document&&window.addEventListener("touchend",(function(){t.onTouchFullScreen()})),this.onStateChange(),window.addEventListener("resize",(function(){t.onStateChange()})),window.addEventListener("orientationchange",(function(){t.onStateChange()}))}var t,n,o;return t=e,(n=[{key:"init",value:function(){var e=c.e.scale,t=this.element=document.createElement("div");t.className="fullscreen",t.innerHTML='\n            <div class="container">\n                <div class="icon-box" style="transform:scale('.concat(e,') translate(-50%,-50%)">\n                </div>\n            </div>'),document.body.appendChild(t)}},{key:"onStateChange",value:function(){var e=document.querySelector("body"),t=c.e.isPortrait,n=c.c.mobile.ios&&(c.c.browser.chrome||c.c.browser.firefox)?screen.width-20:document.documentElement.clientHeight,o=t?window.innerHeight==n:window.innerHeight<n;this.element.style.display=c.c.mobile.ios&&!c.c.mobile.tablet&&o?"":"none",e.style.overflow=""==this.element.style.display?"visible":"hidden",window.scrollTo(0,0),this.isPortrait=t}},{key:"onTouchFullScreen",value:function(){var e=document.documentElement;e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullScreen&&e.webkitRequestFullScreen()}}])&&s(t.prototype,n),o&&s(t,o),e}();function l(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.preventDefaultException={tagName:/^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/},this.initiated=!1,this.el=t||document.querySelector("body"),this.initEvents()}var t,n,o;return t=e,(n=[{key:"checkPreventDefault",value:function(e,t){for(var n in t)if(t[n].test(e[n]))return!0;return!1}},{key:"onStart",value:function(e){e.touches.length>1&&e.preventDefault(),this.initiated||(this.checkPreventDefault(e.target,this.preventDefaultException)||e.preventDefault(),this.initiated=!0)}},{key:"onMove",value:function(e){this.initiated&&e.preventDefault()}},{key:"onEnd",value:function(e){this.initiated&&(this.checkPreventDefault(e.target,this.preventDefaultException)||e.preventDefault())}},{key:"initEvents",value:function(e){var t=e?function(e,t,n,o){e.removeEventListener(t,n,o)}:function(e,t,n,o){e.addEventListener(t,n,o)},n=this.el;"ontouchstart"in window&&(t(n,"touchstart",this,{passive:!1}),t(n,"touchmove",this),t(n,"touchcancel",this),t(n,"touchend",this))}},{key:"handleEvent",value:function(e){switch(e.type){case"touchstart":this.onStart(e);break;case"touchmove":this.onMove(e);break;case"touchend":case"touchcancel":this.onEnd(e)}}}])&&l(t.prototype,n),o&&l(t,o),e}();n("02a2");function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function v(e,t){return!t||"object"!==d(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}n.d(t,"Loader",(function(){return b}));var b=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),v(this,y(t).apply(this,arguments))}var n,o,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(t,e),n=t,(o=[{key:"init",value:function(){var e=r.a.parse(location.search.slice(1));document.body.setAttribute("data-browser",function(){for(var e in c.c.browser)if(c.c.browser[e])return e}()),document.body.innerHTML+='\n            <div class="loader-page">\n                <div class="container">\n                    <i class="logo"></i>\n                    <div class="progress">\n                        <span class="bar"></span>\n                    </div>\n                    <i class="message">'.concat("zh_CN"==e.language?"加载中...":"Loading...",'</i>\n                </div>\n                <div class="mask"></div>\n            </div>\n        '),this.elContainer=document.querySelector(".loader-page .container"),this.elProgress=document.querySelector(".loader-page .bar"),this.elText=document.querySelector(".loader-page .message"),this.resize()}},{key:"load",value:function(){this.emit("load"),this.init(),this.bindEvents()}},{key:"bindEvents",value:function(){var e=this,t=function(){return e.resize()},n=function(t){return e.progress=t},o=function(t){return e.text=t},i=function(t){return e.text=t};c.d.on(a.a.RESIZE,t).on(a.a.LOAD_PROGRESS,n).on(a.a.LOAD_TEXT,o).on(a.a.LOAD_ERROR,i).once(a.a.GAME_ENTER,(function(){c.d.off(a.a.RESIZE,t).off(a.a.LOAD_PROGRESS,n).off(a.a.LOAD_TEXT,o).off(a.a.LOAD_ERROR,i),e.complete()})),window.addEventListener("contextmenu",(function(e){return e.preventDefault()}))}},{key:"resize",value:function(){this.elContainer.style.transform="translate(-50%,-50%) scale("+c.e.scale+")",this.elContainer.style.width="".concat(100/c.e.scale,"% "),this.elContainer.style.height="".concat(100/c.e.scale,"% ")}},{key:"complete",value:function(){var e=document.querySelector(".loader-page"),t=e.querySelector(".mask");t.style.opacity="1",t.addEventListener("transitionend",(function(){e.style.opacity="0",e.addEventListener("transitionend",(function(){document.querySelector("body").removeChild(e)}))})),c.c.mobile.device&&new u,c.c.mobile.ios&&new f}},{key:"progress",set:function(e){this.elProgress.style.width=e+"%"}},{key:"text",set:function(e){this.elText.innerText=e}}])&&h(n.prototype,o),i&&h(n,i),t}(o.EventEmitter)},fb6a:function(e,t,n){"use strict";var o=n("23e7"),i=n("861d"),r=n("e8b5"),a=n("23cb"),c=n("50c4"),s=n("fc6a"),u=n("8418"),l=n("1dde"),f=n("b622")("species"),d=[].slice,h=Math.max;o({target:"Array",proto:!0,forced:!l("slice")},{slice:function(e,t){var n,o,l,v=s(this),y=c(v.length),p=a(e,y),b=a(void 0===t?y:t,y);if(r(v)&&("function"!=typeof(n=v.constructor)||n!==Array&&!r(n.prototype)?i(n)&&null===(n=n[f])&&(n=void 0):n=void 0,n===Array||void 0===n))return d.call(v,p,b);for(o=new(void 0===n?Array:n)(h(b-p,0)),l=0;p<b;p++,l++)p in v&&u(o,l,v[p]);return o.length=l,o}})}}]);