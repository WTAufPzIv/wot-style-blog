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
		<!--		<div class="c-w-100 line2">-->
		<!--			<div class="c-w-25"></div>-->
		<!--			<div class="c-w-25"></div>-->
		<!--			<div class="c-w-25"></div>-->
		<!--			<div class="c-w-25"></div>-->
		<!--		</div>-->
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getDailyNasaDate } from "@/api/modules/external_InstitutionFiling";
import { isValidJson } from "@/utils/common";
import { triggerImageDetailHook } from "@/components/imageBlogDetail/trigger";
import useDevice from "@/hook/window";

const { isMobile } = useDevice();
const nasaImage = ref("");
const nasaText = ref("");
const nasaTitle = ref("");
const nasaDate = ref("");
const nasaTrans = ref("");
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

async function handleOpenDetail() {
	openImageDialog({
		title: `每日NASA${nasaTitle.value}`,
		text: nasaTrans.value ? [nasaText.value, nasaTrans.value] : [nasaText.value],
		images: nasaImage.value ? [nasaImage.value] : [],
		time: "更新时间：" + nasaDate.value
	});
}

onMounted(() => {
	fetchDailyNasa();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
