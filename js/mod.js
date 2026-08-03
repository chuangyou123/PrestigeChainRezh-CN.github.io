let modInfo = {
	name: "The Prestige Chain",
	author: "piss master",
	pointsName: "美元",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // 用于硬重置和新玩家
	offlineLimit: 0,  // 小时数
}

// 在这里设置你的版本号和名称
let VERSION = {
	num: "0.0",
	name: "房租租赁。太棒了兄弟",
}

let changelog = `<h1>更新日志：</h1><br>
	<h3>v0.0</h3><br>
		- 你获得了一个层。不错！<br>
	`

let winText = `不，兄弟真的在问他在哪里拿到任天堂Switch的NES。不，兄弟可能来自俄亥俄州。俄亥俄州迈克尔兄弟啊这可疑。那兄弟可疑骷髅表情骷髅表情笑表情`

// 如果你在层内添加了任何新函数，并且这些函数在被调用时有影响，请在这里添加它们。
// （这里的例子仅供参考，所有官方函数都已处理）
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// 决定是否显示每秒点数
function canGenPoints(){
	return true
}

// 计算每秒点数！
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	if (hasUpgrade("r",11)) gain = gain.plus(1) // 基础收益，记得始终将其放在所有收益加成的底部
	if (hasUpgrade("r",31)) gain = gain.plus(1)
	if (hasUpgrade("r",12)) gain = gain.times(upgradeEffect("r",12))
	if (hasUpgrade("r",13)) gain = gain.times(upgradeEffect("r",13))
	if (hasUpgrade("r",23)) gain = gain.pow(upgradeEffect("r",23))
	if (hasUpgrade("r",32)) gain = gain.times(upgradeEffect("r",32))
	if (hasUpgrade("r",33)) gain = gain.pow(upgradeEffect("r",33))
	return gain
}

// 你可以在这里添加与层无关的变量，这些变量应放入"player"并保存，以及默认值
function addedPlayerData() { return {
}}

// 在页面顶部显示额外内容
var displayThings = [
]

// 决定游戏何时"结束"
function isEndgame() {
	return player.points.gte(new Decimal("10000000"))
}



// 从这里开始是不太重要的内容！

// 背景样式，可以是函数
var backgroundStyle = {

}

// 如果你有可能会被长时间刻度影响的内容，可以更改此设置
function maxTickLength() {
	return(3600) // 默认是1小时，这只是一个任意大的值
}

// 如果你需要从旧版本中撤销通货膨胀，请使用此函数。如果版本比修复问题的版本旧，
// 你可以用此函数限制他们当前的资源。
function fixOldSave(oldVersion){
}