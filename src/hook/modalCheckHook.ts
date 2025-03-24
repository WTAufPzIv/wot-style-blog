import { ref } from "vue";

const hasModalOpen = ref(false);

export const useModalCheck = () => {
	function setHasModalOpen(e: boolean) {
		hasModalOpen.value = e;
	}

	return { hasModalOpen, setHasModalOpen };
};
