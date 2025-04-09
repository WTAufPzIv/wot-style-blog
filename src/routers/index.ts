import { createRouter, createWebHashHistory } from "vue-router";

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
	}
];

const router = createRouter({
	history: createWebHashHistory("/"),
	routes,
	scrollBehavior(to, from, savedPosition) {
		return savedPosition || { top: 0 };
	}
});

// // 全局前置守卫（保持不变）
// router.beforeEach((to, from, next) => {
// 	document.title = to.meta.title || "默认标题";
// 	if (to.meta.requiresAuth && !isAuthenticated()) {
// 		next({ name: "login" });
// 	} else {
// 		next();
// 	}
// });

export default router;
