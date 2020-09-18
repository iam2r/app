import { Component, Prop, Emit } from "vue-property-decorator";
import { Component as tsx } from "vue-tsx-support";
import {
  swiper as Swiper,
  swiperSlide as SwiperSlide,
} from "vue-awesome-swiper";
import ResizeObserver from "resize-observer-polyfill";
import { VNode } from "vue";

import "./style.scss";
export interface SwiperSlidesProps {
  options?: any;
  length: number;
}

export interface SwiperSlidesEvents {
  onSetTranslate: (swiper: any, translate?: number) => void;
}

export interface SwiperSlidesSlots {
  default?: number;
}

@Component
export default class SwiperSlides extends tsx<
  SwiperSlidesProps,
  any,
  SwiperSlidesSlots
> {
  @Prop({
    default: () => {
      return {
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        loop: true,
        observer: true,
        observeParents: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      };
    },
  })
  private options: SwiperSlidesProps["options"];
  @Prop({ default: 0 })
  private length: SwiperSlidesProps["length"];

  private get swiper(): any {
    return (this.$refs.mySwiper as any).swiper;
  }

  protected mounted() {
    this.hackAutoPlay();
    setTimeout(() => {
      this.updateScroll();
    });
  }

  private hackAutoPlay() {
    this.swiper.el.onmouseover = () => {
      this.swiper.autoplay && this.swiper.autoplay.stop();
    };

    this.swiper.el.onmouseout = () => {
      this.swiper.autoplay && this.swiper.autoplay.start();
    };
  }

  @Emit("setTranslate")
  private onSetTranslate(translate: number) {
    return this.swiper;
  }

  public updateScroll() {
    if (this.options.loop) {
      //更新loop模式克隆的节点；开启loop模式 后如果slide变更后，update方法不会重新创建更新loop的克隆节点，源码分析 loopDestroy loopCreate updateSlides 即可
      this.swiper.loopDestroy();
      this.swiper.loopCreate();
      this.swiper.updateSlides();
    }
    this.swiper.update();
  }

  protected render(): VNode {
    return (
      <Swiper
        ref="mySwiper"
        class="scroll-container"
        onSetTranslate={() => {
          this.onSetTranslate(this.swiper.translate);
        }}
        options={{
          ...this.options,
        }}
      >
        {Array.from({ length: this.length }).map((item, i) => (
          <SwiperSlide>{this.$scopedSlots.default(i)}</SwiperSlide>
        ))}
        <div class={["swiper-pagination"]} slot="pagination"></div>
      </Swiper>
    );
  }
}
