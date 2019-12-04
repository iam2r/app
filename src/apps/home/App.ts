import { Component, Watch, Vue } from "vue-property-decorator";
import state from "./state";
@Component
export default class App extends Vue {
    protected appList: string[] = state.appList

}