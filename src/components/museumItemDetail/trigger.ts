import { h } from "vue";
import ImageBlogDetail from "./index.vue";
import { useDialog } from "naive-ui";
import { useModalCheck } from "@/hook/modalCheckHook";

export const triggerMuseumsItemDetailHook = () => {
	const dialog = useDialog();
	const { setHasModalOpen } = useModalCheck();

	function openMuseumItemDialog(params: {
		title: string;
		text1: string;
		text2: string;
		text3: string;
		text4: string;
		text5: string;
		images: string[];
		dataSource?: { url?: string; urlName: string };
	}) {
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

	return { openMuseumItemDialog };
};
