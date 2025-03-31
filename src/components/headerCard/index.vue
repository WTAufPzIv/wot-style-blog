<template>
	<div class="head-card-wrapper">
		<div class="c-w-100 nasa">
			<div v-if="nasaText" class="nasa-card c-w-100" @click="handleOpenNasaDetail">
				<img :src="nasaImage" alt="" />
				<div class="nasa-card__content">
					<p>每日NASA{{ nasaTitle }}</p>
					<span :class="isMobile ? 'mo-desc' : 'pc-desc'">{{ nasaText }}</span>
				</div>
			</div>
			<n-skeleton v-else class="nasa-card c-w-100" />
		</div>
		<div class="c-w-100 line2" :isMobile="isMobile">
			<div class="hm-dailly" @click="handleOpenMuseumsDetail">
				<img :src="harImage" alt="" />
				<div class="hm-dailly__content">
					<p>哈佛艺术博物馆</p>
					<span>每日藏品</span>
				</div>
			</div>
			<div class="hm-dailly" @click="handleOpenNgDetail">
				<img :src="ngImage" alt="" />
				<div class="hm-dailly__content">
					<p>美国国家地理杂志</p>
					<span>每日一图</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
	getDailyHarvardMuseumsDate,
	getDailyNasaDate,
	getDailyNationalGeographicDate
} from "@/api/modules/external_InstitutionFiling";
import { isValidJson } from "@/utils/common";
import { triggerImageDetailHook } from "@/components/imageBlogDetail/trigger";
import useDevice from "@/hook/window";
import { triggerMuseumsItemDetailHook } from "@/components/museumItemDetail/trigger";

const { isMobile } = useDevice();
// nasa
const nasaImage = ref("");
const nasaText = ref("");
const nasaTitle = ref("");
const nasaDate = ref("");
const nasaTrans = ref("");
// harvardMuseum
const harImage = ref("");
const harRawJson = ref();
// nationalGeographic
const ngImage = ref("");
const ngRawJson = ref();
const { openImageDialog } = triggerImageDetailHook();
const { openMuseumItemDialog } = triggerMuseumsItemDetailHook();

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
		harRawJson.value = JSON.parse(res.data as string);
		harRawJson.value.images[0].idsid &&
			(harImage.value = `https://ids.hvrd.art/ids/view/${harRawJson.value.images[0].idsid}?width=500&height=500`);
	}
}

async function fetchNationalGeographicData() {
	const res = await getDailyNationalGeographicDate();
	if (isValidJson(res.data)) {
		ngRawJson.value = JSON.parse(res.data as string);
		ngRawJson.value[0]?.pic && (ngImage.value = ngRawJson.value[0]?.pic);
	}
}

async function handleOpenNasaDetail() {
	openImageDialog({
		title: `每日NASA${nasaTitle.value}`,
		text: nasaTrans.value
			? [nasaText.value + "(数据来源：NASA APOD)", nasaTrans.value]
			: [nasaText.value + "(数据来源：NASA APOD)"],
		images: nasaImage.value ? [nasaImage.value] : [],
		time: "更新时间：" + nasaDate.value,
		dataSource: {
			url: "https://www.nasa.gov/",
			urlName: "美国国家航空航天局（NASA）"
		}
	});
}

async function handleOpenMuseumsDetail() {
	openMuseumItemDialog({
		title: harRawJson.value.transedTitle,
		text1: harRawJson.value.transedPeriod,
		text2: harRawJson.value.transedDated,
		text3: harRawJson.value.transedClassification,
		text4: harRawJson.value.transedProvenance,
		text5: harRawJson.value.accessionyear,
		images: harRawJson.value.images.map(item => {
			return `https://ids.hvrd.art/ids/view/${item.idsid}?width=500&height=500`;
		}),
		dataSource: {
			url: "https://harvardartmuseums.org/",
			urlName: "哈佛大学艺术博物馆"
		}
	});
}

async function handleOpenNgDetail() {
	openMuseumItemDialog({
		title: ngRawJson.value[0].title,
		text1: ngRawJson.value[0].photoer,
		text2: "",
		text3: "",
		text4: "",
		text5: "",
		images: [ngRawJson.value[0].pic],
		dataSource: {
			url: "https://www.ngchina.com.cn/",
			urlName: "美国国家地理杂志中文网（National Geographic）"
		},
		entryFrom: "geographic"
	} as any);
}

onMounted(() => {
	fetchDailyNasa();
	fetchHarvardMuseumsData();
	fetchNationalGeographicData();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
