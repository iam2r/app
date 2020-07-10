import "vue-tsx-support/enable-check";
import Preloading from "app.root/preloading/Preloading";
new Preloading();
import(/* webpackChunkName: "main-async" */ "app.root/main");
