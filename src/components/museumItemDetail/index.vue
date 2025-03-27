<template>
	<div class="dialog-wrapper">
		<n-carousel show-arrow>
			<n-image
				:previewedImgProps="{ style: { height: '90vh' } }"
				v-for="item in images"
				:key="item"
				class="image-item"
				:src="item"
				alt=""
			/>
			<template #arrow="{ prev, next }">
				<div class="custom-arrow">
					<button type="button" class="custom-arrow--left" @click="prev">
						<n-icon><ArrowBack /></n-icon>
					</button>
					<button type="button" class="custom-arrow--right" @click="next">
						<n-icon><ArrowForward /></n-icon>
					</button>
				</div>
			</template>
			<template #dots="{ total, currentIndex, to }">
				<ul class="custom-dots">
					<li v-for="index of total" :key="index" :class="{ ['is-active']: currentIndex === index - 1 }" @click="to(index - 1)" />
				</ul>
			</template>
		</n-carousel>
		<div class="image-detail-wrapper">
			<div class="header" :isMobile="isMobile">
				<p class="title">{{ title }}</p>
				<p class="time">朝代：{{ text1 || "无数据" }}</p>
				<p class="time">时期：{{ text2 || "无数据" }}</p>
				<p class="time">类型：{{ text3 || "无数据" }}</p>
				<p class="time">出版：{{ text4 || "无数据" }}</p>
				<p class="time">入库：{{ text5 || "无数据" }}年</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import useDevice from "@/hook/window";
import { ArrowBack, ArrowForward } from "@vicons/ionicons5";

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
