import axios from "axios"
import { message } from "@/utils/tools"
import { jumpTo, removeLogin, getAuthorization } from "@/utils/auth/login"
import settings from "@/utils/config/settings"
import { debounce } from "@/utils/tools"

// 在登录验证错误之后，携带当前页面url跳转到登录页
const jumpToLogin = debounce(
	() => {
		// 获取当前页面，并去除其根目录
		const url = document.location.href.replace(settings.BASE_URL, "")
		jumpTo("/login", {
			to: encodeURIComponent(url)
		})
	},
	500,
	true
)
// 同时多次发出同一个请求，只请求一次
const pendingMap = new Map()
/**
 * 生成每个请求唯一的键
 * @param {*} config
 * @returns string
 */
function getPendingKey(config) {
	let { url, method, params, data } = config
	if (typeof data === "string") data = JSON.parse(data) // response里面返回的config.data是个字符串对象
	return [url, method, params && JSON.stringify(params), data && JSON.stringify(data)].join("&")
}

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config
 */
// function addPending(config) {
//   const pendingKey = getPendingKey(config);
//   console.log('config', pendingKey);
//   config.cancelToken =
//     config.cancelToken ||

// }
/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config) {
	const pendingKey = getPendingKey(config)
	if (pendingMap.has(pendingKey)) {
		const cancelToken = pendingMap.get(pendingKey)
		cancelToken(pendingKey)
		pendingMap.delete(pendingKey)
	}
}
export default function request(options = { baseURL: "" }) {
	// 创建axios实例
	const service = axios.create({
		baseURL: options.baseURL || settings.API_URL, // 接收传入baseurl
		timeout: 35000, // 请求超时时间
		cancelToken: new axios.CancelToken(function executor(c) {
			if (options.setCancel && typeof options.setCancel == "function") {
				options.setCancel(c)
			}
		})
	})
	// 对于返回的报错是否需要提示，默认需要提示
	const responseFailAlert = options.responseFailAlert || true

	service.interceptors.request.use(
		(config) => {
			const token = getAuthorization()
			if (token) {
				config.headers["Authorization"] = token
			}
			const pendingKey = getPendingKey(config)
			if (pendingMap.has()) {
				removePending(config)
			} else {
				config.cancelToken = new axios.CancelToken((cancel) => {
					if (!pendingMap.has(pendingKey)) {
						pendingMap.set(pendingKey, cancel)
					}
				})
			}
			return config
		},
		(error) => {
			console.log(error)
			Promise.reject(error)
		}
	)

	service.interceptors.response.use(
		(res) => {
			if (options.setCancel && typeof options.setCancel == "function") {
				options.setCancel(null)
			}
			if (options.responseAll) {
				return res
			} else {
				return res.data.data
			}
		},
		(error) => {
			console.log(error)
			try {
				if (error.response.data) {
					if (error.response.data.message) {
						message.error(error.response.data.message)
					} else if (error.response.data.detail) {
						message.error(error.response.data.detail)
					} else {
						if (responseFailAlert) {
							message.error("请求失败")
						}
					}
					const statusCode = error.response.data.status_code
					if (statusCode == 401) {
						// 登录错误
						removeLogin()
						jumpToLogin()
						return Promise.reject(error)
					}
					if (statusCode == 403) {
						// 权限错误
						jumpTo("/403")
						// window.location.href = '/403'
						return Promise.reject(error)
					}
					if (statusCode == 404) {
						// 路由错误
						jumpTo("/404")
						// window.location.href = '/404'
						return Promise.reject(error)
					}
				} else {
					if (!axios.isCancel(error)) {
						if (responseFailAlert) {
							message.error("网络请求出现问题")
						}
					}
				}
			} catch (e) {
				if (!axios.isCancel(error)) {
					if (responseFailAlert) {
						message.error("网络请求出现问题")
					}
				}
			}
			if (!axios.isCancel(error)) {
				// 主动上报请求错误
				// requestErrorCapture(error);
				return Promise.reject(error)
			} else {
				// 如果是取消的错误，则reject null
				return Promise.reject(null)
			}
		}
	)
	return service(options)
}
