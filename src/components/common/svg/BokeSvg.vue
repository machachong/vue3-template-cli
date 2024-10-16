<template>
	<svg
		class="svg-icon"
		:style="{
			width: props.size + 'px',
			height: props.size + 'px',
			color: props.color
		}"
	>
		<use :xlink:href="`#icon-${props.name}`" :fill="props.color" />
	</svg>
</template>

<script>
export default {
	name: "BokeSvg",
	props: {
		name: {
			type: String,
			required: true,
			default: ""
		},
		size: {
			type: Number,
			default: 18
		},
		color: {
			type: String,
			default: "#000" //颜色如果不生效需要手动删除svg文件中的fill属性
		}
	},
	setup(props) {
		return {
			props
		}
	}
}
</script>
<style scoped>
.svg-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>
