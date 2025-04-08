<template>
	<n-form inline ref="formRef" :model="formValue" class="c-w-100 mt30" label-placement="left" label-width="auto" size="large">
		<n-form-item label="标题" path="keyword">
			<n-input v-model:value="formValue.keywords" clearable placeholder="标题" />
		</n-form-item>
		<n-form-item label="时间" path="createTime">
			<n-date-picker
				class="c-w-100"
				value-format="yyyy-MM-dd"
				v-model:formatted-value="formValue.createTime"
				type="date"
				placeholder="时间"
				clearable
			/>
		</n-form-item>
		<n-form-item label="分类" path="category">
			<n-cascader
				v-model:value="formValue.category"
				placeholder="分类"
				expand-trigger="hover"
				:options="cateOptions"
				ref="cascaderRef"
				check-strategy="all"
				show-path
				clearable
				filterable
			/>
		</n-form-item>
		<n-form-item :style="{ width: '150px' }">
			<n-button class="c-w-100" type="primary" @click="handleSubmit">
				<template #default>
					<span class="ml10">搜索</span>
				</template>
				<template #icon>
					<n-icon><Search /></n-icon>
				</template>
			</n-button>
		</n-form-item>
	</n-form>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { Search } from "@vicons/ionicons5";
import { cloneDeep } from "lodash";
import { getAllCategory } from "@/api/modules/main";

const formValue = reactive({
	keywords: "",
	createTime: undefined,
	category: ""
});
const exposeSearchParams = ref();
const cateOptions = ref([]);
const cascaderRef = ref();

function handleSubmit() {
	exposeSearchParams.value = cloneDeep(formValue);
}

function createCascaderOptions(arr) {
	const result = [];
	arr.forEach(item => {
		const parts = item.split("/");
		let currentLevel: any = result;
		parts.forEach(part => {
			let existingNode = currentLevel.find(node => node.value === part);
			if (!existingNode) {
				const newNode = {
					value: part,
					label: part,
					children: []
				};
				currentLevel.push(newNode);
				existingNode = newNode;
			}
			currentLevel = existingNode.children;
		});
	});
	function removeEmptyChildren(nodes) {
		nodes.forEach(node => {
			if (node.children && node.children.length === 0) {
				delete node.children;
			} else if (node.children) {
				removeEmptyChildren(node.children);
			}
		});
	}
	removeEmptyChildren(result);
	return result;
}

async function fetchCateOption() {
	const res = await getAllCategory();
	const options = createCascaderOptions(res.data);
	cateOptions.value = options;
}

onMounted(async () => {
	await fetchCateOption();
});

defineExpose({
	searchParams: computed(() => exposeSearchParams.value)
});
</script>

<style scoped lang="scss">
.list-filter-wrapper {
	width: 100%;
	display: flex;
	flex-direction: row;
}
</style>
