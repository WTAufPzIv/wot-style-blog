<template>
	<CommonWrapper align="center">
		<div class="note-wrapper" :isMobile="isMobile">
			<div class="left" :isMobile="isMobile">
				<div class="calendar-wrapper" :isMobile="isMobile">
					<n-calendar class="calendar-inner" v-model:value="selectedDate">
						<template #default="{ date }"> {{ date }}日 </template>
						<template #header="{ year, month }"> {{ year }}年{{ month }}月 </template>
					</n-calendar>
				</div>
				<div class="note-list-item" v-for="item in noteList" :key="item.content" @click="handleSelectNode(item)">
					<p class="time">{{ item.createTime }}</p>
					<p class="content">{{ item.content }}</p>
					<div class="btn-group" v-if="!!admin && !isMobile">
						<n-button quaternary type="primary" @click.stop="() => handleEditItem(item)">编辑</n-button>
						<n-button quaternary type="error" @click.passive="() => handleDeleteItem(item)">删除</n-button>
					</div>
				</div>
			</div>
			<div class="right" :isMobile="isMobile" :style="{ left: isMobile ? openLeft : 'unset' }">
				<paper
					v-if="selectedNote"
					:key="selectedNote?.content"
					:text="selectedNote?.content"
					:images="selectedNote?.images"
				></paper>
				<div class="close-right" v-if="isMobile">
					<div class="common-button-black" @click="openLeft = '100vw'">关闭</div>
				</div>
			</div>
		</div>
	</CommonWrapper>
</template>

<script setup lang="ts">
import CommonWrapper from "@/components/commonWrapper/index.vue";
import Paper from "./paper.vue";
import { deteleNote, getNoteList } from "@/api/modules/main";
import { onMounted, ref, watch } from "vue";
import useDevice from "@/hook/window";
import { useAdminHook } from "@/hook/adminHook";
import { sleep } from "@/utils/common";
import { triggerNoteEditDialogHook } from "./editDialog/trigger";

const noteList = ref<any[]>([]);
const selectedDate = ref();
const selectedNote = ref();
const admin = ref();
const { isMobile } = useDevice();
const { handleCheck } = useAdminHook();
const { openEditNoteDialog } = triggerNoteEditDialogHook();
const openLeft = ref("100vw");

function getYYYYMMDD(date: Date) {
	console.log(date);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

watch(
	() => selectedDate.value,
	newval => {
		console.log(newval);
		if (!newval) {
			fetchNoteList();
		} else {
			fetchNoteList(getYYYYMMDD(new Date(newval)));
		}
	},
	{
		immediate: true
	}
);

async function fetchNoteList(date?: string) {
	const res = await getNoteList({ createTime: date || "" });
	noteList.value = res.data;
	selectedNote.value = res.data?.length && res.data[0];
}

function handleEditItem(item) {
	openEditNoteDialog({ ...item });
}

async function handleDeleteItem(item) {
	await deteleNote({ id: item.id });
	await sleep(1000);
	location.reload();
}

function handleSelectNode(item) {
	selectedNote.value = item;
	if (isMobile.value) {
		openLeft.value = "0";
	}
}

onMounted(async () => {
	const res = await handleCheck();
	admin.value = res;
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
