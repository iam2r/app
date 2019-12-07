import { VNode } from 'vue';
import { Component, Vue, Emit } from "vue-property-decorator";
import * as Hammer from 'hammerjs';
import "./App.scss";

interface Nav {
    key: string;
    href?: string;
    children?: Nav[];
}

@Component
export default class App extends Vue {
    protected isSideBarOpen: boolean = false;
    protected topScrolled: boolean = false;
    protected mainTitle: string = 'iam2r';
    protected navData: Nav[] = [{
        key: 'Demo',
        href: '',
        children: [{
            key: '',
            href: ''
        }]
    }]

    protected created() {
        this.createNavData();
    }

    protected mounted() {
        this.bindEvents();
    }

    protected render(): VNode {
        return (
            <div id="app">
                {this.createViewMobileBar()}
                {this.createViewMobileSideBar()}
                {this.createViewHeader()}
                {this.createViewMain()}
                {this.createViewFooter()}
            </div >

        )
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
        new Hammer(document.body).on('tap', (e: any) => {
            if (!this.isSideBarOpen || $menu.contains(e.target)) return;
            if ($slideDom.contains(e.target)) return;
            this.toggleSlideBar()
        });


        this.$nextTick(() => {
            this.$state.app.$on('resize', (size) => {
                console.log(size)
            })
        })
    }

    private createNavData() {
        let demoNav = this.navData.find(it => it.key == 'Demo');
        demoNav.children = [];
        this.$state.appList.forEach(key => {
            demoNav.children.push({
                key,
                href: `../${key}`
            })
        });
    }

    private toggleSlideBar() {
        this.isSideBarOpen = !this.isSideBarOpen
    }

    private formateHref(href: string) {
        return href ? href : 'javascript:void(0);'
    }

    private createViewNav(navData: Nav[]): VNode {
        return (
            <ul class="nav">
                {
                    navData.map((nav: Nav) =>
                        <li key={nav.key} class="nav-dropdown-container">
                            <a href={this.formateHref(nav.href)}>{nav.key}</a>
                            {nav.children && !!nav.children.length &&
                                [
                                    <span class="arrow"></span>,
                                    <ul class="nav-dropdown">
                                        {
                                            nav.children.map((child: Nav) =>
                                                <li key={child.key} >
                                                    <a href={this.formateHref(child.href)}>{child.key}</a>
                                                </li>
                                            )
                                        }
                                    </ul>
                                ]
                            }
                        </li>
                    )
                }
            </ul>
        )
    }

    private createViewMobileBar(): VNode {
        return (
            <div id="mobile-bar" class={[!this.topScrolled ? 'top' : '']}>
                <v-touch tag="i" class="menu-button" onTap={this.toggleSlideBar}></v-touch>
                <transition enter-active-class="animated jello" leave-active-class="animated fast bounceOut">
                    <i v-show={this.topScrolled} class="logo"></i>
                </transition>
            </div >
        )
    }

    private createViewMobileSideBar(): VNode {

        return (
            <div id="mobile-sidebar" class={[this.isSideBarOpen ? 'open' : '']}>
                <div class="scroll-container">
                    {this.createViewNav(this.navData)}
                    <div class="test" style="height:100vh"></div>
                </div>
            </div>
        )
    }

    private createViewFooter(): VNode {
        return (
            <div id="footer">
                <p>Copyright © 2020 ZhangRui</p>
            </div>
        )
    }

    private createViewMain(): VNode {
        return (
            <div id="main">
                <div class="hero">
                    <div class="left">
                        <img class="hero-logo" src={require('./assets/images/logo.svg')} alt="home logo" />
                    </div>
                    <div class="right">
                        <h2>{this.mainTitle}</h2>
                        <h1>
                            欢迎
                     <br />进入我的主页
                    </h1>
                    </div>
                </div>
                <div class="test" style="height:100vh"></div>
            </div>
        )
    }

    private createViewHeader(): VNode {
        return (
            <div id="header">
                <div class="logo">
                    <img class="header-logo" src={require('./assets/images/logo.svg')} alt="home logo" />
                    <span>{this.mainTitle}</span>
                </div>
                {this.createViewNav(this.navData)}
            </div>
        )
    }

}