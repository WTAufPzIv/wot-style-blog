<template>
	<div>
		<div v-if="!hasUpload" class="c-w-50 mt30">
			<input type="file" accept=".md" v-show="false" ref="uploadInputRef" @change="handleFileChange" />
			<n-button type="primary" size="large" @click="handeStartUnload">上传MarkDowm文件</n-button>
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
			<MdViewer :text="hasUpload" ref="MdViewerRef"></MdViewer>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useMessage } from "naive-ui";
import MdViewer from "@/components/mdViewer/index.vue";

const hasUpload = ref("");
const uploadInputRef = ref();
const MdViewerRef = ref();
const message = useMessage();
const formValue = reactive({
	title: undefined,
	createTime: undefined,
	category: undefined
});

function handeStartUnload() {
	uploadInputRef.value.click();
}

function handleSubmit() {
	console.log(formValue);
	console.log(MdViewerRef.value.$el.outerHTML);
}

function handleFileChange(e) {
	const file = e.target.files[0];
	if (!file.name.endsWith(".md")) {
		message.error("请上传.md文件");
		return;
	}
	const reader = new FileReader();
	reader.onload = res => {
		hasUpload.value = (res.target?.result as string) || ""; // 存储为字符串
		console.log(res.target);
	};
	reader.readAsText(file); // 以文本格式读取
}
</script>

<style scoped lang="scss"></style>
