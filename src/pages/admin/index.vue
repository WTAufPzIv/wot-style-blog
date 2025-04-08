<template>
	<CommonWrapper align="center">
		<img :class="isMobile ? 'mo-header' : 'pc-header'" src="@/assets/images/head_logo.png" alt="" />
		<div :style="{ width: '400px' }">
			<n-button size="large" :style="{ width: '100%' }" class="mt40" type="primary" @click="handleLogout"> 退出登录 </n-button>
		</div>
		<n-tabs type="line" animated class="mt30" v-model:value="tab">
			<n-tab-pane name="发博客" tab="发博客"></n-tab-pane>
			<n-tab-pane name="发随记" tab="发随记"></n-tab-pane>
			<n-tab-pane name="发图片" tab="发图片"></n-tab-pane>
		</n-tabs>
		<transition appear mode="out-in" name="fade-transform">
			<div class="admin-main-container" :key="tab">
				<PostBlog v-if="tab === '发博客'"></PostBlog>
			</div>
		</transition>
	</CommonWrapper>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAdminHook } from "@/hook/adminHook";
import CommonWrapper from "@/components/commonWrapper/index.vue";
import useDevice from "@/hook/window";
import PostBlog from "./postBlog/index.vue";

const { handleCheck, handleLogout } = useAdminHook();
const { isMobile } = useDevice();
const tab = ref("发博客");

onMounted(async () => {
	await handleCheck();
});
</script>

<style lang="scss" scoped>
.login-form {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
}
img {
	margin-top: 40px;
}
.mo-header {
	width: 50vw;
}
.pc-header {
	width: 300px;
}
.admin-main-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
