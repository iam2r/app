import { Component, Watch, Vue } from "vue-property-decorator";
import state from "./state";
import ScrollView from "app.root/components/scrollview/ScrollView.vue"

@Component({
    components: {
        ScrollView
    }
})
export default class App extends Vue {
    protected appList: string[] = state.appList;
    protected isTop: boolean = true;

}