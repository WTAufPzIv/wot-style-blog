<template>
	<div class="recent-wrapper" :isMobile="isMobile">
		<div class="recent-item" v-for="item in mockarr" :key="item">
			<div class="recent-container"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import useDevice from "@/hook/window";

const { isMobile } = useDevice();
const mockarr = new Array<string>(9).fill("1");
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
