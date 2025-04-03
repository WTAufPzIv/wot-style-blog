import http from "@/api";

const PORT1 = "/api";

export const fetchLogin = (params: { username: string; password: string }) => {
	return http.post(PORT1 + `/auroraWeb/adminLogin`, params);
};

export const fetchLogout = () => {
	return http.post(PORT1 + `/auroraWeb/adminLogout`);
};

export const checkIsLogin = () => {
	return http.post<{ username: string } | null>(PORT1 + `/auroraWeb/adminIsLogin`);
};

export const getDailyNasaDate = () => {
	return http.post(PORT1 + `/auroraWeb/getNasaAPOD`);
};

export const getDailyHarvardMuseumsDate = () => {
	return http.post(PORT1 + `/auroraWeb/getHarvardMusiumsDailly`);
};

export const getDailyNationalGeographicDate = () => {
	return http.post(PORT1 + `/auroraWeb/getNationalGeographicDailly`);
};

export const addBlog = (params: {
	title: string;
	category: string;
	createTime: string;
	headImage: string;
	desc: string;
	mdUrl: string;
}) => {
	return http.post(PORT1 + `/auroraWeb/blog/add`, params);
};
