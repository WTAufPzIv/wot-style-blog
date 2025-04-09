<template>
	<div class="recent-wrapper" v-if="imageBlogItem">
		<div class="recent-imager-wrapper" :isMobile="isMobile">
			<div class="recent-imager-container">
				<transition appear mode="out-in" name="fade-transform">
					<div class="image-mask-bg" :key="currentUrl">
						<img :src="currentUrl" alt="" />
					</div>
				</transition>

				<div class="info-and-btn">
					<div class="info-line" :isMobile="isMobile">
						<p class="title">{{ imageBlogItem?.title }}</p>
						<p class="time">{{ imageBlogItem?.createTime }}</p>
						<p class="desc" v-if="!isMobile">{{ imageBlogItem?.content }}</p>
					</div>
					<div class="images-selector" :isMobile="isMobile">
						<n-carousel dotType="line" :slides-per-view="3" :space-between="20" :loop="false" draggable>
							<img
								v-for="item in imageBlogItem?.images"
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
import { onMounted, ref } from "vue";
import useDevice from "@/hook/window";
import { getPhotographlist } from "@/api/modules/main";
import { useRouter } from "vue-router";

const { isMobile } = useDevice();
const currentUrl = ref();
const imageBlogItem = ref();
const router = useRouter();

function handleClickImage(item: string) {
	currentUrl.value = item;
}

function gotoBlogList() {
	router.push({
		path: "/imageBlog"
	});
}

async function fetchRecentIamge() {
	const res: any = await getPhotographlist();
	imageBlogItem.value = res.data[0];
	currentUrl.value = res.data[0].images[0];
}

onMounted(() => {
	fetchRecentIamge();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
