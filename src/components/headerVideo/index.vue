<template>
	<div :class="['head-video-wrapper', isMobile ? 'mo' : 'pc']" :isMobile="isMobile">
		<div class="title">
			<p class="line1" :isMobile="isMobile">一万年太久，只争朝夕！</p>
			<div class="more-btn mt20">
				<div class="common-button-default" @click="gotoMao">每日毛选</div>
			</div>
		</div>
		<div class="video-wrapper">
			<video loop :muted="true" :autoplay="true" playsinline :controls="false">
				<source src="@/assets/video/mao.mp4" type="video/mp4" />
			</video>
		</div>
	</div>
</template>

<script setup lang="ts">
import useDevice from "@/hook/window";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { getMaoOfData } from "@/api/modules/main";

const { isMobile } = useDevice();
const router = useRouter();
const fileName = ref<any>("");

function gotoMao() {
	router.push({
		path: "/htmlPar",
		query: {
			url: encodeURIComponent(import.meta.env.VITE_GITHUB_PAGE_URL + `/mao/${fileName.value}`)
		}
	});
}

async function fetchModData() {
	const res = await getMaoOfData();
	fileName.value = res.data;
}

onMounted(() => {
	fetchModData();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
