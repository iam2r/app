(window.webpackJsonp=window.webpackJsonp||[]).push([["main-async"],{"14ec":function(e,t,n){},1537:function(e,t,n){"use strict";n.r(t);n("4de4"),n("4160"),n("d3b7"),n("3ca3"),n("159b"),n("ddb0");var i=n("3835"),a=(n("96cf"),n("1da1")),s=n("2b0e"),r=(n("99af"),n("4ae1"),n("25f0"),n("38cf"),n("d4ec")),c=n("bee2"),o=n("262e"),l=n("99de"),u=n("7e84"),h=n("9ab4"),d=n("60a3"),f=n("48d3"),p=n("cffa"),v=n("a5cf"),m=n("7212"),b=(n("ac1f"),n("1276"),n("498a"),function(){function e(t,n){Object(r.a)(this,e),this.splitSymbol="<br>",this.items=[],this.$el="string"==typeof t?document.querySelector(t):t,n.splitSymbol&&(this.splitSymbol=n.splitSymbol),this.text=n.content,this.init()}return Object(c.a)(e,[{key:"init",value:function(){var e=this,t=0;this.text.trim().split(this.splitSymbol).forEach((function(n){n.split("").forEach((function(n){var i=document.createElement("span");i.textContent=n,i.classList.add("land-in-animation"),i.style.animationDelay="".concat(.05*t,"s"),e.items.push(i),t++})),e.items.push(document.createElement("br"))}))}},{key:"start",value:function(){var e=this;this.hide(),this.items.forEach((function(t){"BR"!=t.nodeName&&t.classList.add("land-in-animation"),e.$el.appendChild(t)}))}},{key:"hide",value:function(){this.$el.innerHTML=""}},{key:"skip",value:function(){this.items.forEach((function(e){e.classList.remove("land-in-animation")}))}},{key:"destory",value:function(){this.$el=null,this.items=[]}}]),e}());n("14ec");function y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=Object(u.a)(e);if(t){var a=Object(u.a)(this).constructor;n=Reflect.construct(i,arguments,a)}else n=i.apply(this,arguments);return Object(l.a)(this,n)}}p.a.ticker.lagSmoothing(0,null);var w,g=(w=function(e){Object(o.a)(n,e);var t=y(n);function n(){var e;return Object(r.a)(this,n),(e=t.apply(this,arguments)).birthDate=+new Date("2020/9/19"),e.revolution=864e5,e.active=!1,e.sceneRotate=0,e.sceneScale=1,e.sceneTranslateY=7,e.isSceneAnimating=!1,e.countDown=0,e.test=!1,e.slideIndex=-1,e.swiperOptions={direction:"vertical",on:{slideChangeTransitionEnd:e.onSlideChangeTransitionEnd}},e}return Object(c.a)(n,[{key:"onSlideIndexChange",value:function(e){1==e?(this.lanInItem=this.initLanInItem(),this.lanInItem.start()):this.lanInItem&&this.lanInItem.hide()}},{key:"created",value:function(){}},{key:"mounted",value:function(){var e=this;this.slideIndex=0,this.initCountDown(),setTimeout((function(){e.active||e.doActive()}),2e3)}},{key:"initLanInItem",value:function(){return this.lanInItem&&this.lanInItem.destory(),new b(this.$el.querySelector(".land-in-p"),{content:"Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>"})}},{key:"onSlideChangeTransitionEnd",value:function(){this.slideIndex=this.mySwiper.activeIndex}},{key:"initCountDown",value:function(){var e=this;this.countDown=this.birthDate-+new Date,clearInterval(this.countDownTimer),this.countDownTimer=setInterval((function(){e.countDown=e.birthDate-+new Date,e.countDown<=0&&clearInterval(e.countDownTimer)}),1e3)}},{key:"doActive",value:function(){var e=this;if(!this.isSceneAnimating){this.isSceneAnimating=!0,setTimeout((function(){e.isSceneAnimating=!1}),2e3);var t=new Date,n=+t-+new Date("".concat(t.getFullYear(),"/").concat(t.getMonth()+1,"/").concat(t.getDate()));if(this.active=!this.active,this.sceneRotate=this.active?n%this.revolution/this.revolution*-360:0,this.sceneScale=this.active?.09:1,this.sceneTranslateY=this.active?-30.2:7,this.active){if(this.snailRotateTween)return this.snailRotateTween.time(this.revolution/1e3).repeat(-1).restart();this.snailRotateTween=v.d.fromTo(".snail-box",this.revolution/1e3,{rotate:0},{ease:v.b.easeNone,rotate:-360,repeat:-1})}else this.snailRotateTween&&this.snailRotateTween.time(2).reverse()}}},{key:"startsDom",value:function(){var e=this.$createElement;return e("div",{class:"stars"},[e("div",{class:"star"}),e("div",{class:"star pink"}),e("div",{class:"star blue"}),e("div",{class:"star yellow"})])}},{key:"countdownDom",value:function(){var e=this.$createElement;return e("transition",{attrs:{"enter-active-class":"animated jello","leave-active-class":"animated fast bounceOut"}},[0!=this.slideIndex||this.isBirthDay?null:e("div",{class:"clock clock-countdown"},[e("div",{class:"elem-center"},[e("div",{class:"digit"},[e("span",{class:"days"},[this.formateMilliSecond.day]),e("span",{class:"txt"},["天"])])]),e("div",{class:"elem-bottom"},[e("div",{class:"deco"}),e("span",{class:"hours"},[this.formateMilliSecond.hour]),e("span",{class:"thin"},[" 小时"]),e("span",{class:"minutes"},[this.formateMilliSecond.minute]),e("span",{class:"thin"},[" 分钟"]),e("span",{class:"seconds"},[this.formateMilliSecond.second]),e("span",{class:"thin"},[" 秒"])])])])}},{key:"startTextDom",value:function(){var e=this.$createElement;return e("transition",{attrs:{"enter-active-class":"animated jello","leave-active-class":"animated fast bounceOut"}},[0==this.slideIndex&&this.isBirthDay?e("div",{class:"start-text"},[e("h1",{class:"title slide-bar"},["愿你贪吃不胖，愿你傻人傻福。"]),e("p",{class:"subtitle slide-bar"},["生日快乐！"])]):null])}},{key:"snailDom",value:function(){var e=this.$createElement;return e("div",{class:"snail-box"},[e("div",{class:"snail-wrapper"},[e("div",{class:"snail"},[e("div",{class:"face"}),e("div",{class:"eyes left"}),e("div",{class:"eyes right"}),e("div",{class:"shell front"},[e("div",{class:"innershell"})]),e("div",{class:"shell behind"}),e("div",{class:"bottomchest"})])]),e("div",{class:"speed"},[e("span"),e("span"),e("span"),e("span")]),e("span"),e("span"),e("span"),e("span"),e("span"),e("span")])}},{key:"page1Dom",value:function(){var e=this,t=this.$createElement;return t("swiper-slide",[t("div",{class:"page-one"},[t("v-touch",{on:{tap:function(){e.test=!e.test}},class:"test-box"},["Click To Test"]),this.startsDom(),this.countdownDom(),this.startTextDom(),t("v-touch",{class:["scene",this.active?"active":""],style:this.sceneStyle,on:{tap:function(){e.doActive()}}},[this.snailDom(),t("div",{class:"ground"},[t("div",{class:"earth"},[t("div",{class:"map-wrapper"}),t("div",{class:"earth-shadow"})])])])])])}},{key:"page2Dom",value:function(){var e=this,t=this.$createElement;return t("swiper-slide",[t("div",{class:"page-two"},[t("p",{class:"land-in-p",on:{click:function(){e.lanInItem&&e.lanInItem.skip()}}})])])}},{key:"page3Dom",value:function(){return(0,this.$createElement)("swiper-slide",["page3"])}},{key:"render",value:function(){var e=arguments[0];return e("div",{attrs:{id:"app"}},[e("swiper",{ref:"mySwiper",attrs:{options:this.swiperOptions}},[this.page1Dom(),this.isBirthDay?[this.page2Dom(),this.page3Dom()]:null]),e("span",{directives:[{name:"show",value:this.isBirthDay&&(!this.mySwiper.isEnd||0==this.slideIndex)}],class:"swiper-tip"})])}},{key:"mySwiper",get:function(){return this.$refs.mySwiper.swiperInstance}},{key:"sceneStyle",get:function(){return{transform:"translate3d(-50%, ".concat(this.sceneTranslateY,"rem,0) rotateZ(").concat(this.sceneRotate,"deg) scale3d(").concat(this.sceneScale,",").concat(this.sceneScale,",1)")}}},{key:"isBirthDay",get:function(){return this.test}},{key:"formateMilliSecond",get:function(){var e=this.countDown,t=6e4,n=60*t,i=24*n,a=Math.floor(e/i),s=Math.floor((e-a*i)/n),r=Math.floor((e-a*i-s*n)/t),c=Math.floor((e-a*i-s*n-r*t)/1e3),o=e-a*i-s*n-r*t-1e3*c,l=o<10?"0"+o:""+o;return{day:a<10?"0"+a:""+a,hour:s<10?"0"+s:""+s,minute:r<10?"0"+r:""+r,second:c<10?"0"+c:""+c,milliSecond:l=o<100?"0"+l:""+l}}}]),n}(f.Component),Object(h.a)([Object(d.b)("slideIndex")],w.prototype,"onSlideIndexChange",null),w=Object(h.a)([Object(d.a)({components:{Swiper:m.Swiper,SwiperSlide:m.SwiperSlide}})],w)),S=s.default.prototype.$state=s.default.observable({appList:[],resources:[]}),D=n("ca95"),k={install:function(e){e.config.productionTip=!1,e.use(D,{name:"v-touch"})}},I=(n("a630"),n("caad"),n("d81d"),n("fb6a"),n("2532"),n("466d"),n("2b3d"),n("53ca"),function(e){return new Promise((function(t,n){var i=new XMLHttpRequest;i.open("GET",e),i.send(),i.onreadystatechange=function(){4==i.readyState&&200==i.status&&t(JSON.parse(i.response))}}))}),X=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return new Promise((function(n,i){if(t){var a=new XMLHttpRequest;a.open("GET",e,!0),a.responseType="blob",a.onreadystatechange=function(){4==a.readyState&&200==a.status&&n(URL.createObjectURL(a.response))},a.send()}else{var s=new Image;s.onload=function(){n(s)},s.onerror=function(){i("load error:"+e)},s.src=e}}))},x=function(e,t){var n=[];return t.forEach((function(t){var i=t.split(":"),a=i[0];(i[1]?i[1].split(","):["n4"]).forEach((function(t){var i=t.match(/^([nio])([1-9])$/i);if(i){var s="n"==i[1]?"normal":"i"==i[1]?"italic":"oblique",r=parseInt(i[2],10)+"00";n.push(new e(a,{style:s,weight:r}).load())}}))})),Promise.all(n)},T=n("8af0");s.default.use(k);var E=function(){var e=Object(a.a)(regeneratorRuntime.mark((function e(t){var n,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=0;case 1:if(!(n<t.length)){e.next=9;break}return i=t[n],e.next=5,X(i.url,!0);case 5:i.blob=e.sent;case 6:n++,e.next=1;break;case 9:return e.abrupt("return",t);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=function(){var e=Object(a.a)(regeneratorRuntime.mark((function e(){var t,a,s,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I("../apps.json?"+ +new Date);case 2:return t=e.sent,e.next=5,Promise.all([E(t.resources.birthday.filter((function(e){return e.type="images"}))),x(n("0342"),["Lato"])]);case 5:a=e.sent,s=Object(i.a)(a,1),r=s[0],T.a.emit("loaded",r);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();T.a.once("loaded",(function(e){e.forEach((function(e){!function(e,t){Array.from(document.styleSheets).forEach((function(n){Array.from(n.rules).filter((function(t){return t.cssText.includes(e)})).forEach((function(e){return e.style.backgroundImage="url(".concat(t,")")}))}))}(e.url,e.blob)})),S.app=new s.default({render:function(e){return e(g)}}).$mount("#app")})),R()}}]);