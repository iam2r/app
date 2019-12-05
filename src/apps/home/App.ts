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
    protected topScrolled: boolean = false;
    protected mainTitle: string = 'iam2r';

    protected created() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 165 && !this.topScrolled) {
                this.topScrolled = true
            } else if (window.pageYOffset <= 165 && this.topScrolled) {
                this.topScrolled = false
            }
        })
    }

}