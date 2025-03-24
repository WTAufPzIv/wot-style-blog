<template>
	<div class="dialog-wrapper">
		<div class="image-detail-wrapper">
			<div class="header" :isMobile="isMobile">
				<p class="title">{{ title }}</p>
				<p class="time">{{ time }}</p>
			</div>
			<div class="text-list-wrapper" :isMobile="isMobile">
				<div v-for="item in text" :key="item" class="text-item">
					<p>{{ item }}</p>
				</div>
			</div>
			<div class="text-list-wrapper">
				<n-image
					:previewedImgProps="{ style: { width: '98vw' } }"
					width="100%"
					v-for="item in images"
					:key="item"
					class="image-item"
					:src="item"
					alt=""
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import useDevice from "@/hook/window";

const props = withDefaults(
	defineProps<{
		title: string;
		text: string[];
		images: string[];
		time: string;
	}>(),
	{}
);

const { isMobile } = useDevice();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
