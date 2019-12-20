<template>
  <div id="app">
    <div
      id="views"
      :style="{
        //width: `${100/$store.state.scale}%`,
        //height: `${100/$store.state.scale}%`,
        width: `${$store.state.width}px`,
        height: `${$store.state.height}px`,
        transform: `translate(-50%,-50%) scale(${$store.state.scale})`
      }"
    >
      <div class="html-button">
        <v-touch tag="span" class="test-button" @tap="test($event)">
          Tap
        </v-touch>
        <span class="test-button" @click="click($event)">Click</span>
      </div>

      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class App extends Vue {
  private count = 0;
  private clickCount = 0;
  protected test(e: Event) {
    this.count++;
    (e.target as HTMLElement).innerHTML = "Tap" + this.count;
  }

  protected click(e: Event) {
    this.clickCount++;
    (e.target as HTMLElement).innerHTML = "Click" + this.clickCount;
  }
}
</script>
<style lang="scss">
.html-button {
  position: absolute;
  left: 0px;
  bottom: 0px;
  display: flex;
  align-items: center;
  .test-button {
    pointer-events: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    background: red;
    border-radius: 5px;
    color: white;
    font-size: 12px;
    transition: 0.3s all;
    cursor: pointer;
    &:active {
      transform: scale(0.8);
    }
  }
}
</style>
