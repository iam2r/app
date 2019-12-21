import Vue from "vue";
import App from "./App";
import state from "./state";
import VuePlugin from "./VuePlugin";
Vue.prototype.$state = Vue.observable(state);
Vue.use(VuePlugin);

state.app = new Vue({
  render: h => h(App)
}).$mount("#app");
