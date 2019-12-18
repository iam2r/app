import { VNode } from "vue";
import { Component, Vue } from "vue-property-decorator";
import * as Hammer from "hammerjs";
import Loading from "app.root/components/loading/Loadind";
import resource from "app.root/resources";
import { loadJson, loadFont } from "@/common/Utils";
import state from "./state";
import "./App.scss";

interface Nav {
  key: string;
  href?: string;
  children?: Nav[];
}

@Component
export default class App extends Vue {
  private isLoaing: boolean = true;
  protected isSideBarOpen: boolean = false;
  protected topScrolled: boolean = false;
  protected mainTitle: string = "iam2r";

  protected async created() {
    let config = (await loadJson("../apps.json?" + +new Date())) as any;
    state.appList = config.apps.filter(it => it !== "home");
    state.resources = config.resources.home;
    await loadFont(["Source Sans Pro:n3,n4,n6", "Dosis:n5"]).catch((error) => { console.log('font preload error');this.initMain() });
    this.initMain();
  }

  private initMain() {
    this.isLoaing = false;
    this.$nextTick(() => {
      this.bindEvents();
    });
  }

  private get navData(): Nav[] {
    return [
      {
        key: "Demo",
        href: "",
        children: this.$state.appList.map((key: string) => ({
          key,
          href: `../${key}`
        }))
      }
    ];
  }

  protected render(): VNode {
    return this.isLoaing ? (
      <transition leave-active-class="animated zoomOut">
        <Loading />
      </transition>
    ) : (
        <div id="app">
          {this.createViewMobileBar()}
          {this.createViewMobileSideBar()}
          {this.createViewHeader()}
          {this.createViewMain()}
          {this.createViewFooter()}
        </div>
      );
  }

  private bindEvents() {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 168 && !this.topScrolled) {
        this.topScrolled = true;
      } else if (window.pageYOffset <= 168 && this.topScrolled) {
        this.topScrolled = false;
      }
    });

    new Hammer(document.body).on("tap", (e: any) => {
      let $slideDom = document.querySelector("#mobile-sidebar");
      let $menu = document.querySelector(".menu-button");
      if (!this.isSideBarOpen || $menu.contains(e.target)) return;
      if ($slideDom.contains(e.target)) return;
      this.toggleSlideBar();
    });

    this.$state.app.$on("resize", size => {
      console.log(size);
    });
  }

  private toggleSlideBar() {
    this.isSideBarOpen = !this.isSideBarOpen;
  }

  private formateHref(href: string) {
    return href ? href : "javascript:void(0);";
  }

  private createViewNav(navData: Nav[]): VNode {
    return (
      <ul class="nav">
        {navData.map((nav: Nav) => (
          <li key={nav.key} class="nav-dropdown-container">
            <a href={this.formateHref(nav.href)}>{nav.key}</a>
            {nav.children &&
              !!nav.children.length && [
                <span class="arrow"></span>,
                <ul class="nav-dropdown">
                  {nav.children.map((child: Nav) => (
                    <li key={child.key}>
                      <a href={this.formateHref(child.href)}>{child.key}</a>
                    </li>
                  ))}
                </ul>
              ]}
          </li>
        ))}
      </ul>
    );
  }

  private createViewMobileBar(): VNode {
    return (
      <div id="mobile-bar" class={[!this.topScrolled ? "top" : ""]}>
        <v-touch
          tag="i"
          class="menu-button"
          onTap={this.toggleSlideBar}
        ></v-touch>
        <transition
          enter-active-class="animated jello"
          leave-active-class="animated fast bounceOut"
        >
          <i v-show={this.topScrolled} class="logo"></i>
        </transition>
      </div>
    );
  }

  private createViewMobileSideBar(): VNode {
    return (
      <div id="mobile-sidebar" class={[this.isSideBarOpen ? "open" : ""]}>
        <div class="scroll-container">
          {this.createViewNav(this.navData)}
          <div class="test" style="height:100vh"></div>
        </div>
      </div>
    );
  }

  private createViewFooter(): VNode {
    return (
      <div id="footer">
        <p>Copyright © 2020 ZhangRui</p>
      </div>
    );
  }

  private createViewMain(): VNode {
    return (
      <div id="main">
        <div class="hero">
          <div class="left">
            <img class="hero-logo" src={resource.logo} alt="home logo" />
          </div>
          <div class="right">
            <h2>{this.mainTitle}</h2>
            <h1>
              欢迎
              <br />
              进入我的主页
            </h1>
          </div>
        </div>
        <div class="test" style="height:100vh"></div>
      </div>
    );
  }

  private createViewHeader(): VNode {
    return (
      <div id="header">
        <div class="logo">
          <img class="header-logo" src={resource.logo} alt="home logo" />
          <span>{this.mainTitle}</span>
        </div>
        {this.createViewNav(this.navData)}
      </div>
    );
  }
}
