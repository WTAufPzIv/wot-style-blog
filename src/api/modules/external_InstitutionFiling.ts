import http from "@/api";

const PORT1 = "/api";

export const fetchLogin = (params: { username: string; password: string }) => {
	// 机构业务类型
	return http.post(PORT1 + `/auroraWeb/adminLogin`, params);
};

export const fetchLogout = () => {
	// 机构业务类型
	return http.post(PORT1 + `/auroraWeb/adminLogout`, {});
};

export const checkIsLogin = () => {
	// 机构业务类型
	return http.post<{ username: string } | null>(PORT1 + `/auroraWeb/adminIsLogin`, {});
};

export const getDailyNasaDate = () => {
	return http.post(PORT1 + `/auroraWeb/getNasaAPOD`, {});
};

// export const transDailyNasaDate = (params: { text: string }) => {
// 	return http.post("https://open.hunyuan.tencent.com/openapi/v1/agent/chat/completions", {
// 		assistant_id: "Tp2Wf3EASOyh",
// 		user_id: "AURORA",
// 		stream: false,
// 		messages: [
// 			{
// 				role: "user",
// 				content: [
// 					{
// 						type: "text",
// 						text: params.text
// 					}
// 				]
// 			}
// 		]
// 	});
// };
