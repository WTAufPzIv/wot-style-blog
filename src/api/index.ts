import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { CommonVo } from "@/api/interface";
import { baseURL } from "./config";
import { createDiscreteApi, darkTheme } from "naive-ui";
import { computed } from "vue";
import { rsaEncrypt } from "@/utils/common";

// 公钥配置（建议从接口动态获取）
const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxh4euMD5asVi31e2TARO
2Hs1b2Y2vmLKkFNp+e1e7rkieXnbpEJccC5kuESl3Y5A7sbjqrpGpbXEXn4O2Vp5
6K/doiXvazfMZ0vTCJdbc+SbEzWU71rCZNRSA/pbPC3sDMrldZvPGCrZ0UhnR0++
fdbq2RvPdsfIOwAcaK9De3E994OYSqLc49Sx86wb/0ZlhOWvgEXn3AcOSqLayIGK
xwA+vzOrRSAnXouqLUhdBHvwzNmA1Tuh0iWMNyGx/+oRBpjcOzkrmbe2Z8A6z5SM
l3bZwpdxmN2TGQJStO0hmZrkHNcf8rguVJTVlGVt8+ripOt7HwnvT6YVrcWrweKC
DwIDAQAB
-----END PUBLIC KEY-----
`;

const configProviderPropsRef = computed(() => ({
	theme: darkTheme
}));

const { message } = createDiscreteApi(["message"], {
	configProviderProps: configProviderPropsRef
});

const config = {
	baseURL,
	timeout: 60000,
	withCredentials: true
};

function rsaEncryptObj(obj: any) {
	// 处理基本类型直接加密
	if (typeof obj !== "object" || obj === null) {
		return typeof obj === "string" || typeof obj === "number" ? rsaEncrypt(String(obj), PUBLIC_KEY) : obj;
	}

	// 处理数组类型
	if (Array.isArray(obj)) {
		return obj.map(item => rsaEncryptObj(item));
	}

	// 处理对象类型
	const newObj = {};
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const value = obj[key];
			// 递归处理每个属性
			newObj[key] = rsaEncryptObj(value);
		}
	}
	return newObj;
}

class RequestHttp {
	service: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		// 实例化axios
		this.service = axios.create(config);
		this.service.interceptors.request.use(
			(config: any) => {
				return { ...config, headers: { ...config.headers } };
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);
		this.service.interceptors.response.use(
			async (response: AxiosResponse<CommonVo.ResultData>) => {
				return await this.handleBusinessLogic(response);
			},
			async (error: AxiosError) => {
				return this.handleError(error);
			}
		);
	}

	// * 常用请求方法封装
	get<T>(url: string, params?: any, _object = {}): Promise<CommonVo.ResultData<T>> {
		return this.service.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: any, _object = {}): Promise<CommonVo.ResultData<T>> {
		return this.service.post(url, params, _object);
	}
	put<T>(url: string, params?: any, _object = {}): Promise<CommonVo.ResultData<T>> {
		return this.service.put(url, params, _object);
	}
	handleError(error: AxiosError) {
		const { response } = error;
		return Promise.reject(error);
	}
	async handleBusinessLogic(response: AxiosResponse<CommonVo.ResultData>): Promise<any> {
		const { data } = response;
		if (!data.code || (data.code && data.code !== 1)) {
			if (data.message) {
				message.error(data.message);
			}
			return Promise.reject(data);
		}
		return data;
	}
}

export default new RequestHttp(config);
