<template>
	<div class="bottom-wrapper">
		<div class="botttom-container" :isMobile="isMobile">
			<div class="left">
				<div class="title">
					<n-icon size="30" :component="Heart" />
					<p>特别鸣谢</p>
				</div>
				<div class="left-item" @click="handleOpenUrl('https://www.nasa.gov/')">
					<img src="@/assets/images/nasalogo.png" alt="" />
					<div class="left-text">
						<p class="left-itemtitle">美国国家航天局</p>
						<p class="left-itemdesc">每日天文图片API数据提供</p>
					</div>
				</div>
				<div class="left-item" @click="handleOpenUrl('https://harvardartmuseums.org/')">
					<img src="@/assets/images/harvardlogo.png" alt="" />
					<div class="left-text">
						<p class="left-itemtitle">哈佛大学艺术博物馆</p>
						<p class="left-itemdesc">馆藏品API数据提供</p>
					</div>
				</div>
				<div class="left-item" @click="handleOpenUrl('https://www.ngchina.com.cn/')">
					<img src="@/assets/images/nglogo.png" alt="" />
					<div class="left-text">
						<p class="left-itemtitle">美国国家地理杂志中文网</p>
						<p class="left-itemdesc">每日图片API数据提供</p>
					</div>
				</div>
				<div class="left-item" @click="handleOpenUrl('https://yuanbao.tencent.com/')">
					<img src="@/assets/images/yunabaologo.jpg" alt="" />
					<div class="left-text">
						<p class="left-itemtitle">腾讯元宝智能体</p>
						<p class="left-itemdesc">英文内容AI翻译技术支持</p>
					</div>
				</div>
			</div>
			<div class="right">
				<div class="right-top">
					<div class="title">
						<n-icon size="30" :component="LogoLinkedin" />
						<p>友情链接</p>
					</div>
					<div class="right-top-list">
						<div class="right-item">
							<img src="@/assets/images/linghanglogo.png" alt="" />
							<a href="https://www.wustlinghang.cn/" target="_blank">领航工作室</a>
						</div>
						<div class="right-item">
							<img src="@/assets/images/link1.jpg" alt="" />
							<a href="https://www.wuster.vip/" target="_blank">PUKARS(Hong Jiang)的博客</a>
						</div>
						<div class="right-item">
							<img src="@/assets/images/link2.jpg" alt="" />
							<a href="https://blog.csdn.net/qq_43498164" target="_blank">忘忧(ZhengYu Zhao)的博客</a>
						</div>
						<div class="right-item">
							<img src="@/assets/images/link3.jpg" alt="" />
							<a href="https://asche.top/" target="_blank">Asche(ZiJian Wu)的博客</a>
						</div>
						<div class="right-item">
							<img src="@/assets/images/link4.jpg" alt="" />
							<a href="https://blog.csdn.net/qq_40808344" target="_blank">唐流雨(JiaJun Wu)的博客</a>
						</div>
						<div class="right-item">
							<img src="@/assets/images/link5.png" alt="" />
							<a href="https://wustzhh.github.io/Hugo-stack/" target="_blank">zhh(Han Zhang)的博客</a>
						</div>
					</div>
					<div class="title">
						<n-icon size="30" :component="AtCircleSharp" />
						<p>关于作者</p>
					</div>
					<div class="right-bottom-list">
						<div class="title">
							<n-icon size="30" :component="Qq" />
							<p>2459917510</p>
						</div>
						<div class="title">
							<n-icon size="30" :component="LogoWechat" />
							<p>xh2459917510</p>
						</div>
						<div class="title">
							<n-icon size="30" :component="Mail" />
							<p>auroraaksnesos@icloud.com</p>
						</div>
						<div class="title">
							<n-icon size="30" :component="LogoGithub" />
							<p><a href="https://github.com/WTAufPzIv/WTAufPzIv.github.io" target="_blank">WTAufPzIv</a></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Heart, LogoLinkedin, LogoWechat, Mail, LogoGithub, AtCircleSharp } from "@vicons/ionicons5";
import { Qq } from "@vicons/fa";
import useDevice from "@/hook/window";

const { isMobile } = useDevice();

function handleOpenUrl(url: string) {
	window.open(url, "_blank");
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
