<template>
	<div :style="{ width: width, height: newHeight }" class="editor-wrap">
		<div class="editor" ref="domRef">
			<Diff ref="diffRef" :prev="source" :current="target" theme="light" :language="getMode()" />
		</div>
		<slot></slot>
		<div ref="btnRef" v-if="resizable" class="editor-drag" @mousedown.prevent="onDrag">
			<div class="editor-drag__icon"></div>
		</div>
	</div>
</template>

<script>
/*
    用于代码比较的组件
  */
import { defineComponent, ref, watch } from "vue"
import { useDrag } from "@/hooks/useDragHook"

export default defineComponent({
	name: "MyEditorDiff",
	components: {},
	props: {
		source: {
			type: String,
			default() {
				return ""
			}
		},
		target: {
			type: String,
			default() {
				return ""
			}
		},
		mode: {
			type: String,
			default() {
				return "python"
			}
		},
		width: {
			type: String,
			default() {
				return "100%"
			}
		},
		height: {
			type: String,
			default() {
				return "100%"
			}
		},
		resizable: Boolean
	},
	setup(props) {
		const diffRef = ref(null)

		const newHeight = ref(props.height)

		const domRef = ref(null)

		const btnRef = ref(null)

		const onHeightChange = (height) => {
			newHeight.value = height + "px"
		}

		const { onDrag } = useDrag(domRef, btnRef, onHeightChange)

		const getMode = () => {
			if (props.mode == "shell") {
				return "sh"
			}
			return props.mode || "python"
		}

		/*
        2023-05-05新增 跳转到差异部分的逻辑
      */
		// 当前的差异节点
		const nowDomIndex = ref(-1)

		watch(
			() => [props.source, props.target],
			() => {
				nowDomIndex.value = -1
			}
		)

		const getDoms = () => {
			const el = diffRef.value?.$el
			if (el) {
				return el.querySelectorAll(".vue-diff-row")
			}
			return []
		}

		const getDiffDoms = () => {
			const doms = getDoms()
			const diffs = []
			for (let dom of doms) {
				if (isDiffDom(dom)) {
					diffs.push(dom)
				}
			}
			return diffs
		}

		const isDiffDom = (dom) => {
			const divs = dom.querySelectorAll("div")
			for (let div of divs) {
				const className = div.className
				if (className.indexOf("lineNum") > -1 && className.indexOf("vue-diff-cell-equal") === -1) {
					return true
				}
			}
			return false
		}

		const scrollTo = (height) => {
			if (diffRef.value?.$el) {
				diffRef.value.$el.scrollTop = height
			}
		}

		const prev = () => {
			const doms = getDiffDoms()
			for (let index = 0; index < doms.length; index++) {
				if (nowDomIndex.value === -1) {
					nowDomIndex.value = index
					const nowDom = doms[index]
					const height = nowDom.offsetTop
					scrollTo(height)
					return
				} else {
					if (nowDomIndex.value === index) {
						if (doms[index - 1]) {
							nowDomIndex.value += -1
							const nowDom = doms[index]
							const height = nowDom.offsetTop
							scrollTo(height)
							return
						} else {
							const nowDom = doms[nowDomIndex.value]
							const height = nowDom.offsetTop
							scrollTo(height)
							return
						}
					}
				}
			}
		}

		const next = () => {
			const doms = getDiffDoms()
			for (let index = 0; index < doms.length; index++) {
				if (nowDomIndex.value === -1) {
					nowDomIndex.value = index
					const nowDom = doms[index]
					const height = nowDom.offsetTop
					scrollTo(height)
					return
				} else {
					if (nowDomIndex.value === index) {
						if (doms[index + 1]) {
							nowDomIndex.value += 1
							const nowDom = doms[index]
							const height = nowDom.offsetTop
							scrollTo(height)
							return
						} else {
							const nowDom = doms[nowDomIndex.value]
							const height = nowDom.offsetTop
							scrollTo(height)
							return
						}
					}
				}
			}
		}

		return {
			diffRef,
			newHeight,
			domRef,
			btnRef,
			onDrag,
			getMode,
			prev,
			next
		}
	}
})
</script>

<style scoped>
:deep(.vue-diff-wrapper) {
	height: 100%;
	overflow: auto;
}

:deep(.vue-diff-viewer) {
	box-sizing: border-box;
}

.editor-wrap {
	position: relative;
	display: flex;
	flex-flow: column;
	border: 1px solid #f1f1f1;
	box-sizing: border-box;
}

.editor {
	flex: 1;
	overflow: hidden;
	position: relative;
}

.editor-drag {
	height: 8px;
	width: 100%;
	cursor: row-resize;
}

.editor-drag__icon {
	width: 50px;
	height: 2px;
	margin: 3px auto;
	border-top: 1px solid #cfd8dc;
	border-bottom: 1px solid #cfd8dc;
}
</style>
<style>
/* 高亮高危词 */
.ace_danger {
	color: #fff;
	background-color: var(--my-danger);
}
</style>
