import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        state: "",
        scale:1,
        width:window.innerWidth,
        height:window.innerHeight
    }
});

export default store;