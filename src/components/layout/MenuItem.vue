<template>
	<div class="layout-menu">
		<MainMenu class="main-menu"></MainMenu>
		<div class="main-nav-bg">
			<div class="main-nav-bg-img" :class="{ 'main-nav-bg-img-dark': isDark }"></div>
			<el-scrollbar height="100%" class="secondary-menu">
				<el-menu :default-active="tabStore.activePage" unique-opened router>
					<template v-for="menu in menus" :key="menu.path">
						<template v-if="!menu.meta?.exceptCreateMenu">
							<el-menu-item v-if="!menu.children.length" :index="menu.path" :key="menu.path">
								<el-icon><component :is="menu.icon"></component></el-icon>
								<span> {{ menu?.title }}</span>
							</el-menu-item>
							<el-sub-menu v-else :index="menu.path">
								<template #title>
									<el-icon><component :is="menu.icon"></component></el-icon>
									<span>{{ menu?.title }}</span>
								</template>
								<template v-for="item in menu?.children" :key="`${menu.path}/${item.path}`">
									<template v-if="!item.meta?.exceptCreateMenu">
										<el-menu-item
											:index="`${menu.path}/${item.path}`"
											v-if="item.children.length == 0"
										>
											<span>{{ item?.title }}{{ item.meta?.exceptCreateMenu }}</span>
										</el-menu-item>
										<el-sub-menu v-else :index="`${menu.path}/${item.path}`">
											<template #title>
												<!-- 这里单独设置为了第三层与上面对齐 -->
												<span style="padding-left: 20px">{{ item?.title }}</span>
											</template>
											<template v-for="third in item?.children" :key="third.path">
												<el-menu-item
													:index="`${menu.path}/${item.path}/${third.path}`"
													v-if="!third.meta?.exceptCreateMenu"
													style="min-width: 150px"
												>
													<span>{{ third?.title }}</span>
												</el-menu-item>
											</template>
										</el-sub-menu>
									</template>
								</template>
							</el-sub-menu>
						</template>
					</template>
				</el-menu>
			</el-scrollbar>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue"
import { storeToRefs } from "pinia"
import { isDark } from "@/composables"
import { useTabsStore, useUserStore } from "@/stores"
import menuRoutes from "@/router/menu_route.js"
import MainMenu from "./MainMenu.vue"
import { systemId } from "@/utils/config/settings"
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
// 构造菜单数据
const resolveMenu = (menu) => {
	// 获取具有权限的菜单
	const newMenu = menu.filter((item) => {
		if (userInfo.value?.is_super) {
			return true
		} else if (userInfo.value?.super_systems?.includes(systemId)) {
			return true
		} else {
			return (
				userInfo.value?.permissions?.includes(item.meta.permission) || item.meta?.title == "首页"
			)
		}
	})
	return newMenu?.map((item) => {
		return {
			path: item.path,
			title: item.meta?.title,
			icon: item.meta?.icon,
			meta: item.meta,
			children: item.children ? resolveMenu(item.children) : []
		}
	})
}
const menus = computed(() => {
	// 调整顺序
	const news = menuRoutes
		.filter((item) => !item?.meta?.exceptCreateMenu)
		.sort((a, b) => a?.meta?.sort - b?.meta?.sort)
	return resolveMenu(news)
})
// 通过Pinia获取当前路由
const tabStore = useTabsStore()
</script>

<style lang="scss" scoped>
.layout-menu {
	// padding-top: 80px;
	display: flex;
	height: 100vh;
	.main-menu {
		width: 78px;
		height: 100%;
	}
	.main-nav-bg {
		width: 190px;
		height: 100%;
		background-color: var(--boke-bg-nav-second);
		position: relative;
		.main-nav-bg-img {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 500px;
			background-image: url("../../assets/img/menu/second-nav-bg.png");
			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-position: left bottom;
		}
		.main-nav-bg-img-dark {
			background-image: url("../../assets/img/menu/second-nav-bg-dark.png");
		}
	}
	.secondary-menu {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
}
:deep(.el-menu) {
	background: none;
	padding: 8px;
	border-right: none;
	.el-sub-menu__title {
		padding-left: 10px !important;
		&:hover {
			background-color: var(--boke-bg-nav-second-active);
			border-radius: 8px;
		}
	}
	.el-menu-item {
		line-height: 22px;
		height: 40px;
		box-sizing: border-box;
		padding-left: 10px !important;
		font-size: 14px;
		min-width: 160px;
		&:hover {
			background-color: var(--boke-bg-nav-second-active);
			border-radius: 8px;
			color: var(--boke-color-main);
		}
		&.is-active {
			background-color: var(--boke-bg-nav-second-active);
			border-radius: 8px;
			color: var(--boke-color-main);
		}
	}
	.el-sub-menu {
		.el-menu-item {
			padding-left: 30px !important;
		}

		&.is-active {
			& > .el-sub-menu__title {
				color: var(--boke-color-main);
			}
		}
	}

	// 增加菜单每项之间的间隔
	.el-menu-item + .el-menu-item {
		margin-top: 5px;
	}

	.el-menu-item + .el-sub-menu {
		margin-top: 5px;
	}

	.el-sub-menu + .el-menu-item {
		margin-top: 5px;
	}
}
</style>
