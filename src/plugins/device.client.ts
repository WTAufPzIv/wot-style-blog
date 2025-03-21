import useDevice from "~/hook/window";

export default defineNuxtPlugin(nuxtApp => {
	const { isMobile } = useDevice();

	// 注入全局属性
	nuxtApp.provide("device", {
		isMobile: () => isMobile.value
	});

	// 可选：注入到 Vue 实例
	nuxtApp.vueApp.config.globalProperties.device = {
		isMobile: () => isMobile.value
	};
});
