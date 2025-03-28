<template>
	<div class="head-video-wrapper">
		<div class="title">
			<img src="@/assets/images/head_logo.png" />
			<span class="line1">{{ text1 }}</span>
			<!--			<span class="line2">{{ text2 }}</span>-->
		</div>
		<div class="video-wrapper">
			<video loop muted="muted" autoplay="autoplay" playsinline :controls="false">
				<source src="@/assets/video/home.mp4" type="video/mp4" />
			</video>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import "./index.scss";
</style>
