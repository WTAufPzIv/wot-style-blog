<template>
	<div class="general-cook-wrapper">
		<div v-for="item in generalKnowledge" class="item-wrapper" :isMobile="isMobile" :key="item.title">
			<div class="item-container">
				<img :src="getRealUrl(item.image, imageBasePath)" alt="" />
				<div class="item-text">
					<span>{{ item.title }}</span>
					<n-button type="primary" :style="{ width: 'max-content' }" class="mt12" @click="gotoBlogDetail(item.path)"
						>查看</n-button
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { generalKnowledge } from "./const";
import useDevice from "@/hook/window";
import { useRouter } from "vue-router";

const { isMobile } = useDevice();
const mdBasePath = import.meta.env.VITE_GITHUB_PAGE_URL + "/cook/tips/learn/";
const imageBasePath = import.meta.env.VITE_GITHUB_PAGE_URL + "/images/cook/";
const router = useRouter();

function getRealUrl(path, basePath) {
	return new URL(path, basePath).href;
}

function gotoBlogDetail(path) {
	router.push({
		path: "/blogDetail",
		query: {
			markdownUrl: encodeURIComponent(getRealUrl(path, mdBasePath))
		}
	});
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
