# Equation Lab 文档索引

这个目录放项目内部设计资料，不是给家长看的主 README。公开介绍请看仓库根目录的 `README.md` / `README.zh.md` / `README.ja.md`。

## 当前实现真源

- `../src/js/levels.js`：当前真实课程数据，13 章 66 关，以及 4 段主线旅程 + 挑战线的映射。
- `../src/js/practice.js`：当前练习区 deck 与题型生成器。
- `../src/js/ui.js`：首页学习地图、抽屉选关、关卡门槛题、练习区和自由实验入口。
- `../src/js/state.js`：本地存储、进度、主题、语言、练习区结果。
- `../tests/`：单元测试与浏览器回归测试。

## 文档分层

- `feasibility_layering.md`：近期/中期/远期能力边界。判断近期能不能做，优先看这里。
- `course_navigation_draft.md`：课程导航与学习地图方向。
- `chapter_blueprints_master.md`：主线章节蓝图汇总。
- `a0_blueprint_draft.md`、`c3_blueprint_draft.md`、`c4_blueprint_draft.md`、`d3_blueprint_draft.md`、`d4_blueprint_draft.md`：具体桥接单元设计稿。
- `child_journey_friction_review.md`：从孩子连续学习路径看卡点。
- `levels_blueprint_draft.js`：远期课程想法草案，不是当前可直接实装的数据源。

## 当前产品边界

- 主线仍然是等式与建模，不是泛数学题库。
- 巧算练习可以扩展，但必须放在 `Practice Zone` 的 deck 结构里，不直接塞进等式主线。
- 练习题应尽量服务“看结构再动手”，避免只做速度训练。
- 新增关卡或练习前，先判断是否需要新引擎能力；不能把暂时做不了的交互假设成已经存在。

## 练习区扩展规则

- 新增计算练习应先定义成一个 deck，例如：凑整拆分、因数观察、分数口算、单位换算。
- 每个 deck 至少说明：训练什么结构、为什么和等式/建模主线有关、是否需要新输入方式。
- 不建议先堆题量；先保证生成器、提示语、评价语和三语文案同步。
- 练习区可以更偏速度，但反馈语仍应强调策略，不只强调快慢。

## 当前练习套组

- `smart-calc`：巧算综合，混合拆分、合并、因数观察和乘除配对。
- `inverse-missing`：缺数逆算，练 `□ + a = b`、`a - □ = b`、`□ × a = b`、`a ÷ □ = b` 这类从结果倒推的整数题。
- `order-ops`：运算顺序，练括号优先、先乘除后加减，以及同级运算的路线判断。
- `multiplicative-structure`：乘法结构感，练乘法搭档、因数对组数、倍数跳格、第一次相遇和同一份合并。
- `rounding-sum`：凑整加减，只练整十/整百配对、抵消和重组。
- `factor-sense`：因数观察，只练共同因数和“几份”的结构。
- `factor-multiple`：公因数公倍数，练因数个数、公因数个数、最大公因数、最小公倍数和范围内公倍数个数。
- `mul-div-pair`：乘除配对，只练先消除除法，再找 `4×25` / `8×125`。
- `unit-conversion`：单位换算，练长度、时间、钱、质量的常见整数换算。
- `average-total`：平均与总量，练总量、份数、每份数量之间的乘除关系。

## 分值 / 游戏化预留

- 每道练习题已有 `points` 字段，当前仅在题面和答对反馈中显示。
- 暂不实现钱包、消费、抽卡、账号同步。
- 后续如果做硬币系统，必须先明确：只奖励认真完成与策略理解，不奖励无意义刷速度。

## 回归要求

有意义的 UI、关卡、练习区、状态存储调整后，至少运行：

```bash
npm test
npm run build
npm run test:e2e
```
