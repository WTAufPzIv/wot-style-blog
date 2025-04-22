<template>
	<CommonWrapper inner-scroll>
		<h1 class="cook-title">程序员做饭指南</h1>
		<a href="https://github.com/Anduin2017/HowToCook">特别鸣谢：Github开源项目HowToCook</a>
		<n-tabs type="segment" animated class="mt20" v-model:value="tab">
			<n-tab-pane name="chap1" tab="菜谱"></n-tab-pane>
			<n-tab-pane name="chap2" tab="做菜通识"> </n-tab-pane>
		</n-tabs>
		<transition appear mode="out-in" name="fade-transform">
			<div class="cook-main-wrapper" :key="tab">
				<cook-menu v-if="tab === 'chap1'"></cook-menu>
				<general-know v-if="tab === 'chap2'"></general-know>
			</div>
		</transition>
	</CommonWrapper>
</template>

<script setup lang="tsx">
import CommonWrapper from "@/components/commonWrapper/index.vue";
import CookMenu from "./menu/index.vue";
import GeneralKnow from "./GeneralKnowledge/index.vue";
import { ref } from "vue";

const tab = ref("chap1");
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
