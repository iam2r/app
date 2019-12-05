<template>
  <div id="app">
    <div id="mobile-bar" :class="[!topScrolled?'top':'']">
      <i class="menu-button" @[tap]="toggleSlideBar"></i>
      <i class="logo"></i>
    </div>
    <div id="mobile-sidebar" :class="[isSideBarOpen?'open':'']">
      <div class="scroll-container">
        <ul class="nav">
        <li v-for="(nav) in navData" :key="nav.key" class="nav-dropdown-container">
          <a :href="nav.href">{{nav.key}}</a>
          <template v-if="nav.children&&nav.children.length">
            <span class="arrow"></span>
            <ul class="nav-dropdown">
              <li v-for="(child) in nav.children" :key="child.key">
                <a :href="child.href">{{child.key}}</a>
              </li>
            </ul>
          </template>
        </li>
      </ul>
      </div>
    </div>
    <div id="header">
      <div class="logo">
        <img class="header-logo" :src="require('./assets/logo.ico')" alt="home logo" />
        <span>{{mainTitle}}</span>
      </div>
      <ul class="nav">
        <li v-for="(nav) in navData" :key="nav.key" class="nav-dropdown-container">
          <a :href="nav.href">{{nav.key}}</a>
          <template v-if="nav.children&&nav.children.length">
            <span class="arrow"></span>
            <ul class="nav-dropdown">
              <li v-for="(child) in nav.children" :key="child.key">
                <a :href="child.href">{{child.key}}</a>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </div>
    <div id="main">
      <div class="hero">
        <div class="left">
          <img class="hero-logo" :src="require('./assets/logo.ico')" alt="home logo" />
        </div>
        <div class="right">
          <h2>{{mainTitle}}</h2>
          <h1>
            欢迎
            <br />进入我的主页！
          </h1>
        </div>
      </div>
      <div class="test" style="height:100vh"></div>
    </div>
    <div id="footer">
      <p>Copyright © 2014-2020 ZhangRui</p>
    </div>
  </div>
</template>
<script lang="ts">
import App from "./App";
export default App;
</script>
<style lang="scss">
@import "./App";
</style>
