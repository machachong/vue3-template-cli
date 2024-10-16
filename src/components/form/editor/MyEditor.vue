<template>
	<div :style="{ width: width, height: newHeight }" class="editor-wrap">
		<!-- <div class="font-size-tips" v-if="showFontSize">{{ localFontSize }}px</div> -->
		<div
			ref="domRef"
			:id="id"
			class="editor"
			@input="handleInput"
			@keyup.delete="handleDelete"
		></div>
		<slot></slot>
		<div ref="btnRef" v-if="resizable" class="editor-drag" @mousedown.prevent="onDrag">
			<div class="editor-drag__icon"></div>
		</div>
	</div>
</template>

<script>
//   import { getLocal, setLocal, removeLocal, getMinWidth } from "@/utils/utils";
import { getEditor } from "@/utils/ace/ace-init"
import { debounce } from "@/utils/tools"

export default defineComponent({
	name: "MyEditor",
	props: {
		modelValue: {
			type: String,
			default() {
				return null
			}
		},
		fontSize: {
			type: Number,
			default() {
				return 12
			}
		},
		id: {
			type: String,
			default() {
				return "editor"
			}
		},
		disabled: {
			type: Boolean,
			default() {
				return false
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
		resizable: {
			type: Boolean,
			default() {
				return false
			}
		},
		handleTab: Boolean, // 将四个空格转为'\t'
		// 编译器语言
		mode: {
			type: String,
			default() {
				return "sql"
			}
		},
		// 在外部内容发生变动的时候，光标是否自动滚动到末尾
		autoScroll: Boolean,
		// 为false时禁用行号
		lineNumbers: {
			type: Boolean,
			default() {
				return true
			}
		},
		extraKeywords: {
			type: Array,
			default() {
				return []
			}
		},
		extraType: {
			type: Array,
			default() {
				return []
			}
		},
		extraFunction: {
			type: Array,
			default() {
				return []
			}
		},
		// 额外类型
		extraMode: {
			type: String,
			default() {
				return "adb"
			}
		}
	},
	emits: [
		"update:modelValue",
		"update:fontSize",
		"selected",
		"save",
		"run",
		"format",
		"aceInput",
		"aceDelete"
	],
	setup(props, ctx) {
		// const state = reactive({
		//   editor: null,
		//   newHeight: props.height,
		// });

		// 2022-11-28修改，使用shallowReactive减小性能开销
		// 对于editor对象中的属性进行响应式包装是没有必要的
		const state = shallowReactive({
			editor: null,
			newHeight: props.height
		})

		const fromLocal = ref(false)
		const fromProps = ref(false)

		function editInit() {
			const editor = getEditor(
				props.id,
				props.mode,
				props.extraKeywords,
				props.extraType,
				props.extraFunction,
				props.extraMode
			)
			if (props.disabled) {
				editor.setReadOnly(true)
			}
			editor.setOption("showPrintMargin", false)
			editor.container.classList.add(`my-${props.mode}-editor`)
			state.editor = editor
			if (props.modelValue != null) {
				fromProps.value = true
				state.editor.setValue(props.modelValue, 1)
				nextTick(() => {
					fromProps.value = false
				})
				// 如果不是只读，则自动聚焦
				if (!props.disabled) {
					state.editor.focus()
				}
			}
			if (!props.lineNumbers) {
				state.editor.lineNumbers = false
			}
		}

		function editSync() {
			// 更新props.sql
			if (state.editor) {
				state.editor.getSession().on("change", function () {
					let value = state.editor.getValue()
					if (props.handleTab) {
						while (value.indexOf("    ") > -1) {
							value = value.replace("    ", "\t")
						}
					}
					if (!fromProps.value) {
						// 如果不是外部的变动，则更新外部
						fromLocal.value = true
						ctx.emit("update:modelValue", value)
						// 更新完成修改更新状态
						nextTick(() => {
							fromLocal.value = false
						})
					}
				})
				state.editor.getSession().on("changeFold", (obj) => {
					console.log(obj)
				})
			}
		}

		// 处理选择事件
		const selectTextCache = ref("")

		function editSelected() {
			if (state.editor) {
				state.editor.selection.on("changeSelection", () => {
					const selectedText = state.editor.getSelectedText()
					if (selectedText !== selectTextCache.value && selectedText.length !== 1) {
						ctx.emit("selected", selectedText)
						selectTextCache.value = selectedText
					}
				})
			}
		}

		// 处理键盘快捷键
		function editorCommand() {
			if (state.editor) {
				// eslint-disable-next-line no-inner-declarations
				function save() {
					ctx.emit("save", state.editor.getValue())
				}
				state.editor.commands.addCommand({
					name: "save",
					exec: save,
					bindKey: { win: "ctrl-s", mac: "cmd-s" }
				})

				// eslint-disable-next-line no-inner-declarations
				function run() {
					ctx.emit("run")
				}
				state.editor.commands.addCommand({
					name: "run",
					exec: run,
					bindKey: { win: "ctrl-enter", mac: "cmd-enter" }
				})

				// eslint-disable-next-line no-inner-declarations
				function format() {
					ctx.emit("format")
				}
				state.editor.commands.addCommand({
					name: "format",
					exec: format,
					bindKey: { win: "ctrl-l", mac: "cmd-l" }
				})

				// eslint-disable-next-line no-inner-declarations
				function fontSizePlus() {
					localFontSize.value += 1
				}
				state.editor.commands.addCommand({
					name: "fontSizePlus",
					exec: fontSizePlus,
					bindKey: { win: "ctrl-=", mac: "cmd-=" }
				})

				// eslint-disable-next-line no-inner-declarations
				function fontSizeReduce() {
					if (localFontSize.value > 5) {
						localFontSize.value = localFontSize.value - 1
					} else {
						localFontSize.value = 5
					}
				}
				state.editor.commands.addCommand({
					name: "fontSizeReduce",
					exec: fontSizeReduce,
					bindKey: { win: "ctrl--", mac: "cmd--" }
				})
			}
		}

		// 设置补全内容
		/*
        暂时废弃，不会在MyEditor里头进行设置，由各个语言的实例化editor进行设置
        参考: SqlEditor
      */
		// function setCompleter(datas, meta = "test") {
		// 	// if (state.editor) {
		// 	//   return setTablesCompleteData(datas, meta);
		// 	// }
		// }

		watch(
			() => props.modelValue,
			() => {
				// // 外部的变动
				if (fromLocal.value) {
					// 如果外部的变动是由内部引起的，则不初始化
				} else {
					// 反之，说明外部引起的，初始化
					fromProps.value = true
					if (state.editor) {
						state.editor.setValue(props.modelValue, 1)
					}
					nextTick(() => {
						fromProps.value = false
						if (props.autoScroll) {
							const cursor = state.editor.selection.getCursor()
							// 移动到下一行
							state.editor.gotoLine(cursor.row + 1)
							// 光标移动
							state.editor.moveCursorTo(cursor.row, cursor.column)
						}
					})
				}
			},
			{
				deep: true
			}
		)

		function resize() {
			// 重新绘制编辑器dom
			if (state.editor) {
				nextTick(() => {
					state.editor.resize()
				})
			}
		}

		const onResize = debounce(() => {
			resize()
		}, 200)

		function focus() {
			if (state.editor) {
				nextTick(() => {
					state.editor.focus()
				})
			}
		}

		function insert(val) {
			if (state.editor) {
				nextTick(() => {
					state.editor.insert(val)
				})
			}
		}

		function handleInput(e) {
			ctx.emit("aceInput", e)
		}

		function handleDelete(e) {
			ctx.emit("aceDelete", e)
		}

		/*
        2022-08-02新增 字号相关
      */
		const localFontSize = ref(props.fontSize)
		const showFontSize = ref(false)
		const closeFontSize = debounce(() => {
			showFontSize.value = false
		}, 2000)
		watch(
			() => props.fontSize,
			() => {
				localFontSize.value = props.fontSize
				state.editor?.setFontSize?.(localFontSize.value)
			}
		)
		watch(
			() => localFontSize.value,
			() => {
				state.editor?.setFontSize?.(localFontSize.value + "px")
				nextTick(() => {
					showFontSize.value = true
					closeFontSize()
				})
				ctx.emit("update:fontSize", localFontSize.value)
			}
		)

		/*
        2022-12-06新增 编辑器自带拖拽
      */
		const domRef = ref(null)

		const btnRef = ref(null)

		const onHeightChange = (height) => {
			state.newHeight = height + "px"
		}

		const onDrag = () => {
			if (!domRef.value || !btnRef.value) {
				return
			}
			let height = 200
			const minHeight = 50
			const btn = btnRef.value
			const dom = domRef.value

			// console.log(el);
			// let eventObj = {
			// 	move: "onmousemove",
			// 	up: "onmouseup"
			// }

			// 电脑鼠标拖动
			btn.onmousemove = (e) => {
				e.preventDefault()
				// console.log("移动判定");
				const clientY = e.clientY
				const elH = dom.clientHeight
				document.onmousemove = function (e) {
					// console.log("clientY", clientY);
					// console.log("e.clientY", e.clientY);
					// 往上拖拽
					// 修改鼠标拖拽样式
					const body = document.querySelector("body")
					body.style.cursor = "row-resize"
					if (clientY > e.clientY) {
						if (dom.clientHeight < minHeight) {
							console.log(minHeight)
						} else {
							height = elH - (clientY - e.clientY)
							onHeightChange(height)
						}
					}
					// 往下拖拽
					if (clientY < e.clientY) {
						height = elH + (e.clientY - clientY) + 8
						onHeightChange(height)
					}
					// 拖拽完成
					btn.onmouseup = function () {
						btn.onmousemove = null
						document.onmousemove = null
						document.onmouseup = null
						// 结束修改鼠标拖拽样式
						body.style.cursor = "auto"
					}
					document.onmouseup = function () {
						btn.onmousemove = null
						document.onmousemove = null
						document.onmouseup = null
						// 结束修改鼠标拖拽样式
						body.style.cursor = "auto"
					}
				}
			}
		}

		watch(
			() => props.height,
			() => {
				state.newHeight = props.height
			}
		)

		watch(
			() => state.newHeight,
			() => {
				onResize()
			}
		)

		onMounted(() => {
			editInit()
			editSync()
			editorCommand()
			editSelected()
		})

		onBeforeUnmount(() => {
			try {
				state.editor?.destroy?.()
				state.editor?.container?.remove?.()
			} catch (err) {
				console.log(err)
			}
		})

		return {
			...toRefs(state),
			resize,
			focus,
			insert,
			localFontSize,
			showFontSize,
			handleInput,
			handleDelete,
			domRef,
			btnRef,
			onDrag
		}
	}
})
</script>

<style scoped>
.editor-wrap {
	position: relative;
	display: flex;
	flex-flow: column;
	border: 1px solid #f1f1f1;
	box-sizing: border-box;
}

.font-size-tips {
	height: 20px;
	padding: 0 5px;
	position: absolute;
	top: 0;
	right: 0;
	background-color: #fff;
	border: 1px solid #f1f1f1;
	box-sizing: border-box;
	z-index: 999;
}

.editor {
	flex: 1;
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
