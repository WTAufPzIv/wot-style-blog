<template>
	<div class="c-w-100">
		<div v-if="!hasUpload" class="mt30">
			<n-input-group>
				<n-input v-model:value="markdownUrl" placeholder="请输入md文件地址" />
				<n-button type="primary" @click="handleFetchMdContent"> 获取并解析 </n-button>
			</n-input-group>
		</div>
		<div v-else>
			<n-form ref="formRef" :model="formValue" class="c-w-100 mt30" label-placement="left" label-width="auto">
				<n-form-item label="标题" path="title" :rule="[{ required: true, message: '请输入标题' }]">
					<n-input v-model:value="formValue.title" placeholder="标题" />
				</n-form-item>
				<n-form-item label="时间" path="createTime" :rule="[{ required: true }]">
					<n-date-picker
						class="c-w-100"
						value-format="yyyy-MM-dd HH:mm:ss"
						v-model:formatted-value="formValue.createTime"
						type="datetime"
						placeholder="时间"
						clearable
					/>
				</n-form-item>
				<n-form-item label="分类" path="category" :rule="[{ required: true, message: '请输入分类' }]">
					<n-input v-model:value="formValue.category" placeholder="分类" />
				</n-form-item>
				<n-form-item label="头图" path="headImage" :rule="[{ required: true, message: '请输入头图' }]">
					<n-input v-model:value="formValue.headImage" placeholder="头图" />
				</n-form-item>
				<n-form-item label="简视" path="miniDesc" :rule="[{ required: true, message: '请输入简视' }]">
					<n-input type="textarea" v-model:value="formValue.miniDesc" placeholder="简视" />
				</n-form-item>
				<n-form-item>
					<n-button type="primary" @click="handleSubmit" :loading="loading" :disabled="loading">提交博客</n-button>
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
import { addBlog } from "@/api/modules/main";
import { sleep } from "@/utils/common";

const hasUpload = ref(false);
const markdownUrl = ref(import.meta.env.VITE_GITHUB_PAGE_URL + "/mds/test.md");
const MdViewerRef = ref();
const renderText = ref("");
const message = useMessage();
const loading = ref(false);
const formRef = ref();
const formValue = reactive({
	title: "",
	createTime: undefined,
	category: "",
	headImage: import.meta.env.VITE_GITHUB_PAGE_URL + "/images/JustForTest.jpg",
	miniDesc: ""
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

async function handleSubmit() {
	const res = await formRef.value?.validate();
	await addBlog({ ...formValue, mdUrl: markdownUrl.value } as any);
	message.success("添加成功");
	await sleep(1000);
	location.reload();
}
</script>

<style scoped lang="scss"></style>
