import { createRouter, createWebHistory } from "vue-router"
import beforeEach from "@/router/before_each"
import afterEach from "@/router/after_each"
import menuRoutes from "./menu_route.js"
const Layouts = () => import("@/components/layout/index.vue")

/**
 * title 标题
 * exceptSidebar 是否去掉侧边栏和头部单独作为一个页面
 * exceptCache 页面是否需要路由缓存
 * exceptLogin 是否不需要登录
 */

// 公共路由部分
const routes = [
	{
		path: "/",
		component: Layouts,
		children: [...menuRoutes]
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login"),
		meta: {
			title: "登录",
			exceptCache: true,
			exceptSidebar: true,
			exceptLogin: true
		}
	},
	{
		path: "/homepage",
		name: "homepage",
		component: import("@/views/HomePage"),
		meta: {
			title: "首页",
			exceptCache: true,
			exceptSidebar: true
		}
	},
	{
		path: "/demo",
		name: "demo",
		component: () => import("@/views/Demo"),
		meta: {
			exceptSidebar: true,
			exceptLogin: true
		}
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/views/error/404.vue"),
		meta: {
			title: "404",
			exceptLogin: true
		}
	},
	{
		path: "/403",
		name: "403",
		component: () => import("@/views/error/403.vue"),
		meta: {
			title: "403",
			exceptLogin: true
		}
	},
	{
		path: "/:catchAll(.*)",
		redirect: "/404"
	}
]
console.log(routes)
const router = createRouter({
	base: "/",
	history: createWebHistory(process.env.BASE_URL),
	routes
})

// 引入加载条，优化页面切换时的加载体验
import NProgress from "nprogress"
import "nprogress/nprogress.css"

router.beforeEach((to, from, next) => {
	NProgress.start()
	beforeEach(to, from, next)
})

router.afterEach((to, from) => {
	NProgress.done()
	afterEach(to, from)
})

export default router
