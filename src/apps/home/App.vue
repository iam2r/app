<template>
  <ScrollView id="app">
    <div id="mobile-bar" :class="[isTop?'top':'']">
      <i class="menu-button"></i>
      <i class="logo"></i>
    </div>
    <div id="header">
      <div class="logo">
         <img class="header-logo" :src="require('./assets/logo.ico')" alt="home logo" />
         <span>iam2r</span>
      </div>
      <ul class="nav"></ul>
    </div>
    <div id="main">
      <div class="hero">
        <div class="left">
          <img class="hero-logo" :src="require('./assets/logo.ico')" alt="home logo" />
        </div>
        <div class="right">
          <h2>iam2r</h2>
          <h1>欢迎<br> 进入我的主页！</h1>
        </div>
      </div>
    </div>
  </ScrollView>
</template>
<script lang="ts">
import App from "./App";
export default App;
</script>
<style lang="scss">
@import "./App";
</style>
