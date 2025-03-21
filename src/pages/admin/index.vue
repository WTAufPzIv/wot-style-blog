<template>
	<CommonWrapper>
		<div class="login-form">
			<img :class="isMobile ? 'mo-header' : 'pc-header'" src="@/assets/images/head_logo.png" alt="" />
			<div :style="{ width: '400px' }">
				<n-button size="large" :style="{ width: '100%' }" class="mt40" type="primary" @click="handleLogout"> 退出登录 </n-button>
			</div>
			<v-md-editor class="v-md-editor--dark" v-model="testMd" mode="preview"></v-md-editor>
		</div>
	</CommonWrapper>
</template>

<script setup>
import { onMounted } from "vue";
import { useAdminHook } from "@/hook/adminHook";
import CommonWrapper from "@/components/commonWrapper/index.vue";
import useDevice from "@/hook/window";
import { testMd } from "@/assets/mock";

const { handleCheck, handleLogout } = useAdminHook();
const { isMobile } = useDevice();

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
	img {
		margin-top: 80px;
	}
	.mo-header {
		width: 50vw;
	}
	.pc-header {
		width: 300px;
	}
}
</style>
