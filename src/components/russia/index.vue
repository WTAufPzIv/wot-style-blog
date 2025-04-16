<template>
	<div class="russia-wrapper">
		<div class="machine-wrapper">
			<div class="game-inner">
				<div v-for="(x, index) in statusBox" :key="index" class="line-x">
					<div
						v-for="(y, indexx) in (x | downBox[index]).toString(2).padStart(10, '0')"
						:key="indexx"
						class="item-y"
						:style="{ background: y === '1' ? 'rgb(55, 251, 207)' : '' }"
					></div>
				</div>
			</div>
			<div class="score-count">
				<span>总得分</span>
				<p>{{ totalCount }}</p>
			</div>
			<div class="line-count">
				<span>消除行数</span>
				<p>{{ totalLine }}</p>
			</div>
			<div class="pause-play" @click="handleStartGame" v-if="isPause">
				<n-icon size="40">
					<Play />
				</n-icon>
			</div>
			<div class="pause-play" @click="handlePauseGame" v-else>
				<n-icon size="40">
					<Pause />
				</n-icon>
			</div>
			<div class="restart-play" @click="generalRestartGame()">
				<n-icon size="40">
					<RestartAltFilled />
				</n-icon>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useMessage } from "naive-ui";
import { getRandomColor, sleep } from "@/utils/common";
import { onBeforeRouteLeave } from "vue-router";
import { Play, Pause } from "@vicons/ionicons5";
import { RestartAltFilled } from "@vicons/material";

const statusBox = ref(new Array(24).fill(0));
const downBox = ref(new Array(24).fill(0));
const currentBlockColor = ref("#FF9920");
const linePointer = ref(3);
const message = useMessage();
const totalCount = ref(0);
const totalLine = ref(0);
const isPause = ref(true);
// 预定义所有方块类型的旋转状态
// 此处定义的旋转状态遵循一个原则：即旋转不会占用向下的空间
const shapeRotations = [
	[
		// I 型（0）
		[16, 16, 16, 16], // 竖直状态
		[0, 0, 0, 120], // 水平状态（960）
		[16, 16, 16, 16], // 再次竖直
		[0, 0, 0, 120] // 再次水平
	],
	[
		// O 型（1）
		[0, 0, 48, 48], // 所有旋转状态相同
		[0, 0, 48, 48],
		[0, 0, 48, 48],
		[0, 0, 48, 48]
	],
	[
		// T 型（2）
		[0, 0, 16, 56], // 原始状态
		[0, 32, 48, 32], // 顺时针90°
		[0, 0, 56, 16], // 180°
		[0, 32, 96, 32] // 270°
	],
	[
		// S 型（3）
		[0, 0, 48, 24], // 原始状态
		[0, 16, 48, 32], // 顺时针90°
		[0, 0, 48, 24],
		[0, 16, 48, 32]
	],
	[
		// Z 型（4）
		[0, 0, 24, 48], // 原始状态
		[0, 32, 48, 16], // 顺时针90°
		[0, 0, 24, 48],
		[0, 32, 48, 16]
	],
	[
		// J 型（5）
		[0, 16, 16, 48], // 原始状态
		[0, 0, 64, 112], // 顺时针90°
		[0, 48, 32, 32], // 180°
		[0, 0, 112, 16] // 270°
	],
	[
		// L 型（6）
		[0, 32, 32, 48], // 原始状态
		[0, 0, 112, 64], // 顺时针90°
		[0, 48, 16, 16], // 180°
		[0, 0, 16, 112] // 270°
	]
];
// 新增变量记录当前方块类型和旋转状态
const currentShapeIndex = ref(0);
const currentRotation = ref(0);

function generalRandomStart() {
	downBox.value = new Array(24).fill(0);
	linePointer.value = 3;
	const randomIndexX = Math.floor(Math.random() * shapeRotations.length);
	const randomIndexY = Math.floor(Math.random() * 4);
	currentShapeIndex.value = randomIndexX;
	currentRotation.value = randomIndexY;
	const randomItem = shapeRotations[randomIndexX][randomIndexY];
	for (let i = 0; i < 4; i++) {
		downBox.value[i] = randomItem[i];
	}
	currentBlockColor.value = getRandomColor();
}

// 判断num2是否可以通过num1移位运算得到
function getShiftAmount(num1, num2) {
	// 如果 num1 和 num2 相等，返回 0
	if (num1 === num2) {
		return 0;
	}
	// 检查是否可以通过左移得到 num2
	let leftShift = num2 / num1;
	if (leftShift === 2 ** Math.floor(Math.log2(leftShift))) {
		return Math.log2(leftShift); // 左移多少位
	}
	// 检查是否可以通过右移得到 num2
	let rightShift = num1 / num2;
	if (rightShift === 2 ** Math.floor(Math.log2(rightShift))) {
		return -Math.log2(rightShift); // 右移多少位
	}
	// 如果无法通过移位得到，返回 0
	return 0;
}

function removeLeadingZeros(arr) {
	// 提取所有非零项
	let nonZero = arr.filter(num => num !== 0);
	// 提取原数组中的零
	let zeros = arr.filter(num => num === 0);
	// 计算首位零之后的零的个数
	// 找到第一个非零项的位置
	let firstNonZeroIndex = arr.findIndex(num => num !== 0);
	// 如果没有非零项，整个数组就是零
	let leadingZeros = firstNonZeroIndex !== -1 ? firstNonZeroIndex : 0;
	// 计算中间消除的零个数
	let removedZeros = zeros.length - leadingZeros;
	// 保证最前面保留一个零（如果原始数组最开始有零）
	if (leadingZeros > 0) {
		zeros = [0].concat(zeros.slice(1)); // 保证非首位零不被丢弃
	}
	// 合并结果：前面的零 + 所有的非零项
	let resultArray = zeros.concat(nonZero);
	// 返回包含结果数组和消除的零个数的对象
	return {
		resultArray: resultArray,
		removedZeros: removedZeros
	};
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
	if (linePointer.value <= 3) return;
	// 核心思路，利用linePointer得到当前方块所在的行数
	// 然后利用当前方块选择指针和旋转角度指针得到当前方块的原始状态（就是正中间）
	const currentBlock = shapeRotations[currentShapeIndex.value][currentRotation.value];
	const newBlock =
		shapeRotations[currentShapeIndex.value][
			currentRotation.value + 1 > 3 ? (currentRotation.value = 0) : (currentRotation.value += 1)
		];
	// 分别取出原始样式和当前下落方块的最后一行，通过二进制位移对比得出相较于原始状态，当前下落方块左右移动的距离
	const offset = getShiftAmount(downBox.value[linePointer.value], currentBlock[3]);
	// 此时先进行旋转，得到旋转后的图在最中间的状态
	for (let i = 0; i < 4; i++) {
		downBox.value[linePointer.value - i] = newBlock[3 - i];
	}
	// 根据上面求得的位移，调用左移或右移函数，将方块放到正确的位置，同时可以避免碰撞穿模
	for (let i = 0; i < Math.abs(offset); i++) {
		offset < 0 && handleLeft();
		offset > 0 && handleRight();
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
	const { resultArray, removedZeros } = removeLeadingZeros(newStatusBox);
	totalLine.value += removedZeros;
	// 求平方
	totalCount.value += Math.pow(removedZeros, 2) * 100;
	statusBox.value = resultArray;
	downBox.value = new Array(24).fill(0);
	// 顶部溢出视为游戏结束
	if (statusBox.value[3] !== 0) {
		message.warning("游戏结束");
	} else {
		generalRandomStart();
	}
}

function handleDown(isAuto = true) {
	if (isPause.value) return;
	let hasStock = false;
	if ((downBox.value[linePointer.value] & statusBox.value[linePointer.value + 1]) !== 0) hasStock = true;
	if (hasStock) {
		// 如果开局就卡住则直接执行合并
		handleMerge();
	} else {
		// 否则先执行一次下落
		downBox.value = [0].concat(downBox.value.slice(0, -1));
		linePointer.value++;
		// 下落完毕后检测是否卡住
		// 如果卡住了，则执行合并
		if ((downBox.value[linePointer.value] & statusBox.value[linePointer.value + 1]) !== 0 || linePointer.value === 23) {
			handleMerge();
		}
		// 仅非用户手动下落时启动下一次自动下落
		isAuto &&
			nextTick(async () => {
				await sleep(1000);
				handleDown(true);
			});
	}
}

function init() {
	downBox.value = new Array(24).fill(0);
	statusBox.value = new Array(24).fill(0);
	generalRandomStart();
	totalCount.value = 0;
	totalLine.value = 0;
	isPause.value = true;
}

function stop() {
	downBox.value = new Array(24).fill(0);
}

function handleStartGame() {
	isPause.value = false;
	handleDown();
}

function handlePauseGame() {
	isPause.value = true;
}

function generalRestartGame() {
	init();
	isPause.value = false;
	nextTick(() => {
		handleDown();
	});
}

onMounted(() => {
	init();
	document.onkeydown = (e: any) => {
		e = window.event || e;
		console.log(e.code);
		if (e.code === "ArrowLeft") handleLeft();
		if (e.code === "ArrowRight") handleRight();
		if (e.code === "ArrowDown") handleDown(false);
		if (e.code === "ArrowUp") handleRotate();
	};
});

onBeforeRouteLeave(() => {
	stop();
});

onBeforeUnmount(() => {
	stop();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
