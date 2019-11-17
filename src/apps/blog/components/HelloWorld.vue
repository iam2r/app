
<template>
  <div>
    HelloWorld:start
    <br>
      provideFoo={{provideFoo}}
      provideObj={{provideObj}}
    <br>
     HelloWorld:end
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins, Inject ,Watch} from "vue-property-decorator";
import Test from "appdir/components/Test.vue";
@Component
export default class HelloWorld extends Mixins(Test) {
  @Prop() private propMsg!: string;
  @Inject() provideFoo!: string;
  @Inject({default: { name: "zr", age: 22 } })
  provideObj!: any;

  mounted() {
    this.methodTest();
  }
  methodTest() {
    console.log("this is HelloWorld");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
