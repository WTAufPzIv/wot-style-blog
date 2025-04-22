<template>
	<div class="md-viewer-wrapper" ref="mdViewerWrapper">
		<BlogDetailSkeleton v-if="!text"></BlogDetailSkeleton>
		<n-collapse-transition :show="!!text">
			<MdPreview
				class="global-md-previewer"
				ref="MdPreviewRef"
				theme="dark"
				:id="mdId"
				codeTheme="github"
				:codeFoldable="false"
				:modelValue="text"
				:scrollElement="scrollElement"
				:mdHeadingId="mdHeadingId"
			/>
			<div class="cat-wrapper" v-if="!isMobile">
				<MdCatalog class="mt14" :scrollElement="scrollElement" theme="dark" :editor-id="mdId" :mdHeadingId="mdHeadingId" />
			</div>
		</n-collapse-transition>
	</div>
</template>

<script setup lang="ts">
import { MdCatalog, MdPreview } from "md-editor-v3";
import { nextTick, onMounted, ref, watch } from "vue";
import BlogDetailSkeleton from "@/components/skeleton/blogDetailSkeleton.vue";
import useDevice from "@/hook/window";

const props = withDefaults(
	defineProps<{
		text: string;
	}>(),
	{
		text: ""
	}
);

const scrollElement = ref();
const MdPreviewRef = ref();
const mdViewerWrapper = ref();
const { isMobile } = useDevice();
const mdId = "blog-detail-viewer";
const mdHeadingId = (_text, level, index) => `heading-${level}-${index}`;

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

onMounted(() => {
	scrollElement.value = document.querySelector("#common-wrapper-outter");
});
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
