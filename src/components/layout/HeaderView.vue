<template>
	<div class="header-wrapper">
		<tabs-item></tabs-item>
	</div>
</template>
<script setup>
import TabsItem from "./TabsItem.vue"
</script>
<style scoped>
.header-wrapper {
	height: 100%;
	padding-left: 268px;
}

.logo {
	float: left;
	min-width: 200px;
	padding: 0 10px;
	height: 60px;
	background-color: #fff;
	color: #fff;
	font-size: 16px;
	cursor: pointer;
	position: relative;
}

.logo :deep(img) {
	vertical-align: middle;
}

.collapse-icon-a {
	border: none;
	background-color: transparent;
	outline: none;
	cursor: pointer;
}

.urls {
	/* float: left; */
	position: fixed;
	left: 270px;
	margin-left: 5px;
	line-height: 60px;
	height: 60px;
	max-width: 1500px;
	min-width: 1000px;
	text-align: left;
}

.el-dropdown-link {
	cursor: pointer;
}

.url-options {
	position: fixed;
	right: 180px;
	/* display: inline-block; */
}

.url-options-menu {
	padding-inline-start: 0px;
	margin: 0;
}

.url-options-menu-item {
	list-style: none;
	/* border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1; */
	padding: 10px;
	cursor: pointer;
	text-align: center;
}

.url-options-menu-item:hover {
	background-color: #909399;
	color: #fff;
}

/* .user-menu-wrapper {
  background-color: #212d3e;
} */

.extra-menu {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
}

.user-menu {
	float: right;
	height: 60px;
	/* background-color: #212d3e; */
	color: #5f6b82;
	font-weight: bold;
	display: flex;
	padding-right: 15px;
}

.user-message-item {
	/* flex: 1; */
	line-height: 60px;
	height: 59px;
	max-width: 50px;
	padding: auto;
	font-size: 20px;
	cursor: pointer;
}

/* // .user-name-item {
//   flex: 1;
//   line-height: 60px;
//   margin-left: 10px;
// } */

.user-name-title {
	flex: 1;
	line-height: 60px;
	margin-left: 10px;
	color: #5f6b82;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
}

.user-header-img {
	min-width: 50px;
	/* 防止文本换行 */
	word-break: keep-all;
	white-space: nowrap;
}

.user-name {
	/* // width: 60px;
  // margin-right: 10px;
  // cursor: pointer;
  // min-width: 50px;
  // /* 防止文本换行 */
	/* // word-break: keep-all;
  // white-space: nowrap;   */
	cursor: pointer;
	/* // color: var(--el-color-primary); */
	display: flex;
	align-items: center;
	outline: none;
}
</style>
