<!-- 高级表格组件 -->
<template>
  <div class="boke-table">
    <!-- 列表 头部 操作 -->
    <div class="table-header" v-if="slots.tableHeader">
      <slot name="tableHeader"></slot>
    </div>
    <!-- 列表 -->
    <div class="main-table">
      <el-table ref="table" v-bind="$attrs" v-loading="loading" :data="list">
        <!-- 渲染每列数据 -->
        <template v-for="column in columns" :key="column.prop">
          <!-- 如果是选择 -->
          <el-table-column
            v-bind="column"
            v-if="column?.type === 'selection' || column.type === 'index'"
            :align="column?.align || 'center'"
          ></el-table-column>
          <!-- 如果有折叠 -->
          <el-table-column v-bind="column" v-if="column.type === 'expand'">
            <template #default="scope">
              <!-- 折叠编辑器 -->
              <my-editor
                v-if="column.editor"
                :id="`editor-content-${scope.$index}`"
                :model-value="column?.editor?.formatter(scope.row)"
                v-bind="column.editor"
              >
              </my-editor>
              <!-- 折叠内容 -->
              <slot :name="column.prop" :row="scope.row" v-else></slot>
            </template>
          </el-table-column>
          <!-- 一般情况 -->
          <el-table-column
            v-bind="column"
            v-if="!column.type && column.prop && !column.hideInTable"
            :align="column?.align || 'center'"
          >
            <!-- 如果需要自定义 列的头部 -->
            <template #header v-if="slots[`${column.prop}Header`]">
              <slot :name="`${column.prop}Header`" :row="column"></slot>
            </template>
            <!-- 如果需要自定义 当前列的内容 -->
            <template #default="scope" v-if="slots[column.prop]">
              <slot :name="column.prop" :row="scope.row"></slot>
            </template>
          </el-table-column>
        </template>
        <!-- 如果有折叠 -->
      </el-table>
    </div>
    <!-- 分页组件 -->
    <BokePagination
      v-if="total > pagination.pageSize && pagination.show"
      :total="total"
      :layout="pagination?.layout"
      :page-sizes="pagination?.pageSizes"
      v-model:page="curPage"
      v-model:size="pageSize"
      @pageChange="pageChange"
      @size-change="sizeChange"
    />
  </div>
</template>
<script setup>
import { ref, toRefs, useSlots, onMounted } from 'vue';
import BokePagination from './BokePagination.vue';
import { useTableRequest } from '@/hooks/useTableHook';
import MyEditor from '@/components/common/form/editor/MyEditor.vue';
/**
 * requestFunc 请求方法
 * columns 表格列
 * params 请求参数
 * listData 表格初始数据
 * filterTableData 表格数据过滤器
 */
const props = defineProps({
  requestFunc: {
    type: Function,
    default: () => {},
  },
  columns: {
    type: Array,
    default: () => [],
  },
  listData: {
    type: Object,
    default: () => [],
  },
  filterTableData: {
    type: Function,
    default: undefined,
  },
  filterParams: {
    type: Function,
    default: undefined,
  },
  pagination: {
    type: Object,
    default: () => ({
      page: 1,
      pageSize: 10,
      show: true,
      pageSizes: [10, 15, 30, 50, 100],
    }),
  },
  mountedDefault: {
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits(['pageChange', 'sizeChange']);
// 列表列的配置数据
const { columns, listData, pagination } = toRefs(props);

// 当前组件所有的slot
const slots = useSlots();

// 当前table的Ref 可以导出给外面使用  外面可以利用此ref 使用table相关方法
const table = ref();

// useTableRequest 返回列表数据 与 page相关数据可与pagination 绑定 返回字段 都是响应式
let { loadData, list, loading, curPage, pageSize, total } = useTableRequest(
  props.requestFunc,
  pagination.value,
  props.filterTableData,
  props.mountedDefault,
  props.filterParams
);
const pageChange = (value) => {
  emits('pageChange', value);
  loadData();
};
const sizeChange = (value) => {
  const { page, size } = value;
  curPage.value = page;
  emits('sizeChange', value);
  loadData(null, {
    page: page,
    pageSize: size,
  });
};
// 刷新列表
const reloadTable = async () => {
  await loadData();
};
onMounted(async () => {
  if (listData?.value) {
    loading.value = false;
    list.value = listData.value;
  } else {
    await loadData();
  }
});
// 导出给父组件使用的属性
defineExpose({
  table,
  loadData,
  reloadTable,
});
</script>

<style scoped lang="scss">
.boke-table {
  display: flex;
  flex-direction: column;
  overflow: visible;
  width: 100%;
  height: 100%;

  .table-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 10px;
  }

  .main-table {
    overflow: auto;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
