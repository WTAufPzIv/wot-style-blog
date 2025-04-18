<template>
	<div class="header-bar">
		<div class="head-content">
			<img src="@/assets/images/head_logo.png" />
			<div class="tab-wrapper" v-if="!isMobile">
				<ul>
					<li v-for="item in _pageList" :key="item.path">
						<router-link :to="item.path"
							><span>{{ item.title }}</span></router-link
						>
					</li>
				</ul>
			</div>
			<div v-else class="m-tab">
				<img @click="isOpenMoMenu = true" src="@/assets/images/menuicon.png" alt="" />
			</div>
		</div>
		<div class="mo-fullsreen-menu-wrapper" v-if="isOpenMoMenu">
			<img @click="isOpenMoMenu = false" src="@/assets/images/menuicon1.png" alt="" />
			<ul>
				<li v-for="item in _pageList" :key="item.path">
					<router-link :to="item.path">
						<span>{{ item.title }}</span>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { _pageList } from "./const";
import useDevice from "@/hook/window";
import { ref, watch } from "vue";
import { useRouterLoading } from "@/hook/routerLoadingHook";
import { useLoadingBar } from "naive-ui";

const isOpenMoMenu = ref(false);
const { isMobile } = useDevice();
const { isLoading } = useRouterLoading();
const loadingBar = useLoadingBar();

watch(
	() => isLoading.value,
	newval => {
		if (newval) loadingBar.start();
		else loadingBar.finish();
	}
);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
