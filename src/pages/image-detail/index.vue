<template>
	<common-wrapper>
		<IamgeBlogDetailSkeleton v-if="loading" class="pt20"></IamgeBlogDetailSkeleton>
		<div v-else class="image-main-wrapper">
			<p class="title">{{ imageInfo?.title }}</p>
			<p class="time">{{ imageInfo?.createTime }}</p>
			<div class="content-box">
				<p>{{ imageInfo?.content }}</p>
			</div>
			<div class="image-box" v-for="item in imageInfo?.images || []" :key="item">
				<img :src="item" alt="" />
			</div>
		</div>
	</common-wrapper>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CommonWrapper from "@/components/commonWrapper/index.vue";
import { getPhotographDetail } from "@/api/modules/main";
import { useRoute } from "vue-router";
import IamgeBlogDetailSkeleton from "@/components/skeleton/imageDetail.vue";

const loading = ref(false);
const route = useRoute();
const imageInfo = ref();

async function fetchImageDetail() {
	loading.value = true;
	if (!route.query.imageId) return;
	const res: any = await getPhotographDetail({ id: Number(route.query.imageId as string) });
	imageInfo.value = res.data;
	loading.value = false;
}

onMounted(() => {
	fetchImageDetail();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
