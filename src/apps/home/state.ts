import Vue from 'vue';
declare module 'vue/types/vue' {
    interface Vue {
        $state: any;
    }
};

export default Vue.prototype.$state = {
    appList: []
}