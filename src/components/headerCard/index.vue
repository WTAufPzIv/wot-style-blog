<template>
	<div class="head-card-wrapper">
		<div class="c-w-100 nasa">
			<div class="nasa-card c-w-100" @click="handleOpenDetail">
				<img :src="nasaImage" alt="" />
				<div class="nasa-card__content">
					<p>每日NASA{{ nasaTitle }}</p>
					<span :class="isMobile ? 'mo-desc' : 'pc-desc'">{{ nasaText }}</span>
				</div>
			</div>
		</div>
		<div class="c-w-100 line2" :isMobile="isMobile">
			<div class="hm-dailly">
				<img ref="HmImageRef" :src="harImage" alt="" />
				<div class="hm-dailly__content">
					<p>哈佛艺术博物馆</p>
					<span>每日藏品</span>
				</div>
			</div>
			<div class="hm-dailly"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getDailyHarvardMuseumsDate, getDailyNasaDate } from "@/api/modules/external_InstitutionFiling";
import { isValidJson } from "@/utils/common";
import { triggerImageDetailHook } from "@/components/imageBlogDetail/trigger";
import useDevice from "@/hook/window";
import axios from "axios";

const { isMobile } = useDevice();
// nasa
const nasaImage = ref("");
const nasaText = ref("");
const nasaTitle = ref("");
const nasaDate = ref("");
const nasaTrans = ref("");
// harvardMuseum
const harImage = ref("");
const harRawJson = ref("");
const HmImageRef = ref();
const { openImageDialog } = triggerImageDetailHook();

async function fetchDailyNasa() {
	const res = await getDailyNasaDate();
	if (isValidJson(res.data)) {
		const raw = JSON.parse(res.data as string);
		nasaImage.value = raw.url;
		nasaText.value = raw.explanation;
		nasaTrans.value = raw.transedText;
		nasaDate.value = raw.date;
		nasaTitle.value = `(${raw.title})`;
	}
}

async function fetchHarvardMuseumsData() {
	const res = await getDailyHarvardMuseumsDate();
	if (isValidJson(res.data)) {
		harRawJson.value = res.data as string;
		const raw = JSON.parse(res.data as string);
		console.log(raw);
		raw.images[0].idsid && (harImage.value = `https://ids.hvrd.art/ids/view/${raw.images[0].idsid}?width=500&height=500`);
	}
}

async function handleOpenDetail() {
	openImageDialog({
		title: `每日NASA${nasaTitle.value}`,
		text: nasaTrans.value
			? [nasaText.value + "(数据来源：NASA APOD)", nasaTrans.value]
			: [nasaText.value + "(数据来源：NASA APOD)"],
		images: nasaImage.value ? [nasaImage.value] : [],
		time: "更新时间：" + nasaDate.value
	});
}

onMounted(() => {
	fetchDailyNasa();
	fetchHarvardMuseumsData();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
