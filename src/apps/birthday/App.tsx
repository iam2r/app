import { VNode } from "vue";
import { Component } from "vue-property-decorator";
import * as tsx from "vue-tsx-support";
import { TweenLite, Linear } from "gsap";
import * as Hammer from "hammerjs";
import resource from "app.root/resources";
// TweenLite.lagSmoothing(0, null);

import "./App.scss";

@Component
export default class App extends tsx.Component<any> {
  private active: boolean = false;
  private sceneRotate: number = 0;
  private sceneScale: number = 1;
  private sceneTranslateY: number = 7;
  private birthDate: number = +new Date(`2020/9/19`);
  private countDown: number = 0;
  private countDownTimer: any;
  private snailRotateTween: TweenLite;

  private get sceneStyle() {
    return {
      transform: `translate3d(-50%, ${this.sceneTranslateY}rem,0) rotateZ(${this.sceneRotate}deg) scale3d(${this.sceneScale},${this.sceneScale},1)`,
    };
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

    let strDay = day < 10 ? "0" + day : "" + day; //天
    let strHour = hour < 10 ? "0" + hour : "" + hour; //小时
    let strMinute = minute < 10 ? "0" + minute : "" + minute; //分钟
    let strSecond = second < 10 ? "0" + second : "" + second; //秒
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

  protected created() {
    this.initCountDown();
    setTimeout(() => {
      if (this.active) return;
      this.doActive();
    }, 2000);
  }

  protected mounted() {
    // this.bindEvents();
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
    const nowDate = new Date();
    const diff =
      +nowDate -
      +new Date(
        `${nowDate.getFullYear()}/${
          nowDate.getMonth() + 1
        }/${nowDate.getDate()}`
      ) +
      2000;
    this.active = !this.active;
    this.sceneRotate = this.active ? (-360 * diff) / (3600 * 1000 * 24) : 0;
    this.sceneScale = this.active ? 0.09 : 1;
    this.sceneTranslateY = this.active ? -30.2 : 7;
    if (this.active) {
      if (this.snailRotateTween)
        return this.snailRotateTween.repeat(-1).restart();
      this.snailRotateTween = TweenLite.fromTo(
        ".snail-box",
        86400,
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
      this.snailRotateTween && this.snailRotateTween.reverse(2);
    }
  }

  private countdownDom(): VNode {
    if (this.countDown <= 0) return;
    return (
      <div class="clock clock-countdown">
        <div class="elem-center">
          <div class="digit">
            {" "}
            <span class="days">{this.formateMilliSecond.day}</span>{" "}
            <span class="txt">天</span>{" "}
          </div>
        </div>
        <div class="elem-bottom">
          <div class="deco"></div>
          <span class="hours">{this.formateMilliSecond.hour}</span>
          <span class="thin"> 小时</span>{" "}
          <span class="minutes">{this.formateMilliSecond.minute}</span>
          <span class="thin"> 分钟</span>{" "}
          <span class="seconds">{this.formateMilliSecond.second}</span>
          <span class="thin"> 秒</span>{" "}
        </div>
      </div>
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

  protected render(): VNode {
    return (
      <div id="app">
        {this.countdownDom()}
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
              <div class="mapWrapper">
                <img src={resource.wordMap} />
              </div>
              <div class="earthShadow"></div>
            </div>
          </div>
        </v-touch>
      </div>
    );
  }
}
