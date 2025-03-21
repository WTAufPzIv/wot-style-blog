import { ref, onMounted, onBeforeUnmount } from "vue";
import { debounce } from "lodash";

export default function useDevice() {
	const isMobile = ref(false);

	// 客户端检测方法
	const checkDevice = () => {
		const userAgent = navigator.userAgent.toLowerCase();
		const mobileKeywords = [
			"android",
			"iphone",
			"ipod",
			"ipad",
			"windows phone",
			"mobile",
			"blackberry",
			"webos",
			"iemobile",
			"opera mini"
		];
		const isMobileView = window.matchMedia("(max-width: 768px)").matches;
		isMobile.value = mobileKeywords.some(keyword => userAgent.includes(keyword)) || isMobileView;
	};

	const debouncedCheck = debounce(checkDevice, 200);

	onMounted(() => {
		checkDevice();
		window.addEventListener("resize", debouncedCheck);
	});

	onBeforeUnmount(() => {
		window.removeEventListener("resize", debouncedCheck);
	});

	return { isMobile };
}
