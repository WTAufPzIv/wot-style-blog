<template>
	<div class="dialog-wrapper">
		<div class="content-wrapper" :isMobile="isMobile">
			<n-carousel show-arrow>
				<n-image v-for="item in images" :key="item" :src="item" alt="" />
				<template #arrow="{ prev, next }">
					<div class="custom-arrow">
						<button type="button" class="custom-arrow--left" @click="prev">
							<n-icon><ArrowBack /></n-icon>
						</button>
						<button type="button" class="custom-arrow--right" @click="next">
							<n-icon><ArrowForward /></n-icon>
						</button>
					</div>
				</template>
				<template #dots="{ total, currentIndex, to }">
					<ul class="custom-dots">
						<li
							v-for="index of total"
							:key="index"
							:class="{ ['is-active']: currentIndex === index - 1 }"
							@click="to(index - 1)"
						/>
					</ul>
				</template>
			</n-carousel>
			<div class="desc-wrapper" v-if="entryFrom === 'museum'">
				<p class="title">{{ title }}</p>
				<p class="time">朝代：{{ text1 || "无数据" }}</p>
				<p class="time">时期：{{ text2 || "无数据" }}</p>
				<p class="time">类型：{{ text3 || "无数据" }}</p>
				<p class="time">出版：{{ text4 || "无数据" }}</p>
				<p class="time">入库：{{ text5 || "无数据" }}年</p>
			</div>
			<div class="desc-wrapper" v-if="entryFrom === 'geographic'">
				<p class="title">{{ title }}</p>
				<p class="time">{{ text1 || "无数据" }}</p>
			</div>
		</div>
		<data-source :style="{ maxWidth: '1280px' }" v-if="dataSource" v-bind="dataSource" class="mt50"></data-source>
	</div>
</template>

<script setup lang="ts">
import useDevice from "@/hook/window";
import { ArrowBack, ArrowForward } from "@vicons/ionicons5";
import DataSource from "@/components/dataSource/index.vue";

const props = withDefaults(
	defineProps<{
		entryFrom: "museum" | "geographic";
		title: string;
		text1: string;
		text2: string;
		text3: string;
		text4: string;
		text5: string;
		images: string[];
		dataSource?: {
			url?: string;
			urlName: string;
		};
	}>(),
	{
		entryFrom: "museum"
	}
);

const { isMobile } = useDevice();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
