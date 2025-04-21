import cookMenu from "@/assets/result";
import { computed, h, reactive } from "vue";
import { NButton, NTag } from "naive-ui";
import { useRouter } from "vue-router";
import { shuffle } from "lodash";

const formValue = reactive({
	keywords: "",
	category: "",
	difficult: ""
});

export const useTable = () => {
	const router = useRouter();

	const renderData = computed(() => {
		return shuffle(
			cookMenu.filter(item => {
				return (
					(formValue.keywords ? item.title.includes(formValue.keywords) : 1) &&
					(formValue.category ? item.cat.includes(formValue.category) : 1) &&
					(formValue.difficult ? `${item.star}`.includes(formValue.difficult) : 1)
				);
			})
		);
	});
	const colums = [
		{
			title: "名称",
			key: "title"
		},
		{
			title: "分类",
			key: "cat",
			render(row) {
				return h(
					NTag,
					{
						style: {
							marginRight: "6px"
						},
						type: "warning",
						bordered: false
					},
					{
						default: () => row.cat
					}
				);
			}
		},
		{
			title: "难度",
			key: "star",
			render(row) {
				return h(
					NTag,
					{
						style: {
							marginRight: "6px"
						},
						type: "info",
						bordered: false
					},
					{
						default: "★".repeat(Number(row.star))
					}
				);
			}
		},
		{
			title: "操作",
			key: "actions",
			render(row) {
				return h(
					NButton,
					{
						size: "small",
						quaternary: true,
						type: "primary",
						onClick: () => handleGotoCookDetail(row)
					},
					{ default: () => "查看" }
				);
			}
		}
	];

	function handleGotoCookDetail(row) {
		router.push({
			path: "/blogDetail",
			query: {
				markdownUrl: encodeURIComponent(import.meta.env.VITE_GITHUB_PAGE_URL + "/cook/dishes" + row.path)
			}
		});
	}

	return {
		colums,
		renderData,
		formValue
	};
};
