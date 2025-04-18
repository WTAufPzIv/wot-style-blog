<template>
	<n-config-provider :theme="darkTheme">
		<n-dialog-provider>
			<n-message-provider>
				<n-loading-bar-provider>
					<router-view></router-view>
				</n-loading-bar-provider>
			</n-message-provider>
		</n-dialog-provider>
	</n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme } from "naive-ui";
import { onMounted } from "vue";
import { useRouterLoading } from "@/hook/routerLoadingHook";

const { init } = useRouterLoading();

const observer = new MutationObserver(mutations => {
	mutations.forEach(mutation => {
		mutation.addedNodes.forEach((node: any) => {
			if (node.nodeType === Node.ELEMENT_NODE) {
				if (node.matches('style[cssr-id="n-global"]')) {
					node.remove();
				}
				const styles = node.querySelectorAll('style[cssr-id="n-global"]');
				styles.forEach(style => style.remove());
			}
		});
	});
});

onMounted(() => {
	init();
	observer.observe(document.documentElement, {
		childList: true,
		subtree: true
	});
});
</script>

<style scoped></style>
