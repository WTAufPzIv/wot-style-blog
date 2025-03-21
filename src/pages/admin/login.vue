<template>
	<CommonWrapper>
		<div class="login-form">
			<img :class="isMobile ? 'mo-header' : 'pc-header'" src="@/assets/images/head_logo.png" alt="" />
			<div :style="{ width: '400px' }">
				<n-input class="mt30" type="text" size="large" placeholder="账号" v-model:value="username" />
				<n-input class="mt20" type="text" size="large" placeholder="密码" v-model:value="password" />
				<n-button size="large" :style="{ width: '100%' }" class="mt20" type="primary" @click="handleFetchlogin"> 登入 </n-button>
			</div>
		</div>
	</CommonWrapper>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CommonWrapper from "@/components/commonWrapper/index.vue";
import useDevice from "@/hook/window";
import { useAdminHook } from "@/hook/adminHook";

const username = ref("");
const password = ref("");
const { isMobile } = useDevice();
const { handleCheck, handleLogin } = useAdminHook();

async function handleFetchlogin() {
	await handleLogin(username.value, password.value);
}

onMounted(async () => {
	await handleCheck();
});
</script>

<style scoped lang="scss">
.login-form {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	img {
		margin-top: -100px;
	}
	.mo-header {
		width: 50vw;
	}
	.pc-header {
		width: 300px;
	}
}
</style>
