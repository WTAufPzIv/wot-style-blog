<template>
	<div class="home-screen-two">
		<headVideo></headVideo>
		<headerCard :style="{ marginTop: '25.5vw' }"></headerCard>
		<DevideTitle>最近文章</DevideTitle>
		<RecentBlog></RecentBlog>
	</div>
</template>

<script setup lang="ts">
import DevideTitle from "@/components/devideTitle/index.vue";
import headerCard from "@/components/headerCard/index.vue";
import RecentBlog from "@/components/recentBlog/index.vue";
import headVideo from "@/components/headerVideo/index.vue";
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
