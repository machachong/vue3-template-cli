<template>
	<layout-card>
		<template #content>
			<div class="homeview">
				<img
					class="homeview"
					v-show="isDark"
					src="@/assets/img/home/home-welcome-dark.png"
					alt=""
				/>

				<img
					class="homeview"
					v-show="!isDark"
					src="@/assets/img/home/home-welcome-light.png"
					alt=""
				/>

				<section class="homeview-text">
					<p class="homeview-title">欢迎来到</p>

					<p class="homeview-title">日志审计系统</p>

					<p class="homeview-describee"> 内部业务相关的详细日志整合， </p>

					<p class="homeview-describe"> 您可以在此处查看各类数据报表以及相关审计信息。 </p>
				</section>
			</div>
		</template>
	</layout-card>
</template>
<script setup>
import { isDark } from "@/composables"
</script>

<style scope lang="scss">
.homeview {
	/* display: flex;































































  justify-content: center;































































  align-items: center; */

	margin: 0;

	text-align: right;

	height: calc(100vh - 120px);

	width: auto;

	position: relative;

	.homeview-text {
		position: absolute;

		left: 150px;

		top: 200px;

		text-align: left;

		.homeview-title {
			font-size: 30px;

			margin-bottom: 20px;
		}

		.homeview-describee {
			font-size: 16px;

			line-height: 30px;
		}
	}
}
</style>
