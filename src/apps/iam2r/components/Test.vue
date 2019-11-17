<template>
  <div>Test:start
    <br>
    <input v-model="msg">
    <p>prop: {{propMessage}}</p>
    <p>msg: {{msg}}</p>
    <p>helloMsg: {{helloMsg}}</p>
    <p>computed msg: {{computedMsg}}</p>
    <p>state: {{name}}</p>
    <button @click="greet(msg+computedMsg)">Greet</button>

    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <br>Test:end
  </div>
</template>
 
<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { Button } from 'vant';
Vue.use(Button);
@Component({
  components: {}
})
export default class Test extends Vue {
  @Prop() private propMessage!: string;

  private msg = 123; 
  helloMsg = "Hello, " + this.propMessage;
  get computedMsg() {
    return "computed " + this.msg;
  }

  @Emit()
  tellSuper(msg: string) {}
  @State("name") name!: string;

  @Mutation("updateName") updateName(name: string) {}
  @Action("login") login(payload: object) {}
  mounted() {
    console.log("test");
  }
  async greet() {
    // alert("greeting: " + this.msg);
    this.tellSuper(this.helloMsg);

    const loginRes = await this.login({
      ...{
        userName: "zrnokia5231",
        password: "12345678"
      }
    });

    this.updateName(loginRes + "");
  }

  methodTest() {
    console.log("this is test");
  }
}
</script>