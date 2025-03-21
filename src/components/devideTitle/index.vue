<template>
	<div :class="['divide-title-wrapper', isMobile ? 'mo' : 'pc']">
		<span><slot></slot></span>
	</div>
</template>

<script setup lang="ts">
import useDevice from "@/hook/window";

const { isMobile } = useDevice();
</script>

<style scoped lang="scss">
.divide-title-wrapper {
	width: 100%;
	margin: 24px 0;
	span {
		font-family: GeTe;
		color: $common-font-color;
	}
}
.mo {
	span {
	}
}
.pc {
	span {
		font-size: 28px;
	}
}
</style>
