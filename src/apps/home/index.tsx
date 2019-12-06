import Vue from 'vue';
import App from './App';
import state from "./state";
import { loadJson } from "@/common/Utils.ts";
const VueTouch = require("vue-touch");

Vue.config.productionTip = false;
Vue.use(VueTouch, { name: "v-touch" });

(async () => {
    let config = (await loadJson('../apps.json?' + new Date().getTime())) as any;
    state.appList = config.apps.filter(it => it !== 'home');
    state.app = new Vue({
        render: (h) => h(App),
    }).$mount('#app');
})()


