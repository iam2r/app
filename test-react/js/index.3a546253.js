(window.webpackJsonp=window.webpackJsonp||[]).push([["index"],{"1b49":function(e,t,n){"use strict";n.r(t),function(e){var t=n("8bc8"),r=n("eeb0");Object(t.render)(e.createElement(r.a,null),document.querySelector("#app"))}.call(this,n("ab5b"))},"1be0":function(e,t,n){},"49e3":function(e,t,n){"use strict";(function(e){n("e260"),n("e6cf"),n("ddb0");var r=n("1da1"),a=n("ab5b"),c=t=>{var{component:n,loading:c}=t;return t=>{var[o,u]=Object(a.useState)({component:null});return Object(a.useEffect)(()=>{Object(r.a)((function*(){c&&u({component:c}),u({component:(yield n()).default})}))()},[u]),o.component?e.createElement(o.component,t):null}};t.a=[{path:"/home",exact:!0,component:c({component:()=>Promise.all([n.e("vendors-async"),n.e("Home")]).then(n.bind(null,"f844")),loading:()=>e.createElement("div",null,"Loading...")})},{path:"/home2",exact:!0,component:c({component:()=>n.e("Home2").then(n.bind(null,"2ecf"))})}]}).call(this,n("ab5b"))},"6c75":function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"c",(function(){return v})),n.d(t,"b",(function(){return y}));n("e260"),n("ddb0");var r=n("ab5b"),a={record:100,current:0,isLogined:!1,message:""},c=n("ade3");function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){Object(c.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var i={add(e,t){var{data:n}=t,r=e.current+1;return u(u({},e),{},{record:r>e.record?r:e.record,current:r})},minus(e,t){var{data:n}=t;return u(u({},e),{},{current:e.current-1})},loginStatus(e,t){var{data:n}=t;return u(u({},e),{},{isLogined:!e.isLogined,current:Object.keys(n).length,message:n.message})}},s=(n("e6cf"),n("1da1")),l=n("bc3a"),b=n.n(l);b.a.defaults.baseURL="https://www.iamzr.tk";var d=function(){var e=Object(s.a)((function*(e,t){var{type:n,payload:r}=t;"".concat(n,":").concat(e,"====================>");try{var a=yield b.a[n](e,"post"==n?r:{params:r});return(e=>{if(e.status>=200&&e.status<300)return e;var t=new Error(e.statusText);throw t.response=e,t})(a),a.data}catch(c){return{err:c}}}));return function(t,n){return e.apply(this,arguments)}}(),p={addThenMinus:(e,t)=>Object(s.a)((function*(){var t;e({type:"add"}),yield(t=1e3,new Promise(e=>{setTimeout(e,t)})),e({type:"minus"})}))(),login:(e,t)=>Object(s.a)((function*(){var n=yield(e=>d("/testlocal/user/login",{type:"post",payload:e}))(t);e({type:"loginStatus",data:n})}))()};var f=Object(r.createContext)(),m=f.Provider,v=()=>Object(r.useContext)(f),y=()=>{var[e,t]=Object(r.useReducer)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,t=arguments.length>1?arguments[1]:void 0;return i[t.type]?i[t.type](e,t):e}),a);return{state:e,actions:p,dispatch:t}}},eeb0:function(e,t,n){"use strict";(function(e){var r=n("e792"),a=n("4f2e"),c=n("49e3"),o=n("6c75");t.a=()=>{var t=Object(o.b)();return e.createElement(o.a,{value:t},e.createElement(r.a,{basename:"/"},e.createElement(a.d,null,c.a.map((t,n)=>{var{path:r,exact:c,component:o}=t;return e.createElement(a.b,{key:n,path:r,exact:c,component:o})}),e.createElement(a.b,{render:()=>e.createElement(a.a,{to:"/home"})}))))}}).call(this,n("ab5b"))},ffb4:function(e,t,n){"use strict";n.r(t);n("b429"),n("f5df"),n("1be0");n("1b49")}},[["ffb4","runtime","vendors"]]]);