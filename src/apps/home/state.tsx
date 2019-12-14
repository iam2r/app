import Vue from 'vue';

interface State {
    app?: Vue;
    appList: string[];
    resources:any[]
}

declare module 'vue/types/vue' {
    interface Vue {
        $state: State;
    }
};

let state: State = {
    appList: [],
    resources:[],
}

export default Vue.prototype.$state = Vue.observable(state); 