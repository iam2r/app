import "./styles/_adapter.scss";
import Preloading from "@/apps/birthday/preloading/Preloading";
new Preloading();
import(/* webpackChunkName: "main-async" */ "@/apps/birthday/main");
