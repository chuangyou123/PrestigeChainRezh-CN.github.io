# mod.js

你可能需要编辑的大部分非层代码和数据都在这里，位于 [mod.js](/js/mod.js) 中。
[mod.js](/js/mod.js) 中的所有内容都不会因更新而改变，除非添加新内容。

以下是其内容的详细说明：

- modInfo 是模组大部分基本配置所在的地方。它包含：
    - name：你的模组名称。（字符串）
    - id：你的模组的唯一标识符，一个用于确定存档位置的唯一字符串。开始制作模组时务必设置它，之后不要更改，因为更改会清除所有存档。
    - author：作者名称，显示在信息标签页中。
    - pointsName：这将更改主货币显示的内容，而不是“points”。（不影响代码中的实际值。）
    - modFiles：一个文件地址数组，将为本模组加载这些文件。使用较小的文件更容易找到你想要的内容。
    
    - discordName、discordLink：如果你有 Discord 服务器或其他讨论场所，可以添加链接。

        “discordName”是链接上的文本，“discordLink”是邀请链接的 URL。如果使用 Discord 邀请链接，请确保设置为永不过期。

    - offlineLimit：玩家可以累积的最大离线时间，以小时为单位。超出部分将丢失。（数字）

        这很有用，因为大多数此类模组节奏较快，过多的离线时间会破坏平衡，例如更新之间的时间。这就是为什么我建议开发者在自己的存档上禁用离线时间。

    - initialStartPoints：新玩家开始时应该拥有的点数，以 Decimal 表示。

- VERSION 用于描述你的模组的当前版本。它包含：
    - num：模组的版本号，显示在树标签页的右上角。
    - name：版本的名称，与版本号一起显示在信息标签页中。

- changelog 是在更新日志标签页中显示的 HTML。如果内容特别长，最好放在单独的文件中（记得将该文件添加到 index.html 中）。

- doNotCallTheseFunctionsEveryTick 非常重要，如果你添加了非标准函数。TMT 每 tick 会调用“layers”中任何位置的每个函数来存储结果，除非特别告知不要调用。用于执行操作的函数需要被标识出来。“官方”函数（文档中的那些）都没问题，但如果你创建了任何新函数，请将它们的名称添加到这个数组中。

```js
// （这里的示例，所有官方函数都已处理）
var doNotCallTheseFunctionsEveryTick = ["doReset", "buy", "onPurchase", "blowUpEverything"]
```

- getStartPoints()：一个用于确定玩家重置后开始时拥有的点数的函数。（返回 Decimal 值）

- canGenPoints()：一个返回布尔值的函数，用于判断是否应生成点数。如果你想通过升级来解锁点数生成，请使用此函数。

- getPointGen()：一个计算你每秒点数的函数。任何影响点数获取的因素都应纳入此计算中。

- addedPlayerData()：一个返回任何与层无关的数据的函数，这些数据将被添加到存档数据和“player”对象中。

```js
function addedPlayerData() { return {
	weather: "Yes",
	happiness: new Decimal(72),
}}
```

- displayThings：一个函数数组，用于在树标签页顶部显示额外内容。每个函数返回一个字符串，即要显示的一行（支持基本 HTML）。如果函数不返回任何内容，则不显示任何内容（也不占用一行）。

- isEndgame()：一个用于判断玩家是否已达到游戏终局的函数，此时会出现“你赢了！”的界面。

此后的内容不太重要！

- backgroundStyle：一个 CSS 对象，包含整个游戏背景的样式。可以是函数！

- maxTickLength()：返回最大 tick 长度，以毫秒为单位。仅在你有一些随时间减少的内容时才有用，因为长 tick 会破坏这些内容（通常是挑战）。

- fixOldSave()：可用于在加载到新版本游戏时修改存档文件。使用此函数来消除通货膨胀，切勿强制硬重置你的玩家。