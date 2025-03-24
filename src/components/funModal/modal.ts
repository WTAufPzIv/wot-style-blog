import { App, Component, createVNode, ref, render, watchEffect } from "vue";
import { NDialog, NDrawer, NButton } from "naive-ui";

let selfApp: any = null;

export const gloablModal = {
	install: function (app: App<Element>) {
		selfApp = app;
	}
};

export const useFunModalHook = () => {
	let vnode: any = null;
	let stopWatch: any = null;
	let result: any = null;
	const modelValue = ref(false);

	const openModal = (params: {
		component: Component;
		modelType: "dialog" | "drawer";
		modalProps?: Record<string, any>;
		cprops?: Record<string, any>;
		hideFooter?: boolean;
		closeText?: string;
		confirmText?: string;
	}) => {
		return new Promise((res, rej) => {
			modelValue.value = true;
			const container = document.createElement("div");
			document.body.appendChild(container);
			const confirmModal = async () => {
				const ins = ComponentVNode.component?.exposed;
				ins?.submit && (result = await ins?.submit());
				closeModal();
			};
			const closeModal = () => {
				modelValue.value = false;
			};
			const destroyModal = () => {
				render(null, container);
				document.body.removeChild(container);
				stopWatch();
				stopWatch = null;
				res(result);
			};
			const ComponentVNode = createVNode(params.component, {
				onClose: () => closeModal(),
				onFinish: () => confirmModal(),
				...params.cprops
			});
			stopWatch = watchEffect(() => {
				vnode = createVNode(
					params.modelType === "dialog" ? NDialog : NDrawer,
					{
						show: modelValue.value,
						negativeText: params.closeText || "",
						positiveText: params.confirmText || "",
						"onUpdate:show": e => {
							modelValue.value = e;
						},
						onClosed: () => {
							result = null;
							destroyModal();
						},
						...params.modalProps
					},
					{
						default: () => ComponentVNode
						// footer: params.hideFooter
						// 	? () => null
						// 	: () => [
						// 			createVNode(
						// 				NButton,
						// 				{
						// 					onClick: () => closeModal()
						// 				},
						// 				() => params.closeText || "取消"
						// 			),
						// 			createVNode(
						// 				NButton,
						// 				{
						// 					type: "primary",
						// 					onClick: () => confirmModal()
						// 				},
						// 				() => params.confirmText || "确定"
						// 			)
						// 	  ]
					}
				);
				vnode.appContext = selfApp?._context;
				render(vnode, container);
			});
		});
	};

	return {
		openModal
	};
};
