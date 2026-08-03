addLayer("r", {
    name: "房间", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#b69c2cff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "房间", // Name of prestige currency
    baseResource: "美元", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("r",21)) mult = mult.times(upgradeEffect("r",21))
        if (hasUpgrade("r",22)) mult = mult.times(upgradeEffect("r",22))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: 重置以获取房间", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades:{
        11:{
            title: "房间出租",
            description: "把你的房间以每秒一美元的价格租出去。可能严重超收了。",
            cost: new Decimal(1)
        },
        12:{
            title: "竞价租金",
            description: "房间数量提升美元获取速度。", // sqrt(rooms+1)
            cost: new Decimal(1),
            effect(){
                let eff = player.r.points.add(1).pow(0.5)
                return eff
            },
            effectDisplay(){return format(tmp.r.upgrades[12].effect)+"x"},
            unlocked(){return hasUpgrade("r",11)}
        },
        13:{
            title: "装修",
            description: "美元数量提升美元获取速度。",
            cost: new Decimal(3),
            effect(){
                let eff = new Decimal(1).plus(player.points.plus(1).log(2).times(0.2)) // 1+0.2*lb(dollars+1)
                return eff
            },
            effectDisplay(){return format(tmp.r.upgrades[13].effect)+"x"},
            unlocked(){return hasUpgrade("r",12)}
        },
        21:{
            title: "值得信赖的服务",
            description: "房间数量提升房间获取速度。",
            cost: new Decimal(10),
            effect(){
                let eff = player.r.points.add(1).pow(0.25) // 4th root(rooms+1)
                return eff
            },
            effectDisplay(){return format(tmp.r.upgrades[21].effect)+"x"},
            unlocked(){return hasUpgrade("r",13)}
        },
        22:{
            title: "削减成本",
            description: "美元数量提升房间获取速度。",
            cost: new Decimal(36),
            effect(){
                let eff = new Decimal(1).plus(player.points.plus(1).log(3).times(0.2)) // 1+0.2*log3(dollars+1)
                return eff
            },
            effectDisplay(){return format(tmp.r.upgrades[22].effect)+"x"},
            unlocked(){return hasUpgrade("r",21)}
        },
        23:{
            title: "指数级业务",
            description: "房间数量指数级提升美元获取速度。",
            cost: new Decimal(200),
            effect(){
                let eff = player.r.points.ln().plus(1).ln().plus(1).times(0.1).plus(1) // 1+ln(ln(rooms)+1)*0.1
                return eff
            },
            effectDisplay(){return "^" + format(tmp.r.upgrades[23].effect)},
            unlocked(){return hasUpgrade("r",22)}
        },
        31:{
            title: "发薪日！",
            description: "基础美元+1。",
            cost: new Decimal(1000),
            unlocked(){return hasUpgrade("r",23)}
        },
        32:{
            title: "名声渐长",
            description: "每购买一个升级，点数+0.25倍。",
            cost: new Decimal(2500),
            effect(){
                let eff = new Decimal(4).plus(player.r.upgrades.length).times(0.25) // upgrades/4+1
                return eff
            },
            effectDisplay(){return format(tmp.r.upgrades[32].effect)+"x"},
            unlocked(){return hasUpgrade("r",31)}
        },
        33:{
            title: "指数级消费",
            description: "美元数量指数级提升房间获取速度。你现在大概有钱买房子了……",
            cost: new Decimal(20000),
            effect(){
                let eff = player.r.points.log(10).plus(1).log(10).plus(1).times(0.1).plus(1) // 1+log(log(rooms)+1)*0.1
                return eff
            },
            effectDisplay(){return "^" + format(tmp.r.upgrades[33].effect)},
            unlocked(){return hasUpgrade("r",32)}
        },
    },
    infoboxes:{
         story1: {
                title: "故事 #1",
                body: "你基本上身无分文，需要钱。一个朋友让你把他们的房间租出去。你也许应该把这做成一门生意。"
        }
    },
    tabFormat: {
        "r": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "upgrades",
                ["infobox", "story1"]
            ]
        }
    }
})