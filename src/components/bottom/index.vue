<template>
	<div class="bottom-wrapper">
		<div class="left">
			<div class="title">
				<n-icon size="30" :component="Heart" />
				<p>特别鸣谢</p>
			</div>
			<div class="left-item">
				<img src="@/assets/images/nasalogo.png" alt="" />
				<div class="left-text">
					<p class="left-itemtitle">美国国家航天局</p>
					<p class="left-itemdesc">每日天文图片API数据提供</p>
				</div>
			</div>
			<div class="left-item">
				<img src="@/assets/images/nasalogo.png" alt="" />
				<div class="left-text">
					<p class="left-itemtitle">哈佛大学艺术博物馆</p>
					<p class="left-itemdesc">馆藏品API数据提供</p>
				</div>
			</div>
			<div class="left-item">
				<img src="@/assets/images/nasalogo.png" alt="" />
				<div class="left-text">
					<p class="left-itemtitle">美国国家地理杂志中文网</p>
					<p class="left-itemdesc">每日图片API数据提供</p>
				</div>
			</div>
			<div class="left-item">
				<img src="@/assets/images/nasalogo.png" alt="" />
				<div class="left-text">
					<p class="left-itemtitle">腾讯元宝智能体</p>
					<p class="left-itemdesc">英文内容AI翻译技术支持</p>
				</div>
			</div>
		</div>
		<div class="center"></div>
		<div class="right"></div>
	</div>
</template>

<script setup lang="ts">
import { Heart } from "@vicons/ionicons5";
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
