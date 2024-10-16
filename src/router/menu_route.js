import { House } from "@element-plus/icons-vue"
const files = require.context("@/router/modules", false, /\.js$/)
const routerModules = []
files.keys().forEach((key) => {
	routerModules.push(...files(key).default)
})
const routes = [
	{
		path: "/",
		name: "home",
		component: () => import("@/views/HomeView.vue"),
		meta: {
			title: "首页",
			icon: House
		}
	},
	...routerModules
]
// 菜单路由
export default routes
