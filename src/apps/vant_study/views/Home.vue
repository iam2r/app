<template>
  <div class="home">
    <span>{{$t('RES_101')}}</span>
    <div class="container">
      <ul class="nav">
        <li v-for="i in 18" :key="i">
          <p v-for="i in 18" :key="i">{{i}}</p>
        </li>
      </ul>
    </div>

    <van-number-keyboard :show="true" safe-area-inset-bottom />
  </div>
</template>

<script lang="ts" >
import { Component, Vue, Provide } from "vue-property-decorator";
import HelloWorld from "appdir/components/HelloWorld.vue";
import Test from "appdir/components/HelloWorld.vue";
import { NumberKeyboard } from "vant";
Vue.use(NumberKeyboard);
@Component({
  components: {
    HelloWorld,
    Test
  }
})
export default class Home extends Vue {
  mounted() {
    let lan = "en-US";
    setInterval(() => {
      lan = lan == "en-US" ? "zh-CN" : "en-US";
      (this as any).$i18n(lan);
    }, 500);
  }
}
</script>
<style lang="scss" scoped>
.home {
  background: red;
  width: 375px;
  height: 500px;
  -webkit-overflow-scrolling: touch;
  .container {
    overflow-x: scroll;
    .nav {
      display: flex;
      // flex-wrap: wrap;
      li {
        height: 50px;
        flex: 0 0 50%; //
        background: darkcyan;
        display: flex;
        overflow-x: scroll;
        > p {
          flex: 0 0 25%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        &:nth-child(2n) {
          background: green;
        }
      }
    }
  }
}
</style>

