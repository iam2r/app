<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>

    <ul>
      <li>
        <router-link to="/">/</router-link>
      </li>
      <li>
        <router-link to="/hello/you">/hello/you</router-link>
      </li>
    </ul>

    <div ref="wheel" id="wheel" :status="wheelStatus" :result="wheelResult" :style="wheelStyle">
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
    </div>

    <button @click="onSpin">Spin</button>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
@Component
export default class App extends Vue {
  public wheelStatus: string = "stop";
  public wheelResult: number = 0;
  public wheelStyle: { [key: string]: string } = {};
  @Watch("$route", { immediate: true, deep: true })
  onRouteChanged(val: Object, oldVal: Object) {
    console.log(val);
  }

  private get wheel() {
    return <any>this.$refs["wheel"];
  }

  private spinStoped() {
    console.log("animationEnd");
    this.wheelStyle = {
      transform: `rotate(${this.wheelResult * 72}deg)`
    };
    this.wheel.removeEventListener("animationEnd", this.spinStoped);
    this.wheelStatus = "stop";
  }

  private calcAngleFromMatrix() {
    let transform = <string>getComputedStyle(this.wheel)["transform"];
    let sinAngle = Number(transform.split(",")[0].replace("matrix(", ""));
    return (Math.asin(sinAngle) * 180) / Math.PI;
  }

  public onSpin() {
    if (this.wheelStatus != "stop") return;
    this.wheelStatus = "loading";

    setTimeout(() => {
      let result = Math.floor(Math.random() * 4);
      this.wheelResult = [0, 1, 2, 3, 4][result];
      this.wheelStatus = "loaded";
      this.wheelStyle = {
        transform: `rotate(${this.calcAngleFromMatrix()}deg)`
      };
      this.wheel.addEventListener("animationend", this.spinStoped);
    }, 2000);
  }
}
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #9bc0e5;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@keyframes loading {
  to {
    transform: rotate(360deg);
  }
}

@keyframes loaded-0 {
  to {
    transform: rotate(720deg);
  }
}

@keyframes loaded-1 {
  to {
    transform: rotate(792deg);
  }
}
@keyframes loaded-2 {
  to {
    transform: rotate(864deg);
  }
}
@keyframes loaded-3 {
  to {
    transform: rotate(936deg);
  }
}
@keyframes loaded-4 {
  to {
    transform: rotate(1008deg);
  }
}

#wheel {
  width: 480px;
  height: 480px;
  background: red;
  border-radius: 50%;
  position: relative;
 
  &[status="loading"],
  &[status="error"] {
    animation: loading 1s infinite linear;
  }
  &[status="loaded"] {
    &[result="0"] {
      animation: loaded-0 4s 1 linear forwards;
    }
    &[result="1"] {
      animation: loaded-1 4s 1 linear forwards;
    }
    &[result="2"] {
      animation: loaded-2 4s 1 linear forwards;
    }
    &[result="3"] {
      animation: loaded-3 4s 1 linear forwards;
    }
    &[result="4"] {
      animation: loaded-4 4s 1 linear forwards;
    }
  }
  > span {
    top: 0;
    left: 190px;
    position: absolute;
    width: 100px;
    height: 240px;
    transform-origin: center bottom;
    &:nth-child(1) {
      transform: rotate(0deg);
    }
    &:nth-child(2) {
      transform: rotate(-72 * 1deg);
    }
    &:nth-child(3) {
      transform: rotate(-72 * 2deg);
    }
    &:nth-child(4) {
      transform: rotate(-72 * 3deg);
    }
    &:nth-child(5) {
      transform: rotate(-72 * 4deg);
    }
  }
}
</style>
