const VueTouch = require("vue-touch");
export default {
  install: (Vue: any) => {
    Vue.config.productionTip = false;
    Vue.use(VueTouch, { name: "v-touch" });
  }
};
