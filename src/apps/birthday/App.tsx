import { VNode } from "vue";
import { Component, Watch, Ref } from "vue-property-decorator";
import * as tsx from "vue-tsx-support";
import { TweenLite, Linear, gsap } from "gsap";
import MySwiper from "app.root/components/swiper";
import LandInAnimation from "./modules/LandInAnimation";
import SwiperClass from "swiper";
import "./App.scss";
gsap.ticker.lagSmoothing(0, null);

@Component
export default class App extends tsx.Component<any> {
  private birthDate: number = +new Date(`2020/9/19`);
  private revolution: number = 3600 * 24 * 1000; //一圈的毫秒数
  private active: boolean = false;
  private sceneRotate: number = 0;
  private sceneScale: number = 1;
  private sceneTranslateY: number = 7;
  private isSceneAnimating: boolean = false;
  private countDown: number = 0;
  private countDownTimer: any;
  private snailRotateTween: TweenLite;
  private test: boolean = false;
  private slideIndex: number = -1;
  private lanInItem: LandInAnimation;
  private showTips: boolean = false;
  private swiperOptions: any = {
    direction: "vertical",
    on: {
      slideChangeTransitionEnd: this.onSlideChangeTransitionEnd,
    },
  };

  @Ref()
  private readonly mySwiper!: MySwiper;

  private get sceneStyle() {
    return {
      transform: `translate3d(-50%, ${this.sceneTranslateY}rem,0) rotateZ(${this.sceneRotate}deg) scale3d(${this.sceneScale},${this.sceneScale},1)`,
    };
  }

  private get isBirthDay(): boolean {
    return this.test;
    return this.countDown <= 0;
  }

  private get formateMilliSecond() {
    const ms = this.countDown;
    const ss = 1000;
    const mi = ss * 60;
    const hh = mi * 60;
    const dd = hh * 24;

    const day = Math.floor(ms / dd);
    const hour = Math.floor((ms - day * dd) / hh);
    const minute = Math.floor((ms - day * dd - hour * hh) / mi);
    const second = Math.floor((ms - day * dd - hour * hh - minute * mi) / ss);
    const milliSecond = ms - day * dd - hour * hh - minute * mi - second * ss;

    const strDay = day < 10 ? "0" + day : "" + day; //天
    const strHour = hour < 10 ? "0" + hour : "" + hour; //小时
    const strMinute = minute < 10 ? "0" + minute : "" + minute; //分钟
    const strSecond = second < 10 ? "0" + second : "" + second; //秒
    let strMilliSecond =
      milliSecond < 10 ? "0" + milliSecond : "" + milliSecond; //毫秒
    strMilliSecond =
      milliSecond < 100 ? "0" + strMilliSecond : "" + strMilliSecond;

    return {
      day: strDay,
      hour: strHour,
      minute: strMinute,
      second: strSecond,
      milliSecond: strMilliSecond,
    };
  }

  @Watch("slideIndex")
  protected onSlideIndexChange(value: number) {
    if (value == 1) {
      this.lanInItem = this.initLanInItem();
      this.lanInItem.start();
    } else {
      this.lanInItem && this.lanInItem.hide();
    }
  }

  @Watch("slideIndex")
  @Watch("isBirthDay")
  protected onArrowTipsStatusChange() {
    this.$nextTick(() => {
      this.showTips = !this.mySwiper.swiperInstance.isEnd;
    });
  }

  protected mounted() {
    this.slideIndex = 0;
    this.initCountDown();
    setTimeout(() => {
      if (this.active) return;
      this.doActive();
    }, 2000);
  }

  private initLanInItem() {
    this.lanInItem && this.lanInItem.destory();
    return new LandInAnimation(
      this.$el.querySelector(".land-in-p") as HTMLElement,
      {
        content: `Hi,XXX。<br>寒窗苦参凡尘坎坷，<br>春秋却忘夏衾冬葛。<br>世间冷暖与思念如何物？<br>与你我如何物？<br>盼泪眼望穿天地，<br>求知己如若斯人。<br>长途漫漫，<br>乞相伴而行。<br>诞辰快乐。`,
      }
    );
  }

  private onSlideChangeTransitionEnd() {
    this.slideIndex = this.mySwiper.swiperInstance.activeIndex;
  }

  private initCountDown() {
    this.countDown = this.birthDate - +new Date();
    clearInterval(this.countDownTimer);
    this.countDownTimer = setInterval(() => {
      this.countDown = this.birthDate - +new Date();
      if (this.countDown <= 0) {
        clearInterval(this.countDownTimer);
      }
    }, 1000);
  }

  private doActive() {
    if (this.isSceneAnimating) return;
    this.isSceneAnimating = true;
    setTimeout(() => {
      this.isSceneAnimating = false;
    }, 2000);
    const nowDate = new Date();
    const diff =
      +nowDate -
      +new Date(
        `${nowDate.getFullYear()}/${
          nowDate.getMonth() + 1
        }/${nowDate.getDate()}`
      ); //已经过去的毫秒数

    this.active = !this.active;
    this.sceneRotate = this.active
      ? ((diff % this.revolution) / this.revolution) * -360
      : 0;
    this.sceneScale = this.active ? 0.09 : 1;
    this.sceneTranslateY = this.active ? -30.2 : 7;

    if (this.active) {
      if (this.snailRotateTween)
        return this.snailRotateTween
          .time(this.revolution / 1000)
          .repeat(-1)
          .restart();
      this.snailRotateTween = TweenLite.fromTo(
        ".snail-box",
        this.revolution / 1000,
        {
          rotate: 0,
        },
        {
          ease: Linear.easeNone,
          rotate: -360,
          repeat: -1,
        }
      );
    } else {
      this.snailRotateTween && this.snailRotateTween.time(2).reverse();
    }
  }

  private startsDom(): VNode {
    return (
      <div class="stars">
        <div class="star"></div>
        <div class="star pink"></div>
        <div class="star blue"></div>
        <div class="star yellow"></div>
      </div>
    );
  }

  private countdownDom(): VNode {
    return (
      <transition
        enter-active-class="animated jello"
        leave-active-class="animated fast bounceOut"
      >
        {this.slideIndex == 0 && !this.isBirthDay ? (
          <div class="clock clock-countdown">
            <div class="elem-center">
              <div class="digit">
                <span class="days">{this.formateMilliSecond.day}</span>
                <span class="txt">天</span>
              </div>
            </div>
            <div class="elem-bottom">
              <div class="deco"></div>
              <span class="hours">{this.formateMilliSecond.hour}</span>
              <span class="thin"> 小时</span>
              <span class="minutes">{this.formateMilliSecond.minute}</span>
              <span class="thin"> 分钟</span>
              <span class="seconds">{this.formateMilliSecond.second}</span>
              <span class="thin"> 秒</span>
            </div>
          </div>
        ) : null}
      </transition>
    );
  }

  private startTextDom(): VNode {
    return (
      <transition
        enter-active-class="animated jello"
        leave-active-class="animated fast bounceOut"
      >
        {this.slideIndex == 0 && this.isBirthDay ? (
          <div class="start-text">
            <h1 class="title slide-bar">愿你贪吃不胖，愿你傻人傻福。</h1>
            <p class="subtitle slide-bar">生日快乐！</p>
          </div>
        ) : null}
      </transition>
    );
  }

  private snailDom(): VNode {
    return (
      <div class="snail-box">
        <div class="snail-wrapper">
          <div class="snail">
            <div class="face"></div>
            <div class="eyes left"></div>
            <div class="eyes right"></div>
            <div class="shell front">
              <div class="innershell"></div>
            </div>
            <div class="shell behind"></div>
            <div class="bottomchest"></div>
          </div>
        </div>
        <div class="speed">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }

  private page1Dom(): VNode {
    return (
      <div class="page-one">
        <v-touch
          onTap={() => {
            this.test = !this.test;
          }}
          class="test-box"
        >
          Click To Test
        </v-touch>
        {this.startsDom()}
        {this.countdownDom()}
        {this.startTextDom()}
        <v-touch
          class={["scene", this.active ? "active" : ""]}
          style={this.sceneStyle}
          onTap={() => {
            this.doActive();
          }}
        >
          {this.snailDom()}
          <div class="ground">
            <div class="earth">
              <div class="map-wrapper"></div>
              <div class="earth-shadow"></div>
            </div>
          </div>
        </v-touch>
      </div>
    );
  }

  private page2Dom(): VNode {
    return (
      <div class="page-two">
        <p
          class="land-in-p"
          onClick={() => {
            this.lanInItem && this.lanInItem.skip();
          }}
        ></p>
      </div>
    );
  }

  private page3Dom(): VNode {
    return <div class="page-three">page3</div>;
  }

  protected render(): VNode {
    return (
      <div id="app">
        <MySwiper
          ref="mySwiper"
          options={this.swiperOptions}
          length={this.isBirthDay ? 3 : 1}
          scopedSlots={{
            default: (i) =>
              [this.page1Dom(), this.page2Dom(), this.page3Dom()][i],
          }}
        />
        {<span v-show={this.showTips} class="swiper-tip"></span>}
      </div>
    );
  }
}
