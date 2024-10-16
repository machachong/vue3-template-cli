<template>
	<!-- 我是登陆页面
  <a :href="redirectToBoke()"> 飞书登录验证</a> -->
	<div class="my-login" v-if="showLogin">
		<div class="my-login-window">
			<div class="my-login-content">
				<div class="my-login-title">
					<h1>日志审计</h1>
				</div>
				<div class="my-login-button">
					<button class="btn-primary-plain" type="button">
						<!-- @click="redirectToBoke()"           -->
						<span>飞书快速登录</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import settings from "@/utils/config/settings"
import { useRoute } from "vue-router"
import { onBeforeMount } from "vue"

export default {
	name: "Login-page",
	setup() {
		const route = useRoute()

		const showLogin = false
		function redirectToBoke() {
			const to = route.query.to ? route.query.to : ""
			let url =
				settings.REDIRECT_URL + "?appId=" + settings.APP_ID + "&extra=" + encodeURIComponent(to)
			window.location.href = url
			// return url;
		}

		// 跳转到登录中心
		function redirectToLogin() {
			const loginUrl = settings.LOGIN_URL
			const to = route.query.to ? route.query.to : ""
			const redirectUrl = settings.BASE_URL + to
			window.location.href = `${loginUrl}?to=` + redirectUrl
		}

		onBeforeMount(() => {
			if (!showLogin) {
				redirectToLogin()
			}
		})

		return { showLogin, redirectToBoke }
	}
}
</script>
