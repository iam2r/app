<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
     响应式测试：dataFoo
     <input type="text" v-model="dataFoo">
    响应式测试：dataObj.name
     <input type="text" v-model="dataObj.name">
    响应式测试：dataObj.obj.a
     <input type="text" v-model="dataObj.obj.a">
   
    <HelloWorld propMsg="Welcome to Your Vue.js + TypeScript App"  propMessage="123456"/>
    <Test propMessage="Welcome to Your Vue.js + TypeScript App" @tell-super="formChild"/>
   
  </div>
</template>

<script lang="ts" >
import { Component, Vue , Provide} from 'vue-property-decorator';
import HelloWorld from 'appdir/components/HelloWorld.vue'; // @ is an alias to /src
import Test from 'appdir/components/HelloWorld.vue';
@Component({
  components: {
    HelloWorld,
    Test,
  },
})
export default class Home extends Vue {
  private dataObj:any = {name:'xxx',age:12,obj:{a:'a',b:'b'}}
  private dataFoo:any = 'foo'

  @Provide() provideFoo:string = this.dataFoo;
  @Provide() provideObj:any = this.dataObj;
  //应用场景：单向数据传递 父===> 子及以下
  //测试结果：传可监听的对象 值是响应式变化的



  formChild(data:any){
    console.log(data)
  }
}
</script>
<style lang="scss" scoped>
  
</style>

