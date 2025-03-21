<template>
	<div class="md-viewer-wrapper">
		<!--		<div class="cat-wrapper" v-if="showCat">-->
		<!--			<n-button size="small" :style="{ width: '80px' }" type="default" @click="showCat = false"> 关闭目录 </n-button>-->
		<!--			<MdCatalog class="mt14" :scrollElement="scrollElement" theme="dark" editorId="preview-only" />-->
		<!--		</div>-->
		<!--		<div class="cat-wrapper-open" v-if="!showCat">-->
		<!--			<n-button size="small" :style="{ width: '80px' }" type="default" @click="showCat = true"> 打开目录 </n-button>-->
		<!--		</div>-->
		<MdPreview
			ref="MdPreviewRef"
			:style="{ marginLeft: showCat ? '340px' : '0' }"
			:scrollElement="scrollElement"
			theme="dark"
			id="preview-only"
			codeTheme="github"
			:codeFoldable="false"
			:modelValue="text"
		/>
	</div>
</template>

<script setup lang="ts">
import { MdCatalog, MdPreview } from "md-editor-v3";
import { onMounted, ref } from "vue";

const props = withDefaults(
	defineProps<{
		text: string;
	}>(),
	{
		text: ""
	}
);

const scrollElement = document.documentElement;
const MdPreviewRef = ref();
const showCat = ref(false);

onMounted(() => {
	document.querySelectorAll("a").forEach(a => {
		a.target = "_blank";
		a.rel = "noopener noreferrer"; // 防止安全漏洞
	});
	console.log(MdPreviewRef.value.$el.toString());
});
</script>

<style scoped lang="scss">
.md-viewer-wrapper {
	width: 100%;
	flex: 1;
	overflow-y: scroll;
	display: flex;
	flex-direction: row;
	position: relative;
	padding: 24px 12px;
	box-sizing: border-box;
}
.cat-wrapper {
	width: 300px;
	height: 50vh;
	overflow-y: scroll;
	margin-right: 20px;
	padding: 0 10px;
	position: fixed;
}
.cat-wrapper-open {
	position: fixed;
	margin-left: -100px;
}
</style>
