import { getPermission } from "@/utils/auth/auth"
import { useUserStore } from "@/stores/modules/common/user"
const directive = async (el, binding, vnode, systemId = null) => {
	let userStore = useUserStore()
	let permissionId
	let _systemId
	const permission = binding.value
	if (typeof permission === "number") {
		permissionId = permission
		_systemId = systemId
	} else if (typeof permission === "object") {
		permissionId = permission.permission
		_systemId = permission.systemId
	}
	if (permissionId) {
		const originDisplay = el.style.display || ""
		el.style.display = "none"
		if (!userStore.userInfo) {
			// _res 等待接口获取到该账户的所有角色，再进行处理
			await userStore.getUserInfo()
			if (!getPermission(userStore.userInfo, permissionId, _systemId)) {
				el.parentNode ? el.parentNode.removeChild(el) : el.remove()
			} else {
				el.style.display = originDisplay
			}
		} else {
			if (!getPermission(userStore.userInfo, permissionId, _systemId)) {
				el.parentNode ? el.parentNode.removeChild(el) : el.remove()
			} else {
				el.style.display = originDisplay
			}
		}
	}
}

export default (app) => {
	app.directive("permission", {
		mounted: async (el, binding, vnode) => {
			directive(el, binding, vnode)
		}
	})
}
