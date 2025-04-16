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

export function getRandomColor() {
	let color;
	let r, g, b;

	do {
		// 随机生成 RGB 值，范围从 0 到 255
		r = Math.floor(Math.random() * 256);
		g = Math.floor(Math.random() * 256);
		b = Math.floor(Math.random() * 256);

		// 计算颜色的亮度（亮度公式：0.299*R + 0.587*G + 0.114*B）
		let brightness = 0.299 * r + 0.587 * g + 0.114 * b;

		// 确保亮度不接近黑色或灰色（避免颜色太暗）
		if (brightness < 100 || Math.abs(r - g) < 30 || Math.abs(g - b) < 30 || Math.abs(b - r) < 30) {
			continue; // 如果是黑灰色或者过于接近，重新生成
		}

		// 生成 16 进制颜色
		color = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
		break;
	} while (true);

	return color;
}
