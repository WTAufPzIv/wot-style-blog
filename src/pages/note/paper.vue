<template>
	<div class="back"></div>
	<div class="top" :isMobile="isMobile">
		<div class="paper-container">
			<div class="paper-content">
				<p class="handwriting-font">{{ text }}</p>
			</div>
		</div>
		<div class="paper-image" :isMobile="isMobile">
			<div v-for="(img, index) in images" :key="index" :class="images.length === 1 ? 'single' : 'multi'">
				<n-image class="img-content" :src="img" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import useDevice from "@/hook/window";

const props = withDefaults(
	defineProps<{
		text: string;
		images: string[];
	}>(),
	{
		text: ""
	}
);

const { isMobile } = useDevice();
</script>

<style scoped lang="scss">
@import "./paper.scss";
</style>
