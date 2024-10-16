import { ElLoading } from "element-plus"
import formate from "@/utils/tools/format.js"
import { hideLoading, showLoading } from "@/utils/tools/loading.js"
import router from "@/router"

const debounce = function (callback, wait = 200, immediate = false) {
	// 闭包
	let submit
	return function () {
		if (submit) clearTimeout(submit)

		// 立即执行的情况
		if (immediate) {
			let trigger = !submit
			submit = setTimeout(() => {
				submit = null
			}, wait)

			if (trigger) {
				// 箭头函数中的this 只取决包裹箭头函数的第一个普通函数的 this
				// 此处this指向的是调用debounce的函数，arguments为this指向函数的arguments
				callback.apply(this, arguments)
			}
			return
		}

		// 不是立即执行的情况
		submit = setTimeout(() => {
			callback.apply(this, arguments)
		}, wait)
		return
	}
}
const jumpTo = function (path, query = null, _blank = false) {
	/*
    _blank为true的时候，会跳转到新页面
  */
	return new Promise((resolve, reject) => {
		if (!_blank) {
			if (query) {
				router
					.push({ path: path, query: query })
					.then(() => {
						resolve()
					})
					.catch((err) => {
						reject(err)
					})
			} else {
				router
					.push(path)
					.then(() => {
						resolve()
					})
					.catch((err) => {
						reject(err)
					})
			}
		} else {
			let url = {
				href: ""
			}
			if (query) {
				url = router.resolve({
					path: path,
					query: query
				})
			} else {
				url = router.resolve({
					path: path
				})
			}
			window.open(url.href, "_blank")
			resolve()
		}
	})
}

const filterName = function (name, kw) {
	// kw和name都转为小写
	name = name.toLowerCase()
	if (kw) {
		kw = kw.toLowerCase()
	}
	if (
		name.indexOf(kw) != -1 ||
		formate.getFullChars(name).toLowerCase().indexOf(kw) != -1 ||
		formate.getCamelChars(name).toLowerCase().indexOf(kw) != -1
	) {
		return true
	}
	return false
}

const filterNameIndex = function (name, kw) {
	// 在模糊匹配之后，返回最小index
	// kw和name都转为小写
	name = name.toLowerCase()
	if (kw) {
		kw = kw.toLowerCase()
	}
	const index = name.indexOf(kw)
	const fullCharsIndex = formate.getFullChars(name).toLowerCase().indexOf(kw)
	const camelCharsIndex = formate.getCamelChars(name).toLowerCase().indexOf(kw)
	if (
		[index, fullCharsIndex, camelCharsIndex].some(
			(item) => item !== null && item !== undefined && item > -1
		)
	) {
		return Math.min(
			...[index, fullCharsIndex, camelCharsIndex].filter(
				(item) => item !== null && item !== undefined && item > -1
			)
		)
	} else {
		return null
	}
}

// 获取子页面最小宽度
const getMinWidth = function () {
	const widthWeb = document.body.clientWidth
	return widthWeb > 800
}

const getLoadingInstance = (text) => {
	const params = {
		lock: true,
		text: text,
		background: "rgba(0, 0, 0, 0.7)"
	}
	const loadingInstance = ElLoading.service(params)
	return loadingInstance
}

// 生成唯一数
const getUuid = () => {
	let s = []
	let hexDigits = "0123456789abcdef"
	for (let i = 0; i < 32; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
	}
	s[14] = "4" // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23]
	s.unshift(Math.round(new Date().getTime() / 1000) + "")
	let uuid = s.join("")
	return uuid
}

const formatBytes = (bytes, fix_num = 2) => {
	if (bytes === 0) return "0 Bytes"
	const k = 1024
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	return parseFloat((bytes / Math.pow(k, i)).toFixed(fix_num)) + " " + sizes[i]
}
/**
 *
 * @param {Function} fun 请求的方法
 * @param {String} url  地址
 * @param {Object} params 参数
 * @param {Boolean} params   请求时是否开启全局loading
 * @returns
 */
const fetchData = async (fun, url, params, loading = false) => {
	try {
		if (loading) showLoading()
		const res = await fun(url, params)
		if (loading) hideLoading()
		return Promise.resolve(res)
	} catch (err) {
		console.log(err)
		if (loading) hideLoading()
		return Promise.reject(err)
	}
}
export {
	jumpTo,
	filterName,
	filterNameIndex,
	getMinWidth,
	getLoadingInstance,
	getUuid,
	formatBytes,
	fetchData,
	debounce
}
