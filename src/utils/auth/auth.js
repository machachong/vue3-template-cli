export const getPermission = function (userInfo, permissionIndex, systemId = null) {
	if (!userInfo) {
		return false
	}
	if (userInfo.is_super) {
		return true
	}
	if (systemId && userInfo.super_systems) {
		if (userInfo.super_systems.indexOf(systemId) > -1) {
			return true
		}
	}
	if (userInfo.permissions) {
		if (userInfo.permissions.indexOf(permissionIndex) >= 0) {
			return true
		} else {
			return false
		}
	} else {
		return false
	}
}
