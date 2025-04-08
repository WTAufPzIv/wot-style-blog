<template>
	<div class="c-w-100">
		<n-form ref="formRef" :model="formValue" class="c-w-100 mt30" label-placement="left" label-width="auto">
			<n-form-item label="ID" path="id">
				<n-input v-model:value="formValue.id" placeholder="id" disabled />
			</n-form-item>
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
			<n-form-item label="文档地址" path="mdUrl" :rule="[{ required: true, message: '请输入文档地址' }]">
				<n-input v-model:value="formValue.mdUrl" placeholder="文档地址" />
			</n-form-item>
			<n-form-item label="头图" path="headImage" :rule="[{ required: true, message: '请输入头图' }]">
				<n-input v-model:value="formValue.headImage" placeholder="头图" />
			</n-form-item>
			<n-form-item label="简视" path="miniDesc" :rule="[{ required: true, message: '请输入简视' }]">
				<n-input v-model:value="formValue.miniDesc" placeholder="简视" />
			</n-form-item>
			<n-form-item>
				<n-button type="primary" @click="handleSubmit" :loading="loading" :disabled="loading">提交修改</n-button>
			</n-form-item>
		</n-form>
	</div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

const props = withDefaults(
	defineProps<{
		id: string;
		title: string;
		createTime: any;
		category: string;
		headImage: string;
		miniDesc: string;
		mdUrl: string;
	}>(),
	{}
);

const formValue = reactive({
	id: "",
	title: "",
	createTime: undefined,
	category: "",
	headImage: "",
	miniDesc: "",
	mdUrl: ""
});

const loading = ref(false);

async function handleSubmit() {
	// const res = await formRef.value?.validate();
	// await addBlog({ ...formValue, mdUrl: markdownUrl.value } as any);
	// message.success("添加成功");
	// await sleep(1000);
	// location.reload();
}

onMounted(() => {
	formValue.id = props.id;
	formValue.title = props.title;
	formValue.createTime = props.createTime;
	formValue.category = props.category;
	formValue.headImage = props.headImage;
	formValue.miniDesc = props.miniDesc;
	formValue.mdUrl = props.mdUrl;
});
</script>

<style scoped lang="scss"></style>
