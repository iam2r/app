(window.webpackJsonp=window.webpackJsonp||[]).push([["main-async"],{"14ec":function(t,e,s){},1537:function(t,e,s){"use strict";s.r(e);s("e260"),s("e6cf"),s("ddb0");var i=s("1da1"),a=s("2b0e"),n=(s("26e9"),s("9ab4")),r=s("60a3"),l=s("48d3"),o=s("cffa"),c=s("a5cf"),h=s("7212");s("1276"),s("498a");class d{constructor(t,e){this.splitSymbol="<br>",this.items=[],this.$el="string"==typeof t?document.querySelector(t):t,e.splitSymbol&&(this.splitSymbol=e.splitSymbol),this.text=e.content,this.init()}init(){var t=0;this.text.trim().split(this.splitSymbol).forEach(e=>{e.split("").forEach(e=>{var s=document.createElement("span");s.textContent=e,s.classList.add("land-in-animation"),s.style.animationDelay="".concat(.05*t,"s"),this.items.push(s),t++}),this.items.push(document.createElement("br"))})}start(){this.hide(),this.items.forEach(t=>{"BR"!=t.nodeName&&t.classList.add("land-in-animation"),this.$el.appendChild(t)})}hide(){this.$el.innerHTML=""}skip(){this.items.forEach(t=>{t.classList.remove("land-in-animation")})}destory(){this.$el=null,this.items=[]}}s("14ec");o.a.ticker.lagSmoothing(0,null);var p,m=(p=class extends l.Component{constructor(){super(...arguments),this.birthDate=+new Date("2020/9/19"),this.revolution=864e5,this.active=!1,this.sceneRotate=0,this.sceneScale=1,this.sceneTranslateY=7,this.isSceneAnimating=!1,this.countDown=0,this.test=!1,this.slideIndex=-1,this.swiperOptions={direction:"vertical",on:{slideChangeTransitionEnd:this.onSlideChangeTransitionEnd}}}get mySwiper(){return this.$refs.mySwiper.swiperInstance}get sceneStyle(){return{transform:"translate3d(-50%, ".concat(this.sceneTranslateY,"rem,0) rotateZ(").concat(this.sceneRotate,"deg) scale3d(").concat(this.sceneScale,",").concat(this.sceneScale,",1)")}}get isBirthDay(){return this.test}get formateMilliSecond(){var t=this.countDown,e=6e4,s=60*e,i=24*s,a=Math.floor(t/i),n=Math.floor((t-a*i)/s),r=Math.floor((t-a*i-n*s)/e),l=Math.floor((t-a*i-n*s-r*e)/1e3),o=t-a*i-n*s-r*e-1e3*l,c=o<10?"0"+o:""+o;return{day:a<10?"0"+a:""+a,hour:n<10?"0"+n:""+n,minute:r<10?"0"+r:""+r,second:l<10?"0"+l:""+l,milliSecond:c=o<100?"0"+c:""+c}}onSlideIndexChange(t){1==t?(this.lanInItem=this.initLanInItem(),this.lanInItem.start()):this.lanInItem&&this.lanInItem.hide()}created(){}mounted(){this.slideIndex=0,this.initCountDown(),setTimeout(()=>{this.active||this.doActive()},2e3)}initLanInItem(){return this.lanInItem&&this.lanInItem.destory(),new d(this.$el.querySelector(".land-in-p"),{content:"Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>Hi,XXX。<br>今天是你的生日哦。送你一份电子礼物~<br>"})}onSlideChangeTransitionEnd(){this.slideIndex=this.mySwiper.activeIndex}initCountDown(){this.countDown=this.birthDate-+new Date,clearInterval(this.countDownTimer),this.countDownTimer=setInterval(()=>{this.countDown=this.birthDate-+new Date,this.countDown<=0&&clearInterval(this.countDownTimer)},1e3)}doActive(){if(!this.isSceneAnimating){this.isSceneAnimating=!0,setTimeout(()=>{this.isSceneAnimating=!1},2e3);var t=new Date,e=+t-+new Date("".concat(t.getFullYear(),"/").concat(t.getMonth()+1,"/").concat(t.getDate()));if(this.active=!this.active,this.sceneRotate=this.active?e%this.revolution/this.revolution*-360:0,this.sceneScale=this.active?.09:1,this.sceneTranslateY=this.active?-30.2:7,this.active){if(this.snailRotateTween)return this.snailRotateTween.time(this.revolution/1e3).repeat(-1).restart();this.snailRotateTween=c.d.fromTo(".snail-box",this.revolution/1e3,{rotate:0},{ease:c.b.easeNone,rotate:-360,repeat:-1})}else this.snailRotateTween&&this.snailRotateTween.time(2).reverse()}}startsDom(){var t=this.$createElement;return t("div",{class:"stars"},[t("div",{class:"star"}),t("div",{class:"star pink"}),t("div",{class:"star blue"}),t("div",{class:"star yellow"})])}countdownDom(){var t=this.$createElement;return t("transition",{attrs:{"enter-active-class":"animated jello","leave-active-class":"animated fast bounceOut"}},[0!=this.slideIndex||this.isBirthDay?null:t("div",{class:"clock clock-countdown"},[t("div",{class:"elem-center"},[t("div",{class:"digit"},[t("span",{class:"days"},[this.formateMilliSecond.day]),t("span",{class:"txt"},["天"])])]),t("div",{class:"elem-bottom"},[t("div",{class:"deco"}),t("span",{class:"hours"},[this.formateMilliSecond.hour]),t("span",{class:"thin"},[" 小时"]),t("span",{class:"minutes"},[this.formateMilliSecond.minute]),t("span",{class:"thin"},[" 分钟"]),t("span",{class:"seconds"},[this.formateMilliSecond.second]),t("span",{class:"thin"},[" 秒"])])])])}startTextDom(){var t=this.$createElement;return t("transition",{attrs:{"enter-active-class":"animated jello","leave-active-class":"animated fast bounceOut"}},[0==this.slideIndex&&this.isBirthDay?t("div",{class:"start-text"},[t("h1",{class:"title slide-bar"},["愿你贪吃不胖，愿你傻人傻福。"]),t("p",{class:"subtitle slide-bar"},["生日快乐！"])]):null])}snailDom(){var t=this.$createElement;return t("div",{class:"snail-box"},[t("div",{class:"snail-wrapper"},[t("div",{class:"snail"},[t("div",{class:"face"}),t("div",{class:"eyes left"}),t("div",{class:"eyes right"}),t("div",{class:"shell front"},[t("div",{class:"innershell"})]),t("div",{class:"shell behind"}),t("div",{class:"bottomchest"})])]),t("div",{class:"speed"},[t("span"),t("span"),t("span"),t("span")]),t("span"),t("span"),t("span"),t("span"),t("span"),t("span")])}page1Dom(){var t=this.$createElement;return t("swiper-slide",[t("div",{class:"page-one"},[t("v-touch",{on:{tap:()=>{this.test=!this.test}},class:"test-box"},["Click To Test"]),this.startsDom(),this.countdownDom(),this.startTextDom(),t("v-touch",{class:["scene",this.active?"active":""],style:this.sceneStyle,on:{tap:()=>{this.doActive()}}},[this.snailDom(),t("div",{class:"ground"},[t("div",{class:"earth"},[t("div",{class:"map-wrapper"}),t("div",{class:"earth-shadow"})])])])])])}page2Dom(){var t=this.$createElement;return t("swiper-slide",[t("div",{class:"page-two"},[t("p",{class:"land-in-p",on:{click:()=>{this.lanInItem&&this.lanInItem.skip()}}})])])}page3Dom(){return(0,this.$createElement)("swiper-slide",["page3"])}render(){var t=arguments[0];return t("div",{attrs:{id:"app"}},[t("swiper",{ref:"mySwiper",attrs:{options:this.swiperOptions}},[this.page1Dom(),this.isBirthDay?[this.page2Dom(),this.page3Dom()]:null]),t("span",{directives:[{name:"show",value:this.isBirthDay&&(!this.mySwiper.isEnd||0==this.slideIndex)}],class:"swiper-tip"})])}},Object(n.a)([Object(r.b)("slideIndex")],p.prototype,"onSlideIndexChange",null),p=Object(n.a)([Object(r.a)({components:{Swiper:h.Swiper,SwiperSlide:h.SwiperSlide}})],p)),u=a.default.prototype.$state=a.default.observable({appList:[],resources:[]}),v=s("ca95"),b={install:t=>{t.config.productionTip=!1,t.use(v,{name:"v-touch"})}},w={main:s("ae44").default},f=(s("fb6a"),s("25f0"),s("466d"),s("8af0"));a.default.use(b);var D=function(){var t=Object(i.a)((function*(){var t,e,i,a=[];Object.entries(w).map(t=>{var e,[s,i]=t;a.push((e=i,new Promise((t,s)=>{var i=new Image;i.onload=()=>{t(i)},i.onerror=()=>{s("load error:"+e)},i.src=e})))}),u.resources[0]=yield Promise.all(a),yield(t=s("0342"),e=["Lato"],i=[],e.forEach(e=>{var s=e.split(":"),a=s[0];(s[1]?s[1].split(","):["n4"]).forEach(e=>{var s=e.match(/^([nio])([1-9])$/i);if(s){var n="n"==s[1]?"normal":"i"==s[1]?"italic":"oblique",r=parseInt(s[2],10)+"00";i.push(new t(a,{style:n,weight:r}).load())}})}),Promise.all(i)),f.a.emit("loaded")}));return function(){return t.apply(this,arguments)}}();f.a.once("loaded",()=>{u.app=new a.default({render:t=>t(m)}).$mount("#app")}),D()},ae44:function(t,e,s){"use strict";s.r(e),e.default=s.p+"assets/images/main.7d9ec487.png"}}]);