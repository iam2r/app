import Vue from 'vue';
import App from './App.vue';
import state from "./state";
Vue.config.productionTip = false;
export const loadJson = (url: string) => {
    return new Promise((resolve, reject) => {
        let xhr = (<any>window).XMLHttpRequest ? new (<any>window).XMLHttpRequest() : new ActiveXObject("Micosoft.XMLHttp");
        xhr.open("GET", url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(JSON.parse(xhr.response));
            }
        };
    })
}
(async () => {
    let config = <any>(await loadJson('../apps.json?' + new Date().getTime()));
    state.appList = config.apps.filter(it => it !== 'home');
   
    new Vue({
        render: (h) => h(App),
    }).$mount('#app');
})()


