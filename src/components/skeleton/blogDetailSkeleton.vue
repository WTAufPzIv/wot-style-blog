<template>
	<div class="blog-detail-skeleton c-w-100">
		<n-skeleton height="40px" width="40%" />
		<n-skeleton text :repeat="3" />
		<n-skeleton text style="width: 60%" />
		<n-skeleton height="30px" width="35%" />
		<n-skeleton text :repeat="6" />
		<n-skeleton height="100px" width="20%" />
		<n-skeleton text style="width: 80%" />
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
