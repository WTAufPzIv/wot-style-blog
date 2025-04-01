<template>
	<div class="c-w-100">
		<div v-if="!hasUpload" class="mt30">
			<n-input-group>
				<n-input v-model:value="markdownUrl" placeholder="请输入md文件地址" />
				<n-button type="primary" @click="handleFetchMdContent"> 获取并解析 </n-button>
			</n-input-group>
		</div>
		<div v-else>
			<n-form ref="formRef" inline :label-width="80" :model="formValue" class="c-w-100 mt30">
				<n-form-item label="标题" path="title">
					<n-input v-model:value="formValue.title" placeholder="标题" />
				</n-form-item>
				<n-form-item label="时间" path="user.age">
					<n-date-picker
						value-format="yyyy-MM-dd HH:mm:ss"
						v-model:formatted-value="formValue.createTime"
						type="datetime"
						clearable
					/>
				</n-form-item>
				<n-form-item label="分类" path="category">
					<n-input v-model:value="formValue.category" placeholder="分类" />
				</n-form-item>
				<n-form-item>
					<n-button type="primary" @click="handleSubmit">上传</n-button>
				</n-form-item>
			</n-form>
			<MdViewer :text="renderText" ref="MdViewerRef"></MdViewer>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useMessage } from "naive-ui";
import MdViewer from "@/components/mdViewer/index.vue";
import axios from "axios";

const hasUpload = ref(false);
const markdownUrl = ref("");
const MdViewerRef = ref();
const renderText = ref("");
const message = useMessage();
const formValue = reactive({
	title: undefined,
	createTime: undefined,
	category: undefined
});

async function handleFetchMdContent() {
	if (!markdownUrl.value) return;
	hasUpload.value = true;
	if (markdownUrl.value.startsWith("http")) {
		const res = await axios.get(markdownUrl.value);
		if (typeof res.data === "string") {
			renderText.value = res.data;
		} else {
			message.error("md文件解析失败");
		}
	} else {
		renderText.value = markdownUrl.value;
	}
}
</script>

<style scoped lang="scss"></style>
