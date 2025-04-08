<template>
	<CommonWrapper>
		<MdViewer :text="renderText" ref="MdViewerRef"></MdViewer>
	</CommonWrapper>
</template>

<script setup lang="ts">
import CommonWrapper from "@/components/commonWrapper/index.vue";
import MdViewer from "@/components/mdViewer/index.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
import { useMessage } from "naive-ui";
import { useRoute } from "vue-router";

const renderText = ref("");
const message = useMessage();
const route = useRoute();
const MdViewerRef = ref();
const markdownUrl = decodeURIComponent((route.query.markdownUrl || "") as string);

async function handleFetchMdContent() {
	if (!markdownUrl) return;
	if (markdownUrl.startsWith("http")) {
		const res = await axios.get(markdownUrl);
		if (typeof res.data === "string") {
			renderText.value = res.data;
		} else {
			message.error("md文件解析失败");
		}
	} else {
		renderText.value = markdownUrl;
	}
}

onMounted(() => {
	handleFetchMdContent();
});
</script>

<style scoped lang="scss"></style>
