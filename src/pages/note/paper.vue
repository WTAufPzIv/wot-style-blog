<template>
	<div class="paper-container">
		<div class="paper-content">
			<p class="handwriting-font">{{ text }}</p>
		</div>
	</div>
	<div class="paper-image">
		<div v-for="(img, index) in images" :key="index" :class="images.length === 1 ? 'single' : 'multi'">
			<n-image class="img-content" :src="img" />
		</div>
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		text: string;
		images: string[];
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
.paper-image {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	width: 70%;
	margin-top: 12px;
	.single {
		width: 100%;
		padding: 12px;
		box-sizing: border-box;
		overflow: hidden;
		:deep(.n-image) {
			width: 100%;
			border-radius: 4px;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
	.multi {
		width: 33.33%;
		aspect-ratio: 1/1;
		overflow: hidden;
		padding: 4px;
		box-sizing: border-box;
		:deep(.n-image) {
			width: 100%;
			height: 100%;
			border-radius: 4px;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
}
</style>
