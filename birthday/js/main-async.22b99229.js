(window.webpackJsonp=window.webpackJsonp||[]).push([["main-async"],{"14ec":function(e,t,s){},1537:function(e,t,s){"use strict";s.r(t);s("e260"),s("e6cf"),s("a79d"),s("ddb0");var a=s("1da1"),n=s("2b0e"),i=(s("26e9"),s("9ab4")),c=s("60a3"),o=s("48d3"),r=s("a5cf"),l={main:s("ae44").default,face:s("181f").default,wordMap:s("fe46").default},d=(s("14ec"),class extends o.Component{constructor(){super(...arguments),this.active=!1,this.sceneRotate=0,this.sceneScale=1,this.sceneTranslateY=7,this.birthDate=+new Date("2020/9/19"),this.countDown=0}get sceneStyle(){return{transform:"translate3d(-50%, ".concat(this.sceneTranslateY,"rem,0) rotateZ(").concat(this.sceneRotate,"deg) scale3d(").concat(this.sceneScale,",").concat(this.sceneScale,",1)")}}get formateMilliSecond(){var e=this.countDown,t=6e4,s=60*t,a=24*s,n=Math.floor(e/a),i=Math.floor((e-n*a)/s),c=Math.floor((e-n*a-i*s)/t),o=Math.floor((e-n*a-i*s-c*t)/1e3),r=e-n*a-i*s-c*t-1e3*o,l=r<10?"0"+r:""+r;return{day:n<10?"0"+n:""+n,hour:i<10?"0"+i:""+i,minute:c<10?"0"+c:""+c,second:o<10?"0"+o:""+o,milliSecond:l=r<100?"0"+l:""+l}}created(){this.initCountDown(),setTimeout(()=>{this.active||this.doActive()},2e3)}mounted(){}initCountDown(){this.countDown=this.birthDate-+new Date,clearInterval(this.countDownTimer),this.countDownTimer=setInterval(()=>{this.countDown=this.birthDate-+new Date,this.countDown<=0&&clearInterval(this.countDownTimer)},1e3)}doActive(){var e=new Date,t=+e-+new Date("".concat(e.getFullYear(),"/").concat(e.getMonth()+1,"/").concat(e.getDate()))+2e3;if(this.active=!this.active,this.sceneRotate=this.active?-360*t/864e5:0,this.sceneScale=this.active?.09:1,this.sceneTranslateY=this.active?-30.2:7,this.active){if(this.snailRotateTween)return this.snailRotateTween.repeat(-1).restart();this.snailRotateTween=r.b.fromTo(".snail-box",86400,{rotate:0},{ease:r.a.easeNone,rotate:-360,repeat:-1})}else this.snailRotateTween&&this.snailRotateTween.reverse(2)}countdownDom(){var e=this.$createElement;if(!(this.countDown<=0))return e("div",{class:"clock clock-countdown"},[e("div",{class:"elem-center"},[e("div",{class:"digit"},[" ",e("span",{class:"days"},[this.formateMilliSecond.day])," ",e("span",{class:"txt"},["天"])," "])]),e("div",{class:"elem-bottom"},[e("div",{class:"deco"}),e("span",{class:"hours"},[this.formateMilliSecond.hour]),e("span",{class:"thin"},[" 小时"])," ",e("span",{class:"minutes"},[this.formateMilliSecond.minute]),e("span",{class:"thin"},[" 分钟"])," ",e("span",{class:"seconds"},[this.formateMilliSecond.second]),e("span",{class:"thin"},[" 秒"])," "])])}snailDom(){var e=this.$createElement;return e("div",{class:"snail-box"},[e("div",{class:"snail-wrapper"},[e("div",{class:"snail"},[e("div",{class:"face"}),e("div",{class:"eyes left"}),e("div",{class:"eyes right"}),e("div",{class:"shell front"},[e("div",{class:"innershell"})]),e("div",{class:"shell behind"}),e("div",{class:"bottomchest"})])]),e("div",{class:"speed"},[e("span"),e("span"),e("span"),e("span")]),e("span"),e("span"),e("span"),e("span"),e("span"),e("span")])}render(){var e=arguments[0];return e("div",{attrs:{id:"app"}},[this.countdownDom(),e("v-touch",{class:["scene",this.active?"active":""],style:this.sceneStyle,on:{tap:()=>{this.doActive()}}},[this.snailDom(),e("div",{class:"ground"},[e("div",{class:"earth"},[e("div",{class:"mapWrapper"},[e("img",{attrs:{src:l.wordMap}})]),e("div",{class:"earthShadow"})])])])])}}),h=d=Object(i.a)([c.a],d),u=n.default.prototype.$state=n.default.observable({appList:[],resources:[]}),p=s("ca95"),f={install:e=>{e.config.productionTip=!1,e.use(p,{name:"v-touch"})}},v=(s("fb6a"),s("25f0"),s("466d"),s("1276"),s("8af0"));n.default.use(f);var m=function(){var e=Object(a.a)((function*(){var e,t,a,n=[];Object.entries(l).map(e=>{var t,[s,a]=e;n.push((t=a,new Promise((e,s)=>{var a=new Image;a.onload=()=>{e(a)},a.onerror=()=>{s("load error:"+t)},a.src=t})))}),u.resources[0]=yield Promise.all(n),yield(e=s("0342"),t=["Source Sans Pro","Dosis"],a=[],t.forEach(t=>{var s=t.split(":"),n=s[0];(s[1]?s[1].split(","):["n4"]).forEach(t=>{var s=t.match(/^([nio])([1-9])$/i);if(s){var i="n"==s[1]?"normal":"i"==s[1]?"italic":"oblique",c=parseInt(s[2],10)+"00";a.push(new e(n,{style:i,weight:c}).load())}})}),Promise.all(a)).catch(e=>{console.info("font preload timeout!")}).finally(()=>{v.a.emit("loaded")})}));return function(){return e.apply(this,arguments)}}();v.a.once("loaded",()=>{u.app=new n.default({render:e=>e(h)}).$mount("#app")}),m()},"181f":function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/face.fc7f352e.png"},ae44:function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/main.a05cf8f3.png"},fe46:function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/wordMap.33227146.svg"}}]);