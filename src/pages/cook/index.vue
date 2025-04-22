<template>
	<CommonWrapper>
		<n-tabs type="segment" animated>
			<n-tab-pane name="chap1" tab="菜谱">
				<cook-filter></cook-filter>
				<div class="table-content">
					<n-data-table
						virtual-scroll
						maxHeight="calc(100vh - 300px)"
						:bordered="true"
						:single-line="true"
						:columns="colums"
						:data="renderData"
					/>
				</div>
			</n-tab-pane>
			<n-tab-pane name="chap2" tab="做菜之前"> </n-tab-pane>
			<n-tab-pane name="chap3" tab="进阶学习"> </n-tab-pane>
		</n-tabs>
	</CommonWrapper>
</template>

<script setup lang="tsx">
import CommonWrapper from "@/components/commonWrapper/index.vue";
import CookFilter from "./filter.vue";
import { useTable } from "./colums";

const { colums, renderData } = useTable();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
