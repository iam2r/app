import { abc } from "./untils";
const $app = document.querySelector("#app");
// import lazyTest from "@/apps/img2font/dynamic/component";
require("@/webfonts/myfont.font.js");

const $div = document.createElement("div");
$div.innerHTML = `
<h2>图片转字体图标测试</h2>
<i class="myfonticon myfonticon-arrow_adian"></i>
<i class="myfonticon myfonticon-arrow_down"></i>
<i class="myfonticon myfonticon-arrow_up"></i>
<i class="myfonticon myfonticon-btn_close_up"></i>
<i class="myfonticon myfonticon-btn_confirm_up"></i>


<i class="myfonticon myfonticon-btn_home_up"></i>

<i class="myfonticon myfonticon-exit_up"></i>
<i class="myfonticon myfonticon-help_up"></i>
<i class="myfonticon myfonticon-history_up"></i>
<i class="myfonticon myfonticon-paytable_up"></i>
<i class="myfonticon myfonticon-quickmenu_up"></i>
<i class="myfonticon myfonticon-sound_off_up"></i>
<i class="myfonticon myfonticon-sound_on_up"></i>

`;

// $app.appendChild(lazyTest());
$app.appendChild($div);
