<template>
  <component
    :is="wrapperTag"
    ref="scrollView"
    class="scroll-container"
    :style="{
      ...wrapperStyle,
      'touch-action': 'none'
    }"
  >
    <component
      :is="scrollerTag"
      ref="scroller"
      :style="{
        ...scrollerStyle,
        'pointer-events':this.pointerEvent
      }"
      class="scroll-scroller"
      :class="scrollerClass"
    >
      <slot />
    </component>
  </component>
</template>

<script lang="ts">
import ScrollView from "./ScrollView";
export default ScrollView;
</script>
<style lang="less">
.scroll-container {
  height: 100%;
  overflow: hidden;
  position: relative;
  .bscroll-vertical-scrollbar {
    z-index: 0 !important;
  }
}
</style>

