<template>
  <el-button
    :type="type"
    :size="size"
    :icon="icon_"
    :title="title"
    :loading="loading"
    :disabled="disabled"
    :round="round"
    :circle="circle"
    :autofocus="autofocus"
    @click="handleClick"
    :style="{ width: width }"
  >
    <span v-if="$slots.default"><slot></slot></span>
  </el-button>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import * as icons from './icon';

export default defineComponent({
  name: 'BokeButton',
  props: {
    type: {
      type: String,
      default() {
        return 'default';
      },
    },
    size: String,
    width: String,
    title: String,
    icon: [String, Object, Function],
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
    isCreate: Boolean,
    isSearch: Boolean,
    isRefresh: Boolean,
    isEdit: Boolean,
    isDelete: Boolean,
  },
  emits: ['click'],
  setup(props, ctx) {
    const lastClickTime = ref();
    const icon_ = computed(() => {
      if (props.isCreate) {
        return icons.Plus;
      }
      if (props.isSearch) {
        return icons.Search;
      }
      if (props.isRefresh) {
        return icons.Refresh;
      }
      if (props.isEdit) {
        return icons.EditPen;
      }
      if (props.isDelete) {
        return icons.Delete;
      }
      return props.icon;
    });

    function handleClick() {
      ctx.emit('click');
    }

    return { icon_, handleClick };
  },
});
</script>

<style scoped>
/* .el-button {
  border-color: #c00017;
  background-color: #c00017;
  color: #fff;
  font-weight: bold;
}

.el-button:hover {
  background-color: #f78989;
  color: #fff;
}

.el-button:focus {
  background-color: #f78989;
  color: #fff;
}

.el-button:active {
  background-color: #c00017;
  color: #fff;
}

.el-button--danger {
  color: #c00017;
  background-color: #fff;
  border-color: #c00017;
}

.el-button.is-disabled {
  background-color: #fef0f0;
  border-color: #fef0f0;
  color: #fab6b6;
} */
</style>
