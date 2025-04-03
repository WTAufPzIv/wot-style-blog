import JSEncrypt from "jsencrypt";

export const isValidJson = (json: any) => {
	if (!json) return false;
	if (typeof json !== "string") return false;
	try {
		const res = JSON.parse(json);
		return typeof res === "object";
	} catch {
		return false;
	}
};

export function localGet(key: string) {
	const value = localStorage.getItem(key);
	if (isValidJson(value)) return JSON.parse(value!);
	return value;
}

export function localPut(key: string, value: any) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function base64Encode(str: string) {
	const encoder = new TextEncoder();
	const data = encoder.encode(str);
	return btoa(String.fromCharCode(...data));
}

export function rsaEncrypt(msg, key) {
	const jsencrypt = new JSEncrypt();
	jsencrypt.setPublicKey(key);
	const encryptMsg = jsencrypt.encrypt(msg);
	return encryptMsg;
}

/**
 * @param timeout 睡眠时间
 */
export async function sleep(timeout: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, timeout));
}
