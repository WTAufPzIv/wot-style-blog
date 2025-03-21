import { localGet } from "~/utils/common";

export const useNasaDateImageHook = () => {
	function isSameDay(timestamp1: string | number, timestamp2: string | number) {
		const date1 = new Date(timestamp1);
		const date2 = new Date(timestamp2);

		return (
			date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
		);
	}
	const fetchDaily = async () => {
		const localNasaData = localGet("NASA_DATE_IMAGE");
		if (localNasaData) {
			if (localNasaData.timestamp && isSameDay(localNasaData.timestamp, new Date().getTime())) return localNasaData;
		}
	};
	onMounted(async () => {
		if (process.client) return;
		await fetchDaily();
	});
};
