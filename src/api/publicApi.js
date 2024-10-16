import request from "@/api/service/request"
import { getUrl, getImg, getTarget, extraAPP } from "@/utils/config/menu"
import settings from "@/utils/config/settings"

// 获取当前登录用户信息
const getUserInfoApi = () => {
	return request({
		baseURL: settings.dbv2_API_URL,
		url: "/system/user/info/"
	})
}

// 获取当前登录用户信息
const getUserOptionsApi = (params) => {
	return request({
		url: "/system/user/options/",
		params: params
	})
}

// 获取ds中跑数据的集群列表
const getClusterListApi = (params) => {
	return request({
		url: "/system/dw_cmdb/cluster_list/",
		method: "GET",
		params: params
	})
}

// 获取ds中跑数据的项目列表
const getProjectListApi = (params) => {
	return request({
		url: "/system/dw_cmdb/project_list/",
		method: "GET",
		params: params
	})
}
export const getApps = function (type) {
	return new Promise((resolve, reject) => {
		request({
			baseURL: settings.dbv2_API_URL,
			url: "/system/sys/collection/",
			method: "GET"
		})
			.then((response) => {
				const items = response.items
				const apps = items.map((item) => {
					return {
						...item,
						url: getUrl(item.id),
						img: getImg(item.id, type),
						target: getTarget(item.id)
					}
				})
				apps.push(...extraAPP)
				resolve(apps)
			})
			.catch((error) => {
				console.log("catch", error)
				reject(error)
			})
	})
}
export { getUserInfoApi, getUserOptionsApi, getClusterListApi, getProjectListApi }
