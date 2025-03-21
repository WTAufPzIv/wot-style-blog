<template>
	<CommonWrapper>
		<div class="head-bar" :style="{ opacity: headBarOpacity, display: headBarDisplay }">
			<Header></Header>
		</div>
		<MdViewer></MdViewer>
	</CommonWrapper>
</template>

<script setup lang="ts">
import CommonWrapper from "@/components/commonWrapper/index.vue";
import MdViewer from "@/components/mdViewer/index.vue";
import Header from "@/components/header/index.vue";
</script>

<style scoped lang="scss"></style>
