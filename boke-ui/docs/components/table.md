## 高阶表格组件

boke-table 高级表格，对 table 的二次封装,减少代码量，统一风格，配置

#### 基础用法

使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。

:::demo

```vue
<template>
  <BokeForm
    ref="formRef"
    :vertical="false"
    :form-data="formData"
    :rules="rules"
    :columns="formColumns"
    label-width="90px"
  >
    <template #formFooter>
      <span class="form-foot">
        <boke-button type="primary" @click="onSearch" width="86px" style="margin-right: 20px"
          >查询</boke-button
        >
      </span>
      <span class="form-foot">
        <boke-button @click="reset" width="86px">重置</boke-button>
      </span>
    </template>
  </BokeForm>
</template>

<script>
import { ref, reactive, defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const formData = reactive({
      propInput: null,
      propSelect: null,
      propDate: null,
      propSlot: null,
    });
    const rules = ref({
      propInput: [{ required: true, message: '请输入' }],
    });
    const formRef = ref(null);
    const formColumns = ref([
      {
        label: '输入框',
        prop: 'propInput',
        formProp: {
          el: 'ElInput',
          clearable: true,
        },
      },
      {
        label: '下拉框',
        prop: 'propSelect',
        formProp: {
          el: 'ElSelect',
          childEl: 'ElOption',
          source: [
            {
              label: '选项一',
              value: 1,
            },
          ],
          clearable: true,
        },
      },
      {
        label: '日期范围',
        prop: 'propDate',
        formProp: {
          el: 'ElDatePicker',
          type: 'daterange',
          'start-placeholder': '开始时间',
          'end-placeholder': '结束时间',
          'value-format': 'YYYY-MM-DD HH:mm:ss',
        },
      },
      // {
      //   label: '插槽',
      //   prop: 'propSlot',
      //   formProp: {
      //     clearable: true,
      //     slot: 'formOpenId',
      //   },
      // },
    ]);
    const onSearch = (value) => {
      console.log(value);
    };
    const reset = () => {};
    return { formColumns, formData, formRef, onSearch, rules, reset };
  },
});
</script>
```

:::

### 配置参数

element plus 表单的所有属性，组件都兼容， form-item 的详细属性在 formProp 中设置

#### Attributes

| 属性名      |                                   说明                                    |    类型 | 默认值 | 枚举       |
| ----------- | :-----------------------------------------------------------------------: | ------: | ------ | ---------- |
| form-data   |               必填，绑定表单 model,所有表单的值都在上面绑定               |  object | -      | -          |
| formColumns |                            必填，表单渲染 json                            |   array | -      | -          |
| rules       |                  可选，表单 rules 规则，同 element plus                   |   array | -      | -          |
| label-width |                     可选，label 宽度，同 element plus                     |       - | -      | -          |
| vertical    |          可选，表单的排列方向，true 为竖向排列，false 为横向排列          | boolean | true   | true,false |
| ref         | 可选，通过 ref 可以获取 boke-form 组件实例，还可以通过 ref 来调用内部事件 |  object | -      | -          |

#### event

| 事件名     |         说明         |        回调参数 |
| ---------- | :------------------: | --------------: |
| clickFunc  |    点击时触发回调    | 返回 event 对象 |
| changeData | 表单值改变时触发回调 |      返回新的值 |

#### slot

| 事件名     |           说明           |
| ---------- | :----------------------: |
| slot       | 表单项自定义表单内容插槽 |
| formFooter |       表单结尾插槽       |
| formCustom |     自定义表单 item      |

```

```
