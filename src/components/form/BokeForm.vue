<!-- eslint-disable vue/no-mutating-props -->
<!-- 高级form组件 -->
<template>
	<div class="boke-form">
		<!-- 表单 -->
		<el-form
			ref="form"
			:model="formData"
			:label-position="labelPosition"
			v-bind="$attrs"
			class="boke-form__container"
			:class="{
				'form-oneline': columns?.length <= 3 && !vertical,
				'boke-form-add': vertical
			}"
		>
			<div
				class="boke-form__item-container"
				:class="[vertical && 'vertical']"
				:style="{ 'align-items': formAlign }"
			>
				<slot>
					<template v-for="column in columns" :key="column.prop">
						<!-- 表单项 -->
						<el-form-item
							class="form-item"
							v-bind="column.formProp"
							:prop="column.formProp?.key ?? column.prop"
							:label="column.label"
							:label-width="column.formProp?.labelWidth"
							:style="{
								width: column.formProp?.width ?? itemWidth
							}"
						>
							<!-- 自定义表单组件 -->
							<template #default="scope" v-if="slots[column.formProp?.slot ?? column.prop]">
								<slot :name="column.formProp?.slot" :row="scope.row"></slot>
							</template>
							<!-- 动态表单组件 -->
							<!-- :is="componentsMap[column.formProp?.el]" -->
							<component
								:is="column.formProp?.el"
								:placeholder="
									column.formProp?.placeholder
										? column.formProp?.placeholder
										: (column.formProp?.el === 'input' ? '请输入' : '请选择') + column.label
								"
								v-model="formData[column.formProp?.key ?? column.prop]"
								:options="sourceMap[column.formProp?.key ?? column.prop]"
								:data="sourceMap[column.formProp?.key ?? column.prop]"
								v-bind="column.formProp"
								@click="(e) => onInputFocus(e, column)"
								@change="(e) => onInputchange(e, column)"
							>
								<!-- 动态表单子组件 -->
								<template #default v-if="column.formProp?.childEl">
									<component
										:is="column.formProp.childEl"
										v-for="item in sourceMap[column.formProp?.key ?? column.prop]"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									>
										{{ item.label }}
									</component>
								</template>
							</component>
						</el-form-item>
					</template>
					<!-- 跟随表单插槽 -->
					<div class="formItem">
						<slot name="formItem"></slot>
					</div>
				</slot>
			</div>
			<!-- 右侧固定插槽 -->
			<div class="boke-form__actions-follow">
				<slot name="formCustom"></slot>
			</div>
			<!-- 搜索表单按钮 -->
			<div class="boke-form__item-btn" v-if="columns?.length <= 4 && !vertical && !multiple">
				<slot name="formFooter"></slot>
			</div>

			<div class="boke-form__actions" v-if="(columns?.length > 4 && !vertical) || multiple">
				<slot name="formFooter"></slot>
			</div>
		</el-form>
	</div>
</template>
<script setup>
import { toRefs, ref, isRef, watchEffect, defineExpose, useSlots } from "vue"
const props = defineProps({
	columns: {
		type: Array,
		default: () => []
	},
	formData: {
		type: Object,
		default: () => ({})
	},
	vertical: {
		type: Boolean,
		default: true
	},
	labelPosition: {
		type: String,
		default: "left"
	},
	formAlign: {
		type: String,
		default: "center"
	}, // 控制表单对齐方式
	itemWidth: {
		type: String,
		default: "360px"
	},
	multiple: {
		type: Boolean,
		default: false
	} // 菜单使用上下布局
})
let { columns, formData } = toRefs(props)
// 表单项 data options 的 数据对象  表单标识为key
const sourceMap = ref({})

// 表单Ref 可操作 表单 相关方法  导出给父组件使用
const form = ref()

// 当前组件所有的slot
const slots = useSlots()

watchEffect(() => {
	columns?.value.map(async (item) => {
		if (item.formProp) {
			// 判断外部提供的数据源是 对象 还是方法
			if (typeof item.formProp.source === "object") {
				if (isRef(item.formProp.source)) {
					sourceMap.value[item.formProp.key ?? item.prop] = item.formProp.source.value
				} else {
					sourceMap.value[item.formProp.key ?? item.prop] = item.formProp.source
				}
			} else if (typeof item.formProp.source === "function") {
				sourceMap.value[item.formProp.key ?? item.prop] = await item.formProp?.source()
			}
		}
	})
})

const onInputFocus = (e, column) => {
	column.formProp?.clickFunc && column.formProp.clickFunc(column)
}
const onInputchange = (e, column) => {
	if (column.formProp?.changeData) {
		// eslint-disable-next-line vue/no-mutating-props
		props.formData[column.formProp.key ?? column.prop] = column.formProp.changeData(e)
	}
}
// 导出属性或方法给外部使用
defineExpose({
	form
})
</script>

<style scoped lang="scss">
.boke-form {
	.el-select {
		width: 100%;
	}
	.el-input {
		width: 100% !important;
	}
	.el-form-item {
		margin-bottom: 0;
	}
	&__container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	&__item-container {
		flex: 1;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		gap: 24px;
		.form-item {
			width: 300px;
			// margin-right: 24px;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
	}
	.vertical {
		display: flex;
		flex-direction: column !important;
		gap: 18px;
	}
	.boke-form__actions {
		width: 120px;
		max-height: 90px;
		// height: 100%;
		padding: 0px 0 0px 20px;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
		gap: 10px 0;
		border-left: 1px solid #d8d8d8;
	}
	.boke-form__actions-follow {
		border: none;
		// width: 200px;
		background: none;
		margin-left: auto;
		.el-form-item__content {
			margin-left: 0;
			flex-flow: row;
			display: flex;
			flex-wrap: nowrap;
			gap: 10;
			align-items: center;
			justify-content: space-between;
		}
	}
	.row_actions {
		width: auto;
	}
	& > .form-oneline {
		gap: 0;
	}
}
</style>
