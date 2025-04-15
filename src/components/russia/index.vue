<template>
	<div class="russia-wrapper">
		<div class="machine-wrapper">
			<div class="game-inner">
				<div v-for="(x, index) in statusBox" :key="index" class="line-x">
					<div
						v-for="(y, indexx) in (x | downBox[index]).toString(2).padStart(10, '0')"
						:key="indexx"
						class="item-y"
						:style="{ background: y === '1' ? '#FF9920' : '' }"
					>
						{{ y }}
					</div>
				</div>
			</div>
			<div class="line-count">
				<span>已消除</span>
				<p>{{ linePointer }}</p>
			</div>
			<div class="next">
				<p></p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useMessage } from "naive-ui";

const statusBox = ref(new Array(24).fill(0));
const downBox = ref(new Array(24).fill(0));
const linePointer = ref(3);
const message = useMessage();
const startPayload = [
	[16, 16, 16, 16], // I
	[0, 0, 48, 48], // O
	[0, 0, 16, 56], // T
	[0, 0, 48, 24], // S
	[0, 0, 48, 48], // Z
	[0, 0, 16, 56], // J
	[0, 0, 16, 56] // L
];

function generalRandomStart() {
	downBox.value = new Array(24).fill(0);
	linePointer.value = 3;
	const randomItem = startPayload[Math.floor(Math.random() * startPayload.length)];
	for (let i = 0; i < 4; i++) {
		downBox.value[i] = randomItem[i];
	}
}

function removeLeadingZeros(arr) {
	// 提取所有非零项
	let nonZero = arr.filter(num => num !== 0);

	// 计算原数组中的零
	let zeros = arr.filter(num => num === 0);

	// 保证最前面保留一个零（如果原始数组最开始有零）
	if (zeros.length > 0) {
		zeros = [0].concat(zeros.slice(1)); // 保证非首位零不被丢弃
	}

	// 合并结果：前面的零 + 所有的非零项
	return zeros.concat(nonZero);
}

function handleLeft() {
	let hasGetCorder = false;
	const newDowmBox = downBox.value.map(item => {
		if (item & 512) hasGetCorder = true;
		return item << 1;
	});
	!hasGetCorder && (downBox.value = newDowmBox);
}

function handleRight() {
	let hasGetCorder = false;
	const newDowmBox = downBox.value.map(item => {
		if (item & 1) hasGetCorder = true;
		return item >> 1;
	});
	!hasGetCorder && (downBox.value = newDowmBox);
}

function handleRotate() {
	// 提取当前活动方块的二进制位数据
	const activeShape = downBox.value.slice(0, 4).map(num => num.toString(2).padStart(10, "0").split(""));

	// 矩阵顺时针旋转算法
	const rotated = activeShape[0].map((_, i) => activeShape.map(row => row[row.length - 1 - i]));

	// 将旋转后的矩阵转换为数值
	const rotatedNumbers = rotated.map(row => parseInt(row.join("").padEnd(10, "0"), 2));

	// 碰撞检测
	const isValid = rotatedNumbers.every((num, i) => (num & statusBox.value[i]) === 0 && num.toString(2).length <= 10);

	// 更新数据
	if (isValid) {
		rotatedNumbers.forEach((num, i) => (downBox.value[i] = num));
	}
}

function handleMerge() {
	let newStatusBox: any = [];
	for (let i = downBox.value.length - 1; i >= 0; i--) {
		newStatusBox[i] = downBox.value[i] | statusBox.value[i];
		if (newStatusBox[i] === 1023) {
			newStatusBox[i] = 0;
		}
	}
	statusBox.value = removeLeadingZeros(newStatusBox);
	downBox.value = new Array(24).fill(0);
	if (statusBox.value[4] !== 0) {
		message.warning("游戏结束");
	} else {
		generalRandomStart();
	}
}

function handleDown() {
	let hasStock = false;
	if ((downBox.value[linePointer.value] & statusBox.value[linePointer.value + 1]) !== 0) hasStock = true;
	if (hasStock) {
		handleMerge();
	}
	if (!hasStock) {
		downBox.value = [0].concat(downBox.value.slice(0, -1));
		linePointer.value++;
		if ((downBox.value[linePointer.value] & statusBox.value[linePointer.value + 1]) !== 0 || linePointer.value === 23)
			handleMerge();
	}
}

function init() {
	downBox.value = new Array(24).fill(0);
	statusBox.value = new Array(24).fill(0);
	generalRandomStart();
}

onMounted(() => {
	init();
	document.onkeydown = (e: any) => {
		e = window.event || e;
		console.log(e.code);
		if (e.code === "ArrowLeft") handleLeft();
		if (e.code === "ArrowRight") handleRight();
		if (e.code === "ArrowDown") handleDown();
		if (e.code === "ArrowUp") handleRotate();
	};
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
