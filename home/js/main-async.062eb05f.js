(window.webpackJsonp=window.webpackJsonp||[]).push([["main-async"],{1679:function(e,t,a){},2789:function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("ddb0");var r,i=a("1da1"),s=a("2b0e"),n=a("9ab4"),o=a("60a3"),l=a("48d3"),c=a("c8b5"),d=a.n(c),h=(a("1679"),r=class extends l.Component{constructor(){super(...arguments),this.isSideBarOpen=!1,this.topScrolled=!1,this.mainTitle="iam2r"}mounted(){this.bindEvents()}render(){return(0,arguments[0])("div",{attrs:{id:"app"}},[this.createViewMobileBar(),this.createViewMobileSideBar(),this.createViewHeader(),this.createViewMain(),this.createViewFooter()])}get navData(){return[{key:"Demo",href:"",children:this.$state.appList.map(e=>({key:e,href:"../".concat(e)}))}]}bindEvents(){window.addEventListener("scroll",()=>{window.pageYOffset>168&&!this.topScrolled?this.topScrolled=!0:window.pageYOffset<=168&&this.topScrolled&&(this.topScrolled=!1)}),new d.a(document.body).on("tap",e=>{var t=document.querySelector("#mobile-sidebar"),a=document.querySelector(".menu-button");this.isSideBarOpen&&!a.contains(e.target)&&(t.contains(e.target)||this.toggleSlideBar())}),this.$nextTick(()=>{this.$state.app.$on("resize",e=>{})})}toggleSlideBar(){this.isSideBarOpen=!this.isSideBarOpen}formatHref(e){return e||"javascript:void(0);"}createViewNav(e){var t=this.$createElement;return t("ul",{class:"nav"},[e.map(e=>t("li",{key:e.key,class:"nav-dropdown-container"},[t("a",{attrs:{href:this.formatHref(e.href)}},[e.key]),e.children&&!!e.children.length&&[t("span",{class:"arrow"}),t("ul",{class:"nav-dropdown"},[e.children.map(e=>t("li",{key:e.key},[t("a",{attrs:{href:this.formatHref(e.href)}},[e.key])]))])]]))])}createViewMobileBar(){var e=this.$createElement;return e("div",{attrs:{id:"mobile-bar"},class:[this.topScrolled?"":"top"]},[e("v-touch",{attrs:{tag:"i"},class:"menu-button",on:{tap:this.toggleSlideBar}}),e("transition",{attrs:{"enter-active-class":"animated jello","leave-active-class":"animated fast bounceOut"}},[e("i",{directives:[{name:"show",value:this.topScrolled}],class:"logo"})])])}createViewMobileSideBar(){var e=this.$createElement;return e("div",{attrs:{id:"mobile-sidebar"},class:[this.isSideBarOpen?"open":""]},[e("div",{class:"scroll-container"},[this.createViewNav(this.navData),e("div",{class:"test",style:"height:100vh"})])])}createViewFooter(){var e=this.$createElement;return e("div",{attrs:{id:"footer"}},[e("p",["Copyright © 2020 ZhangRui"])])}createViewMain(){var e=this.$createElement;return e("div",{attrs:{id:"main"}},[e("div",{class:"hero"},[e("div",{class:"left"},[e("i",{class:"hero-logo"})]),e("div",{class:"right"},[e("h2",[this.mainTitle]),e("h1",["欢迎",e("br"),"进入我的主页"])])]),e("div",{class:"test",style:"height:100vh"})])}createViewHeader(){var e=this.$createElement;return e("div",{attrs:{id:"header"}},[e("div",{class:"logo"},[e("span",[this.mainTitle])]),this.createViewNav(this.navData)])}},r=Object(n.a)([o.a],r)),p=s.default.prototype.$state=s.default.observable({appList:[],resources:[]}),u=a("ca95"),v={install:e=>{e.config.productionTip=!1,e.use(u,{name:"v-touch"})}},f=(a("fb6a"),a("25f0"),a("2532"),a("466d"),a("1276"),a("2b3d"),function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return new Promise((a,r)=>{if(t){var i=new XMLHttpRequest;i.open("GET",e,!0),i.responseType="blob",i.onreadystatechange=()=>{4==i.readyState&&200==i.status&&a(URL.createObjectURL(i.response))},i.send()}else{var s=new Image;s.onload=()=>{a(s)},s.onerror=()=>{r("load error:"+e)},s.src=e}})}),m=a("8413");s.default.use(v);var b=function(){var e=Object(i.a)((function*(e){for(var t=0;t<e.length;t++){var a=e[t];a.blob=yield f(a.url,!0)}return e}));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(i.a)((function*(){var e,t=yield(e="../apps.json?"+ +new Date,new Promise((t,a)=>{var r=new XMLHttpRequest;r.open("GET",e),r.send(),r.onreadystatechange=()=>{4==r.readyState&&200==r.status&&t(JSON.parse(r.response))}}));p.appList=t.apps.filter(e=>"home"!==e);var r,i,s,[n]=yield Promise.all([b(t.resources.home.filter(e=>e.type="images")),(r=a("0342"),i=["Source Sans Pro","Dosis"],s=[],i.forEach(e=>{var t=e.split(":"),a=t[0];(t[1]?t[1].split(","):["n4"]).forEach(e=>{var t=e.match(/^([nio])([1-9])$/i);if(t){var i="n"==t[1]?"normal":"i"==t[1]?"italic":"oblique",n=parseInt(t[2],10)+"00";s.push(new r(a,{style:i,weight:n}).load())}})}),Promise.all(s))]);m.a.emit("loaded",n)}));return function(){return e.apply(this,arguments)}}();m.a.once("loaded",e=>{e.forEach(e=>{var{url:t,blob:a}=e;((e,t)=>{Array.from(document.styleSheets).forEach(a=>{Array.from(a.rules).filter(t=>t.cssText.includes(e)).forEach(e=>e.style.backgroundImage="url(".concat(t,")"))})})(t,a)}),p.app=new s.default({render:e=>e(h)}).$mount("#app")}),w()}}]);