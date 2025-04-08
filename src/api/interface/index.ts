export namespace CommonVo {
	// * 请求响应参数(不包含data)
	export interface Result {
		code: number;
		message: string;
	}

	// * 请求响应参数(包含data)
	export interface ResultData<T = any> extends Result {
		data: T;
	}

	// * 分页响应参数
	export interface ResPage<T> {
		data: T[];
		pageCount: number;
		total: number;
		pageIndex: number;
		pageSize?: number;
	}

	// * 分页请求参数
	export interface ReqPage {
		pageIndex?: number;
		pageSize?: number;
		current?: number;
	}
}
