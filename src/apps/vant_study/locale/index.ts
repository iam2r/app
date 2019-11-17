import Vue from "vue";
import { Locale } from 'vant';
import { createI18N } from "vant/lib/utils/create/i18n";
const i18nName = 'extend';

let lanList = require.context('./', false, /\.json$/).keys().map((item: any) => item.match(/[a-z]{2}-[A-Z]{2}/)[0]);
lanList = ['zh-CN', 'en-US'];

const i18n = (lan: string) => {
    Locale.use(lan, require('vant/lib/locale/lang/' + lan).default)
}


const messages = lanList.reduce((pre: any, cur: string) => {
    pre[cur] = {
        [i18nName]: {
            ...require(`./` + cur + `.json`),
        }
    };
    return pre;
}, {}) // set locale messages

Locale.add(messages);

Vue.prototype.$t = createI18N(i18nName);
Vue.prototype.$i18n = i18n;





