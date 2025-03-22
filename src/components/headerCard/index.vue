<template>
	<div class="head-card-wrapper">
		<div class="c-w-100 line1">
			<div class="c-w-100">
				<img :src="nasaImage" alt="" />
				<div>
					<p>每日NASA{{ nasaTitle }}</p>
					<span>{{ nasaText }}</span>
				</div>
			</div>
		</div>
		<div class="c-w-100 line2">
			<div class="c-w-25"></div>
			<div class="c-w-25"></div>
			<div class="c-w-25"></div>
			<div class="c-w-25"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getDailyNasaDate } from "@/api/modules/external_InstitutionFiling";
import { isValidJson } from "@/utils/common";

const nasaImage = ref("");
const nasaText = ref("");
const nasaTitle = ref("");

async function fetchDailyNasa() {
	const res = await getDailyNasaDate();
	if (isValidJson(res.data)) {
		const raw = JSON.parse(res.data as string);
		console.log(raw);
		nasaImage.value = raw.url;
		nasaText.value = raw.explanation;
		nasaTitle.value = `(${raw.title})`;
	}
}

onMounted(() => {
	fetchDailyNasa();
});
</script>

<style scoped lang="scss">
.head-card-wrapper {
	width: 100%;
	.line1 {
		display: flex;
		flex-direction: row;
		padding: 12px;
		box-sizing: border-box;
		position: relative;
		div {
			height: 400px;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			position: relative;
			user-select: none;
			&:hover {
				img {
					width: 105%;
				}
			}
			img {
				width: 100%;
				height: auto;
				transition: all 0.6s ease-in-out;
			}
			div {
				position: absolute;
				color: $common-font-color;
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				padding: 24px;
				box-sizing: border-box;
				p {
					font-size: 48px;
					font-weight: bold;
					margin-bottom: 12px;
					cursor: pointer;
				}
				span {
					display: inline-block;
					width: 70%;
					height: 50%;
					overflow: hidden;
					text-overflow: ellipsis;
					line-height: 24px;
					letter-spacing: 2px;
				}
			}
		}
	}
	.line2 {
		display: flex;
		flex-direction: row;
		padding: 12px;
		box-sizing: border-box;
		div {
			background: yellow;
			height: 300px;
		}
	}
}
</style>
