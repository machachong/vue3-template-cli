<template>
	<el-button link type="primary" @click="onClick" v-bind="$attrs">
		<span v-if="$slots.default"><slot></slot></span>
	</el-button>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
	name: "TextButton",
	emits: ["click"],
	setup(_, ctx) {
		const onClick = (e) => {
			ctx.emit("click", e)
		}

		return { onClick }
	}
})
</script>

<style scoped>
.el-button.is-link:not(.is-disabled) {
	color: var(--boke-color-main);
}
</style>
