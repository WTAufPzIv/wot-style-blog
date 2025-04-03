import { ref } from "vue";
import { checkIsLogin, fetchLogin, fetchLogout } from "@/api/modules/main";
import { useRoute, useRouter } from "vue-router";

const username = ref("");
const isAdminLogout = ref(false);

export const useAdminHook = () => {
	const route = useRoute();
	const router = useRouter();
	async function handleLogin(username: string, password: string) {
		await fetchLogin({ username, password });
		await handleCheck();
	}

	async function handleLogout() {
		await fetchLogout();
		isAdminLogout.value = true;
		await handleCheck();
	}

	async function handleCheck() {
		try {
			const res = await checkIsLogin();
			route.path.includes("login") && router.push("/admin");
			username.value = res.data!.username;
			return res.data;
		} catch {
			if (route.path.includes("admin")) {
				router.push("/login");
			}
			return null;
		}
	}

	return { handleLogin, handleLogout, handleCheck };
};
