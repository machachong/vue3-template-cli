import { message, confirm } from "@/utils/tools/message"
import { jumpTo, removeLogin } from "@/utils/auth/login"
import settings from "@/utils/config/settings"

const logout = () => {
	const content = "确认要退出吗?"
	confirm(content)
		.then(() => {
			// 退出时将当前页面作为登录成功后的跳转页
			const path = document.location.href.replace(settings.BASE_URL, "")
			removeLogin()
			message.success("退出登录成功")
			setTimeout(() => {
				jumpTo("/login", {
					to: path
				})
			}, 1000)
		})
		.catch((error) => {
			console.log(error)
		})
}

export { logout }
