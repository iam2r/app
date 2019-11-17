import { Component, Vue, Provide } from "vue-property-decorator";
import HelloWorld from "appdir/components/HelloWorld.vue"; // @ is an alias to /src
import Test from "appdir/components/HelloWorld.vue";
import { VNode } from "vue";
@Component({
  components: {
    HelloWorld,
    Test
  },

  directives: {
    mymodel: {
      bind: (el: any, binding: any) => {
        var valState = binding.value.value;
        el.value = valState;
        el.oninput = (e: any) => {
          binding.value.value = e.target.value;
        };
      }
    }
  },
  watch: {
    msg: {
      deep: true,
      handler: function(val: any) {
        let refs: any = this.$refs;
        refs["input"].value = val.value;
      }
    }
  }
})
export default class Home extends Vue {
  private dataObj: any = { name: "xxx", age: 12, obj: { a: "a", b: "b" } };
  private dataFoo: any = "foo";
  private msg: any = {
    value: "lllll"
  };

  @Provide() provideFoo: string = this.dataFoo;
  @Provide() provideObj: any = this.dataObj;
  //应用场景：单向数据传递 父===> 子及以下
  //测试结果：传可监听的对象 值是响应式变化的

  formChild(data: any) {
    console.log(data);
  }

  createDom() {
    return (
      <div class="home">
        响应式测试：dataFoo
        <input type="text" v-model={this.dataFoo} />
        响应式测试：dataObj.name
        <input type="text" v-model={this.dataObj.name} />
        响应式测试：dataObj.obj.a
        <input type="text" v-model={this.dataObj.obj.a} />
      </div>
    );
  }

  createDom2() {
    return (
      <div class="home">
        响应式测试：dataFoo
        <input type="text" v-model={this.dataFoo} />
        响应式测试：dataObj.name
        <input type="text" v-model={this.dataObj.name} />
        响应式测试：dataObj.obj.a
        <input type="text" v-model={this.dataObj.obj.a} />
      </div>
    );
  }

  protected render(): VNode {
    return (
      <div class="ddddddddddddddd">
        {this.createDom()}

        {this.createDom2()}

        {<input ref="input" type="text" v-mymodel={this.msg} />}

        {
          <p
            onClick={() => {
              this.msg.value = "ABC";
            }}
          >
            {this.msg.value}
          </p>
        }
      </div>
    );
  }
}
