# 等式实验室

[English](./README.md) | [日本語](./README.ja.md)

等式实验室是一款面向小学高年级学生的互动数学网站。孩子可以通过拖拽、整理、展开和“两边同时操作”，逐步建立等式变换与代数直觉。

在线入口：
[GitHub Pages](https://silencecat.github.io/equation-lab/)

演示预览：
[![等式实验室演示](./docs/assets/equation_lab_demo.gif)](./docs/assets/equation_lab_demo.mp4)

这段演示覆盖四类核心交互：把项拖过等号、从卡片列方程、把工具拖到等号上做“两边同时操作”、以及展开括号。

## 项目简介

项目有两条并行学习线：

- `闯关线`：按知识点逐步推进，每关只强调一个关键想法
- `实验线`：可自由输入方程、生成随机题、比较不同解法

这不是单纯的刷题网站，而是一个让孩子“亲手做等式变形”的学习工具。

## 主要功能

- 拖拽卡片进行等式变形
- 用更直观的方式理解“变号”来自等价操作
- 使用 `+`、`-`、`×`、`÷` 工具对两边同时操作
- 支持整数、简单分数、括号、应用题等内容
- 提供中文、日语、英语三语界面与课程文本
- 可作为静态网站部署
- 可导出为单文件离线包，家长直接双击即可使用

## 给家长

使用方式很简单：

- 直接打开在线版
- 或使用离线单文件 [`dist/equation_lab_standalone.html`](./dist/equation_lab_standalone.html)

孩子可以：

- 通过闯关逐步学习
- 在实验线里自己输入式子尝试各种路线
- 比较不同做法，而不是只背一种口诀

## 给开发者

这是一个静态 HTML/CSS/JS 项目，通过一小步构建生成完整的单文件版本。

主要目录：

- [`src/`](./src/) 源代码
- [`dist/`](./dist/) 构建产物
- [`tests/`](./tests/) 单元测试与浏览器回归测试
- [`docs/`](./docs/) 对内文档与课程草案

## 本地开发

```bash
npm install
npm test
npm run test:e2e
npm run build
```

常用输出文件：

- [`dist/index.html`](./dist/index.html)：GitHub Pages 部署用
- [`dist/equation_lab.html`](./dist/equation_lab.html)：构建后的单文件版本
- [`dist/equation_lab_standalone.html`](./dist/equation_lab_standalone.html)：离线直接使用的单文件包

## 如何参与

我们特别欢迎以下方面的帮助：

- 课程节奏与难度建议
- 应用题故事设计
- 更适合孩子理解的文案
- 中英日三语润色
- 在真实设备上的交互测试

如果你是家长，不想改代码，也很欢迎参与：

- 提交某一关哪里难懂
- 提交新的题目故事
- 提交措辞优化建议
- 带截图反馈 bug

## 项目目标

我们的目标不是把孩子训练成“会移项”的做题机器，而是帮助他们理解：只要两边一起做同样的事，等式就会继续成立。
