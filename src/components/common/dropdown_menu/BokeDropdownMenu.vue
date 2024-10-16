<template>
	<el-popover
		ref="tabMenu"
		v-model:visible="showPopover"
		:placement="placement"
		:width="width"
		:hide-after="hideAfter"
		popper-class="boke-dropdown-menu__popper"
		:show-arrow="false"
		:trigger="trigger"
		v-bind="$attrs"
	>
		<template #reference>
			<slot name="reference"></slot>
		</template>
		<ul class="boke-dropdown-menu">
			<slot></slot>
		</ul>
	</el-popover>
</template>

<script>
import { defineComponent, ref, provide } from "vue"

export default defineComponent({
	name: "BokeDropdownMenu",
	props: {
		trigger: {
			type: String,
			default() {
				return "click"
			}
		},
		width: {
			type: [String, Number],
			default() {
				return "180px"
			}
		},
		placement: {
			type: String,
			default() {
				return "bottom-start"
			}
		},
		hideAfter: {
			type: Number,
			default() {
				return 10
			}
		},
		// 是否在点击之后关闭菜单
		hideOnClick: {
			type: Boolean,
			default() {
				return true
			}
		}
	},
	setup(props) {
		const showPopover = ref(false)

		const tabMenu = ref(null)
		// 关闭标签菜单
		const closeTabMenu = () => {
			// tabMenu.value?.tooltipRef?.onClose?.();
			showPopover.value = false
		}
		const dropdownMenu = {
			hideOnClick: props.hideOnClick,
			closeTabMenu: closeTabMenu
		}
		provide("boke-dropdown-menu", dropdownMenu)

		return { showPopover, tabMenu, closeTabMenu }
	}
})
</script>
<style>
.boke-dropdown-menu__popper.el-popover.el-popper {
	padding: 5px 0 !important;
}
</style>
<style scoped>
.boke-dropdown-menu {
	margin-block-start: 0;
	margin-block-end: 0;
	padding-inline-start: 0;
}
</style>
