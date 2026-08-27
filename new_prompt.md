你是一名高级前端工程师、网页演示系统设计师和 Editorial Layout Designer。

现在我会提供一份已经重新设计完成的企业宣传 图集：

`generated_pages`文件夹

你的任务不是“把 图集 截图放进网页”，而是：

**将这份 图集 重构为一套可直接部署、可维护、可交互、视觉效果高度还原的 HTML 演示稿。**

---

## 一、最高优先级目标

最终 HTML 必须满足以下目标，优先级从高到低：

1. **视觉版式尽可能接近 图集**
2. **保留 图集 中的全部文字、数据、图片、Logo、业务结构和流程关系**
3. **文字必须是真实 HTML 文本，可选择、复制**
4. **流程图、组织架构、数据图、AI 架构尽可能使用 HTML / CSS / SVG 重绘**
5. **不得把整页 图集 转成图片作为最终实现**
6. **不得自行修改、扩写、润色公司宣传内容**
7. **不得自行编造数字、案例、宣传语**
8. **HTML 必须可以直接通过 GitHub Pages 部署**
9. **无需后端**
10. **Chrome / Edge 桌面端优先，同时做好响应式缩放**

---

# 二、设计风格

严格遵循 图集 当前已经确定的设计风格：

## 风格名称

**Light Industrial Editorial**

关键词：

* Japanese B2B
* Editorial Design
* Industrial
* Architecture
* Corporate
* Minimal
* Premium
* Data-driven
* Technical
* Restrained

整体效果应该像：

**日本大型咨询公司提案资料 + 建筑事务所 Portfolio + 高端 B2B Technology Company**

而不是：

* AI SaaS 官网
* 科技炫酷模板
* 蓝紫渐变
* 发光粒子
* 玻璃拟态
* 大量圆角 Card
* 3D 科技人物
* AI 脑图
* 不必要的装饰性图标

---

# 三、核心设计系统

## 1. 页面比例

所有 Slide 使用固定：

```text
16:9
```

内部逻辑设计尺寸建议：

```text
1600 × 900
```

浏览器中根据窗口自适应缩放，但设计比例不能变化。

推荐实现：

```css
.slide-stage {
  width: 1600px;
  height: 900px;
  transform: scale(...);
  transform-origin: center center;
}
```

或者使用 CSS `aspect-ratio: 16 / 9`。

---

## 2. 主色

```css
:root {
  --paper: #F7F8F5;
  --white: #FFFFFF;

  --ink: #101718;
  --ink-2: #182224;

  --muted: #657170;
  --line: #D0D6D2;

  --lime: #B6D62F;
  --teal: #6F9FA2;
  --amber: #E1A12B;
}
```

规则：

* 页面主体使用暖白 `#F7F8F5`
* 主文字使用深黑 `#101718`
* `lime` 每页面积尽量控制在 3%–7%
* teal 主要用于技术结构 / Flow
* amber 只用于 Human / Approval / Warning 等特殊节点

禁止大面积绿色。

---

# 四、字体系统

优先使用：

```css
font-family:
  "Noto Sans JP",
  "Yu Gothic",
  "Yu Gothic UI",
  Meiryo,
  sans-serif;
```

英文：

```css
font-family: Inter, sans-serif;
```

数字 / Page No / Technical Label：

```css
font-family:
  "IBM Plex Mono",
  Consolas,
  monospace;
```

如果不能依赖在线字体，则建立安全 fallback。

---

# 五、HTML 演示系统结构

建议最终项目结构：

```text
terabox-html/
│
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── layout.css
│   ├── slides.css
│   ├── components.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   ├── navigation.js
│   ├── slides.js
│   └── animations.js
│
├── assets/
│   ├── images/
│   ├── logos/
│   ├── products/
│   └── icons/
│
└── README.md
```

如果项目规模不大，也允许合并成：

```text
index.html
style.css
app.js
assets/
```

但代码必须清晰、可维护。

---

# 六、整体 Viewer UI

HTML 不只是 Slide 内容，还需要一个演示 Viewer。

---

## 左侧导航栏

保留长期存在的左侧 Rail Navigation。

展开状态约：

```text
196px
```

收缩状态：

```text
64px
```


要求：

* 当前章节高亮
* lime 细线表示 active
* 点击章节可以跳转
* 可以折叠
* 折叠后按钮必须仍然可见
* 不允许出现“折叠后无法再次展开”的 Bug

展开：

```text
04  ENGINEERING
```

收缩：

```text
04
```

---

# 七、右下角页面切换

右下角固定极简翻页控制：

```text
‹      08 / 43      ›
```

要求：

* 上一页
* 下一页
* 当前页码
* 总页数
* 小型 Progress Bar

不要使用大型按钮。

---

# 八、键盘控制

支持：

```text
←
→
PageUp
PageDown
Space
```

左右键切页。

支持：

```text
Home → 第一页
End → 最后一页
```

---

# 九、URL 状态

每个 Slide 应支持 URL Hash：

```text
#slide-1
#slide-12
#slide-43
```

刷新页面后仍停留当前页。

点击导航更新 Hash。

---


# 十、验收标准

最终作品必须通过以下检查：

```text
[ ] 43页完整
[ ] 页序与PPT一致
[ ] 所有主要文字可复制
[ ] 图片来自原PPT
[ ] Logo无遗漏
[ ] 无自行添加宣传语
[ ] 数字无自行修改
[ ] Organization 已重绘
[ ] Flow 已重绘
[ ] AI Architecture 已重绘
[ ] 左侧导航正常
[ ] 导航收缩后可以再次展开
[ ] 上一页/下一页正常
[ ] 键盘切页正常
[ ] URL Hash 正常
[ ] GitHub Pages 可运行
[ ] 浏览器刷新不会报错
[ ] 1366×768不溢出
[ ] 1920×1080视觉正常
[ ] 打印PDF正常
```

---

# 十一、最终设计原则

始终记住：

> 高级感来自信息秩序，而不是装饰。

> 不要把它设计成 AI 官网。

> 不要重新发明内容，只重新组织视觉。

> 每一页都应该像真正的企业 Editorial Presentation，而不是网页卡片集合。

> PPT 是内容和设计基准，HTML 是更精确、更可交互、更高清、更易维护的实现形式。

最终目标：

**让用户打开 HTML 后，感觉它是一套专业的日本 B2B 企业演示系统，而不是“PPT 转网页工具生成的页面”。**
