<template>
	<common-wrapper>
		<IamgeBlogDetailSkeleton v-if="loading" class="pt20"></IamgeBlogDetailSkeleton>
		<div v-else></div>
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

async function fetchImageDetail() {
	loading.value = true;
	if (!route.query.imageId) return;
	const res: any = await getPhotographDetail({ id: route.query.imageId as string });
	loading.value = false;
}

onMounted(() => {
	fetchImageDetail();
});
</script>

<style scoped lang="scss"></style>
