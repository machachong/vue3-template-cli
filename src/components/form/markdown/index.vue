<template>
	<div v-html="markText" class="markdown-text language-p"></div>
</template>
<script setup>
import { toRefs, computed } from "vue"
import MarkdownIt from "markdown-it"
const props = defineProps({
	text: {
		type: String,
		default: null
	}
})
const { text } = toRefs(props)
// eslint-disable-next-line vue/return-in-computed-property
const markText = computed(() => {
	if (!text.value) return ""
	// markdown加粗 **加粗** 之间不可以包含空格，如果字符以符号结尾，那么末尾的双星号后面需要有空格
	// 匹配所有双星号之间的字符，去除空格，并在星号后增加看空格，
	let newValue = text.value.replace(/\*\*(.*?)\*\*/g, function (_match, offset) {
		return `**${offset.trim()}** `
	})
	// newValue = newValue.replace(/\*\*(.*?)\*\*/g, '**$1** ');
	try {
		const md = new MarkdownIt({
			html: true,
			breaks: true,
			linkify: true,
			langPrefix: "language-"
		})
		return md.render(newValue)
	} catch (error) {
		console.log(error)
	}
})
</script>
<style lang="scss" scoped>
.markdown-text {
	margin: 0px;
	padding: 0px;
	color: rgb(31, 35, 41);
	font-size: 14px;
	line-height: 1.6;
	inset: unset;
	white-space: pre-wrap;
	text-align: left;
	overflow: visible;
	white-space: normal;
	word-break: keep-all;
	word-wrap: break-word;
	p {
		padding: 0;
		margin: 0;
	}
}
</style>
