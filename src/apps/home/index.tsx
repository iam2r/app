import Vue from 'vue';
import App from './App';
import state from "./state";
import ResizeObserver from 'resize-observer-polyfill';
const VueTouch = require("vue-touch");

Vue.config.productionTip = false;
Vue.use(VueTouch, { name: "v-touch" });

state.app = new Vue({
    render: (h) => h(App),
}).$mount('#app');

new ResizeObserver((entries) => {
    for (const entry of entries) {
        state.app.$emit('resize',entry.contentRect)
    }
}).observe(document.querySelector('html'));


