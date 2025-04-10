import { h } from "vue";
import EditImageDetail from "./index.vue";
import { useDialog } from "naive-ui";
import { useModalCheck } from "@/hook/modalCheckHook";

export const triggerNoteEditDialogHook = () => {
	const dialog = useDialog();
	const { setHasModalOpen } = useModalCheck();

	function openEditNoteDialog(params: { id: string; title: string; createTime: any; content: string; images: any }) {
		setHasModalOpen(true);
		dialog.create({
			icon: () => null,
			title: () => "编辑随记",
			style: {
				width: "50vw",
				marginTop: "2.5vh",
				background: "#1c1c1e"
			},
			onClose: () => setHasModalOpen(false),
			content: () => h(EditImageDetail, params)
		});
	}

	return { openEditNoteDialog };
};
