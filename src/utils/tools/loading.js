import { ElLoading } from "element-plus"

const defaultOptions = {
	lock: true,
	text: "正在加载",
	background: "rgba(0, 0, 0, 0.7)"
}
let loading
/**
 *
 * @param {*} options
 * 开启loading
 */
export const showLoading = (options = defaultOptions) => {
	loading = ElLoading.service(options)
}
/**
 * 关闭loading
 */
export const hideLoading = () => {
	if (loading) {
		loading.close()
	}
}
/**
 * 全屏loading
 * 1. fn是同步方法，结束后隐藏loading
 * 2. 如果是异步方法，resolve后隐藏loading
 * 3. 报错后隐藏loading并抛出错误
 * @param {*} fn 函数
 * @param {*} options loading配置
 * @returns Function 一个新的函数，去执行它吧
 */
export const bokeLoading = (fn, options = {}) => {
	const _options = Object.assign(defaultOptions, options)
	const newFn = (...args) => {
		try {
			showLoading(_options)
			const result = fn(...args)
			const isPromise = result instanceof Promise
			if (!isPromise) {
				hideLoading()
				return result
			}
			return result
				.then((res) => {
					hideLoading()
					return res
				})
				.catch((err) => {
					hideLoading()
					throw err
				})
		} catch (err) {
			hideLoading()
			throw err
		}
	}
	return newFn
}
