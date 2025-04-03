<template>
	<div class="outter">
		<div class="inner" :style="{ alignItems: align }">
			<slot name="default"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		align: "flex-start" | "center" | "flex-end";
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
