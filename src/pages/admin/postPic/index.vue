<template>
	<div class="c-w-100">
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
			<n-form-item label="正文" path="content" :rule="[{ required: true, message: '请输入正文' }]">
				<n-input type="textarea" v-model:value="formValue.content" placeholder="正文" />
			</n-form-item>
			<n-form-item label="图片" path="images" :rule="[{ required: true, message: '请输入图片' }]">
				<n-dynamic-input v-model:value="formValue.images" show-sort-button placeholder="请输入图片" />
			</n-form-item>
			<n-form-item>
				<n-button type="primary" @click="handleSubmit" :loading="loading" :disabled="loading">提交图文</n-button>
			</n-form-item>
		</n-form>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { addPhotograph } from "@/api/modules/main";
import { sleep } from "@/utils/common";
import { useMessage } from "naive-ui";

const formValue = reactive({
	title: "",
	createTime: undefined,
	content: "",
	images: []
});

const loading = ref(false);
const formRef = ref();
const message = useMessage();

async function handleSubmit() {
	const res = await formRef.value?.validate();
	await addPhotograph({ ...formValue } as any);
	message.success("添加成功");
	await sleep(1000);
	location.reload();
}
</script>

<style scoped lang="scss"></style>
