// 绑定在某个按钮上的拖动
import { ref } from "vue"

export const useDrag = (domRef = ref(null), btnRef = ref(null), callback = () => {}) => {
	const onDrag = () => {
		if (!domRef.value || !btnRef.value) {
			return
		}
		let height
		const minHeight = 50
		const btn = btnRef.value
		const dom = domRef.value
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
						console.log("最小高度")
					} else {
						height = elH - (clientY - e.clientY)
						callback(height)
					}
				}
				// 往下拖拽
				if (clientY < e.clientY) {
					height = elH + (e.clientY - clientY) + 8
					callback(height)
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

	return { onDrag }
}
