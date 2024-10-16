// 装饰器函数，封装动画渐变效果
const transitionFunc = (func, showFlag, timeout = 100) => {
	return (...args) => {
		showFlag.value = !showFlag.value
		func(...args)
		setTimeout(() => {
			showFlag.value = !showFlag.value
		}, timeout)
	}
}

// 渐变样式
const transName = "el-zoom-in-top"

export { transitionFunc, transName }
