<template>
  <el-autocomplete
    :model-value="modelValue"
    :fetch-suggestions="querySearch"
    v-bind="$attrs"
    :style="{ width: width }"
    @update:modelValue="onChange"
  >
    <template #suffix v-if="selectMode">
      <el-icon><ArrowDown /></el-icon>
    </template>
  </el-autocomplete>
</template>

<script>
import { defineComponent } from 'vue';
import { filterName } from '../../utils/common.js';

export default defineComponent({
  name: 'MyAutocomplete',
  props: {
    modelValue: {
      type: String,
      default() {
        return '';
      },
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    width: {
      type: String,
      default() {
        return '100%';
      },
    },
    selectMode: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const querySearch = (queryString, cb) => {
      const results = queryString
        ? props.options
            .filter((item) => {
              return filterName(item[props.itemValue], queryString);
            })
            .map((item) => {
              return { value: item[props.itemValue] };
            })
        : props.options.map((item) => {
            return { value: item[props.itemValue] };
          });
      cb(results);
    };

    const onChange = (val) => {
      ctx.emit('update:modelValue', val);
    };

    return { querySearch, onChange };
  },
});
</script>

<style scoped></style>
