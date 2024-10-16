<template>
	<el-popover :visible="visible" effect="dark" placement="top" popper-class="overflow-popper">
		<div
			class="tooltip-content"
			:class="[getTooltipContent()]"
			@mouseenter="immediateEnter"
			@mouseleave="visible = false"
		>
			{{ content }}
		</div>
		<template #reference>
			<div
				ref="dom"
				class="text-inline"
				@click="handleClick"
				@mousedown="handleMouseDown"
				@mouseup="handleMouseUp"
				@mouseenter="handleEnter"
				@mouseleave="delayLeave"
			>
				<slot>
					{{ content }}
				</slot>
			</div>
		</template>
	</el-popover>
</template>

<script>
/*
  当内部内容超过长度的时候显示tooltip
*/

export default defineComponent({
	name: "TextOverflow",
	props: {
		content: [String, Number, BigInt],
		size: {
			type: String,
			default() {
				return "default"
			}
		},
		showOverflow: {
			type: Boolean,
			default() {
				return true
			}
		},
		// 鼠标是否能移动到tooltip内部，默认为true，
		// 但有时需要保持和el-table的tooltip的一致性，所以可为false
		canEnterTooltip: {
			type: Boolean,
			default() {
				return true
			}
		}
	},
	emits: ["mouseenter", "mouseleave", "mousedown", "mouseup", "click"],
	setup(props, ctx) {
		const dom = ref(null)

		const visible = ref(false)

		let timer = null

		function handleClick(e) {
			ctx.emit("click", e)
		}

		function handleMouseDown(e) {
			ctx.emit("mousedown", e)
		}

		function handleMouseUp(e) {
			ctx.emit("mouseup", e)
		}

		// 鼠标进入时，计算内容宽度是否overflow
		function handleEnter(e) {
			ctx.emit("mouseenter", e)
			const offsetWidth = dom.value?.offsetWidth || 0
			const scrollWidth = dom.value?.scrollWidth || 0
			// 如果超过宽度并且需要展示tooltip，则展示
			if (offsetWidth < scrollWidth && props.showOverflow) {
				visible.value = true
			}
		}

		function immediateEnter() {
			if (props.canEnterTooltip) {
				if (timer) {
					clearTimeout(timer)
				}
				visible.value = true
			}
		}

		function delayLeave(e) {
			ctx.emit("mouseleave", e)
			if (props.canEnterTooltip) {
				timer = setTimeout(() => {
					visible.value = false
				}, 100)
			} else {
				visible.value = false
			}
		}

		function getTooltipContent() {
			if (!props.size || props.size == "default") {
				return "default"
			} else if (props.size == "small") {
				return "small"
			}
		}

		return {
			dom,
			visible,
			handleClick,
			handleMouseDown,
			handleMouseUp,
			handleEnter,
			immediateEnter,
			delayLeave,
			getTooltipContent
		}
	}
})
</script>

<style scoped>
.tooltip-content {
	white-space: pre-line;
	max-height: 200px;
	overflow-y: auto;
}

.tooltip-content.default {
	padding: 10px;
}

.tooltip-content.small {
	padding: 5px;
	font-size: 12px;
}
</style>
<style>
.overflow-popper.el-popover.el-popper {
	padding: 0;
	width: auto !important;
	max-width: 800px;
}

.text-inline {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
