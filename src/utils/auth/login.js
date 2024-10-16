import router from "@/router"

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

const setLogin = function (token) {
	// 设定登录状态
	localStorage.setItem("authorization", token)
	sessionStorage.setItem("isLogined", "1")
}

const getAuthorization = function () {
	return localStorage.getItem("authorization")
}

const removeLogin = function () {
	// 移除登录状态
	localStorage.removeItem("authorization")
	sessionStorage.removeItem("isLogined")
}

export {
	jumpTo, // 与页面跳转有关的
	setLogin,
	removeLogin,
	getAuthorization // 用户验证相关
}
