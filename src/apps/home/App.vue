<template>
  <div id="app">
    <ul class="nav">
      <li v-for="(item) in appList" :key="item">
        <a :href="`../${item}`">{{item}}</a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import App from "./App";
export default App;
</script>
<style lang="scss">
@import "./App";
</style>
