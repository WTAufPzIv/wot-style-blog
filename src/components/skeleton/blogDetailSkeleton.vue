<template>
	<div class="blog-detail-skeleton c-w-100">
		<n-skeleton height="80px" width="40%" />
		<n-skeleton text :repeat="3" height="40px" />
		<n-skeleton text height="40px" style="width: 60%" />
		<n-skeleton height="30px" width="35%" />
		<n-skeleton text :repeat="4" height="40px" width="80%" />
		<n-skeleton height="200px" width="30%" />
		<n-skeleton text height="40px" style="width: 80%" />
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
