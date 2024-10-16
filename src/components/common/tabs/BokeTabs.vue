<template>
	<el-tabs
		:model-value="active"
		@tab-change="handleUpdate"
		@tab-click="handleTabClick"
		class="boke-tabs"
		:class="{ 'boke-tabs-small': size === 'small' }"
		v-bind="$attrs"
	>
		<el-tab-pane
			:label="tab.label"
			:name="tab.name"
			:key="tab.name"
			v-bind="tab"
			v-for="tab in tabs"
		>
			<template #label>
				<div class="my-tab-title">
					<slot name="label" :tab="tab">
						{{ tab.label }}
					</slot>
				</div>
			</template>
			<slot :tab="tab"></slot>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
import { defineComponent, onMounted } from "vue"
import { useRoute } from "vue-router"
import { changeUrlRoute } from "@/utils/tools"

export default defineComponent({
	name: "BokeTabs",
	props: {
		active: [String, Number],
		tabs: {
			type: Array,
			default() {
				return []
			}
		},
		queryKey: {
			type: String,
			default() {
				return "active"
			}
		},
		noUrlChange: Boolean,
		size: {
			type: String,
			default() {
				return "small" // small, large, default
			}
		}
	},
	emits: ["update:active", "tabClick"],
	setup(props, ctx) {
		const route = useRoute()

		function handleTabClick(tab) {
			const tabName = tab.props.name
			const _tab = props.tabs.find((item) => {
				return item.name == tabName
			})
			ctx.emit("tabClick", _tab)
		}

		function handleUpdate(val) {
			ctx.emit("update:active", val)
			!props.noUrlChange && changeUrlRoute(route, props.queryKey, val)
		}

		onMounted(() => {
			if (route.query[props.queryKey]) {
				const val = route.query[props.queryKey]
				ctx.emit("update:active", val)
			}
		})

		return { handleTabClick, handleUpdate }
	}
})
</script>

<style scoped></style>
