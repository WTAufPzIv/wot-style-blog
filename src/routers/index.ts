import { createRouter, createWebHashHistory } from "vue-router";
import { useRouterLoading } from "@/hook/routerLoadingHook";

const { startLoading, endLoading } = useRouterLoading();

// 基础路由配置
const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("@/pages/index.vue"),
		meta: {
			title: "首页"
		}
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("@/pages/admin/login.vue"),
		meta: {
			title: "登录"
		}
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import("@/pages/admin/index.vue"),
		meta: {
			title: "管理"
		}
	},
	{
		path: "/blogList",
		name: "blogList",
		component: () => import("@/pages/blog-list/index.vue"),
		meta: {
			title: "所有文章"
		}
	},
	{
		path: "/blogDetail",
		name: "blogDetail",
		component: () => import("@/pages/blog-detail/index.vue"),
		meta: {
			title: "查看文章"
		}
	},
	{
		path: "/imageBlog",
		name: "imageBlog",
		component: () => import("@/pages/image-blog/index.vue"),
		meta: {
			title: "所有图片"
		}
	},
	{
		path: "/imageDetail",
		name: "imageDetail",
		component: () => import("@/pages/image-detail/index.vue"),
		meta: {
			title: "图片详情"
		}
	},
	{
		path: "/note",
		name: "note",
		component: () => import("@/pages/note/index.vue"),
		meta: {
			title: "随记"
		}
	},
	{
		path: "/htmlPar",
		name: "htmlPar",
		component: () => import("@/pages/htmlParserPage/index.vue"),
		meta: {
			title: "文章详情"
		}
	},
	{
		path: "/assorted",
		name: "assorted",
		component: () => import("@/pages/assorted/index.vue"),
		meta: {
			title: "小游戏"
		}
	},
	{
		path: "/cook",
		name: "cook",
		component: () => import("@/pages/cook/index.vue"),
		meta: {
			title: "How To Cook"
		}
	}
];

const router = createRouter({
	history: createWebHashHistory("/"),
	routes,
	scrollBehavior: ((to, from, savedPosition) => {
		if (to.hash) {
			// 检测 URL 中的锚点
			return {
				el: to.hash,
				behavior: "smooth", // 启用平滑滚动
				offset: { y: 20 } // 可选的滚动偏移量
			};
		}
		return savedPosition || { top: 0 }; // 默认滚动到顶部
	}) as any
});

router.beforeEach((to, from, next) => {
	startLoading(); // 开始加载
	next();
});

router.afterEach(() => {
	endLoading();
});

export default router;
