import { ref } from "vue";
const isLoading = ref(false);
export function useRouterLoading() {
	const init = () => {
		isLoading.value = false;
	};
	const startLoading = () => {
		isLoading.value = true;
	};

	const endLoading = () => {
		setTimeout(() => (isLoading.value = false), 300); // 等待动画完成
	};

	return { isLoading, init, startLoading, endLoading };
}
