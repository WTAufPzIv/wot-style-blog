<template>
	<div class="home-screen-two">
		<headVideo v-if="!isMobile"></headVideo>
		<headerCard :style="{ marginTop: isMobile ? '24px' : '28vw' }"></headerCard>
		<DevideTitle>最近文章</DevideTitle>
		<RecentBlog></RecentBlog>
		<DevideTitle>摄影图库</DevideTitle>
		<RecentImageBlog></RecentImageBlog>
	</div>
</template>

<script setup lang="ts">
import DevideTitle from "@/components/devideTitle/index.vue";
import headerCard from "@/components/headerCard/index.vue";
import RecentBlog from "@/components/recentBlog/index.vue";
import headVideo from "@/components/headerVideo/index.vue";
import RecentImageBlog from "@/components/recentImage/index.vue";
import useDevice from "@/hook/window";

const { isMobile } = useDevice();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
