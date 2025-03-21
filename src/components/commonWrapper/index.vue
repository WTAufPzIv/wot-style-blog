<template>
	<div class="outter">
		<div class="inner">
			<slot name="default"></slot>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.outter {
	position: relative;
	width: 100vw;
	height: calc(100vh - 78px);
	display: flex;
	flex-direction: column;
	align-items: center;
}
.inner {
	width: 100%;
	max-width: 1280px;
}
</style>
