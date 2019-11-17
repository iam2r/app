// styles
import "minireset.css"
import "normalize.css"
import "@/styles/common.scss"
// import { isMobile } from "./common/utils";
// // 如果是非线上环境，加载 VConsole（移动端适用）
// if (process.env.NODE_ENV !== 'production' && isMobile()) {
//     const VConsole = require('vconsole');
//     new VConsole();
// }
// const FastClick = require('fastclick')
// let str = navigator.userAgent.toLowerCase();
// let ver = str.match(/cpu iphone os (.*?) like mac os/);
// if (!ver || parseInt(ver[1]) < 11) { //非IOS系统 或者 ios系统小于
//     // 兼容毒瘤ios的300ms延迟问题
// if ('addEventListener' in document) {
//     document.addEventListener(
//       'DOMContentLoaded',
//       () => {
//         FastClick.prototype.onTouchEnd =  (event:any)=> {
//             if (event.target.hasAttribute("type") && event.target.getAttribute("type") == "text") {
//               event.preventDefault();
//               return false;
//             }
//           }
        
//           FastClick.prototype.focus =  (targetElement:any)=> {
//             targetElement.focus();
//           };
        
//         (FastClick as any).attach(document.body);
//       },
//       false,
//     );
//   }
// }

require(`@/apps/${process.env.APP_NAME}`)





