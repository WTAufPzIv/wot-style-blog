<template>
	<div class="md-viewer-wrapper" ref="mdViewerWrapper">
		<template v-if="text">
			<MdPreview
				class="global-md-previewer"
				ref="MdPreviewRef"
				theme="dark"
				:id="mdId"
				codeTheme="github"
				:codeFoldable="false"
				:modelValue="text"
			/>
			<div class="cat-wrapper">
				<MdCatalog class="mt14" :scrollElement="scrollElement" theme="dark" :editorId="mdId" />
			</div>
		</template>
		<template v-else>
			<BlogDetailSkeleton></BlogDetailSkeleton>
		</template>
	</div>
</template>

<script setup lang="ts">
import { MdCatalog, MdPreview } from "md-editor-v3";
import { nextTick, ref, watch } from "vue";
import BlogDetailSkeleton from "@/components/skeleton/blogDetailSkeleton.vue";

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
const mdViewerWrapper = ref();
const mdId = ref("blog-detail-viewer");

watch(
	() => props.text,
	newval => {
		if (newval) {
			nextTick(() => {
				mdViewerWrapper.value.querySelectorAll("a").forEach(a => {
					a.target = "_blank";
					a.rel = "noopener noreferrer"; // 防止安全漏洞
				});
			});
		}
	},
	{
		immediate: true
	}
);
</script>

<style scoped lang="scss">
.md-viewer-wrapper {
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: row;
	padding: 24px 12px;
	box-sizing: border-box;
}
.cat-wrapper {
	position: sticky;
	top: 0;
	right: 0;
	width: 300px;
	height: 50vh;
	overflow-y: scroll;
}
</style>
