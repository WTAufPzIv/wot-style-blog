<template>
	<div class="recent-wrapper">
		<div class="recent-list-wrapper" :isMobile="isMobile"></div>
		<div class="more-btn mt20">
			<div class="common-button-default" @click="gotoBlogList">查看更多</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import "./index.scss";
</style>
