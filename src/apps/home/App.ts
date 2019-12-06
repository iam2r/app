import { Component, Watch, Vue } from "vue-property-decorator";
import state from "./state";
import ScrollView from "app.root/components/scrollview/ScrollView.vue"

@Component({
    components: {
        ScrollView
    }
})
export default class App extends Vue {
    protected isSideBarOpen: boolean = false;
    protected topScrolled: boolean = false;
    protected mainTitle: string = 'iam2r';
    protected navData: { [key: string]: any }[] = [{
        key: 'Demo',
        href: '',
        children: [{
            key: '',
            href: ''
        }]
    }]

    get tap() {
        return 'ontouchstart' in window ? 'touchstart' : 'click'
    }

    protected created() {
        this.createNavData();
    }

    protected mounted() {
        this.bindEvents();
    }

    private bindEvents() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 168 && !this.topScrolled) {
                this.topScrolled = true
            } else if (window.pageYOffset <= 168 && this.topScrolled) {
                this.topScrolled = false
            }
        });


        let $slideDom = document.querySelector("#mobile-sidebar");
        let $menu = document.querySelector(".menu-button");
        document.body.addEventListener(this.tap, (e: any) => {
            if (!this.isSideBarOpen || $menu.contains(e.target)) return;
            if ($slideDom.contains(e.target)) return;
            this.toggleSlideBar()
        })
    }

    private createNavData() {
        let demoNav = this.navData.find(it => it.key == 'Demo');
        demoNav.children = [];
        state.appList.forEach(key => {
            demoNav.children.push({
                key,
                href: `../${key}`
            })
        });
    }

    protected toggleSlideBar() {
        this.isSideBarOpen = !this.isSideBarOpen
    }



}