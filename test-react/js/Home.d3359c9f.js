(window.webpackJsonp=window.webpackJsonp||[]).push([["Home"],{"157e":function(e,t,a){"use strict";(function(e){var n=a("21fa"),r=a.n(n),s=a("fb31"),l=a("6c75");t.a=t=>{var{login:a,addThenMinus:n}=s.a,{state:o,dispatch:c}=Object(l.b)();return e.createElement("div",{className:r.a.normal},e.createElement("div",{className:r.a.record},"Record: ",o.record),e.createElement("div",{className:r.a.current},o.current),e.createElement("p",null,o.message),e.createElement("div",{className:r.a.button},e.createElement("button",{onClick:()=>{a(c,{username:"zrnokia5230",password:"zaq147895"})}},"login"),e.createElement("button",{onClick:()=>{n(c)}},"+ then -")))}}).call(this,a("ab5b"))},"21fa":function(e,t,a){e.exports={normal:"styles-module-normal-cFUhD",record:"styles-module-record-1Ybxn",current:"styles-module-current-yptgi",button:"styles-module-button-3ggKi"}},dff2:function(e,t,a){e.exports={normal:"styles-module-normal-38o34",title:"styles-module-title-2VKbd",welcome:"styles-module-welcome-1mGCf",list:"styles-module-list-3eMnh",about:"styles-module-about-3K3xQ",abc:"styles-module-abc-25SIq"}},f844:function(e,t,a){"use strict";a.r(t),function(e){var n=a("dff2"),r=a.n(n),s=a("157e"),l=a("6c75");t.default=t=>{var{state:a}=Object(l.b)();return e.createElement("div",{className:r.a.welcome},e.createElement(s.a,null," "),JSON.stringify(a))}}.call(this,a("ab5b"))},fb31:function(e,t,a){"use strict";a("e6cf");var n=a("1da1"),r=a("bc3a"),s=a.n(r);s.a.defaults.baseURL="https://www.iamzr.tk";var l=function(){var e=Object(n.a)((function*(e,t){var{type:a,payload:n}=t;"".concat(a,":").concat(e,"====================>");try{var r=yield s.a[a](e,"post"==a?n:{params:n});return(e=>{if(e.status>=200&&e.status<300)return e;var t=new Error(e.statusText);throw t.response=e,t})(r),r.data}catch(l){return{err:l}}}));return function(t,a){return e.apply(this,arguments)}}();t.a={addThenMinus:(e,t)=>Object(n.a)((function*(){var t;e({type:"add"}),yield(t=1e3,new Promise(e=>{setTimeout(e,t)})),e({type:"minus"})}))(),login:(e,t)=>Object(n.a)((function*(){var a=yield(e=>l("/testlocal/user/login",{type:"post",payload:e}))(t);e({type:"loginStatus",data:a})}))()}}}]);