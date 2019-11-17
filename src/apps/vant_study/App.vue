<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
@Component
export default class App extends Vue {
  @Watch("$route", { immediate: true, deep: true })
  onRouteChanged(val: Object, oldVal: Object) {
    console.log(val);
  }

  protected created() {
    this.createMeta();
  }
  private createMeta() {
    let insertNode = window.document.head.querySelector("link");

    [
      {
        name: "apple-mobile-web-app-capable",
        content: "yes"
      },
      {
        name: "full-screen",
        content: "true"
      },
      {
        name: "x5-fullscreen",
        content: "true"
      },
      {
        name: "360-fullscreen",
        content: "true"
      }
    ].forEach(({ name, content }: any) => {
      var meta = window.document.createElement("meta");
      meta.setAttribute("name", name);
      meta.setAttribute("content", content);
      window.document.head.insertBefore(meta, insertNode);
    });

    var scale = 1;
    var meta = window.document.querySelector('meta[name="viewport"]');
    meta ||
      ((meta = window.document.createElement("meta")),
      meta.setAttribute("name", "viewport"),
      window.document.head.insertBefore(meta, insertNode));
    meta.setAttribute(
      "content",
      "width=device-width,user-scalable=no,initial-scale=" +
        scale +
        ",maximum-scale=" +
        scale +
        ",minimum-scale=" +
        scale +
        ",user-scalable=no" +
        ",viewport-fit=cover"
    );
  }
}
</script>


<style lang="scss">
//移动
$oneRemForDesignWidth: 75px;
$designWidth: 750px;
//大写PX  不会被编译成rem 小写px均会编译成rem

/*
    designWidth/oneRemForDesignWidth = screenWidth/oneRemForScreenWidth恒成立
    已知screenWidth = 100vw，designWidth = 750px时，oneRemForDesignWidth = 100px
    求oneRemForScreenWidth
    oneRemForScreenWidth = screenWidth/（designWidth/oneRemForDesignWidth）
                       = 100vw/（750px/100px）
*/

html {
  -webkit-tap-highlight-color: transparent;
  $k: $designWidth/$oneRemForDesignWidth;
  font-family: "Roboto";
  font-size: calc(100vw / #{$k});
}

</style>
