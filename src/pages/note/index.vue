<template>
	<CommonWrapper align="center">
		<div class="note-wrapper">
			<div class="left">
				<div class="calendar-wrapper">
					<n-calendar class="calendar-inner" v-model:value="selectedDate">
						<template #default="{ date }"> {{ date }}日 </template>
						<template #header="{ year, month }"> {{ year }}年{{ month }}月 </template>
					</n-calendar>
				</div>
				<div class="note-list-item mt20" v-for="item in noteList" :key="item.content" @click="() => (selectedNote = item)">
					<p class="time">{{ item.createTime }}</p>
					<p class="content">{{ item.content }}</p>
					<div class="btn-group" v-if="!!admin && !isMobile">
						<n-button quaternary type="primary" @click.stop="() => handleEditItem(item)">编辑</n-button>
						<n-button quaternary type="error" @click.passive="() => handleDeleteItem(item)">删除</n-button>
					</div>
				</div>
			</div>
			<div class="right">
				<div class="back"></div>
				<div class="top">
					<paper :text="selectedNote?.content" :images="selectedNote?.images"></paper>
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

function getYYYYMMDD(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

watch(
	() => selectedDate.value,
	newval => {
		if (!newval) fetchNoteList();
		fetchNoteList(getYYYYMMDD(new Date(newval)));
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

onMounted(async () => {
	const res = await handleCheck();
	admin.value = res;
});
</script>

<style scoped lang="scss">
.note-wrapper {
	width: 100%;
	display: flex;
	flex-direction: row;
	position: relative;
	.left {
		width: 40%;
		height: calc(100vh - 120px);
		padding: 12px;
		box-sizing: border-box;
		overflow-y: scroll;
		.calendar-wrapper {
			width: 100%;
			aspect-ratio: 1/1;
			.calendar-inner {
				width: 100%;
				height: 100%;
			}
		}
		.note-list-item {
			cursor: pointer;
			width: 100%;
			background: $common-bg-l2;
			margin-bottom: 12px;
			border-radius: 12px;
			padding: 6px 16px;
			box-sizing: border-box;
			position: relative;
			.time {
				color: $common-font-color;
				font-size: 12px;
			}
			.content {
				font-size: 16px;
				color: $common-font-color;
				display: -webkit-box;
				text-overflow: ellipsis;
				overflow: hidden;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.btn-group {
				position: absolute;
				top: 0;
				right: 0;
				display: flex;
				flex-direction: column;
			}
		}
	}
	.right {
		width: 60%;
		height: calc(100vh - 120px);
		position: relative;
		margin: 0 24px;
		box-sizing: border-box;
		.back {
			width: 99%;
			height: 99%;
			position: absolute;
			bottom: 0;
			left: 0;
			background: $common-font-color;
			opacity: 0.9;
		}
		.top {
			width: 99%;
			height: 99%;
			position: absolute;
			right: 0;
			top: 0;
			background: $common-font-color;
			padding: 24px 80px;
			box-sizing: border-box;
			overflow-y: scroll;
		}
	}
}
</style>
