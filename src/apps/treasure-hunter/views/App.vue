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
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class App extends Vue {}
</script>


