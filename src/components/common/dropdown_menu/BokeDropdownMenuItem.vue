<template>
	<li class="boke-dropdown-menu__item" @click="handleCommand()">
		<slot></slot>
	</li>
</template>

<script>
import { defineComponent, inject } from "vue"

export default defineComponent({
	name: "DropdownMenuItem",
	emits: ["command"],
	setup(props, ctx) {
		const dropdownMenu = inject("boke-dropdown-menu")

		function handleCommand() {
			ctx.emit("command")
			// 如果要在点击之后关闭菜单，则调用父组件发来的对象中的关闭菜单的函数
			if (dropdownMenu.hideOnClick) {
				dropdownMenu?.closeTabMenu?.()
			}
		}

		return { handleCommand }
	}
})
</script>

<style scoped>
.boke-dropdown-menu__item {
	list-style: none;
	line-height: 22px;
	cursor: pointer;
	padding: 3px 20px;
}

.boke-dropdown-menu__item:hover {
	background-color: var(--boke-bg-color);
	color: var(--boke-color-main);
}

.boke-dropdown-menu__item .el-icon {
	width: 30px;
}
</style>
