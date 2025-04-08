import { h } from "vue";
import EditBlogDetail from "./index.vue";
import { useDialog } from "naive-ui";
import { useModalCheck } from "@/hook/modalCheckHook";

export const triggerBlogEditDialogHook = () => {
	const dialog = useDialog();
	const { setHasModalOpen } = useModalCheck();

	function openEditBlogDialog(params: {
		id: string;
		title: string;
		createTime: string;
		category: string;
		headImage: string;
		miniDesc: string;
		mdUrl: string;
	}) {
		setHasModalOpen(true);
		dialog.create({
			icon: () => null,
			title: () => "",
			style: {
				width: "50vw",
				marginTop: "2.5vh",
				background: "#1c1c1e"
			},
			onClose: () => setHasModalOpen(false),
			content: () => h(EditBlogDetail, params)
		});
	}

	return { openEditBlogDialog };
};
