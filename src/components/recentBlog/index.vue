<template>
	<div class="recent-wrapper">
		<div class="recent-list-wrapper" :isMobile="isMobile">
			<div class="recent-item" v-for="item in mockarr" :key="item">
				<div class="recent-container">
					<div class="image-and-title">
						<img :src="item.headurl" alt="" @click="gotoBlogDetail" />
						<p :isMobile="isMobile" @click="gotoBlogDetail">
							<span class="title">{{ item.title }}</span>
							<span class="time">{{ item.time }}</span>
						</p>
					</div>
					<div class="mini-pre">
						<div class="mini-content">{{ item.minipre }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="more-btn mt20">
			<div class="common-button-default" @click="gotoBlogList">查看更多</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import useDevice from "@/hook/window";

const { isMobile } = useDevice();
const mockarr = new Array<any>(6).fill({
	headurl: "https://huohuo90.com:3001/files/1737448617324.png",
	title: "这是标题",
	time: "2025-01-01",
	minipre:
		"这是一堆正文，这是一堆正文，这是一堆正文，这是一堆正文，这是一堆正文，这是一堆正文,这是一堆正文，这是一堆正文，这是一堆正文，这是一堆正文，这是一堆正文，这是一堆正文,这是一堆正文，这是一堆正文，这是一堆正文，这是一堆正文，这是一堆正文，这是一堆正文",
	desc: "技术/前端"
});

function gotoBlogDetail(rows) {}

function gotoBlogList() {}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
