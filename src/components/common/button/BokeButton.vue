<template>
	<el-button
		:type="type"
		:size="size"
		:icon="icon"
		:title="title"
		:loading="loading"
		:disabled="disabled"
		:round="round"
		:circle="circle"
		:autofocus="autofocus"
		@click="handleClick"
		:style="{ width: width }"
		v-bind="$attrs"
	>
		<span v-if="$slots.default"><slot></slot></span>
	</el-button>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
	name: "BokeButton",
	props: {
		type: {
			type: String,
			default() {
				return "default"
			}
		},
		size: String,
		width: String,
		title: String,
		icon: [String, Object, Function],
		loading: Boolean,
		disabled: Boolean,
		plain: Boolean,
		autofocus: Boolean,
		round: Boolean,
		circle: Boolean
	},
	emits: ["click"],
	setup(props, ctx) {
		function handleClick() {
			ctx.emit("click")
		}

		return { handleClick }
	}
})
</script>

<style scoped></style>
