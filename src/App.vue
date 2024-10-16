<template>
	<el-config-provider :locale="locale">
		<router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in">
				<keep-alive :include="keepLiveRoute">
					<component :is="Component" />
				</keep-alive>
			</transition>
		</router-view>
	</el-config-provider>
</template>

<script setup>
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import { reactive } from "vue"
import { storeToRefs } from "pinia"
import { useKeepliveStore } from "@/stores"
import { debounce } from "@/utils/tools"

const keepliveStore = useKeepliveStore()
const { keepLiveRoute } = storeToRefs(keepliveStore)
const { locale } = reactive({
	locale: zhCn
})

// 解决el-table设置max-height报错ResizeObserver loop completed with undelivered notifications
const _ResizeObserver = window.ResizeObserver
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
	constructor(callback) {
		callback = debounce(callback, 16)
		super(callback)
	}
}
</script>
