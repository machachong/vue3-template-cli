<!-- 高级页面组件 -->
<template>
  <layout-card :showHeader="true" class="boke-page">
    <template #header>
      <div class="h5 p-b-22" v-if="title">{{ title }}</div>
      <BokeForm
        ref="formRef"
        :form-data="formData"
        :columns="searchColumns"
        :vertical="vertical"
        :rules="rules"
        :label-width="labelWidth"
        v-bind="$attrs.form"
      >
        <template #formFooter>
          <span class="form-foot">
            <el-button
              type="primary"
              :icon="Search"
              @click="onSearch"
              width="86px"
              style="margin-right: 20px"
              >查询</el-button
            >
          </span>
          <span class="form-foot">
            <el-button @click="reset" v-if="form.reset" :icon="Refresh" width="86px"
              >重置</el-button
            >
          </span>
        </template>
        <template v-for="itemSlot in formSlots" :key="itemSlot" v-slot:[itemSlot]="row">
          <slot :name="itemSlot" v-bind="row"></slot>
        </template>
      </BokeForm>
    </template>
    <template #content>
      <transition :name="transName">
        <BokeTable
          v-show="tableShow"
          ref="tableRef"
          :columns="activeColumns"
          :pagination="pagination"
          :request-func="requestFunc"
          :filterParams="filterParams"
          :listData="listData"
          highlight-current-row
          :filterTableData="filterTableData"
          :mountedDefault="false"
          v-bind="$attrs"
        >
          <template #tableHeader>
            <div class="flex-middle table-header-con">
              <span class="h5">
                <!-- 查询结果 -->
              </span>
              <choose-column-menu
                :currentColumns="showColumns"
                :options="columns"
                :teleported="false"
                @submited="transHandle"
              ></choose-column-menu>
            </div>
          </template>
          <template v-for="itemSlot in tableSlots" :key="itemSlot" v-slot:[itemSlot]="row">
            <slot :name="itemSlot" v-bind="row"></slot>
          </template>
        </BokeTable>
      </transition>
    </template>
  </layout-card>
</template>

<script setup>
import { Search, Refresh } from '@element-plus/icons-vue';
import { ref, useSlots, toRefs, computed, watch, onMounted } from 'vue';
import BokeForm from '../form/BokeForm.vue';
import BokeTable from './BokeTable.vue';
import ChooseColumnMenu from '@/components/common/choose_column/ChooseColumnMenu.vue';
import { transitionFunc, transName } from '@/js/tools/transition.js';
const slots = useSlots();
const formRef = ref();
const tableRef = ref();
const showColumns = ref(); // 存放自定义列
const tableShow = ref(true);
let props = defineProps({
  title: {
    type: String,
    default: '',
  },
  labelWidth: {
    type: [String, Number],
    default: '100px',
  }, // 表单label宽度
  vertical: {
    type: Boolean,
    default: false,
  }, // 表单排列方向
  formData: {
    type: Object,
    default: () => ({}),
  }, // 表单双向绑定的数据
  searchColumns: {
    type: Array,
    default: () => [],
  }, // 表单columns
  rules: {
    type: Array,
    default: () => [],
  }, // 表单校验规则
  requestFunc: {
    type: Function,
    default: () => {},
  }, //  需要请求的一个方法 外面传入  需返回 PromiseTableResult 类型
  columns: {
    type: Array,
    default: () => [],
  }, // 列表每列 字段 属性数组
  listData: {
    type: Object,
    default: () => [],
  }, // 列表数据
  filterTableData: {
    type: Function,
    default: undefined,
  }, // 对表格数据进行筛选或插入操作
  filterParams: {
    type: Function,
    default: undefined,
  }, // 对搜索参数进行格式化
  pagination: {
    type: Object,
    default: () => ({
      page: 1,
      pageSize: 10,
      show: true,
    }),
  }, // 分页参数
  mountedDefault: {
    type: Boolean,
    default: true,
  }, // 表格初始化是否默认加载数据
  form: {
    type: Object,
    default: () => ({ reset: true }),
  }, // 传给form的所有参数
});
// 列表列的配置数据
let {
  formData,
  rules,
  searchColumns,
  requestFunc,
  columns,
  listData,
  pagination,
  filterTableData,
} = toRefs(props);

const formSlots = computed(() => {
  return Object.keys(slots).filter((keys) => keys.includes('form'));
});
const tableSlots = computed(() => {
  return Object.keys(slots).filter((keys) => !keys.includes('form'));
});
const activeColumns = computed(() => {
  return columns.value.filter((col) => {
    return showColumns.value.includes(col.prop);
  });
});
watch(
  props.columns,
  () => {
    showColumns.value = columns.value.map((col) => {
      return (col['value'] = col.prop);
    });
  },
  {
    deep: true,
    immediate: true,
  }
);
// 更自定义列展示字段
const handleColumnChoose = (scope) => {
  showColumns.value = scope.selected;
};
const transHandle = transitionFunc(handleColumnChoose, tableShow, 300);
const onSearch = () => {
  let form = formRef.value.form || formRef.value;
  const data = {
    ...formData.value,
  };
  form.validate(async (res) => {
    if (res) {
      console.log(data);
      tableRef.value.loadData(data, {
        page: 1,
        pageSize: pagination.value.pageSize,
      });
    }
  });
};

//重置
const reset = () => {
  formRef.value.form.resetFields();
};
// 刷新列表
const reloadTable = async () => {
  onSearch();
};
onMounted(() => {
  props.mountedDefault && onSearch();
});
// 导出给父组件使用的属性  需要导出的数据 可在此添加
defineExpose({
  tableRef,
  formRef,
  reloadTable,
  reset,
});
</script>

<style scoped lang="scss">
.boke-page {
  min-height: 100%;
  .table-header-con {
    width: 100%;
    justify-content: space-between;
  }
  :deep(.el-card__header) {
    border-bottom: none;
  }
}
</style>
