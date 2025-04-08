<template>
	<div class="outter" id="common-wrapper-outter">
		<div class="head-bar">
			<Header></Header>
		</div>
		<div class="inner" :style="{ alignItems: align }">
			<slot name="default"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import Header from "@/components/header/index.vue";

const props = withDefaults(
	defineProps<{
		align?: "flex-start" | "center" | "flex-end";
	}>(),
	{
		align: "flex-start"
	}
);
</script>

<style scoped lang="scss">
.outter {
	position: relative;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 78px;
	box-sizing: border-box;
	overflow-x: hidden;
	overflow-y: scroll;
}
.inner {
	width: 100%;
	max-width: 1280px;
	display: flex;
	flex-direction: column;
	padding: 12px;
	box-sizing: border-box;
}
</style>
