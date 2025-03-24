import { h } from "vue";
import ImageBlogDetail from "./index.vue";
import { useDialog } from "naive-ui";
import { useModalCheck } from "@/hook/modalCheckHook";

export const triggerImageDetailHook = () => {
	const dialog = useDialog();
	const { setHasModalOpen } = useModalCheck();

	function openImageDialog(params: { title: string; text: string[]; images: string[]; time: string }) {
		setHasModalOpen(true);
		dialog.create({
			icon: () => null,
			title: () => "",
			style: {
				width: "90vw",
				height: "95vh",
				marginTop: "2.5vh",
				background: "#1c1c1e"
			},
			onClose: () => setHasModalOpen(false),
			content: () => h(ImageBlogDetail, params)
		});
	}

	return { openImageDialog };
};
