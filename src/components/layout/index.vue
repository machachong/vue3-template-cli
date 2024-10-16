<template>
	<div class="common-layout">
		<template v-if="currentRoute">
			<el-container class="no-side">
				<el-aside>
					<MainMenu class="main-menu"></MainMenu>
				</el-aside>
				<el-main>
					<router-view v-slot="{ Component }">
						<keep-alive :include="keepLiveRoute">
							<component :is="Component" />
						</keep-alive>
					</router-view>
				</el-main>
			</el-container>
		</template>
		<template v-else>
			<el-container style="height: 100%">
				<el-header>
					<header-view></header-view>
				</el-header>
				<el-container>
					<el-aside>
						<MenuItem></MenuItem>
					</el-aside>
					<el-main>
						<router-view v-slot="{ Component }">
							<keep-alive :include="keepLiveRoute">
								<component :is="Component" />
							</keep-alive>
						</router-view>
					</el-main>
				</el-container>
			</el-container>
		</template>
	</div>
</template>

<script setup>
import { storeToRefs } from "pinia"
import { useKeepliveStore } from "@/stores"
import { useRoute } from "vue-router"
import { computed } from "vue"
import MenuItem from "@/components/layout/MenuItem.vue"
import HeaderView from "@/components/layout/HeaderView.vue"
import MainMenu from "./MainMenu.vue"

const keepliveStore = useKeepliveStore()
const { keepLiveRoute } = storeToRefs(keepliveStore)
const router = useRoute()
const currentRoute = computed(() => router.meta.exceptTabs && router.meta.exceptMenu)
</script>
<style lang="scss" scoped>
.common-layout {
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
	background-color: var(--boke-bg-color);
	.el-header {
		background-color: var(--boke-card-bg);
		text-align: center;
		line-height: 40px;
		height: 40px;
		/* border-bottom: 1px solid #f1f1f1; */
		// box-shadow: 0 1px 5px rgb(0 0 0 / 8%);
		z-index: 1000;
		width: 100%;
		/* height: 100%; */
		position: fixed;
		top: 0;
		display: inline-block;
		padding: 0;
		z-index: 1;
	}
	.el-main {
		overflow-y: auto;
		overflow-x: auto;
		min-height: calc(100vh - 72px);
		position: fixed;
		top: 40px;
		left: 268px;
		right: 0;
		bottom: 0;
		padding: 16px;
	}
	.el-aside {
		z-index: 2;
		width: 268px;
	}
	.no-side {
		.el-aside {
			width: 78px;
		}
		.main-menu {
			width: 78px;
			height: 100%;
		}
		.el-main {
			left: 78px;
			top: 0;
		}
	}
}
</style>
