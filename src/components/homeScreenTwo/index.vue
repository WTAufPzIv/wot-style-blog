<template>
	<headVideo v-if="!isMobile"></headVideo>
	<div class="home-screen-two">
		<headerCard :style="{ marginTop: isMobile ? '24px' : '26vw' }"></headerCard>
		<DevideTitle>最近文章</DevideTitle>
		<RecentBlog show-more :arrPayload="arrPayload"></RecentBlog>
		<DevideTitle>摄影图库</DevideTitle>
		<RecentImageBlog></RecentImageBlog>
	</div>
	<common-bottom></common-bottom>
</template>

<script setup lang="ts">
import DevideTitle from "@/components/devideTitle/index.vue";
import headerCard from "@/components/headerCard/index.vue";
import RecentBlog from "@/components/blogList/index.vue";
import headVideo from "@/components/headerVideo/index.vue";
import RecentImageBlog from "@/components/recentImage/index.vue";
import CommonBottom from "@/components/bottom/index.vue";
import useDevice from "@/hook/window";
import { onMounted, ref } from "vue";
import { getBlogList } from "@/api/modules/main";

const { isMobile } = useDevice();
const arrPayload = ref();

async function fetchRecenttBlog() {
	const res = await getBlogList({
		pageSize: 9,
		pageIndex: 1
	});
	arrPayload.value = res.data.data;
}

onMounted(() => {
	// 最近文章
	fetchRecenttBlog();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
