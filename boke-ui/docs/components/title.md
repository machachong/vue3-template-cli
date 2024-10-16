## Title 标题

常用的标题

### 基础用法

:::demo

```vue
<template>
  <el-row class="mb-10">
    <boke-title>标题</boke-title>
  </el-row>
</template>

<script>
import { ref, defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const a = ref(1);
    const handleClick = () => {
      console.log('111');
    };
    return { a, handleClick };
  },
});
</script>
```

:::

### 配置

属性配置参考 element-plus

#### Attributes

| 属性名      |        说明         |          类型 | 默认值 | 枚举 |
| ----------- | :-----------------: | ------------: | ------ | ---- |
| h1          | 标题设值为 h1(18px) |       boolean | true   | -    |
| h2          | 标题设值为 h1(16px) |       boolean | false  | -    |
| h3          | 标题设值为 h1(14px) |       boolean | false  | -    |
| size        | 自定义标题文字大小  | number,string | 18     | -    |
| inlineBlock | 标题设置为行内样式  |       boolean | false  | -    |
