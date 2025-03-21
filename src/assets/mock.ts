export const testMd = `
---
date: 2020-04-10
categories: [技术,计算机通识,数据结构与算法]
thumbnail: /images/fe/leetcode.jpg
toc: true
---

# 打家劫舍（难度：简单）
你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。

示例 1:

>输入: [1,2,3,1]
输出: 4
解释: 偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。

示例 2:

>输入: [2,7,9,3,1]
输出: 12
解释: 偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。

<!--more-->

这道题是一道很简单却又是很经典的动态规划，其大体的过程就是维护一个记忆数组dp，dp[i]表示截止到第i家房屋可以偷到的最大金额。

举个例子：[1, 2, 3]，截止到第一家，能偷到的最大金额当然就是1，截止到第二家，偷到的最大金额就是1和2的最大值，当然就是2，而偷到第三家时，无非有两种选择，偷第二家或者偷第一家和第三家。这个例子下两种选择可偷的金额分别是2和4，所以截止到第三家，可以偷到的最大金额就是4。

有了这个过程，我们只需要初始化dp数组的前两项，之后的项使用\`\`\`dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])\`\`\`更新即可

代码如下：
\`\`\`js
var rob = function(nums) {
    let len = nums.length,
    dp = new Array(len)

    if(len === 0) return 0
    if(len === 1) return nums[0]
    if(len === 2) return Math.max(nums[0], nums[1])

    dp[0] = nums[0]
    dp[1] = Math.max(nums[0], nums[1])

    for(let i = 2; i < len; i++){
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
    }
    return dp[len - 1]
};
\`\`\`

# 打家劫舍2（难度：中等）
题目和之前一样，唯一的不同是，现在第一家和最后一家是相连的，所有屋子连成了一个圈，依然遵守老规则

那么核心原则就是：第一个和最后一个不能同时抢。 所以：要么不抢第一个，要么不抢最后一个。 所以其实就是把环拆成两个队列，一个是从0到n-1，另一个是从1到n，然后返回两个结果最大的。

代码如下;
\`\`\`js
var rob1 = function(nums) {
    let len = nums.length,
    dp = new Array(len)

    if(len === 0) return 0
    if(len === 1) return nums[0]
    if(len === 2) return Math.max(nums[0], nums[1])

    dp[0] = nums[0]
    dp[1] = Math.max(nums[0], nums[1])

    for(let i = 2; i < len; i++){
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
    }
    return dp[len - 1]
};

var rob = function(nums) {
    if(nums.length === 1) return nums[0]
    return Math.max(rob1(nums.slice(0, nums.length - 1)), rob1(nums.slice(1, nums.length)))
};
\`\`\`
`;
