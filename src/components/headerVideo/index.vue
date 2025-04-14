<template>
	<div :class="['head-video-wrapper', isMobile ? 'mo' : 'pc']">
		<div class="title">
			<p class="line1">一万年太久，只争朝夕！</p>
			<div class="more-btn mt20">
				<div class="common-button-default" @click="gotoMao">每日毛选</div>
			</div>
		</div>
		<div class="video-wrapper">
			<!--			<video loop :muted="true" :autoplay="true" playsinline :controls="false">-->
			<!--				<source src="@/assets/video/home.mp4" type="video/mp4" />-->
			<!--			</video>-->
		</div>
	</div>
</template>

<script setup lang="ts">
import useDevice from "@/hook/window";
import { useRouter } from "vue-router";

const { isMobile } = useDevice();
const router = useRouter();

function gotoMao() {
	router.push({
		path: "/htmlPar",
		query: {
			url: encodeURIComponent(
				"https://obj261.asia/wot-style-blog/mao/%E7%AC%AC%E4%B8%83%E5%8D%B7%EF%BC%88%E9%9D%99%E7%81%AB%E7%89%88%EF%BC%89_%E6%96%87%E5%8C%96%E5%A4%A7%E9%9D%A9%E5%91%BD%E6%97%B6%E6%9C%9F_%E4%B8%AD%E5%9B%BD%E5%85%B1%E4%BA%A7%E5%85%9A%E4%B8%AD%E5%A4%AE%E5%A7%94%E5%91%98%E4%BC%9A%E5%85%B3%E4%BA%8E%E6%97%A0%E4%BA%A7%E9%98%B6%E7%BA%A7%E6%96%87%E5%8C%96%E5%A4%A7%E9%9D%A9%E5%91%BD%E7%9A%84%E5%86%B3%E5%AE%9A.html"
			)
		}
	});
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
