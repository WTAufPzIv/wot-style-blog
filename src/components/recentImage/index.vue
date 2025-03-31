<template>
	<div class="recent-wrapper">
		<div class="recent-imager-wrapper" :isMobile="isMobile">
			<div class="recent-imager-container">
				<transition appear mode="out-in" name="fade-transform">
					<div class="image-mask-bg" :key="currentUrl">
						<img :src="currentUrl" alt="" />
					</div>
				</transition>

				<div class="info-and-btn">
					<div class="info-line" :isMobile="isMobile">
						<p class="title">{{ imageBlogItem.title }}</p>
						<p class="time">{{ imageBlogItem.time }}</p>
						<p class="desc" v-if="!isMobile">{{ imageBlogItem.desc }}</p>
					</div>
					<div class="images-selector" :isMobile="isMobile">
						<n-carousel dotType="line" :slides-per-view="3" :space-between="20" :loop="false" draggable>
							<img
								v-for="item in imageBlogItem.images"
								class="carousel-img"
								:key="item"
								:src="item"
								alt=""
								:isSelected="item === currentUrl"
								@click="handleClickImage(item)"
							/>
						</n-carousel>
					</div>
				</div>
			</div>
		</div>
		<div class="more-btn mt20">
			<div class="common-button-default" @click="gotoBlogList">查看更多</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useDevice from "@/hook/window";

const { isMobile } = useDevice();
const imageBlogItem = {
	title: "这是一个标题",
	time: "2025-03-01",
	desc: "这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述这是一堆描述",
	images: [
		"https://huohuo90.com:3001/files/1740355578082.jpg",
		"https://huohuo90.com:3001/files/1731333989341.jpg",
		"https://huohuo90.com:3001/files/1740010419052.jpg",
		"https://huohuo90.com:3001/files/1740010419115.jpg"
	]
};
const currentUrl = ref(imageBlogItem.images[0]);

function handleClickImage(item: string) {
	currentUrl.value = item;
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
