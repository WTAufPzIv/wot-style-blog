<template>
	<div :class="['head-video-wrapper', isMobile ? 'mo' : 'pc']">
		<div class="title">
			<span class="line1">CURE FOR ME</span>
			<!--			<span class="line2">{{ text2 }}</span>-->
		</div>
		<div class="video-wrapper">
			<video loop muted="muted" autoplay="autoplay" playsinline :controls="false">
				<source src="@/assets/video/home.mp4" type="video/mp4" />
			</video>
		</div>
	</div>
</template>

<script setup lang="ts">
import useDevice from "@/hook/window";

const { isMobile } = useDevice();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
