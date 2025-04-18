import http from "@/api";
import { CommonVo } from "@/api/interface";

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

export const getBlogList = (params: { keyword?: string; createTime?: string; category?: string } & CommonVo.ReqPage) => {
	return http.post<
		CommonVo.ResPage<{
			title: string;
			category: string;
			createTime: string;
			headImage: string;
			desc: string;
			mdUrl: string;
		}>
	>(PORT1 + `/auroraWeb/blog/list`, params);
};

export const getAllCategory = () => {
	return http.post<
		{
			category: string;
			count: number;
		}[]
	>(PORT1 + "/auroraWeb/blog/category/all");
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

export const editBlog = (params: {
	id: string;
	title: string;
	category: string;
	createTime: string;
	headImage: string;
	desc: string;
	mdUrl: string;
}) => {
	return http.post(PORT1 + `/auroraWeb/blog/put`, params);
};

export const deteleBlog = (params: { id: string }) => {
	return http.post(PORT1 + `/auroraWeb/blog/delete`, params);
};

export const getPhotographlist = () => {
	return http.post(PORT1 + "/auroraWeb/photograph/list");
};

export const addPhotograph = (params: { title: string; createTime: string; content: string; images: string[] }) => {
	return http.post(PORT1 + `/auroraWeb/photograph/add`, params);
};

export const editPhotograph = (params: { id: string; title: string; createTime: string; content: string; images: string[] }) => {
	return http.post(PORT1 + `/auroraWeb/photograph/put`, params);
};

export const detelePhotograph = (params: { id: number }) => {
	return http.post(PORT1 + `/auroraWeb/photograph/delete`, params);
};

export const getPhotographDetail = (params: { id: number }) => {
	return http.post<{
		id: string;
		title: string;
		createTime: string;
		content: string;
		images: string[];
	}>(PORT1 + `/auroraWeb/photograph/detail`, params);
};

export const getNoteList = (params: { createTime: string }) => {
	return http.post<any[]>(PORT1 + "/auroraWeb/note/list", params);
};

export const addNote = (params: { content: string; createTime: string; images: string }) => {
	return http.post(PORT1 + `/auroraWeb/note/add`, params);
};

export const editNote = (params: { id: string; content: string; createTime: string; images: string }) => {
	return http.post(PORT1 + `/auroraWeb/note/put`, params);
};

export const deteleNote = (params: { id: number }) => {
	return http.post(PORT1 + `/auroraWeb/note/delete`, params);
};

export const getNoteDetail = (params: { id: number }) => {
	return http.post<{
		id: string;
		content: string;
		createTime: string;
		images: string;
	}>(PORT1 + `/auroraWeb/note/detail`, params);
};

export const getAllNoteCreateTime = () => {
	return http.post(PORT1 + "/auroraWeb/note/createTime/all");
};

export const getMaoOfData = () => {
	return http.post(PORT1 + "/auroraWeb/getModData");
};
