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

class RequestHttp {
	service: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		// 实例化axios
		this.service = axios.create(config);
		this.service.interceptors.request.use(
			(config: any) => {
				return { ...config, headers: { ...config.headers, "content-type": "text/plain" } };
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
		const encryptedData = rsaEncrypt(JSON.stringify(params), PUBLIC_KEY);
		console.groupCollapsed(
			`%c Raw Request %c ${url} %c`,
			"background: #42c09c; border: 1px solid #42c09c; padding: 1px; border-radius: 2px 0 0 2px; color: #fff",
			"border: 1px solid #42c09c; padding: 1px; border-radius: 0 2px 2px 0; color: #42c09c",
			"background: transparent"
		);
		console.log("加密前: ");
		console.log(params);
		console.log(JSON.stringify(params));
		console.log("加密后: ");
		console.log(encryptedData);
		console.groupEnd();
		return this.service.post(url, encryptedData, _object);
	}
	put<T>(url: string, params?: any, _object = {}): Promise<CommonVo.ResultData<T>> {
		return this.service.put(url, params, _object);
	}
	delete<T>(url: string, params?: any, _object = {}): Promise<CommonVo.ResultData<T>> {
		return this.service.delete(url, { params, ..._object });
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
