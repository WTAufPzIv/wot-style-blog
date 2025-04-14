<template>
	<CommonWrapper>
		<BlogDetailSkeleton v-if="loading" class="mt30"></BlogDetailSkeleton>
		<div class="html-parser-page-wrapper" v-else>
			<div v-html="renderHtml"></div>
		</div>
	</CommonWrapper>
</template>

<script setup lang="ts">
import CommonWrapper from "@/components/commonWrapper/index.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
import { useMessage } from "naive-ui";
import { useRoute } from "vue-router";
import BlogDetailSkeleton from "@/components/skeleton/blogDetailSkeleton.vue";

const route = useRoute();
const url = decodeURIComponent(route.query.url as string);
const message = useMessage();
const renderHtml = ref("");
const loading = ref(false);

onMounted(async () => {
	if (!url) return;
	loading.value = true;
	const res = await axios.get(url);
	if (typeof res.data === "string") {
		renderHtml.value = res.data;
	} else {
		message.error("html文件解析失败");
	}
	loading.value = false;
});
</script>

<style scoped lang="scss">
.html-parser-page-wrapper {
	width: 100%;
	color: $common-font-color;
}
</style>

<style lang="scss">
.h1 {
	font-size: 2em;
	margin: 1.4em 0 0.8em 0;
	line-height: 1.5;
}
.a2 {
	font-size: 20px;
	color: #00c852;
}
.a6 {
	font-size: 20px;
}
.a4 {
	font-size: 16px;
	color: #b8b8a2;
	line-height: 1.9;
	margin: 0.5rem 0;
}
</style>
