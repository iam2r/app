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
      <v-touch tag="span" class="test-button" @tap="test($event)">HTML BUTTON</v-touch>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class App extends Vue {
  private count: number = 0;
  protected test(e: Event) {
    this.count++;
    (e.target as HTMLElement).innerHTML = "HTML BUTTON" + this.count;
  }
}
</script>
<style lang="scss">
.test-button {
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 30px;
  background: red;
  border-radius: 5px;
  color: white;
  font-size: 12px;
  position: absolute;
  left: 0px;
  bottom: 0px;
  transition: 0.3s all;
  cursor: pointer;
  &:active {
    transform: scale(0.9);
  }
}
</style>


