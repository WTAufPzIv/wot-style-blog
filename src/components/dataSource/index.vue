<template>
	<div class="data-source-wrapper">
		<div class="line"></div>
		<p class="main-text">
			<span>数据来源：</span>
			<a v-if="url" :href="url" target="_blank">{{ urlName }}</a>
			<span href="" v-else>{{ urlName }}</span>
		</p>
		<div class="line"></div>
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		url?: string;
		urlName: string;
	}>(),
	{
		urlName: "-"
	}
);
</script>

<style scoped lang="scss">
.data-source-wrapper {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	.line {
		flex: 1;
		width: 100%;
		height: 1px;
		background: $common-font-color;
		opacity: 0.4;
	}
	p {
		color: $common-font-color;
		margin: 0 12px;
	}
}
</style>
