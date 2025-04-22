<template>
	<n-form
		:inline="!isMobile"
		ref="formRef"
		:model="formValue"
		class="c-w-100 mt10"
		label-placement="left"
		label-width="auto"
		:size="isMobile ? 'small' : 'large'"
	>
		<n-form-item label="标题" path="keyword" :style="{ width: isMobile ? '100%' : '300px' }">
			<n-input v-model:value="formValue.keywords" clearable placeholder="标题" />
		</n-form-item>
		<n-form-item label="分类" path="category" :style="{ width: isMobile ? '100%' : '300px' }">
			<n-select class="c-w-100" clearable placeholder="分类" v-model:value="formValue.category" :options="cateOptions" />
		</n-form-item>
		<n-form-item label="难度" path="difficult" :style="{ width: isMobile ? '100%' : '300px' }">
			<n-select class="c-w-100" clearable placeholder="难度" v-model:value="formValue.difficult" :options="diffOptions" />
		</n-form-item>
	</n-form>
</template>

<script setup lang="tsx">
import { Search } from "@vicons/ionicons5";
import useDevice from "@/hook/window";
import { ref } from "vue";
import cookMenu from "@/assets/result";
import { useTable } from "./colums";

const { formValue } = useTable();
const { isMobile } = useDevice();
const cateOptions = ref(
	Array.from(new Set(cookMenu.map(item => item.cat))).map(item => {
		return { label: item, value: item };
	})
);
const diffOptions = ref(
	Array.from(new Set(cookMenu.map(item => item.star))).map(item => {
		return { label: item + "颗星", value: item };
	})
);

function handleSubmit() {}
</script>

<style scoped lang="scss"></style>
