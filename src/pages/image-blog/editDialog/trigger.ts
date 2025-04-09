import { h } from "vue";
import EditImageDetail from "./index.vue";
import { useDialog } from "naive-ui";
import { useModalCheck } from "@/hook/modalCheckHook";

export const triggerImageEditDialogHook = () => {
	const dialog = useDialog();
	const { setHasModalOpen } = useModalCheck();

	function openEditImageDialog(params: { id: string; title: string; createTime: any; content: string; images: any }) {
		setHasModalOpen(true);
		dialog.create({
			icon: () => null,
			title: () => "编辑图文",
			style: {
				width: "50vw",
				marginTop: "2.5vh",
				background: "#1c1c1e"
			},
			onClose: () => setHasModalOpen(false),
			content: () => h(EditImageDetail, params)
		});
	}

	return { openEditImageDialog };
};
