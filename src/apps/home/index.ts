import Vue from 'vue';
import App from './App.vue';
import state from "./state";
import { loadJson } from "@/common/Utils.ts";
const VueTouch = require("vue-touch");

Vue.config.productionTip = false;
Vue.prototype.$state = state;
Vue.use(VueTouch, { name: "v-touch" });

(async () => {
    let config = <any>(await loadJson('../apps.json?' + new Date().getTime()));
    state.appList = config.apps.filter(it => it !== 'home');
    state.app = new Vue({
        render: (h) => h(App),
    }).$mount('#app');
})()


