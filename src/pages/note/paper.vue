<template>
	<div class="paper-container">
		<div class="paper-content">
			<p class="handwriting-font">{{ text }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		text: string;
	}>(),
	{
		text: ""
	}
);
</script>

<style scoped lang="scss">
.paper-container {
	background:
		/* 横线背景 */ linear-gradient(to bottom, transparent 95%, rgba(0, 0, 0, 0.1) 90%),
		/* 信纸纹理 */ url("data:image/png;base64,iVBORw0...") repeat;
	background-size: 100% 36px, auto;
	box-sizing: border-box;
}

.handwriting-font {
	margin: 0;
	border: none;
	background: transparent;
	line-height: 2;
	resize: none;
	width: 100%;
	font-family: "楷体", cursive;
	font-size: 18px;
	color: #000;
}
</style>
