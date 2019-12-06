import Vue from 'vue';

interface State {
    app: Vue;
    appList: string[];
}

declare module 'vue/types/vue' {
    interface Vue {
        $state: State;
    }
};

export default Vue.prototype.$state = {

} as State