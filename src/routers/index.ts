import { createRouter, createWebHashHistory } from "vue-router";

// 路由组件懒加载（推荐）
const Home = () => import("@/pages/index.vue");
const Login = () => import("@/pages/admin/login.vue");
const Admin = () => import("@/pages/admin/index.vue");

// 基础路由配置
const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			title: "首页"
		}
	},
	{
		path: "/login",
		name: "Login",
		component: Login
	},
	{
		path: "/admin",
		name: "Admin",
		component: Admin
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
