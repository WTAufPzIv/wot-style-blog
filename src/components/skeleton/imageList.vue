<template>
	<div class="blog-detail-skeleton c-w-100" :isMobile="isMobile">
		<div class="list-wrapper mt20 c-w-100">
			<div class="list-item"><n-skeleton height="100%" /></div>
			<div class="list-item"><n-skeleton height="100%" /></div>
			<div class="list-item"><n-skeleton height="100%" /></div>
			<div class="list-item"><n-skeleton height="100%" /></div>
			<div class="list-item"><n-skeleton height="100%" /></div>
			<div class="list-item"><n-skeleton height="100%" /></div>
			<div class="list-item"><n-skeleton height="100%" /></div>
			<div class="list-item"><n-skeleton height="100%" /></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import useDevice from "@/hook/window";

const props = withDefaults(
	defineProps<{
		onlyList?: boolean;
	}>(),
	{
		onlyList: false
	}
);

const { isMobile } = useDevice();
</script>

<style scoped lang="scss">
.blog-detail-skeleton {
	&[isMobile="true"] {
		.list-item {
			width: 100%;
			aspect-ratio: 2/1;
		}
	}
	&[isMobile="false"] {
		.list-item {
			width: 25%;
			aspect-ratio: 1/1.5;
		}
	}
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
	justify-content: flex-start;
	align-items: flex-start;
	flex-wrap: wrap;
	.list-item {
		padding: 8px;
		box-sizing: border-box;
		aspect-ratio: 1/1.5;
	}
}
</style>
