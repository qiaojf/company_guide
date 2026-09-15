你现在需要对当前 `company_guide` 项目进行一次系统性的 DOM fidelity 修正。

本轮目标不是重新设计页面，而是：

**让 DOM 模式尽可能忠实地还原对应的 reference PNG。**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
一、本轮处理范围
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

只处理以下 35 页：

2–15
19–23
25–29
31
33–41
43

即：

2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
19, 20, 21, 22, 23,
25, 26, 27, 28, 29,
31,
33, 34, 35, 36, 37, 38, 39, 40, 41,
43

不要修改以下页面的主体布局：

1, 16, 17, 18, 24, 30, 32, 42

如果公共 CSS 的修改可能影响这些页面，必须做 regression check，确保它们没有产生新的视觉变化。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
二、唯一视觉基准
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

每一页对应的：

assets/reference/slides/slide-XX.png

是唯一视觉 Ground Truth。

例如：

第 2 页：
assets/reference/slides/slide-02.png

第 12 页：
assets/reference/slides/slide-12.png

第 43 页：
assets/reference/slides/slide-43.png

不要把当前 DOM 当成设计依据。

不要根据现有 Grid、Flex、通用组件推测原稿。

判断优先级必须始终是：

reference PNG
>
当前 DOM
>
现有 CSS 结构

如果现有 HTML/CSS 架构妨碍还原 reference，
允许重构。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
三、页面固定坐标体系
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

页面设计基准：

1600 × 900 px

所有 fidelity 调整首先以固定 1600×900 坐标进行。

不要为了所谓响应式布局牺牲视觉一致性。

整个 `.slide-stage` 已经由外层 Viewer 负责缩放。

因此针对单页复刻时：

准确的 px 坐标
>
通用 Grid
>
响应式百分比

复杂页面允许使用：

position:absolute;
left;
top;
width;
height;

这类明确的固定坐标。

对于 PPT → Web 的固定画布复刻，
绝对定位是允许且推荐的。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
四、禁止继续使用“语义相似”的方式糊弄
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

当前项目最大的 fidelity 问题是：

把 PPT 中的专用视觉元素，
替换成了普通 Web 组件。

例如：

原稿：
专用线稿机器人 icon

当前 DOM：
⌁

原稿：
完整 AI 图形

当前 DOM：
◎

原稿：
7 个不同流程图标

当前 DOM：
7 个相同样式的文字卡片

原稿：
复杂环形信息图

当前 DOM：
几个普通 circle / ellipse

这种情况不能再接受。

要求：

如果 reference 中是特殊图标，
就实现对应图标。

如果 reference 中是专用流程图，
就按照实际几何关系实现。

如果 reference 中是复杂信息图，
就重建对应的信息图。

可以使用：

HTML
CSS
SVG

进行实现。

优先考虑：

SVG + DOM text

不要使用 emoji、
Unicode symbol、
随意的 CSS 几何图形

去代替 reference 中明显不同的专业图标。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
五、Reference PNG 不能作为最终页面主体
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

禁止直接把：

slide-XX.png

作为 DOM 模式的整页背景，
然后覆盖少量文字冒充完成。

Reference PNG 只能用于：

1. 测量
2. compare
3. pixel diff
4. QA

最终：

?layer=dom

模式下必须是真实 DOM / SVG / image assets。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
六、开始修改前先完成一次全面检测
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

不要马上修改代码。

先创建本轮 fidelity audit。

逐页打开：

?layer=reference#slide-X
?layer=dom#slide-X
?layer=compare#slide-X

对 35 页逐页检查。

如果项目可以使用 Playwright，
建立自动截图脚本。

统一截图环境：

viewport 对应 1600×900 stage
deviceScaleFactor = 1

等待：

document.fonts.ready

所有：

img.decode()

完成后再截图。

关闭 transition / animation。

建议生成：

tmp/fidelity/
  slide-02-reference.png
  slide-02-dom.png
  slide-02-diff.png
  ...
  slide-43-reference.png
  slide-43-dom.png
  slide-43-diff.png

使用：

pixelmatch
或
sharp
或项目已有工具

进行视觉 Diff。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
七、本轮 35 页已知问题
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


══════════════════════════════
PAGE 02
══════════════════════════════

问题：

CONTENTS
和
目次

的视觉层级、上下位置、字号关系与 reference 不一致。

要求：

重新测量 reference 中：

CONTENTS
目次
目录编号
目录文字
分隔元素
页脚

的位置。

不要只调整整个目录容器。

分别校准各对象。


══════════════════════════════
PAGE 03
══════════════════════════════

当前核心问题：

DOM 把三个业务内容做成了典型 Web Card/Grid。

但 reference 是 Editorial Layout，
不是三个等权卡片。

要求：

废弃“3 张卡片”的视觉思路。

重新按照 reference 测量：

左侧正文区域
右侧业务区域
标题
数字
业务名称
说明
分隔线
留白

必要时完全重构 page 3 DOM。


══════════════════════════════
PAGE 04
══════════════════════════════

这是内容错误 + 视觉错误。

重点检查 DOM 当前数据。

已知：

DOM 存在：

20M
2,000万円

reference 中应为：

30M
3,000万円

必须以 reference 为准修正数据。

同时检查：

指标图标
数字字号
单位字号
label
指标之间间距
底部说明

不要只修改数值。


══════════════════════════════
PAGE 05
══════════════════════════════

组织架构图当前与 reference 不一致。

问题包括：

部门顺序
层级结构
节点位置
连接线
节点图标
文字对齐

要求：

不要继续用普通 Grid 模拟组织架构。

按照 reference 重新建立：

node
connector
icon
label

系统。

所有组织节点位置必须基于 reference 测量。


══════════════════════════════
PAGE 06
══════════════════════════════

章节分隔页。

当前公共 section template 不适用于本页。

reference 使用类似：

4.0
4.1
4.2

的章节内部编号体系。

不要自动生成普通：

01
02
03

另外删除 reference 中不存在的说明文字。

检查：

章节大标题
左侧 tagline
右侧 section list
数字格式
绿色装饰
留白


══════════════════════════════
PAGE 07
══════════════════════════════

Technology Coverage 第三个区域内容存在缺失或简化。

对照 reference 完整恢复：

所有标题
说明
文字层级
分隔结构

同时检查 3 个模块是否真的按照 reference 的宽度、位置排列。


══════════════════════════════
PAGE 08
══════════════════════════════

reference 左下区域存在：

3 个大型圆形线稿 icon + 文案。

当前 DOM 只是普通：

ul / li
+
短绿色横线

这是错误的视觉表达。

要求：

重建 3 个实际图标。

根据 reference 校准：

icon size
icon line weight
icon center
标题
说明文字
三个项目间距。


══════════════════════════════
PAGE 09
══════════════════════════════

三个 Technology / Business block 各自包含独立视觉图形。

包括类似：

AI
Monitor
Cloud

以及外围装饰线。

当前 CSS 简化 icon 与 reference 差异较大。

要求：

不要继续使用 generic：

.line-icon--ai
.line-icon--screen
.line-icon--cloud

的近似图形。

重新按照 reference 制作 SVG / CSS/SVG 混合图标。


══════════════════════════════
PAGE 10
══════════════════════════════

与 page 06 同类。

章节右侧应使用：

5.0
5.1
5.2
5.3

这样的 section numbering。

不要使用：

01
02
03
04

删除 reference 中不存在的说明。

检查 section title / subtitle / list 的精确坐标。


══════════════════════════════
PAGE 11
══════════════════════════════

reference 有 4 个专用线稿插画。

当前用类似：

⌁
◎
▣
⌘

的字符代替。

必须全部替换。

要求：

制作/重建四个接近 reference 的 SVG 图标。

同时恢复：

背景装饰
线条
图标比例
标题
说明文字
图标与文字之间关系。

Unicode 字符不能保留。


══════════════════════════════
PAGE 12
══════════════════════════════

这是重点重构页。

当前：

上方
grid-template-columns: 70% 30%

下方
grid-template-columns: 30% 70%

与 reference 的页面几何模型不同。

reference 更接近：

上：
左侧大量留白
+
中间 robot image
+
右侧 copy

下：
左侧 copy
+
中间 warehouse image
+
右侧留白

不要继续调整百分比 Grid。

针对 page 12 单独建立 absolute layout。

分别测量：

service robot image
service text
01
separator
logistics text
02
separator
logistics image

图片不得因错误容器比例被
object-fit: cover
错误裁切。


══════════════════════════════
PAGE 13
══════════════════════════════

存在内容错误。

逐项对照 reference 检查产品名称。

已知第三项不能继续使用错误的：

清掃ロボット

reference 中对应内容需要恢复为正确类别，
例如消毒相关机器人。

要求：

逐个检查：

产品图
产品名称
品牌
类别
caption
图片尺寸

不要假设当前数据正确。


══════════════════════════════
PAGE 14
══════════════════════════════

KEENON 页面存在：

文案版本不一致
标题层级不一致
底部 3 个图标缺失/近似错误

要求：

reference 中显示什么文字，
DOM 就使用什么文字。

不要保留另一版文案。

恢复底部：

3 个功能图标
对应说明

并重新校准：

主标题
副标题
正文
图片
icon
caption。


══════════════════════════════
PAGE 15
══════════════════════════════

reference 的 5 个功能点使用：

圆形 ✓ 功能标识

当前却使用：

01
02
03
04
05

这是错误的视觉语言。

必须重建为 reference 中的圆形 check system。

同时重新调整：

一级标题
二级标题
说明文字
五项间距
图标尺寸。


══════════════════════════════
PAGE 19
══════════════════════════════

主体图片接近，但信息区域仍不一致。

重点：

FLYPICK SORTING ROBOT label
底部四个 value blocks
block 间分隔
标题样式

不要直接使用通用 info-block 样式。

按照 reference 独立校准。


══════════════════════════════
PAGE 20
══════════════════════════════

这是高优先级素材错误页。

当前使用的：

warehouse-main.png
warehouse-channels.png

与 reference 中实际仓库/3D画面不是同一视觉素材或裁切。

要求：

首先检查 assets 中是否已经存在 reference 对应素材。

如果存在：
换成正确素材。

如果不存在：
从项目原始素材中寻找对应图片。

不要继续调整错误图片的位置来尝试匹配 reference。

先保证图片内容正确，
再做坐标和裁切。


══════════════════════════════
PAGE 21
══════════════════════════════

reference 左侧具有明显建筑/空间视觉背景。

当前 DOM 背景结构不完整。

要求：

检查项目 assets 中是否存在对应背景。

恢复背景后再处理：

证书
文字
标题
说明
边缘留白。

不能把 reference 的建筑背景省略成普通白底。


══════════════════════════════
PAGE 22
══════════════════════════════

章节页模板错误。

reference 左侧存在：

AIを、現場で使える仕組みに。

当前公共 CSS：

.section-slide__tagline {
  display:none;
}

会错误隐藏。

针对 page 22 恢复 tagline。

同时删除右侧 reference 中不存在的额外说明。

不要修改所有 section-slide 使其它章节页出问题。

应进行 page-specific 处理，
或者重构 sectionSlide 使每页数据明确控制。


══════════════════════════════
PAGE 23
══════════════════════════════

上方流程结构大致存在，
但 bottom value 部分缺少大型专用 icon。

要求：

恢复 bottom 3 项对应图标。

同时检查顶部 flow：

步骤数量
箭头
小标题
辅助文字

如果 reference 中没有当前 DOM 的额外说明，
删除。

不要让通用 flow() 自动附加多余内容。


══════════════════════════════
PAGE 25
══════════════════════════════

reference 右下存在：

QUERY
↓
SEARCH
↓
SYNTHESIZE
↓
REPORT

完整 workflow。

当前 DOM 缺失。

必须恢复。

检查：

四步文字
箭头
容器
绿色强调
workflow 与主内容的位置关系。


══════════════════════════════
PAGE 26
══════════════════════════════

reference 中 research cycle 的各节点使用：

不同图标

当前重复使用 generic glyph。

要求：

逐节点制作对应图标。

检查：

cycle node positions
中心关系
connector
arrow
icon
label

不要使用一个 icon 重复代替多个不同含义。


══════════════════════════════
PAGE 27
══════════════════════════════

高优先级重构。

reference 是：

3 周
×
15 个工作日

的详细 timeline。

当前 DOM 只做：

WEEK 1
WEEK 2
WEEK 3

三个概括块。

这是结构性错误。

必须按照 reference 完整恢复：

15 天
日期/Day label
每天任务
跨天区块
week separator
marker
annotation

不要继续使用简单三列 Week Grid。


══════════════════════════════
PAGE 28
══════════════════════════════

reference 是完整 matching 信息图。

需要包含：

左侧人物/项目属性
中心 MATCH
右侧属性
相关 icon
connector
关系线

当前只用普通绿色圆和文字，
远远不够。

要求：

按照 reference 重建整个 matching diagram。

建议使用：

SVG connectors
+
DOM labels
+
SVG icons。


══════════════════════════════
PAGE 29
══════════════════════════════

reference 工作流：

Gmail
→
取得
→
AI分析
→
DB
→
検索
→
人材推薦
→
Follow-up

每一个步骤都有不同 icon。

另外存在：

主箭头
反馈虚线
环形逻辑

当前通用 flow() 不可继续使用。

针对 page 29 建立专用 workflow DOM/SVG。

所有节点的位置和 connector 必须基于 reference。


══════════════════════════════
PAGE 31
══════════════════════════════

reference 是完整：

CHALLENGE
→
CORE
→
VALUE

信息图。

当前变成 3 个普通 Web panel。

要求：

废弃普通 panel 布局。

恢复：

信息流向
中央核心结构
视觉 hierarchy
连接关系
文字区域
强调色
箭头/线条。


══════════════════════════════
PAGE 33
══════════════════════════════

宏观四层架构接近：

CLOUD & ACCESS
INTELLIGENCE
CONNECT
FIELD

可以保留整体结构。

但当前：

laptop
tablet
phone
camera
AI
alert
meter
BLE

等 glyph 是 CSS 简化图形。

需要重点替换成接近 reference 的 SVG icon。

这页属于：

结构保留
+
微观视觉重建

不要完全推翻当前布局，
除非 measurement 显示几何结构也明显偏差。


══════════════════════════════
PAGE 34
══════════════════════════════

当前左侧使用通用：

01
02

editorial list。

reference 不是这种普通编号列表视觉。

要求：

按照 reference 恢复实际左侧 hierarchy。

不要因为已有 editorialList() 就强制继续使用。

检查：

编号方式
标题
说明
线条
左右内容关系。


══════════════════════════════
PAGE 35
══════════════════════════════

高优先级信息图页。

reference 中包含大量：

设备
工程
空间
系统
流程

相关图标和连接关系。

当前主要只剩文字列表和普通 box。

必须按照 reference 重新建立完整 diagram。

推荐：

SVG canvas
+
真实 DOM text

不要简化成卡片。


══════════════════════════════
PAGE 36
══════════════════════════════

高优先级。

reference 核心是：

大型分段椭圆 / 环形体系图

当前只用简单 ellipse / circle 模拟。

必须按照 reference 重建：

outer ring
segment
inner shape
connector
label
highlight
arrow/line

建议直接使用 SVG。

不要使用几个 border-radius div 近似。


══════════════════════════════
PAGE 37
══════════════════════════════

reference 有明显立体视觉：

CRM
ERP

以及：

Office365
Azure
AI

立方体 / 3D block 结构。

当前普通 CSS box 不够。

要求：

按照 reference 重新制作视觉块。

可以使用：

SVG
CSS transform
已有图片素材

但结果必须接近 reference。

文字仍然保持真实 DOM/SVG text。


══════════════════════════════
PAGE 38
══════════════════════════════

reference 有 9 个应用场景，
每个场景都有专用 icon。

当前主要是文字 li。

要求：

恢复全部 9 个 icon。

同时测量：

3×3 或实际 reference layout
icon size
label spacing
row spacing
column spacing。


══════════════════════════════
PAGE 39
══════════════════════════════

章节页问题。

与 page 22 类似。

检查 reference 中 tagline。

如果存在，
不能被公共：

.section-slide__tagline {
  display:none;
}

隐藏。

同时删除右侧 reference 不存在的自动生成说明。

章节页必须使用正确的 section numbering。


══════════════════════════════
PAGE 40
══════════════════════════════

reference 顶部 4 个阶段：

每个阶段都有大型 icon。

下方还有：

绿色人物群视觉元素。

当前是普通：

flow
+
info blocks

要求：

恢复顶部 4 个阶段图标，
恢复人物群 visual。

不要继续依赖通用 flow()。


══════════════════════════════
PAGE 41
══════════════════════════════

reference 招聘流程各步骤存在不同 icon，例如：

document
search
handshake
checklist
people
laptop

当前主要是数字 + 文字。

要求：

恢复流程图标。

人物照片可以复用当前正确资产，
但需要重新校准：

image crop
size
position

同时检查：

流程节点
箭头
文字
照片
底部说明。


══════════════════════════════
PAGE 43
══════════════════════════════

这是 Logo Wall。

reference 必须作为 Logo 真值。

当前部分企业：

Toyota Kanetsu
NS Solutions
FUJITSU
Benesse
等

存在用普通文字代替真实 Logo 的情况。

要求：

先搜索项目 assets。

如果已有真实 logo：
使用真实 logo。

如果有 SVG：
优先 SVG。

不要用普通文本模拟 logo。

校准：

logo width
logo height
row
column
baseline
视觉重量
企业之间间距。

不要简单让所有 logo 强制相同 width，
因为 reference 中各品牌实际视觉宽度不同。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
八、字体系统
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

所有页面都需要检查：

font-family
font-size
font-weight
line-height
letter-spacing

特别是日文。

不要假设：

"Noto Sans JP", "Yu Gothic", sans-serif

在不同环境下完全一致。

首先检查项目中是否已有明确字体资源。

如果存在，
使用 @font-face 明确加载。

如果没有，
保持最接近字体，
并通过：

width
font-size
letter-spacing
line-height

进行视觉校准。

reference 已经明确换行的位置时：

允许保留固定 <br>。

不要为了响应式自动换行而破坏 PPT 原稿。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
九、图片处理原则
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

对所有图片逐一检查：

原始 aspect ratio
reference crop
DOM crop
object-fit
object-position

不要默认：

object-fit: cover

如果 reference 是完整图片，
使用错误容器 + cover 会制造错误裁切。

每个关键图片都记录：

reference:
x
y
w
h

DOM:
x
y
w
h

delta:
dx
dy
dw
dh

优先修正容器，
然后才调整 object-position。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十、建立 Measurement Table
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

每一页修改前，
至少测量主要元素。

格式例如：

PAGE 12

Element            REF                  DOM                  DELTA

title
x / y / w / h

image-1
x / y / w / h

copy-1
x / y / w / h

image-2
x / y / w / h

copy-2
x / y / w / h

footer
x / y / w / h

DOM 坐标使用：

getBoundingClientRect()

获取。

不要全靠肉眼猜。


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十一、修改优先级
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

按以下顺序处理。


PRIORITY A
结构 / 内容 / 素材错误：

3
4
5
6
10
11
12
13
14
15
20
21
22
27
28
29
31
35
36
37
39
43


PRIORITY B
信息图 / 图标体系明显缺失：

8
9
23
25
26
33
38
40
41


PRIORITY C
主要结构接近但仍需校准：

2
7
19
34


先完成 A，
再 B，
最后 C。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十二、不要滥用公共组件
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

重点检查当前：

editorialList()
flow()
info-block
grid-3
grid-4
sectionSlide()

等通用组件。

原则：

如果 reference 与组件视觉完全一致，
可以继续复用。

如果 reference 明显不同，
不要为了代码复用强行套组件。

允许：

page-specific DOM
page-specific class
page-specific SVG

视觉 fidelity 优先。

但不要无控制地继续在 fidelity.css 最底部堆：

!important
!important
!important

如果一页已经需要大量 override，
直接整理成清晰的 page-specific CSS。

例如：

.slide[data-slide="12"] { ... }

.slide[data-slide="12"] .robotics-overview { ... }

而不是依赖 5 层 Cascade 覆盖。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十三、视觉 Diff 闭环
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

每完成一页，执行：

Reference
↓
DOM Screenshot
↓
Pixel Diff
↓
找到最大差异区域
↓
修改
↓
重新截图
↓
重新 Diff

不要只打开 compare 模式看一眼。

compare 只能辅助观察“双影”。

真正验收必须依赖：

DOM-only screenshot
vs
reference PNG。


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十四、不要只计算整页 similarity
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

因为页面包含大量白色区域。

即使主体完全错位，
整页 similarity 也可能很高。

因此每页至少对这些 ROI 单独检查：

header
main visual
main text
secondary visual
secondary text
diagram
footer

对于复杂图：

只比较非背景区域，
或者进行 edge diff。


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十五、建议验收精度
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

图片边界：

≤ 2 px

主要标题位置：

≤ 2 px

主要文字块：

≤ 3 px

主要图标：

≤ 3 px

复杂 connector：

尽可能 ≤ 3 px

不得出现明显：

double image
double text
wrong crop
wrong icon
missing icon
wrong data
wrong paragraph
wrong number
wrong logo
wrong line break。


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十六、Regression Check
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

每完成一批修改，
必须重新截图：

1
16
17
18
24
30
32
42

确认没有因为：

global CSS
font
section component
header
footer
shared grid

修改而产生回归。

另外每次修改 page-specific CSS 时，
检查相邻页面：

X - 1
X + 1

确保 CSS selector 没有误伤。


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十七、Footer / Header
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

如果多个页面 footer / header 实际共享统一坐标，
应提炼全局规则。

但只能在确认 reference 一致后统一。

需要统一检查：

slide number
total pages
TERABOX INC.
footer line
header page number
green accent
section label

如果某页 reference 有例外，
使用 page-specific override。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十八、执行方式
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

不要一次重写 35 页然后最后统一检查。

按照批次执行。


BATCH 1：

2
3
4
5
6
7
8
9
10


完成后：
截图
diff
regression


BATCH 2：

11
12
13
14
15
19
20
21
22
23


完成后：
截图
diff
regression


BATCH 3：

25
26
27
28
29
31


完成后：
截图
diff
regression


BATCH 4：

33
34
35
36
37
38
39
40
41
43


完成后：
截图
diff
regression


每个 Batch 内也应逐页确认，
不要等整个 Batch 写完才第一次看结果。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十九、不要做的事情
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

禁止：

1.
为了让代码短，
继续使用与 reference 不同的通用组件。

2.
把 emoji / Unicode 字符当专业 icon。

3.
把 reference PNG 直接作为 DOM 模式背景。

4.
只修改 font-size，
却不检查 bounding box。

5.
只修改 image width，
却不检查 crop。

6.
只看整页 similarity。

7.
因为 DOM 看起来更现代，
就自行改变 PPT 原稿设计。

8.
擅自改文案。

9.
擅自优化日语表达。

10.
删除 reference 中看似“不必要”的装饰元素。

11.
为了响应式而改变 reference 中的换行。

12.
修改 1、16、17、18、24、30、32、42 的主体布局。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
二十、最终交付报告
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

35 页全部完成后，
生成：

FIDELITY_REPORT.md

报告至少包含：

# Fidelity Report

## Modified Pages

列出 35 页。


## Per-page Result

例如：

### Slide 12

Before:
- wrong 70/30 grid
- service image too wide
- logistics image too wide
- text alignment wrong

After:
- absolute 1600×900 layout
- corrected image bounds
- corrected text bounds
- corrected separators

Remaining:
- Yu Gothic/Noto Sans JP glyph width difference


每一页记录：

主要问题
修改方法
修改文件
剩余误差


## Assets Changed

列出：

新增 SVG
替换图片
新增 logo
新建 icon


## DOM Components Changed

列出：

重构了哪些公共组件
新增了哪些 page-specific components


## Regression

确认：

1
16
17
18
24
30
32
42

没有视觉回归。


## Visual QA

记录：

DOM screenshot
Reference
Diff

生成位置。


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
二十一、最终原则
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

请始终牢记：

这是：

PPT / corporate presentation
→
fixed 1600×900 Web reproduction

不是：

普通响应式企业官网开发。

因此：

视觉一致性
>
代码复用

准确坐标
>
漂亮 Grid

Reference PNG
>
现有 DOM

真实图标
>
generic symbol

页面专用实现
>
错误的公共组件

不要在“看起来差不多”时结束。

最终目标是在：

?layer=compare

状态下，

reference 与 DOM 的主要内容几乎完全重合，
不再出现明显双影。

现在按照上述要求，
先完成 35 页的 audit，
然后从 PRIORITY A 开始修改。