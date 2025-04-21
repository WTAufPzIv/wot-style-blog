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

function resolveImageUrls(markdownContent, baseUrl) {
	// 使用正则表达式匹配所有图片路径
	const regex = /!\[.*\]\((.*)\)/g;
	let match;
	// 处理所有图片链接
	while ((match = regex.exec(markdownContent)) !== null) {
		let imagePath = match[1];

		// 如果是相对路径，处理它
		if (imagePath.startsWith("./") || imagePath.startsWith("../")) {
			try {
				// 解析基础 URL 和相对路径，生成真实路径
				const imageUrl = new URL(imagePath, baseUrl);
				// 用真实路径替换 Markdown 中的相对路径
				markdownContent = markdownContent.replace(imagePath, imageUrl.href);
			} catch (error: any) {
				// 如果路径超出限制或其他错误，抛出异常
				throw new Error(`无法处理图片路径: ${imagePath}. 错误: ${error.message}`);
			}
		}
	}

	return markdownContent;
}

async function handleFetchMdContent() {
	if (!markdownUrl) return;
	if (markdownUrl.startsWith("http")) {
		const res = await axios.get(markdownUrl);
		if (typeof res.data === "string") {
			renderText.value = resolveImageUrls(res.data, markdownUrl);
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
