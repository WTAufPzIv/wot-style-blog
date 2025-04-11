<template>
	<div class="c-w-100">
		<n-form ref="formRef" :model="formValue" class="c-w-100 mt30" label-placement="left" label-width="auto">
			<n-form-item label="ID" path="id">
				<n-input disabled v-model:value="formValue.id" placeholder="ID" />
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
		</n-form>
		<div class="c-w-100 mt10 bottom-wrapper">
			<n-button type="primary" @click="handleSubmit" :loading="loading" :disabled="loading">提交修改</n-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { sleep } from "@/utils/common";
import { editNote } from "@/api/modules/main";

const props = withDefaults(
	defineProps<{
		id: string;
		createTime: any;
		content: string;
		images: any;
	}>(),
	{}
);

const formValue = reactive({
	id: "",
	createTime: undefined,
	content: "",
	images: []
});

const loading = ref(false);
const formRef = ref();

async function handleSubmit() {
	await formRef.value?.validate();
	await editNote({ ...formValue } as any);
	await sleep(1000);
	location.reload();
}

onMounted(() => {
	console.log(props);
	formValue.id = props.id;
	formValue.createTime = props.createTime;
	formValue.content = props.content;
	formValue.images = props.images;
});
</script>

<style scoped lang="scss">
.bottom-wrapper {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
</style>
