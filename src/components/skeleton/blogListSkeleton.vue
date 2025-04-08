<template>
	<div class="blog-detail-skeleton c-w-100">
		<div class="filter-wrapper mt20" v-if="!onlyList">
			<n-skeleton class="mr20" :width="300" :sharp="false" size="large" />
			<n-skeleton class="mr20" :width="300" size="large" />
			<n-skeleton class="mr20" :width="300" size="large" />
			<div :style="{ flex: '1' }"></div>
			<n-skeleton :width="100" size="large" />
		</div>
		<div class="list-wrapper mt20 c-w-100">
			<div class="list-item"><n-skeleton height="270px" /></div>
			<div class="list-item"><n-skeleton height="270px" /></div>
			<div class="list-item"><n-skeleton height="270px" /></div>
			<div class="list-item"><n-skeleton height="270px" /></div>
			<div class="list-item"><n-skeleton height="270px" /></div>
			<div class="list-item"><n-skeleton height="270px" /></div>
			<div class="list-item"><n-skeleton height="270px" /></div>
			<div class="list-item"><n-skeleton height="270px" /></div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		onlyList?: boolean;
	}>(),
	{
		onlyList: false
	}
);
</script>

<style scoped lang="scss">
.blog-detail-skeleton {
}
.filter-wrapper {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	:deep(.n-skeleton) {
		margin-bottom: 12px;
	}
}
.list-wrapper {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	flex-wrap: wrap;
	.list-item {
		width: 50%;
		padding: 8px;
		box-sizing: border-box;
	}
}
.page-wrapper {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}
</style>
