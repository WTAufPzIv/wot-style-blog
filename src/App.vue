<template>
	<n-config-provider :theme="darkTheme">
		<n-dialog-provider>
			<n-message-provider>
				<router-view></router-view>
			</n-message-provider>
		</n-dialog-provider>
	</n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme } from "naive-ui";
import { onMounted } from "vue";

const observer = new MutationObserver(mutations => {
	mutations.forEach(mutation => {
		mutation.addedNodes.forEach((node: any) => {
			if (node.nodeType === Node.ELEMENT_NODE) {
				// 检查新增节点本身是否为目标元素
				if (node.matches('style[cssr-id="n-global"]')) {
					node.remove();
					console.log("删除了新增的目标元素");
				}
				// 检查新增节点的子元素中是否存在目标元素
				const styles = node.querySelectorAll('style[cssr-id="n-global"]');
				styles.forEach(style => style.remove());
			}
		});
	});
});

onMounted(() => {
	observer.observe(document.documentElement, {
		childList: true,
		subtree: true
	});
});
</script>

<style scoped></style>
