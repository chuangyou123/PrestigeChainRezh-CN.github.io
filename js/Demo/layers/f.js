// 这个层大部分是极简的，但它使用了一个自定义的声望类型和一个可点击对象
addLayer("f", {
    infoboxes:{
        coolInfo: {
            title: "背景故事",
            titleStyle: {'color': '#FE0000'},
            body: "深层背景故事！",
            bodyStyle: {'background-color': "#0000EE"}
        }
    },

    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        boop: false,
        clickables: {[11]: "开始"}, // 可选的默认可点击状态
    }},
    color: "#FE0102",
    requires() {return new Decimal(10)}, 
    resource: "农场点数", 
    baseResource: "点数", 
    baseAmount() {return player.points},
    type: "static",
    exponent: 0.5,
    base: 3,
    roundUpCost: true,
    canBuyMax() {return false},
    //directMult() {return new Decimal(player.c.otherThingy)},

    row: 1,
    layerShown() {return true}, 
    branches: ["c"], // 当这个层出现时，从这个层到这里的任何层会出现一个分支。每个条目可以是一对，包含层ID和颜色。

    tooltipLocked() { // 可选，当层被锁定时显示的工具提示
        return ("这只奇怪的恐龙农夫只会在你拥有至少 " + this.requires() + " 点数时才会看到你。你只有 " + formatWhole(player.points))
    },
    midsection: [
        "blank", ['display-image', 'https://images.beano.com/store/24ab3094eb95e5373bca1ccd6f330d4406db8d1f517fc4170b32e146f80d?auto=compress%2Cformat&dpr=1&w=390'],
        ["display-text", "汪汪叫！"]
    ],
    // 以下目前仅用于"custom"声望类型：
    prestigeButtonText() { //实际上是HTML
        if (!this.canBuyMax()) return "嗨！我是一只<u>奇怪的恐龙</u>，我会给你一个农场点数，以换取你所有的点数和棒棒糖！（至少需要 " + formatWhole(tmp[this.layer].nextAt) + " 点数）"
        if (this.canBuyMax()) return "嗨！我是一只<u>奇怪的恐龙</u>，我会给你<b>" + formatWhole(tmp[this.layer].resetGain) + "</b> 个农场点数，以换取你所有的点数和棒棒糖！（你将在 " + formatWhole(tmp[this.layer].nextAtDisp) + " 点数时再获得一个）"
    },
    getResetGain() {
        return getResetGain(this.layer, useType = "static")
    },
    getNextAt(canMax=false) { //  
        return getNextAt(this.layer, canMax, useType = "static")
    },
    canReset() {
        return tmp[this.layer].baseAmount.gte(tmp[this.layer].nextAt)
    },
    // 这也非极简，是一个可点击对象！
    clickables: {

        masterButtonPress() {
            if (getClickableState(this.layer, 11) == "坏掉了...")
                player[this.layer].clickables[11] = "开始"
        },
        masterButtonText() {return (getClickableState(this.layer, 11) == "坏掉了...") ? "修复可点击对象！" : "什么都不做"}, // 重设按钮上的文字，可选
        11: {
            title: "点一点！", // 可选，显示在顶部，字体较大
            display() { // 标题之后在可购买按钮中显示的其他所有内容
                let data = getClickableState(this.layer, this.id)
                return "当前状态：<br>" + data
            },
            unlocked() { return player[this.layer].unlocked }, 
            canClick() {
                return getClickableState(this.layer, this.id) !== "坏掉了..."},
            onClick() { 
                switch(getClickableState(this.layer, this.id)){
                    case "开始":
                        player[this.layer].clickables[this.id] = "一个新状态！"
                        break;
                    case "一个新状态！":
                        player[this.layer].clickables[this.id] = "继续！"
                        break;
                    case "继续！":
                        player[this.layer].clickables[this.id] = "也许那有点太远了..."
                        break;                        
                    case "也许那有点太远了...":
                        makeParticles(coolParticle, 4)
                        player[this.layer].clickables[this.id] = "坏掉了..."
                        break;
                    default:
                        player[this.layer].clickables[this.id] = "开始"
                        break;
                }
            },
            onHold(){
                console.log("Clickkkkk...")
            },
            style() {
                switch(getClickableState(this.layer, this.id)){
                    case "开始":
                        return {'background-color': 'green'}
                        break;
                    case "一个新状态！":
                        return {'background-color': 'yellow'}
                        break;
                    case "继续！":
                        return {'background-color': 'orange'}
                        break;                        
                    case "也许那有点太远了...":
                        return {'background-color': 'red'}
                        break;
                    default:
                        return {}
                        break;
            }},
        },
    },

}, 
)

const coolParticle = {
    image:"options_wheel.png",
    spread: 20,
    gravity: 2,
    time: 3,
    rotation (id) {
        return 20 * (id - 1.5) + (Math.random() - 0.5) * 10
    },
    dir() {
        return (Math.random() - 0.5) * 10
    },
    speed() {
        return (Math.random() + 1.2) * 8 
    },
    onClick() {
        console.log("yay")
    },
    onMouseOver() {
        console.log("hi")
    },
    onMouseLeave() {
        console.log("bye")
    },
    update() {
        //this.width += 1
        //setDir(this, 135)
    },
    layer: 'f',
}