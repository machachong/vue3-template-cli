import { Monitor } from "@element-plus/icons-vue"
export default [
	{
		path: "/event",
		name: "event",
		redirect: "/event/base_event",
		meta: {
			icon: Monitor,
			title: "平台审计",
			permission: 903
		},
		children: [
			{
				path: "larklogview",
				name: "LarkLogView",
				component: () => import("@/views/event/LarkLogView.vue"),
				meta: {
					title: "飞书卡片日志",
					permission: 90302,
					eventName: "lark_log_visite",
					exceptCache: true
				}
			}
		]
	}
]
