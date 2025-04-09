<template>
	<div class="blog-detail-skeleton c-w-100">
		<n-skeleton height="60px" width="40%" />
		<n-skeleton height="40px" width="60%" />
		<n-skeleton text height="300px" width="100%" />
		<n-skeleton text height="600px" width="100%" />
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.blog-detail-skeleton {
	:deep(.n-skeleton) {
		margin-bottom: 12px;
	}
}
</style>
