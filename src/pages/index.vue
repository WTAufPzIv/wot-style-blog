<template>
	<div class="head-bar-for-homepage" :style="{ opacity: headBarOpacity, display: headBarDisplay }">
		<Header></Header>
	</div>
	<div id="fullpage" class="home-page-wrapper">
		<div class="section fullscreen-video">
			<div class="video-main-wrapper" :style="{ opacity: screenOneOpacity }">
				<HomeScreenOne />
			</div>
		</div>
		<div class="section content-container">
			<div class="content-main-wrapper" :style="{ opacity: screenTwoOpacity }">
				<HomeScreenTwo />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useHomePageRenderHook } from "./renderHook";
import HomeScreenOne from "@/components/homeScreenOne/index.vue";
import HomeScreenTwo from "@/components/homeScreenTwo/index.vue";
import Header from "@/components/header/index.vue";
import { onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";

let fpInstance: any = null;

const { headBarOpacity, headBarDisplay, screenOneOpacity, screenTwoOpacity, handleSectionChange } = useHomePageRenderHook();

async function initFullScreen() {
	const fullpageModule = await import("fullpage.js");
	const fullpage = fullpageModule?.default;
	if (fullpage) {
		fpInstance = new fullpage("#fullpage", {
			autoScrolling: true,
			scrollingSpeed: 1000,
			touchSensitivity: 10,
			keyboardScrolling: false,
			scrollOverflow: true,
			scrollBar: false,
			beforeLeave: handleSectionChange
		});
	}
}
onMounted(() => {
	initFullScreen();
});
// 监听通过浏览器返回按钮进入当前页面
onBeforeRouteLeave(async () => {
	fpInstance.destroy("all");
	fpInstance = null;
	console.log(6666666666);
});
</script>

<style scoped lang="scss">
.head-bar-for-homepage {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 99;
	transition: all 1s;
}
.home-page-wrapper {
	.fullscreen-video {
		width: 100vw;
		height: 100vh;
		.video-main-wrapper {
			width: 100vw;
			height: 100vh;
			transition: all 1s;
			position: relative;
			background: $common-bg;
		}
	}
	.content-container {
		width: 100vw;
		height: 100vh;
		padding-top: 78px;
		overflow-y: scroll;
		overflow-x: hidden;
		box-sizing: border-box;
		.content-main-wrapper {
			width: 100%;
			transition: all 1s;
			position: relative;
			background: $common-bg;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
}
</style>

<style>
.fp-watermark {
	display: none;
}
</style>
