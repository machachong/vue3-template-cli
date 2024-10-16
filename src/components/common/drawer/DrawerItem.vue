<template>
	<el-drawer
		:model-value="drawerVisible"
		:append-to-body="true"
		:destroy-on-close="true"
		@close="handleClose"
		size="90%"
	>
		<template #header>
			<slot name="header"></slot>
		</template>

		<template #default>
			<slot name="content"></slot>
		</template>
	</el-drawer>
</template>

<script setup>
import { ElDrawer } from "element-plus"

defineProps({
	drawerVisible: {
		type: Boolean,
		default() {
			return false
		}
	}
})
const emits = defineEmits(["submited", "update:drawerVisible", "closeDrawer"])
const handleClose = () => {
	emits("update:drawerVisible", false)
	emits("closeDrawer")
}

// const handleOpen = ()=>{
//   emits("submited")
// }
</script>
