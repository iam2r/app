(window.webpackJsonp=window.webpackJsonp||[]).push([["index"],{1679:function(e,t,n){},"1be0":function(e,t,n){},"2d3d":function(e,t,n){e.exports=n.p+"images/logo.c490f2ac.svg"},"9d3b":function(e,t,n){"use strict";n.r(t);n("a4d3"),n("e01a"),n("d28b"),n("4de4"),n("e260"),n("0d03"),n("d3b7"),n("e6cf"),n("3ca3"),n("ddb0"),n("96cf");var r=n("2b0e"),a=(n("7db0"),n("4160"),n("d81d"),n("b8bf"),n("7a82"),n("3410"),n("131a"),n("159b"),n("9ab4")),i=n("60a3"),o=n("c8b5");n("1679");function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var d,p=function(e){function t(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(e=u(this,l(t).apply(this,arguments))).isSideBarOpen=!1,e.topScrolled=!1,e.mainTitle="iam2r",e.navData=[{key:"Demo",href:"",children:[{key:"",href:""}]}],e}var r,a,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(t,e),r=t,(a=[{key:"created",value:function(){this.createNavData()}},{key:"mounted",value:function(){this.bindEvents()}},{key:"render",value:function(){var e=arguments[0];return e("div",{attrs:{id:"app"}},[this.createViewMobileBar(),this.createViewMobileSideBar(),this.createViewHeader(),this.createViewMain(),this.createViewFooter()])}},{key:"bindEvents",value:function(){var e=this;window.addEventListener("scroll",(function(){window.pageYOffset>168&&!e.topScrolled?e.topScrolled=!0:window.pageYOffset<=168&&e.topScrolled&&(e.topScrolled=!1)}));var t=document.querySelector("#mobile-sidebar"),n=document.querySelector(".menu-button");new o(document.body).on("tap",(function(r){e.isSideBarOpen&&!n.contains(r.target)&&(t.contains(r.target)||e.toggleSlideBar())})),this.$nextTick((function(){e.$state.app.$on("resize",(function(e){}))}))}},{key:"createNavData",value:function(){var e=this.navData.find((function(e){return"Demo"==e.key}));e.children=[],this.$state.appList.forEach((function(t){e.children.push({key:t,href:"../".concat(t)})}))}},{key:"toggleSlideBar",value:function(){this.isSideBarOpen=!this.isSideBarOpen}},{key:"formateHref",value:function(e){return e||"javascript:void(0);"}},{key:"createViewNav",value:function(e){var t=this,n=this.$createElement;return n("ul",{class:"nav"},[e.map((function(e){return n("li",{key:e.key,class:"nav-dropdown-container"},[n("a",{attrs:{href:t.formateHref(e.href)}},[e.key]),e.children&&!!e.children.length&&[n("span",{class:"arrow"}),n("ul",{class:"nav-dropdown"},[e.children.map((function(e){return n("li",{key:e.key},[n("a",{attrs:{href:t.formateHref(e.href)}},[e.key])])}))])]])}))])}},{key:"createViewMobileBar",value:function(){var e=this.$createElement;return e("div",{attrs:{id:"mobile-bar"},class:[this.topScrolled?"":"top"]},[e("v-touch",{attrs:{tag:"i"},class:"menu-button",on:{tap:this.toggleSlideBar}}),e("transition",{attrs:{"enter-active-class":"animated jello","leave-active-class":"animated fast bounceOut"}},[e("i",{directives:[{name:"show",value:this.topScrolled}],class:"logo"})])])}},{key:"createViewMobileSideBar",value:function(){var e=this.$createElement;return e("div",{attrs:{id:"mobile-sidebar"},class:[this.isSideBarOpen?"open":""]},[e("div",{class:"scroll-container"},[this.createViewNav(this.navData),e("div",{class:"test",style:"height:100vh"})])])}},{key:"createViewFooter",value:function(){var e=this.$createElement;return e("div",{attrs:{id:"footer"}},[e("p",["Copyright © 2020 ZhangRui"])])}},{key:"createViewMain",value:function(){var e=this.$createElement;return e("div",{attrs:{id:"main"}},[e("div",{class:"hero"},[e("div",{class:"left"},[e("img",{class:"hero-logo",attrs:{src:n("2d3d"),alt:"home logo"}})]),e("div",{class:"right"},[e("h2",[this.mainTitle]),e("h1",["欢迎",e("br"),"进入我的主页！"])])]),e("div",{class:"test",style:"height:100vh"})])}},{key:"createViewHeader",value:function(){var e=this.$createElement;return e("div",{attrs:{id:"header"}},[e("div",{class:"logo"},[e("img",{class:"header-logo",attrs:{src:n("2d3d"),alt:"home logo"}}),e("span",[this.mainTitle])]),this.createViewNav(this.navData)])}}])&&s(r.prototype,a),i&&s(r,i),t}(i.b),h=p=Object(a.a)([i.a],p),v=r.a.prototype.$state=r.a.observable({appList:[]}),b=(n("ac1f"),n("466d"),n("4795"),function(e){return new Promise((function(t,n){var r=window.XMLHttpRequest?new window.XMLHttpRequest:new ActiveXObject("Micosoft.XMLHttp");r.open("GET",e),r.send(),r.onreadystatechange=function(){4==r.readyState&&200==r.status&&t(JSON.parse(r.response))}}))}),y=n("6dd8"),m=n("ca95");r.a.config.productionTip=!1,r.a.use(m,{name:"v-touch"}),regeneratorRuntime.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(b("../apps.json?"+(new Date).getTime()));case 2:d=e.sent,v.appList=d.apps.filter((function(e){return"home"!==e})),v.app=new r.a({render:function(e){return e(h)}}).$mount("#app"),new y.a((function(e){var t=!0,n=!1,r=void 0;try{for(var a,i=e[Symbol.iterator]();!(t=(a=i.next()).done);t=!0){var o=a.value;v.app.$emit("resize",o.contentRect)}}catch(c){n=!0,r=c}finally{try{t||null==i.return||i.return()}finally{if(n)throw r}}})).observe(document.querySelector("html"));case 6:case"end":return e.stop()}}))},ffb4:function(e,t,n){"use strict";n.r(t);n("e260"),n("b429"),n("f5df1"),n("1be0");n("9d3b")}},[["ffb4","runtime","vendors"]]]);