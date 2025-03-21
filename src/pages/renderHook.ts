import { ref } from "vue";

export const useHomePageRenderHook = () => {
	const headBarOpacity = ref(0);
	const headBarDisplay = ref("none");
	const screenOneOpacity = ref(1);
	const screenTwoOpacity = ref(0);

	function handleSectionChange(oldPage: any, newPage: any) {
		if (oldPage.index === 0 && newPage.index === 1) {
			screenOneOpacity.value = 0;
			screenTwoOpacity.value = 1;
			headBarDisplay.value = "block";
			setTimeout(() => {
				headBarOpacity.value = 1;
			}, 50);
		} else {
			screenOneOpacity.value = 1;
			screenTwoOpacity.value = 0;
			headBarOpacity.value = 0;
			setTimeout(() => {
				headBarDisplay.value = "none";
			}, 1000);
		}
	}

	return {
		headBarOpacity,
		headBarDisplay,
		screenOneOpacity,
		screenTwoOpacity,
		handleSectionChange
	};
};
