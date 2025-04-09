<template>
	<div :class="['screen-one-wrapper', isMobile ? 'mo' : 'pc']">
		<div class="title">
			<img src="@/assets/images/head_logo.png" />
		</div>
		<div class="video-wrapper">
			<video loop :muted="true" :autoplay="true" playsinline :controls="false" ref="videoRef">
				<source src="@/assets/video/home.mp4" type="video/mp4" />
			</video>
		</div>
	</div>
</template>

<script setup lang="ts">
import useDevice from "@/hook/window";
import { onMounted, ref } from "vue";

const { isMobile } = useDevice();
const videoRef = ref();

onMounted(() => {
	videoRef.value.addEventListener("loadedmetadata", function () {
		const maxTime = Math.floor(videoRef.value.duration - 1); // 避免接近结尾
		videoRef.value.currentTime = Math.floor(Math.random() * maxTime); // 设置随机起始时间
		videoRef.value.play();
	});
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
