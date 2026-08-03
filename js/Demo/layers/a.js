// 一个带有成就的侧边层，没有声望
addLayer("a", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "yellow",
    resource: "成就点数", 
    row: "side",
    tooltip() { // 可选，当层被锁定时显示提示
        return ("成就")
    },
    achievementPopups: true,
    achievements: {
        11: {
            image: "discord.png",
            name: "抓住我！",
            done() {return true}, // 这个是免费的
            goalTooltip: "这是怎么发生的？", // 当成就未完成时显示
            doneTooltip: "你做到了！", // 当成就完成时显示
        },
        12: {
            name: "不可能！",
            done() {return false},
            goalTooltip: "哈哈哈！", // 当成就未完成时显示
            doneTooltip: "怎么做到的？？？", // 当成就完成时显示
            textStyle: {'color': '#04e050'},
        },
        13: {
            name: "EIEIO",
            done() {return player.f.points.gte(1)},
            tooltip: "获得一个农场点数。\n\n奖励：恐龙现在成为你的朋友（你可以将农场点数加到上限）。", // 当成就完成时显示
            onComplete() {console.log("Bork bork bork!")}
        },
    },
    midsection: ["grid", "blank"],
    grid: {
        maxRows: 3,
        rows: 2,
        cols: 2,
        getStartData(id) {
            return id
        },
        getUnlocked(id) { // 默认
            return true
        },
        getCanClick(data, id) {
            return player.points.eq(10)
        },
        getStyle(data, id) {
            return {'background-color': '#'+ (data*1234%999999)}
        },
        onClick(data, id) { // 别忘了 onHold
            player[this.layer].grid[id]++
        },
        getTitle(data, id) {
            return "网格 #" + id
        },
        getDisplay(data, id) {
            return data
        },
    },
},
)