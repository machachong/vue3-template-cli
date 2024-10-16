<template>
	<div class="main-menu">
		<div class="menu-logo" @click="goHome">
			<img v-if="!isDark" src="@/assets/img/menu/logo-square.png" alt="" />
			<img v-else src="@/assets/img/menu/logo-square-dark.png" alt="" />
		</div>
		<div class="user-menu">
			<el-dropdown>
				<div class="user-img">
					<el-avatar style="vertical-align: middle" :size="40" :src="userInfo?.header_img_url" />
				</div>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>
							<div @click="logout">
								<el-space :size="0">
									<el-icon><SwitchButton /></el-icon>
									<span>退出</span>
								</el-space>
							</div>
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
			<div class="user-message">
				<span @click="toggleTheme" v-if="!isDark">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="25"
						height="25"
						viewBox="0 0 25 25"
						fill="none"
					>
						<circle cx="12.0507" cy="12.1035" r="12" fill="white" />
						<mask
							id="mask0_473_2247"
							style="mask-type: luminance"
							maskUnits="userSpaceOnUse"
							x="4"
							y="4"
							width="17"
							height="17"
						>
							<path d="M20.0507 4.10352H4.05072V20.1035H20.0507V4.10352Z" fill="white" />
						</mask>
						<g mask="url(#mask0_473_2247)">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M10.193 15.3121C11.3397 15.9788 12.753 15.9788 13.8997 15.3121C15.0597 14.6588 15.7664 13.4321 15.7664 12.0988C15.7664 10.0588 14.0997 8.39209 12.0464 8.39209C10.0064 8.39209 8.33969 10.0588 8.33969 12.0988C8.33969 13.4321 9.04636 14.6588 10.193 15.3121Z"
								fill="#FF9900"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M12.5507 7.41866V5.65332C12.5507 5.37732 12.3267 5.15332 12.0507 5.15332C11.7747 5.15332 11.5507 5.37732 11.5507 5.65332V7.41866C11.5507 7.69466 11.7747 7.91866 12.0507 7.91866C12.3267 7.91866 12.5507 7.69466 12.5507 7.41866Z"
								fill="#FF9900"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M12.5507 18.5538V16.7871C12.5507 16.5111 12.3267 16.2871 12.0507 16.2871C11.7747 16.2871 11.5507 16.5111 11.5507 16.7871V18.5538C11.5507 18.8284 11.7747 19.0538 12.0507 19.0538C12.3267 19.0538 12.5507 18.8284 12.5507 18.5538Z"
								fill="#FF9900"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M7.79934 12.3542C7.88868 12.1995 7.88868 12.0088 7.79934 11.8542C7.71001 11.6995 7.54468 11.6035 7.36601 11.6035H5.60068C5.32468 11.6035 5.10068 11.8275 5.10068 12.1035C5.10068 12.3795 5.32468 12.6035 5.60068 12.6035H7.36601C7.54468 12.6035 7.71001 12.5088 7.79934 12.3542Z"
								fill="#FF9900"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M19.0014 12.1035C19.0014 11.8275 18.776 11.6035 18.5014 11.6035H16.7347C16.4587 11.6035 16.2347 11.8275 16.2347 12.1035C16.2347 12.3795 16.4587 12.6035 16.7347 12.6035H18.5014C18.776 12.6035 19.0014 12.3795 19.0014 12.1035Z"
								fill="#FF9900"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M7.84316 17.0165L9.09649 15.7765C9.28316 15.5765 9.28316 15.2565 9.08316 15.0698C8.89649 14.8832 8.57649 14.8698 8.38983 15.0698L7.13649 16.3098C6.98983 16.4565 6.94983 16.6698 7.02983 16.8565C7.10983 17.0432 7.28316 17.1632 7.48316 17.1632C7.61649 17.1632 7.74983 17.1098 7.84316 17.0165Z"
								fill="#FF9900"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M15.7161 9.14249L16.9694 7.90249C17.1561 7.70249 17.1561 7.38249 16.9561 7.19582C16.7694 7.00916 16.4494 6.99582 16.2628 7.19582L15.0094 8.43582C14.8628 8.58249 14.8228 8.79582 14.9028 8.98249C14.9828 9.16915 15.1561 9.28915 15.3561 9.28915C15.4894 9.28915 15.6228 9.23582 15.7161 9.14249Z"
								fill="#FF9900"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M17.0694 16.8565C17.1494 16.6698 17.1094 16.4565 16.9627 16.3098L15.7227 15.0698C15.5227 14.8698 15.2027 14.8832 15.0161 15.0698C14.8294 15.2565 14.8161 15.5765 15.0161 15.7765L16.2561 17.0165C16.3494 17.1098 16.4827 17.1632 16.6161 17.1632C16.8161 17.1632 16.9894 17.0432 17.0694 16.8565Z"
								fill="#FF9900"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M9.19539 8.98151C9.27539 8.79485 9.23539 8.58151 9.08872 8.43485L7.84872 7.19485C7.64872 6.99485 7.32872 7.00818 7.14205 7.19485C6.95539 7.38151 6.94205 7.70151 7.14205 7.90151L8.38205 9.14151C8.47539 9.23485 8.60872 9.28818 8.74205 9.28818C8.94205 9.28818 9.12872 9.16818 9.19539 8.98151Z"
								fill="#FF9900"
							/>
						</g>
					</svg>
				</span>
				<span @click="toggleTheme" v-else>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="25"
						height="25"
						viewBox="0 0 25 25"
						fill="none"
					>
						<circle
							cx="12.6032"
							cy="12.1035"
							r="11.5"
							fill="#EDF2FF"
							fill-opacity="0.15"
							stroke="#4C6BA8"
						/>
						<mask
							id="mask0_473_2266"
							style="mask-type: luminance"
							maskUnits="userSpaceOnUse"
							x="4"
							y="4"
							width="17"
							height="17"
						>
							<path d="M20.6032 4.10352H4.60321V20.1035H20.6032V4.10352Z" fill="white" />
						</mask>
						<g mask="url(#mask0_473_2266)">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M5.9361 12.0767C5.9361 15.77 8.9361 18.77 12.6294 18.77C16.0294 18.77 18.8428 16.2234 19.2561 12.93C19.3628 12.1167 18.4561 11.7567 17.9228 12.1167C16.4028 13.17 14.3494 12.97 13.0428 11.6634C11.7361 10.3567 11.5361 8.30337 12.5894 6.78337C12.9494 6.25004 12.5894 5.34338 11.7761 5.45004C8.48276 5.86337 5.9361 8.67671 5.9361 12.0767Z"
								fill="url(#paint0_linear_473_2266)"
							/>
						</g>
						<defs>
							<linearGradient
								id="paint0_linear_473_2266"
								x1="8.09561"
								y1="4.56788"
								x2="18.3186"
								y2="18.1784"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="#30A7FF" />
								<stop offset="1" stop-color="#06ED59" />
							</linearGradient>
						</defs>
					</svg>
				</span>
			</div>
			<div class="user-divider"></div>
		</div>
		<div class="menu-list">
			<el-scrollbar height="100%" ref="scrollbarRef">
				<div
					class="menu-item"
					v-for="item in innerApp"
					:key="item.id"
					:href="item.url"
					:target="item.target"
					@click="goMenu(item)"
					:class="{ active: item.name === activeMenu?.name }"
				>
					<span class="item-img" v-html="item.img"></span>
					<el-tooltip effect="dark" :content="item.name" placement="right" :show-after="500">
						<span class="item-name">{{ item.name }}</span>
					</el-tooltip>
				</div>
				<!-- <el-icon v-if="!showMore" @click="handleShow(true)"><Bottom /></el-icon>
        <el-icon v-else @click="handleShow(false)"><Top /></el-icon> -->
			</el-scrollbar>
		</div>
		<div class="user-divider"></div>
		<div
			class="menu-item"
			v-for="item in outApp"
			:key="item.name"
			@click="goMenu(item)"
			:class="{ active: item.name === activeMenu?.name }"
			style="padding-top: 6px"
		>
			<img class="item-img out-img" :src="item.img" alt="" />
			<span class="item-name" :title="item.name">{{ item.name }}</span>
		</div>
		<div class="menu-bottom"></div>
	</div>
</template>

<script setup>
import { storeToRefs } from "pinia"
import { useRouter } from "vue-router"
import { ref, onMounted, computed } from "vue"
import { SwitchButton } from "@element-plus/icons-vue"
import { logout } from "@/utils/auth/logout"
import { extraAPP } from "@/utils/config/menu"
import { useUserStore, useMenuStore } from "@/stores"
import { toggleDark, isDark } from "@/composables"
import { systemTitle } from "@/utils/config/settings"
const scrollbarRef = ref() // 滚动条
const router = useRouter()
const userStore = useUserStore()
const menuStore = useMenuStore()
const { menus } = storeToRefs(menuStore)
const { userInfo } = storeToRefs(userStore)
const activeMenu = ref({
	name: systemTitle
})
const innerApp = computed(() => {
	const apps = menus.value.filter((app) => {
		if (app.id === 3) {
			app.name = "运维工单"
		}
		if (app.id === 7) {
			app.name = "ETL自动化"
		}
		return !extraAPP.map((item) => item.id).includes(app.id)
	})
	return apps
})
const outApp = computed(() => {
	return menus.value.filter((app) => {
		return extraAPP.map((item) => item.id).includes(app.id)
	})
})
// const extraAPPId
// 增加切换主题动画
const toggleTheme = (event) => {
	const x = event.clientX
	const y = event.clientY
	const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

	let isDark
	const transition = document.startViewTransition(() => {
		const root = document.documentElement
		isDark = root.classList.contains("dark")
		root.classList.remove(isDark ? "dark" : "light")
		root.classList.add(isDark ? "light" : "dark")
	})

	transition.ready.then(() => {
		const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
		document.documentElement.animate(
			{
				clipPath: isDark ? [...clipPath].reverse() : clipPath
			},
			{
				duration: 600,
				easing: "ease-in",
				pseudoElement: isDark ? "::view-transition-old(root)" : "::view-transition-new(root)"
			}
		)
		toggleDark()
	})
}
const goMenu = (item) => {
	if (item.name === systemTitle) {
		router.push("/")
		return false
	}
	var el = document.createElement("a")
	document.body.appendChild(el)
	el.href = item.url
	el.target = item.target
	el.click()
	document.body.removeChild(el)
}
const goHome = () => {
	router.push("/homepage")
}
onMounted(async () => {
	userStore.getUserInfo()
	await menuStore.getAllApps()
	const index = innerApp.value.findIndex((item) => item.name === activeMenu.value.name)
	if (index > 4) scrollbarRef.value.setScrollTop(300)
})
</script>

<style scope lang="scss">
.main-menu {
	width: 100%;
	height: 100%;
	background: var(--boke-bg-nav-first);
	text-align: center;
	overflow: hidden;
	.menu-logo {
		width: 50px;
		height: auto;
		margin: 0 auto;
		margin-top: 19px;
		cursor: pointer;
		img {
			width: 100%;
			height: auto;
		}
	}
	.menu-list {
		height: calc(100vh - 470px);
		overflow-x: hidden;
		overflow-y: auto;
	}
	.menu-bottom {
		height: 20px;
		width: 100%;
	}
	.user-img {
		margin-top: 16px;
	}
	.user-message {
		margin-top: 16px;
		cursor: pointer;
	}
	.user-divider {
		width: 32px;
		height: 1px;
		background: var(--boke-color-border-divider);
		margin: 0 auto;
		margin-top: 12px;
		margin-bottom: 12px;
	}
	.menu-item {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		text-align: center;
		gap: 2px;
		&:not(:first-child) {
			margin-top: 18px;
		}
		cursor: pointer;
		.item-icon {
			width: 100%;
			height: auto;
			text-align: center;
			svg {
				width: 24px;
				height: 100%;
				margin: 0 auto;
				color: var(--boke-color-text-describe);
			}
		}
		.item-name {
			color: var(--boke-color-text-describe);
			text-align: center;
			/* 正文 */
			font-size: 12px;
			font-style: normal;
			font-weight: 400;
			line-height: 22px; /* 157.143% */
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.item-img {
			width: 24px;
			height: auto;
			margin: 0 auto;
			padding-top: 6px;
			color: var(--boke-bg-nav-first-icon);
		}
		.out-img {
			padding: 0;
			border-radius: 4px;
		}
		i {
			font-size: 24px;
		}
		&:hover {
			background: var(--boke-bg-nav-second-active);
			border-radius: 8px;
			.item-name {
				color: var(--boke-color-main);
			}
			.item-icon {
				svg {
					color: var(--boke-color-main);
				}
			}
			.item-img {
				color: var(--boke-color-main);
			}
		}
		&.active {
			background: var(--boke-bg-nav-second-active);
			border-radius: 8px;
			.item-name {
				color: var(--boke-color-main);
			}
			.item-icon {
				svg {
					color: var(--boke-color-main);
				}
			}
			.item-img {
				color: var(--boke-color-main);
			}
		}
	}
}
::view-transition-old(root),
::view-transition-new(root) {
	animation: none;
	mix-blend-mode: normal;
}

/* 进入dark模式和退出dark模式时，两个图像的位置顺序正好相反 */
.dark::view-transition-old(root) {
	z-index: 1;
}

.dark::view-transition-new(root) {
	z-index: 999;
}

::view-transition-old(root) {
	z-index: 999;
}

::view-transition-new(root) {
	z-index: 1;
}
</style>
