<template>
	<div class="homepage">
		<div class="homepage-con">
			<header class="homepage-head">
				<div class="head-user">
					<el-avatar
						class="head-img"
						style="vertical-align: middle"
						:size="36"
						:src="userInfo.header_img_url"
					></el-avatar
					><span>Hi！{{ userInfo.real_name }}，欢迎使用</span>
				</div>
				<div class="head-time">上次登陆时间：{{ userInfo.last_login_time }}</div>
			</header>
			<main class="homepage-list">
				<section v-for="item in systemGroup" :key="item.name" class="list">
					<h3 class="list-title">{{ item.name }}</h3>
					<div class="list-content">
						<a
							v-for="obj in item.groups"
							:key="obj.id"
							class="list-item"
							:href="obj.url"
							:target="obj.target"
						>
							<img class="item-img" v-if="[101, 102, 103].includes(obj.id)" :src="obj.img" alt="" />
							<div class="item-img" v-else v-html="obj.img"></div>
							<div class="item-con">
								<p class="item-name">{{ obj.name }}</p>
								<p class="item-des">{{ obj.description }}</p>
							</div>
							<el-icon class="item-right"><ArrowRightBold /></el-icon>
						</a>
					</div>
				</section>
			</main>
		</div>
	</div>
</template>

<script setup>
import { ArrowRightBold } from "@element-plus/icons-vue"
import { storeToRefs } from "pinia"
import { useUserStore } from "@/stores"
import { getApps } from "@/api/publicApi"
import { homeSystemsId } from "@/utils/config/menu"
// import { filterName } from "@/utils/tools/utils"
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const systemGroup = ref([
	{
		name: "内部应用",
		values: "internal",
		groups: []
	},
	{
		name: "业务支撑能力",
		values: "work",
		groups: []
	},
	{
		name: "外部工具",
		values: "external",
		groups: []
	}
])
// const appFilter = computed(() => {
// 	return apps.value.filter((app) => {
// 		if (kw.value) {
// 			return filterName(app.name, kw.value)
// 		}
// 		return true
// 	})
// })
const getAllApps = async () => {
	try {
		const items = await getApps()
		for (let obj of items) {
			if (homeSystemsId.internal.includes(obj.id)) {
				systemGroup.value.find((item) => item.values === "internal")?.groups.push(obj)
			}
			if (homeSystemsId.work.includes(obj.id)) {
				systemGroup.value.find((item) => item.values === "work")?.groups.push(obj)
			}
			if (homeSystemsId.external.includes(obj.id)) {
				systemGroup.value.find((item) => item.values === "external")?.groups.push(obj)
			}
		}
		// systemGroup.value = items;
	} catch (error) {
		console.log(error)
	}
}
onMounted(() => {
	userStore.getUserInfo()
	getAllApps()
})
</script>

<style lang="scss" scoped>
.empty {
	width: 100%;
	height: 100%;
	/* display: flex;
  justify-content: center;
  align-items: center; */
	margin: 0;
	height: 100%;
	background-color: #ffffff;
	text-align: center;
}
.homepage {
	width: 100%;
	height: 100vh;
	padding: 20px;
	box-sizing: border-box;
	.homepage-con {
		width: 100%;
		height: 100%;
		background: url("../assets//img/home/home-bg.png");
		background-size: cover;
		border-radius: 4px;
		padding: 70px 80px;
		box-sizing: border-box;
		.homepage-head {
			padding: 12px 16px;
			border-radius: 10px;
			border-image: linear-gradient(to right, var(--boke-color-success), var(--boke-color-main)) 1;
			// border: 1px solid var(--1, #30a7ff);
			background: rgba(242, 247, 254, 0.6);
			display: flex;
			justify-content: space-between;
			align-items: center;
			.head-user {
				display: flex;
				align-items: center;
				.head-img {
					height: 36px;
					width: auto;
					margin-right: 12px;
				}
			}
			.head-time {
				font-size: 14px;
				font-weight: 400;
			}
		}
	}
	.homepage-list {
		background: var(--boke-color-fff);
		border-radius: 10px;
		margin-top: 36px;
		padding: 30px 54px;
		box-sizing: border-box;
		.list {
			margin-bottom: 30px;
		}
		.list-title {
			font-size: 16px;
			font-style: normal;
			line-height: 24px;
			padding-left: 8px;
			color: var(--boke-color-text-title);
		}
		.list-content {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			gap: 0 87px;
			.list-item {
				width: 250px;
				margin-top: 30px;
				height: auto;
				border-radius: 10px;
				background: linear-gradient(90deg, #f1f6ff 0%, #f7fbff 100%);
				display: flex;
				align-items: center;
				gap: 12px;
				padding: 18px 14px;
				cursor: pointer;
				text-decoration: none;
				.item-img {
					height: 32px;
					width: 32px;
					line-height: 32px;
					border-radius: 6px;
					.iconfont {
						font-size: 28px;
					}
					img {
						width: 28px;
						height: 28px;
						margin: 2px 2px;
					}
				}
				.item-con {
					flex: 1;
				}
				.item-name {
					color: var(--boke-color-text-title);
					font-family: "PingFang SC";
					font-size: 14px;
					line-height: 22px;
				}
				.item-des {
					color: var(--boke-color-text-content);
					font-size: 14px;
					font-weight: 400;
					line-height: 22px; /* 157.143% */
				}
				.item-right {
					color: var(--boke-color-main);
					font-size: 22px;
				}
			}
		}
	}
}
</style>
