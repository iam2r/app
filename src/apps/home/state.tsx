import Vue from 'vue';

interface State {
    app?: Vue;
    appList: string[];
}

declare module 'vue/types/vue' {
    interface Vue {
        $state: State;
    }
};

let state: State = {
    appList: []
}

export default Vue.prototype.$state = Vue.observable(state); 