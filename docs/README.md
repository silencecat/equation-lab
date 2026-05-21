# Equation Lab 文档索引

这个目录放项目内部设计资料，不是给家长看的主 README。公开介绍请看仓库根目录的 `README.md` / `README.zh.md` / `README.ja.md`。

## 当前实现真源

- `../src/js/levels.js`：当前真实课程数据，13 章 66 关，以及 4 段主线旅程 + 挑战线的映射。
- `../src/js/practice.js`：当前练习区 `practiceDomains` 能力地图、兼容旧 `practiceDecks` 的题型生成器与判题。
- `../src/js/ui.js`：首页学习地图、抽屉选关、关卡门槛题、练习区和自由实验入口。
- `../src/js/state.js`：本地存储、进度、主题、语言、练习区结果。
- `../tests/`：单元测试与浏览器回归测试。

## 文档分层

- `feasibility_layering.md`：近期/中期/远期能力边界。判断近期能不能做，优先看这里。
- `course_navigation_draft.md`：课程导航与学习地图方向。
- `chapter_blueprints_master.md`：主线章节蓝图汇总。
- `a0_blueprint_draft.md`、`c3_blueprint_draft.md`、`c4_blueprint_draft.md`、`d3_blueprint_draft.md`、`d4_blueprint_draft.md`：具体桥接单元设计稿。
- `child_journey_friction_review.md`：从孩子连续学习路径看卡点。
- `japanese_readability_guidelines.md`：日语题干的「やさしい日本語」写作规则，防止新增题目再次变成长句。
- `levels_blueprint_draft.js`：远期课程想法草案，不是当前可直接实装的数据源。

## 当前产品边界

- 主线仍然是等式与建模，不是泛数学题库。
- 算数基础能力训练可以扩展，但必须放在 `Practice Zone` 的能力域 / 专项 / 阶段结构里，不直接塞进等式主线。
- 练习题应尽量服务“看结构再动手”，避免只做速度训练。
- 新增关卡或练习前，先判断是否需要新引擎能力；不能把暂时做不了的交互假设成已经存在。

## 练习区扩展规则

- 练习大厅主数据源是 `practiceDomains`；`practiceDecks` 只作为旧 API、旧测试和整数输入生成器兼容层保留。
- 新增计算练习应先归入一个能力域，再定义专项 module，例如：数的拆合感 / 凑整加减，因数倍数感 / 公因数公倍数。
- 每个 module 至少说明：训练什么结构、为什么和等式/建模主线有关、是否需要新输入方式。
- 每个 module 默认包含 4 个 stage：`sense` 找感觉、`relation` 说关系、`train` 小训练、`challenge` 混合挑战。
- `sense` / `relation` 优先使用点击选择题，不计时、不结算硬币；`train` / `challenge` 固定 10 题，完成整局后才结算硬币。
- 不建议先堆题量；先保证生成器、提示语、评价语和三语文案同步。
- 日语题干必须遵守 `japanese_readability_guidelines.md`：短句、少难词、数字和问题明确。
- 练习区可以更偏速度，但反馈语仍应强调策略，不只强调快慢。

## 当前能力域与专项

- `number-sense`：数的拆合感，目前包含 `rounding-sum` 凑整加减。
- `operation-relations`：四则关系感，目前包含 `inverse-missing` 缺数逆算、`order-ops` 运算顺序、`mul-div-pair` 乘除配对。
- `multiplicative-structure`：乘法结构感，目前包含 `multiplicative-structure` 乘法结构、`factor-sense` 因数观察。
- `factor-multiple-sense`：因数倍数感，目前包含 `factor-multiple` 公因数公倍数。
- `quantity-sense`：量与单位感，目前包含 `unit-conversion` 单位换算、`average-total` 平均与总量。
- `mixed-challenge`：综合挑战，目前包含 `smart-calc` 巧算综合。

## 兼容的旧 deck

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

- 每道练习题已有 `points` 字段。
- 练习区当前采用“能力域 → 专项 → 阶段 → 固定 10 题一局”的结构。
- `sense` / `relation` 阶段只练观察和判断，不计时、不结算硬币。
- `train` / `challenge` 阶段单题答对只放入本局“小袋”；中途离开不结算；完成整局后才把本局硬币倒进本地“硬币罐”。
- 暂不实现钱包、消费、抽卡、账号同步。
- 后续如果做硬币系统，必须先明确：只奖励认真完成与策略理解，不奖励无意义刷速度。

## 回归要求

有意义的 UI、关卡、练习区、状态存储调整后，至少运行：

```bash
npm test
npm run build
npm run test:e2e
```
