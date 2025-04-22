<template>
	<div>
		<cook-filter></cook-filter>
		<div class="table-content">
			<n-data-table
				:maxHeight="isMobile ? '41vh' : '60vh'"
				virtual-scroll
				:bordered="true"
				:columns="colums"
				:data="renderData"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import CookFilter from "./filter.vue";
import { useTable } from "@/pages/cook/menu/colums";
import useDevice from "@/hook/window";

const { colums, renderData } = useTable();
const { isMobile } = useDevice();
</script>

<style scoped lang="scss"></style>
