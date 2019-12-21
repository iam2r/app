import { VNode } from "vue";
import { Component, Vue } from "vue-property-decorator";
import * as Hammer from "hammerjs";
import resource from "app.root/resources";
import "./App.scss";

interface Nav {
  key: string;
  href?: string;
  children?: Nav[];
}

@Component
export default class App extends Vue {
  protected isSideBarOpen = false;
  protected topScrolled = false;
  protected mainTitle = "iam2r";

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
      </div>
    );
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

  private bindEvents() {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 168 && !this.topScrolled) {
        this.topScrolled = true;
      } else if (window.pageYOffset <= 168 && this.topScrolled) {
        this.topScrolled = false;
      }
    });

    new Hammer(document.body).on("tap", (e: any) => {
      const $slideDom = document.querySelector("#mobile-sidebar");
      const $menu = document.querySelector(".menu-button");
      if (!this.isSideBarOpen || $menu.contains(e.target)) return;
      if ($slideDom.contains(e.target)) return;
      this.toggleSlideBar();
    });

    this.$nextTick(() => {
      this.$state.app.$on("resize", size => {
        console.log(size);
      });
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
