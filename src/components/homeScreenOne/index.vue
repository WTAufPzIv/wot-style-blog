<template>
	<div :class="['screen-one-wrapper', isMobile ? 'mo' : 'pc']">
		<div class="title">
			<img src="@/assets/images/head_logo.png" />
			<!--			<span class="line1">{{ text1 }}</span>-->
			<!--			&lt;!&ndash;			<span class="line2">{{ text2 }}</span>&ndash;&gt;-->
		</div>
		<div class="video-wrapper">
			<video loop :muted="true" :autoplay="true" playsinline :controls="false">
				<source src="@/assets/video/home.mp4" type="video/mp4" />
			</video>
		</div>
	</div>
</template>

<script setup lang="ts">
import useDevice from "@/hook/window";
import { ref } from "vue";

const { isMobile } = useDevice();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
