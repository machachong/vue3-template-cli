<template>
  <div
    class="boke-title"
    :style="{ 'font-size': getFontSize() }"
    :class="{ 'inline-block': inlineBlock }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BokeTitle',
  props: {
    h1: Boolean,
    h2: Boolean,
    h3: Boolean,
    size: [Number, String],
    inlineBlock: Boolean,
  },
  setup(props, ctx) {
    function getFontSize() {
      if (props.size) {
        return typeof props.size === 'number' ? props.size + 'px' : props.size;
      }
      if (props.h1) {
        return '18px';
      } else if (props.h2) {
        return '16px';
      } else if (props.h3) {
        return '14px';
      }
      return '18px';
    }

    function getHeight() {
      if (props.h1) {
        return '30px';
      } else if (props.h2) {
        return '25px';
      } else if (props.h3) {
        return '20px';
      }
      return '30px';
    }
    return { getFontSize, getHeight };
  },
});
</script>

<style scoped lang="scss">
.boke-title {
  border-left: 5px solid var(--el-color-primary);
  padding-left: 10px;
  font-weight: bold;
  line-height: 1.2;
}

.inline-block {
  display: inline-block;
}
</style>
