## 自动补全输入框

常用的操作按钮

### 基础用法

:::demo

```vue
<template>
  <el-row class="mb-10">
    <boke-autocomplete
      selectMode
      clearable
      width="50%"
      placeholder="请输入"
      v-model="value"
      :options="options"
      @select="handleSelect"
    ></boke-autocomplete>
  </el-row>
</template>

<script>
import { ref, defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const value = ref();
    const options = ref([
      {
        label: '选项1',
        value: '选项1',
      },
      {
        label: '选项2',
        value: '选项2',
      },
    ]);
    const handleSelect = () => {};
    return { value, options, handleSelect };
  },
});
</script>
```

:::

### 配置

属性配置参考 element-plus，支持其所有配置

#### Attributes

| 属性名     |    说明    |    类型 | 默认值 | 枚举 |
| ---------- | :--------: | ------: | ------ | ---- |
| modelValue |   输入值   |  string | -      | -    |
| options    |    选项    |   array | -      | -    |
| itemValue  | 选项的 key |       - | value  | -    |
| width      |    宽度    |  string | 100%   | -    |
| selectMode |  选项模式  | boolean | false  | -    |
