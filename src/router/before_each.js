import request from "@/api/service/request"
import settings from "@/utils/config/settings"
import { useUserStore, useKeepliveStore } from "@/stores"
import { setLogin, removeLogin, getAuthorization } from "@/utils/auth/login"
import { getPermission } from "@/utils/auth/auth"
import { message } from "@/utils/tools"
import { systemId } from "@/utils/config/settings"
let userStore = null
let keepliveStore = null
function parseQuery(query) {
	const querys = []
	if (query) {
		for (let key in query) {
			querys.push(key + "=" + query[key])
		}
	}
	return querys.join("&")
}

function getQuery(path) {
	const query = {}
	if (path.indexOf("?") > -1) {
		const queryStr = path.split("?")[1]
		if (queryStr) {
			const querys = queryStr.split("&")
			for (let item of querys) {
				let key = item.split("=")[0]
				let value = item.split("=")[1]
				query[key] = value
			}
		}
	}
	return query
}

// 用户权限验证，如果无权限则跳转到403页面
function checkPermission(permissionIndex, systemId) {
	return new Promise((resolve, reject) => {
		if (!userStore.userInfo) {
			if (!permissionIndex) {
				userStore.getUserInfo().finally(() => {
					resolve()
				})
			} else {
				userStore
					.getUserInfo()
					.then(() => {
						if (getPermission(userStore.userInfo, permissionIndex, systemId)) {
							resolve()
						} else {
							reject()
						}
					})
					.catch(() => {
						// 请求用户信息失败，一般是用户登录失效或者是用户token有问题，此时如果reject，则会强制跳转到403
						// 改为resolve，让network中捕获401-403错误然后跳转到登录页面
						resolve()
					})
			}
		} else {
			if (!permissionIndex) {
				resolve()
			} else {
				if (getPermission(userStore.userInfo, permissionIndex, systemId)) {
					resolve()
				} else {
					reject()
				}
			}
		}
	})
}
// 检查登录状态
const checkToken = (method = "GET", params) => {
	return new Promise((resolve, reject) => {
		request({
			baseURL: settings.dbv2_API_URL,
			url: "/auth/user/",
			method,
			headers: {
				authorization: getAuthorization()
			},
			data: params
		})
			.then((response) => {
				const token = response.token
				setLogin(token)
				console.log(11111)
				resolve(token)
				// 更新用户信息
			})
			.catch((error) => {
				reject(error)
			})
	})
}
export default async function (to, from, next) {
	userStore = useUserStore()
	keepliveStore = useKeepliveStore()
	let title = "项目模板"
	document.title = title
	// 添加缓存
	if (!to.meta.exceptCache) {
		keepliveStore.addAlive(to.path)
	}
	// 路由权限
	const permissionIndex = to.meta?.permission || null
	// 免登页面
	if (to.meta.exceptLogin) {
		next()
		return
	}
	// 验证登录
	if (to.path.indexOf("/login/redirect") >= 0) {
		// 第三方验证的中间跳转页面
		const params = to.query
		// 相关验证操作
		const code = params.code
		let extra = ""
		if (params.extra) {
			extra = params.extra
		}
		let redirectUrl = "/"
		if (extra) {
			redirectUrl = extra
		}
		const query = getQuery(redirectUrl)
		if (code != null && code != undefined && code != "") {
			const postData = new URLSearchParams()
			postData.append("code", code)
			postData.append("app_id", settings.APP_ID)
			try {
				await checkToken("POST", postData)
				message.success("登陆成功")
				next({ path: redirectUrl, query: query })
			} catch (error) {
				next({ path: "/login" })
			}
		} else {
			// 如果没有code，直接跳转到首页，由首页的路由守卫判断登录状态
			next({ path: "/" })
		}
	} else {
		if (to.path == "/login") {
			// 登录页面
			if (sessionStorage.getItem("isLogined") && sessionStorage.getItem("isLogined") == "1") {
				// 如果有临时登录状态
				// 跳转到首页
				checkPermission(permissionIndex, systemId)
					.then(() => {
						next()
					})
					.catch(() => {
						next({ path: "/403" })
					})
			} else {
				// 检查token
				if (getAuthorization()) {
					// 检查token合法性
					try {
						await checkToken()
						message.success("登陆成功")
						next({ path: "/" })
					} catch (error) {
						removeLogin()
						next()
					}
				} else {
					// 没有token，跳转到登录页面
					next()
				}
			}
		} else {
			if (sessionStorage.getItem("isLogined") && sessionStorage.getItem("isLogined") == "1") {
				// 如果有临时登录状态
				// 跳转
				// 如果有临时登录状态
				// 跳转
				checkPermission(permissionIndex, systemId)
					.then(() => {
						next()
					})
					.catch(() => {
						next({ path: "/403" })
					})
			} else {
				// 检查token
				if (getAuthorization()) {
					// 检查token合法性
					// 检查token合法性
					try {
						await checkToken()
						next()
					} catch (error) {
						console.log(error)
						removeLogin()
						next({
							path: "/login",
							query: {
								to: encodeURIComponent(to.path + "?" + parseQuery(to.query))
							}
						})
					}
				} else {
					// 没有token，跳转到登录页面
					message.info("未检测到登录状态")
					next({
						path: "/login",
						query: {
							to: to.path + "?" + parseQuery(to.query)
						}
					})
				}
			}
		}
	}
}
