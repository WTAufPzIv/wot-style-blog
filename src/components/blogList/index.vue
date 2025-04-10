<template>
	<div class="recent-wrapper">
		<div class="recent-list-wrapper" :isMobile="isMobile">
			<div class="recent-item" v-for="item in arrPayload" :key="item">
				<div class="recent-container">
					<div class="image-and-title">
						<img :src="item.headImage" alt="" @click="() => gotoBlogDetail(item)" />
						<p :isMobile="isMobile" @click="() => gotoBlogDetail(item)">
							<span class="title">{{ item.title }}</span>
							<span class="time">{{ item.createTime }}</span>
						</p>
						<div class="operator-btn" v-if="isAdmin && !isMobile">
							<n-button quaternary type="primary" @click="() => handleEditItem(item)">编辑</n-button>
							<n-button quaternary type="error" @click="() => handleDeleteItem(item)">删除</n-button>
						</div>
					</div>
					<div class="mini-pre">
						<div class="mini-content">{{ item.miniDesc }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="more-btn mt20" v-if="showMore">
			<div class="common-button-default" @click="gotoBlogList">查看更多</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import useDevice from "@/hook/window";
import { useRouter } from "vue-router";
import { triggerBlogEditDialogHook } from "@/components/blogList/editDialog/trigger";
import { deteleBlog } from "@/api/modules/main";
import { sleep } from "@/utils/common";

const { isMobile } = useDevice();
const router = useRouter();
const { openEditBlogDialog } = triggerBlogEditDialogHook();
const props = withDefaults(
	defineProps<{
		arrPayload: {
			headImage: string;
			title: string;
			mdUrl: string;
			createTime: string;
			miniDesc: string;
			category: string;
		}[];
		showMore: boolean;
		isAdmin: boolean;
	}>(),
	{
		arrPayload: undefined,
		showMore: false,
		isAdmin: false
	}
);

function gotoBlogDetail(item) {
	console.log(item);
	router.push({
		path: "/blogDetail",
		query: {
			markdownUrl: encodeURIComponent(item.mdUrl)
		}
	});
}

function handleEditItem(item) {
	openEditBlogDialog({ ...item });
}

async function handleDeleteItem(item) {
	await deteleBlog({ id: item.id });
	await sleep(1000);
	location.reload();
}

function gotoBlogList() {
	router.push({
		path: "/blogList"
	});
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
