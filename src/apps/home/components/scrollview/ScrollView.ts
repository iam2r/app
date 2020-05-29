import { Vue, Component, Prop } from "vue-property-decorator";
import BScroll from "better-scroll";
import { ScrollEvent } from "./ScrollEvent";

@Component
export default class ScrollView extends Vue {
  @Prop(Object) options: any;
  @Prop({ default: "div" }) scrollerTag: string;
  @Prop({ default: "" }) scrollerStyle: { [key: string]: string };
  @Prop({ default: "" }) scrollerClass: string | { [key: string]: boolean };

  @Prop({ default: "div" }) wrapperTag: string;
  @Prop({ default: "" }) wrapperStyle: { [key: string]: string };

  protected scroll: BScroll;
  protected pointerEvent = "auto";
  private ScrollEvent = ScrollEvent.Normal;

  private get scrollView() {
    return <any>this.$refs.scrollView;
  }

  private get scroller() {
    return <any>this.$refs.scroller;
  }

  private initScroll() {
    if (this.scroll) return this.updateScroll();

    const events = [
      "beforeScrollStart",
      "scrollCancel",
      "scrollStart",
      "scrollEnd",
      "scroll",
      "flick",
    ];

    let key, value;
    const attributes = this.scrollView.attributes;
    this.scrollView.scrollTop = 0;
    for (key in attributes) {
      value = attributes[key];
      if (value instanceof Attr && value.name.indexOf("data-v-") > -1) {
        this.scroller.attributes.setNamedItem(
          document.createAttribute(value.name)
        );
      }
    }

    this.scroll = new BScroll(<Element>this.$refs.scrollView, this.options);
    events.forEach((event) => {
      this.scroll.on(<any>event, () => this.$emit(event, this.scroll));
    });
    this.registPullEvents();
    this.$emit("ready", this.scroll);
    setTimeout(() => {
      this.updateScroll();
    });
  }

  private updateScroll() {
    this.scroll && this.scroll.refresh();
  }

  private registPullEvents() {
    const distance = 20;
    let point = { x: 0, y: 0 };

    this.scroll.on("scrollCancel", () => {
      this.pointerEvent = "auto";
    });

    this.scroll.on("flick", () => {
      this.pointerEvent = "auto";
    });

    this.scroll.on("scroll", () => {
      if (this.scroll.y == point.y && this.scroll.x == point.x) return;
      point = {
        x: this.scroll.x,
        y: this.scroll.y,
      };
      this.pointerEvent = "none";
      if (this.ScrollEvent == ScrollEvent.Normal) {
        if (this.scroll.y > 0 + distance) {
          this.ScrollEvent = ScrollEvent.Refresh;
        } else if (this.scroll.y < this.scroll.maxScrollY - distance) {
          this.ScrollEvent = ScrollEvent.Infinite;
        }
      }
    });

    this.scroll.on("scrollEnd", () => {
      this.pointerEvent = "auto";
      if (this.ScrollEvent == ScrollEvent.Refresh) {
        this.$emit("pullDown", this.scroll);
      } else if (this.ScrollEvent == ScrollEvent.Infinite) {
        this.$emit("pullUp", this.scroll);
      }
      this.ScrollEvent = ScrollEvent.Normal;
    });
  }

  private destroy() {
    this.scroll && this.scroll.destroy();
    this.scroll = null;
  }

  protected mounted() {
    this.initScroll();
  }

  protected activated() {
    this.updateScroll();
  }

  protected updated() {
    this.updateScroll();
  }

  protected beforeDestroy() {
    this.destroy();
  }
}
