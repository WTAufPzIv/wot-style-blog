<template>
	<CommonWrapper align="center">
		<div class="image-list-wrapper">
			<div class="image-item-wrapper" :isMobile="isMobile" v-for="item in imageBlogArr" :key="item.title">
				<div class="image-inner" @click="() => handleGotoDetail(item)">
					<img :src="item.images[0]" alt="" />
					<div class="image-content">
						<div class="title">{{ item.title }}</div>
						<div class="content" v-if="!isMobile">{{ item.content }}</div>
					</div>
					<div class="btn-group" v-if="!!admin && !isMobile">
						<n-button quaternary type="primary" @click.stop="() => handleEditItem(item)">编辑</n-button>
						<n-button quaternary type="error" @click.passive="() => handleDeleteItem(item)">删除</n-button>
					</div>
				</div>
			</div>
		</div>
	</CommonWrapper>
</template>

<script setup lang="ts">
import CommonWrapper from "@/components/commonWrapper/index.vue";
import { onMounted, ref } from "vue";
import { detelePhotograph, getPhotographlist } from "@/api/modules/main";
import useDevice from "@/hook/window";
import { useRouter } from "vue-router";
import { sleep } from "@/utils/common";
import { triggerImageEditDialogHook } from "@/pages/image-blog/editDialog/trigger";
import { useAdminHook } from "@/hook/adminHook";

const imageBlogArr = ref<any[]>();
const { isMobile } = useDevice();
const router = useRouter();
const { openEditImageDialog } = triggerImageEditDialogHook();
const admin = ref();
const { handleCheck } = useAdminHook();

async function fetchRecentIamge() {
	const res: any = await getPhotographlist();
	imageBlogArr.value = res.data;
}

function handleEditItem(item) {
	openEditImageDialog({ ...item });
}

async function handleDeleteItem(item) {
	await detelePhotograph({ id: item.id });
	await sleep(1000);
	location.reload();
}

function handleGotoDetail(item) {
	router.push({
		path: "/imageDetail",
		query: {
			imageId: item.id
		}
	});
}

onMounted(async () => {
	fetchRecentIamge();
	const res = await handleCheck();
	admin.value = res;
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
