<template>
	<div class="dialog-wrapper">
		<div class="image-detail-wrapper">
			<div class="header" :isMobile="isMobile">
				<p class="title">{{ title }}</p>
				<p class="time">朝代：{{ text1 || "无数据" }}</p>
				<p class="time">时期：{{ text2 || "无数据" }}</p>
				<p class="time">类型：{{ text3 || "无数据" }}</p>
				<p class="time">出版：{{ text4 || "无数据" }}</p>
				<p class="time">入库：{{ text5 || "无数据" }}年</p>
			</div>
			<div class="text-list-wrapper mt10">
				<n-image
					:previewedImgProps="{ style: { height: '90vh' } }"
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
		text1: string;
		text2: string;
		text3: string;
		text4: string;
		text5: string;
		images: string[];
	}>(),
	{}
);

const { isMobile } = useDevice();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
