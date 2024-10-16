<template>
	<div
		class="boke-title"
		:style="{ 'font-size': getFontSize() }"
		:class="{
			'list-title': mode === 'list',
			'simple-title': mode === 'simple'
		}"
	>
		<slot></slot>
	</div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
	name: "BokeTitle",
	props: {
		h1: Boolean,
		h2: Boolean,
		h3: Boolean,
		mode: {
			type: String,
			default: "default" // list, default, simple(新增简单模式，简单点~标题的样式简单点~)
		}
	},
	setup(props) {
		function getFontSize() {
			if (props.h1) {
				return "18px"
			} else if (props.h2) {
				return "16px"
			} else if (props.h3) {
				return "14px"
			}
			return "18px"
		}

		function getHeight() {
			if (props.h1) {
				return "30px"
			} else if (props.h2) {
				return "25px"
			} else if (props.h3) {
				return "20px"
			}
			return "30px"
		}
		return { getFontSize, getHeight }
	}
})
</script>

<style scoped lang="scss">
.boke-title {
	border-left: 5px solid var(--boke-color-main);
	padding-left: 5px;
	line-height: 1.2;
}
.list-title {
	border: none;
	font-family: "puhui-medium";
	padding-left: 0;
	@extend .h5;
	padding-top: 4px;
	padding-bottom: 22px;
	line-height: 1;
}
.simple-title {
	border: none;
	padding-left: 0;
	font-family: "puhui-medium";
}
</style>
