/**
 * levels.js — 关卡数据（按章组织 · 中日英三语）
 *
 * 11 章 · 60 关，参考 docs/levels_blueprint_draft.js 蓝图扩充。
 * Ch1-7 为核心主线，Ch8-11 为挑战拓展。
 *
 * 每关包含 story 字段（应用题文本），build 关卡额外包含 tray（卡片列表）。
 */

export const chapters = [

  /* ═══════════════════════════════════════════════════════
   *  第 1 章  平衡和未知数 — 用等式讲故事
   * ═══════════════════════════════════════════════════════ */
  {
    id: 'ch1',
    name: { zh: '第一章：平衡和未知数 — 用等式讲故事', ja: '第1章：バランスと未知数 — 等式でお話しよう', en: 'Chapter 1: Balance & Unknowns' },
    desc: {
      zh: '等号就像天平：两边一样重。把数字搬到另一边就能找到 △！',
      ja: '等号はてんびんみたい：両側が同じ重さ。数字を反対側に動かせば △ が見つかるよ！',
      en: 'The equals sign is like a balance: both sides weigh the same. Move numbers to the other side to find x!',
    },
    levels: [
      /* ── 1-1 ── */
      {
        title: { zh: '1-1 糖果在哪里', ja: '1-1 キャンディはどこ？', en: '1-1 Where Are the Candies?' },
        story: {
          zh: '小明口袋里有一些糖果。妈妈又给了他 2 颗，数一数发现一共有 5 颗。小明原来有几颗糖果？',
          ja: 'たけしくんのポケットにキャンディが何個か入っています。お母さんがさらに 2 個くれて、数えたら全部で 5 個でした。最初は何個あった？',
          en: 'Alex has some candies in his pocket. Mom gives him 2 more, and he counts 5 in total. How many did he start with?',
        },
        sub:  { zh: '试试把 +2 拖到等号右边', ja: '+2 を等号の右側にドラッグしてみよう', en: 'Try dragging +2 to the right side' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        hint: { zh: '长按 +2 拖到右边试试！跨过等号它会自动变号。', ja: '+2 を長押しして右へドラッグ！等号を越えると自動で符号が変わるよ。', en: 'Long-press +2 and drag it right! It changes sign when crossing the equals sign.' },
        annotations: {
          left:  [{ zh: '原有的', ja: 'もとの数', en: 'original' }, { zh: '妈妈给的', ja: 'もらった分', en: 'from Mom' }],
          right: [{ zh: '一共', ja: '合計', en: 'total' }],
        },
        target: { n: 3, d: 1 },
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:2, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:5, d:1 } }] },
        },
      },
      /* ── 1-2 ── */
      {
        title: { zh: '1-2 铅笔盒', ja: '1-2 ふでばこ', en: '1-2 Pencil Case' },
        story: {
          zh: '铅笔盒里有一些铅笔，又放进 5 支后，现在一共有 8 支。原来有几支？',
          ja: 'ふでばこに鉛筆が何本か入っています。さらに 5 本入れたら全部で 8 本になりました。最初は何本？',
          en: 'There are some pencils in a case. After putting in 5 more, there are 8 in total. How many were there?',
        },
        sub:  { zh: '把 +5 拖到右边', ja: '+5 を右側にドラッグしよう', en: 'Drag +5 to the right' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        annotations: {
          left:  [{ zh: '原有的', ja: 'もとの数', en: 'original' }, { zh: '放进的', ja: '入れた分', en: 'added' }],
          right: [{ zh: '现在一共', ja: '今の合計', en: 'current total' }],
        },
        target: { n: 3, d: 1 },
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:5, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:8, d:1 } }] },
        },
      },
      /* ── 1-3 ── */
      {
        title: { zh: '1-3 书架上的书', ja: '1-3 本棚の本', en: '1-3 Books on the Shelf' },
        story: {
          zh: '书架上有一些书。小红借走了 1 本之后，书架上还剩 4 本。原来有几本？',
          ja: '本棚に本が何冊かあります。花子さんが 1 冊借りたら、残りは 4 冊。もとは何冊あった？',
          en: 'There are some books on the shelf. After borrowing 1, only 4 are left. How many were there?',
        },
        sub:  { zh: '负数搬家也会变号哦', ja: 'マイナスも移動すると符号が変わるよ', en: 'Negatives change sign when moved too!' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        hint: { zh: '把 −1 拖到右边，它会变成 +1。', ja: '−1 を右側にドラッグすると、+1 に変わるよ。', en: 'Drag -1 to the right — it becomes +1.' },
        annotations: {
          left:  [{ zh: '原有的', ja: 'もとの数', en: 'original' }, { zh: '借走的', ja: '借りた分', en: 'borrowed' }],
          right: [{ zh: '还剩', ja: '残り', en: 'remaining' }],
        },
        target: { n: 5, d: 1 },
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:-1, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:4, d:1 } }] },
        },
      },
      /* ── 1-4 build ── */
      {
        type: 'build',
        title: { zh: '1-4 弹珠列式', ja: '1-4 ビー玉で式を作ろう', en: '1-4 Marble Equation' },
        story: {
          zh: '小明有一些弹珠，又赢了 2 颗，现在一共有 7 颗。请列出方程。',
          ja: 'たけしくんはビー玉を何個か持っています。さらに 2 個勝ち取って、今は全部で 7 個。方程式を作ろう。',
          en: 'Alex has some marbles. He wins 2 more and now has 7. Build the equation.',
        },
        sub:  { zh: '把卡片拖到正确的一边', ja: 'カードを正しい側にドラッグしよう', en: 'Drag cards to the correct side' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '原有的弹珠', ja: 'もとのビー玉', en: 'original marbles' } },
          { s: 'n', c: { n: 2, d: 1 }, label: { zh: '赢来的', ja: '勝ち取った分', en: 'won' } },
          { s: 'n', c: { n: 7, d: 1 }, label: { zh: '一共', ja: '合計', en: 'total' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:2, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:7, d:1 } }] },
        },
        target: { n: 5, d: 1 },
      },
      /* ── 1-5 build ── */
      {
        type: 'build',
        title: { zh: '1-5 送花列式', ja: '1-5 花を贈ろう', en: '1-5 Flower Equation' },
        story: {
          zh: '花瓶里有一些花，送出 2 朵后还剩 3 朵。请列出方程。',
          ja: '花瓶に花が何本かあります。2 本あげたら残り 3 本。方程式を作ろう。',
          en: 'A vase has some flowers. After giving away 2, there are 3 left. Build the equation.',
        },
        sub:  { zh: '"送出"用什么符号表示？', ja: '「あげた」はどの記号？', en: 'What sign means "giving away"?' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '原有的花', ja: 'もとの花', en: 'original flowers' } },
          { s: 'n', c: { n: -2, d: 1 }, label: { zh: '送出的', ja: 'あげた分', en: 'given away' } },
          { s: 'n', c: { n: 3, d: 1 }, label: { zh: '还剩的', ja: '残り', en: 'remaining' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:-2, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:3, d:1 } }] },
        },
        target: { n: 5, d: 1 },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
   *  第 2 章  把常数请走 — 合并同类项
   * ═══════════════════════════════════════════════════════ */
  {
    id: 'ch2',
    name: { zh: '第二章：把常数请走 — 合并同类项', ja: '第2章：定数を移動 — 同類項をまとめよう', en: 'Chapter 2: Move Constants — Combine Like Terms' },
    desc: {
      zh: '同一侧有好几个数字？移过去之后它们会自动合并！',
      ja: '同じ側に数字がたくさん？移動させると自動でまとまるよ！',
      en: 'Several numbers on the same side? They combine automatically when moved!',
    },
    levels: [
      /* ── 2-1 ── */
      {
        title: { zh: '2-1 攒零花钱', ja: '2-1 おこづかい貯金', en: '2-1 Saving Pocket Money' },
        story: {
          zh: '小明攒了一些钱，周一得了 2 元零花钱，周二又得了 1 元。他现在和有 8 元的小红一样多。小明原来攒了多少钱？',
          ja: 'たけしくんはいくらか貯めていて、月曜に 2 円、火曜にさらに 1 円もらいました。8 円持っている花子さんと同じです。最初にいくら貯めていた？',
          en: 'Alex saved some money. He got 2 yuan on Monday and 1 more on Tuesday. Now he has the same as Beth\'s 8 yuan. How much did he save?',
        },
        sub:  { zh: '把 +2 和 +1 都搬到右边', ja: '+2 と +1 を両方とも右側へ移そう', en: 'Move both +2 and +1 to the right' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        annotations: {
          left:  [{ zh: '攒的', ja: '貯めた分', en: 'saved' }, { zh: '周一得的', ja: '月曜の分', en: 'Monday\'s' }, { zh: '周二得的', ja: '火曜の分', en: 'Tuesday\'s' }],
          right: [{ zh: '小红的', ja: '花子の', en: 'Beth\'s' }],
        },
        target: { n: 5, d: 1 },
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:2, d:1 } }, { t:'term', s:'n', c:{ n:1, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:8, d:1 } }] },
        },
      },
      /* ── 2-2 ── */
      {
        title: { zh: '2-2 多余的积木', ja: '2-2 ブロックの数合わせ', en: '2-2 Extra Blocks' },
        story: {
          zh: '小明有一些积木，又拿到了 3 块。小红有 4 块和 6 块积木。两人一样多，小明原来有几块？',
          ja: 'たけしくんはブロックを何個か持っていて、さらに 3 個もらいました。花子さんは 4 個と 6 個。二人は同じ数。たけしくんは最初に何個持っていた？',
          en: 'Alex has some blocks and gets 3 more. Beth has 4 and 6 blocks. They have the same total. How many did Alex start with?',
        },
        sub:  { zh: '右边同侧的数字会自动合并', ja: '同じ側の数字は自動でまとまるよ', en: 'Numbers on the same side combine automatically' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        annotations: {
          left:  [{ zh: '小明的', ja: 'たけしの', en: 'Alex\'s' }, { zh: '另有的', ja: 'さらに', en: 'extra' }],
          right: [{ zh: '小红的', ja: '花子の', en: 'Beth\'s' }, { zh: '另有的', ja: 'さらに', en: 'extra' }],
        },
        target: { n: 7, d: 1 },
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:3, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:4, d:1 } }, { t:'term', s:'n', c:{ n:6, d:1 } }] },
        },
      },
      /* ── 2-3 ── */
      {
        title: { zh: '2-3 看图书', ja: '2-3 図書館', en: '2-3 Library Visit' },
        story: {
          zh: '小明有一些图书，借出 2 本后又买了 5 本，和小红的 7 本一样多。小明原来有几本？',
          ja: 'たけしくんは本を何冊か持っていて、2 冊貸した後さらに 5 冊買ったら、花子さんの 7 冊と同じです。最初は何冊持っていた？',
          en: 'Alex has some books. After lending 2 and buying 5, he has the same as Beth\'s 7. How many did he start with?',
        },
        sub:  { zh: '正数和负数都要搬走', ja: 'プラスもマイナスも移動しよう', en: 'Move both positives and negatives' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        annotations: {
          left:  [{ zh: '原有的', ja: 'もとの数', en: 'original' }, { zh: '借出的', ja: '貸した分', en: 'lent out' }, { zh: '买的', ja: '買った分', en: 'bought' }],
          right: [{ zh: '小红的', ja: '花子の', en: 'Beth\'s' }],
        },
        target: { n: 4, d: 1 },
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:-2, d:1 } }, { t:'term', s:'n', c:{ n:5, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:7, d:1 } }] },
        },
      },
      /* ── 2-4 ── */
      {
        title: { zh: '2-4 买文具', ja: '2-4 文房具を買おう', en: '2-4 Buying Stationery' },
        story: {
          zh: '小明有一些笔，获得 4 支奖品笔后送出 1 支，和小红的 6 支一样多。小明原来有几支？',
          ja: 'たけしくんは鉛筆を何本か持っています。賞品で 4 本もらい 1 本あげたら、花子さんの 6 本と同じ。最初は何本持っていた？',
          en: 'Alex has some pens. After winning 4 prizes and giving 1 away, he has the same as Beth\'s 6. How many did he start with?',
        },
        sub:  { zh: '两个常数都要搬走', ja: '2 つの定数を両方移そう', en: 'Move both constants away' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        annotations: {
          left:  [{ zh: '原有的', ja: 'もとの数', en: 'original' }, { zh: '获得的', ja: 'もらった分', en: 'won' }, { zh: '送出的', ja: 'あげた分', en: 'given away' }],
          right: [{ zh: '小红的', ja: '花子の', en: 'Beth\'s' }],
        },
        target: { n: 3, d: 1 },
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:4, d:1 } }, { t:'term', s:'n', c:{ n:-1, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:6, d:1 } }] },
        },
      },
      /* ── 2-5 build ── */
      {
        type: 'build',
        title: { zh: '2-5 甜甜圈列式', ja: '2-5 ドーナツの式', en: '2-5 Donut Equation' },
        story: {
          zh: '盒子里有一些甜甜圈，早上放入 3 个，中午又放入 1 个，现在一共 9 个。请列出方程。',
          ja: '箱にドーナツが何個か入っています。朝 3 個、昼にまた 1 個入れたら合計 9 個。方程式を作ろう。',
          en: 'A box has some donuts. 3 added in the morning and 1 at noon, making 9 total. Build the equation.',
        },
        sub:  { zh: '三张卡放同一边', ja: '3 枚のカードを同じ側に', en: 'Put all 3 cards on one side' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '原有的', ja: 'もとの数', en: 'original' } },
          { s: 'n', c: { n: 3, d: 1 }, label: { zh: '早上放入的', ja: '朝の分', en: 'morning' } },
          { s: 'n', c: { n: 1, d: 1 }, label: { zh: '中午放入的', ja: '昼の分', en: 'noon' } },
          { s: 'n', c: { n: 9, d: 1 }, label: { zh: '一共', ja: '合計', en: 'total' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:3, d:1 } }, { t:'term', s:'n', c:{ n:1, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:9, d:1 } }] },
        },
        target: { n: 5, d: 1 },
      },
      /* ── 2-6 build ── */
      {
        type: 'build',
        title: { zh: '2-6 红包列式', ja: '2-6 お年玉の式', en: '2-6 Red Envelope Equation' },
        story: {
          zh: '小明有一些钱，收到 2 元红包后花掉 1 元买零食，和 8 元一样多。请列出方程。',
          ja: 'たけしくんはいくらかお金を持っています。お年玉 2 円をもらい、おやつに 1 円使ったら 8 円と同じ。方程式を作ろう。',
          en: 'Alex has some money. After getting 2 yuan and spending 1 on snacks, he has 8 yuan. Build the equation.',
        },
        sub:  { zh: '有正有负，注意区分', ja: 'プラスとマイナスに注意', en: 'Watch for positive and negative signs' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '原有的', ja: 'もとの数', en: 'original' } },
          { s: 'n', c: { n: 2, d: 1 }, label: { zh: '红包', ja: 'お年玉', en: 'gift money' } },
          { s: 'n', c: { n: -1, d: 1 }, label: { zh: '花掉的', ja: '使った分', en: 'spent' } },
          { s: 'n', c: { n: 8, d: 1 }, label: { zh: '一样多', ja: '同じ金額', en: 'same amount' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:2, d:1 } }, { t:'term', s:'n', c:{ n:-1, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:8, d:1 } }] },
        },
        target: { n: 7, d: 1 },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
   *  第 3 章  几个一样的未知数 — 工具箱登场
   * ═══════════════════════════════════════════════════════ */
  {
    id: 'ch3',
    name: { zh: '第三章：几个一样的未知数 — 工具箱登场', ja: '第3章：同じ未知数がいくつも — ツールボックス登場', en: 'Chapter 3: Multiple Unknowns — Enter the Toolbox' },
    desc: {
      zh: '△ 前面带了系数？用工具箱的 × 和 ÷ 两边同时操作！',
      ja: '△ に係数がついてる？ツールボックスの × と ÷ で両辺を同時に操作！',
      en: 'x has a coefficient? Use the toolbox × and ÷ to operate on both sides!',
    },
    levels: [
      /* ── 3-1 ── */
      {
        title: { zh: '3-1 同价铅笔', ja: '3-1 同じ値段のえんぴつ', en: '3-1 Same-Price Pencils' },
        story: {
          zh: '两支一样价钱的铅笔，一共花了 6 元。每支多少钱？',
          ja: '同じ値段の鉛筆 2 本で、合計 6 円。1 本いくら？',
          en: 'Two pencils at the same price cost 6 yuan total. How much is each?',
        },
        sub:  { zh: '用工具箱 ÷2 试试', ja: 'ツールボックスの ÷2 を使おう', en: 'Try ÷2 from the toolbox' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        hint: { zh: '打开工具箱选择 ÷2，两边同时除 2。', ja: 'ツールボックスで ÷2 を選んで、両辺を同時に 2 で割ろう。', en: 'Open the toolbox, pick ÷2, and divide both sides by 2.' },
        annotations: {
          left:  [{ zh: '2支铅笔', ja: 'えんぴつ2本', en: '2 pencils' }],
          right: [{ zh: '总花费', ja: '合計', en: 'total cost' }],
        },
        target: { n: 3, d: 1 },
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:2, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:6, d:1 } }] },
        },
      },
      /* ── 3-2 ── */
      {
        title: { zh: '3-2 铅笔和橡皮', ja: '3-2 えんぴつと消しゴム', en: '3-2 Pencils and Erasers' },
        story: {
          zh: '两支同价铅笔加 1 块橡皮，一共 7 元。铅笔每支多少钱？',
          ja: '同じ値段の鉛筆 2 本と消しゴム 1 個で合計 7 円。鉛筆 1 本いくら？',
          en: 'Two same-priced pencils plus 1 eraser cost 7 yuan. How much is each pencil?',
        },
        sub:  { zh: '先移走常数，再用工具箱', ja: 'まず定数を移動、それからツールボックス', en: 'Move constants first, then use the toolbox' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        annotations: {
          left:  [{ zh: '2支铅笔', ja: 'えんぴつ2本', en: '2 pencils' }, { zh: '橡皮', ja: '消しゴム', en: 'eraser' }],
          right: [{ zh: '总花费', ja: '合計', en: 'total cost' }],
        },
        target: { n: 3, d: 1 },
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:2, d:1 } }, { t:'term', s:'n', c:{ n:1, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:7, d:1 } }] },
        },
      },
      /* ── 3-3 ── */
      {
        title: { zh: '3-3 团购 T 恤', ja: '3-3 Tシャツまとめ買い', en: '3-3 T-Shirt Group Buy' },
        story: {
          zh: '3 件同款 T 恤，加上 2 元运费，一共花了 11 元。每件 T 恤多少钱？',
          ja: '同じ T シャツを 3 枚買って、送料 2 円を足したら合計 11 円。1 枚いくら？',
          en: '3 same T-shirts plus 2 yuan shipping cost 11 yuan. How much is each T-shirt?',
        },
        sub:  { zh: '先移走运费，再用工具箱 ÷3', ja: 'まず送料を移動してからツールボックスで ÷3', en: 'Move shipping first, then use ÷3 from the toolbox' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        hint: { zh: '先把 +2 移到右边，得到 3△ = 9，再用工具箱 ÷3。', ja: 'まず +2 を右に移して 3△ = 9 にし、ツールボックスで ÷3。', en: 'Move +2 to the right to get 3x = 9, then use ÷3 from the toolbox.' },
        annotations: {
          left:  [{ zh: '3件T恤', ja: 'Tシャツ3枚', en: '3 T-shirts' }, { zh: '运费', ja: '送料', en: 'shipping' }],
          right: [{ zh: '总花费', ja: '合計', en: 'total cost' }],
        },
        target: { n: 3, d: 1 },
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:3, d:1 } }, { t:'term', s:'n', c:{ n:2, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:11, d:1 } }] },
        },
      },
      /* ── 3-4 build ── */
      {
        type: 'build',
        title: { zh: '3-4 买苹果列式', ja: '3-4 りんごの式', en: '3-4 Apple Equation' },
        story: {
          zh: '两袋一样多的苹果，一共 8 个。每袋几个？请列出方程。',
          ja: '同じ数のりんごが 2 袋、合計 8 個。1 袋何個？方程式を作ろう。',
          en: 'Two bags of apples, 8 in total. How many per bag? Build the equation.',
        },
        sub:  { zh: '2 袋苹果怎么用一张卡表示？', ja: '2 袋のりんごを 1 枚のカードで？', en: 'How do you show 2 bags with one card?' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 2, d: 1 }, label: { zh: '2 袋苹果', ja: 'りんご 2 袋', en: '2 bags of apples' } },
          { s: 'n', c: { n: 8, d: 1 }, label: { zh: '一共', ja: '合計', en: 'total' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:2, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:8, d:1 } }] },
        },
        target: { n: 4, d: 1 },
      },
      /* ── 3-5 build ── */
      {
        type: 'build',
        title: { zh: '3-5 运动会列式', ja: '3-5 運動会の式', en: '3-5 Sports Day Equation' },
        story: {
          zh: '运动会接力赛跑了 3 轮，每轮得分相同，加上 2 分团体加分，总共 14 分。请列出方程。',
          ja: '運動会のリレーを 3 回走り、毎回同じ点数。ボーナス 2 点を足して合計 14 点。方程式を作ろう。',
          en: '3 relay rounds with equal scores, plus a 2-point team bonus, totaling 14. Build the equation.',
        },
        sub:  { zh: '系数和常数要分开放', ja: '係数と定数は別々に置こう', en: 'Keep coefficients and constants separate' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 3, d: 1 }, label: { zh: '3 轮接力', ja: 'リレー3回分', en: '3 relay rounds' } },
          { s: 'n', c: { n: 2, d: 1 }, label: { zh: '团体加分', ja: 'ボーナス', en: 'team bonus' } },
          { s: 'n', c: { n: 14, d: 1 }, label: { zh: '总得分', ja: '合計得点', en: 'total score' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:3, d:1 } }, { t:'term', s:'n', c:{ n:2, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:14, d:1 } }] },
        },
        target: { n: 4, d: 1 },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
   *  第 4 章  半份和几分之几份 — 分数系数
   * ═══════════════════════════════════════════════════════ */
  {
    id: 'ch4',
    name: { zh: '第四章：半份和几分之几份 — 分数系数', ja: '第4章：半分や分数の係数', en: 'Chapter 4: Halves & Fractions' },
    desc: {
      zh: '半个 △ 、三分之一个 △ ……用工具箱的 × 把它变回整数！',
      ja: '半分の △、3分の1の △……ツールボックスの × で整数に戻そう！',
      en: 'Half of x, one-third of x... Use × from the toolbox to make it a whole number!',
    },
    levels: [
      /* ── 4-1 ── */
      {
        title: { zh: '4-1 分蛋糕', ja: '4-1 ケーキを分けよう', en: '4-1 Sharing Cake' },
        story: {
          zh: '买了半块蛋糕花了 4 元。整块蛋糕多少钱？',
          ja: 'ケーキを半分買ったら 4 円でした。1 ホールはいくら？',
          en: 'Half a cake costs 4 yuan. How much is a whole cake?',
        },
        sub:  { zh: '用工具箱 ×2 把半块变回整块', ja: 'ツールボックスの ×2 で半分を 1 ホールに', en: 'Use ×2 from the toolbox to make half into whole' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        hint: { zh: '打开工具箱选择 ×2，两边同时乘 2。', ja: 'ツールボックスで ×2 を選んで、両辺を同時に 2 倍しよう。', en: 'Open the toolbox, pick ×2, and multiply both sides by 2.' },
        annotations: {
          left:  [{ zh: '半块价', ja: '半分の値段', en: 'half price' }],
          right: [{ zh: '花的钱', ja: '支払い', en: 'amount paid' }],
        },
        target: { n: 8, d: 1 },
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:2 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:4, d:1 } }] },
        },
      },
      /* ── 4-2 ── */
      {
        title: { zh: '4-2 半价加包装', ja: '4-2 半額＋包装代', en: '4-2 Half Price Plus Wrapping' },
        story: {
          zh: '买了半块蛋糕，加上 1 元包装费，一共花了 4 元。整块蛋糕多少钱？',
          ja: 'ケーキの半分を買って、包装代 1 円を足したら合計 4 円。1 ホールはいくら？',
          en: 'Half a cake plus 1 yuan wrapping costs 4 yuan total. How much is a whole cake?',
        },
        sub:  { zh: '先移走常数，再用工具箱 ×2', ja: 'まず定数を移動してからツールボックスで ×2', en: 'Move constants first, then use ×2 from the toolbox' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        annotations: {
          left:  [{ zh: '半块价', ja: '半分の値段', en: 'half price' }, { zh: '包装费', ja: '包装代', en: 'wrapping fee' }],
          right: [{ zh: '总花费', ja: '合計', en: 'total cost' }],
        },
        target: { n: 6, d: 1 },
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:2 } }, { t:'term', s:'n', c:{ n:1, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:4, d:1 } }] },
        },
      },
      /* ── 4-3 ── */
      {
        title: { zh: '4-3 三分之一盒巧克力', ja: '4-3 チョコレートの3分の1', en: '4-3 One-Third of a Chocolate Box' },
        story: {
          zh: '一整盒巧克力，拿出三分之一再加 1 颗散装的，一共有 4 颗。整盒有多少颗？',
          ja: 'チョコレート 1 箱から 3 分の 1 を取り出し、バラ 1 個を足したら合計 4 個。1 箱は何個？',
          en: 'Take one-third of a box of chocolates plus 1 loose piece to get 4 total. How many in the full box?',
        },
        sub:  { zh: '先移走 +1，再用工具箱 ×3', ja: 'まず +1 を移して、ツールボックスで ×3', en: 'Move +1 first, then use ×3 from the toolbox' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        annotations: {
          left:  [{ zh: '三分之一盒', ja: '3分の1箱', en: 'one-third box' }, { zh: '散装的', ja: 'バラの分', en: 'loose pieces' }],
          right: [{ zh: '一共', ja: '合計', en: 'total' }],
        },
        target: { n: 9, d: 1 },
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:3 } }, { t:'term', s:'n', c:{ n:1, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:4, d:1 } }] },
        },
      },
      /* ── 4-4 ── */
      {
        title: { zh: '4-4 一块半蛋糕', ja: '4-4 1個半のケーキ', en: '4-4 One and a Half Cakes' },
        story: {
          zh: '买了一块半蛋糕（就是 3/2 块），一共花了 9 元。一块蛋糕多少钱？',
          ja: 'ケーキを 1 個半（つまり 3/2 個）買って、合計 9 円。1 個いくら？',
          en: 'One and a half cakes (that\'s 3/2) cost 9 yuan. How much is one cake?',
        },
        sub:  { zh: '用工具箱处理 3/2 这个系数', ja: 'ツールボックスで 3/2 の係数を処理しよう', en: 'Use the toolbox to handle the 3/2 coefficient' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        annotations: {
          left:  [{ zh: '一块半', ja: '1個半', en: 'one and a half' }],
          right: [{ zh: '总花费', ja: '合計', en: 'total cost' }],
        },
        target: { n: 6, d: 1 },
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:3, d:2 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:9, d:1 } }] },
        },
      },
      /* ── 4-5 build ── */
      {
        type: 'build',
        title: { zh: '4-5 半价优惠列式', ja: '4-5 半額セールの式', en: '4-5 Half-Price Sale Equation' },
        story: {
          zh: '半价优惠买一件玩具，再加 2 元运费，一共 5 元。这件玩具原价多少？请列出方程。',
          ja: '半額セールでおもちゃを買い、送料 2 円を足して合計 5 円。元の値段はいくら？方程式を作ろう。',
          en: 'A toy at half price plus 2 yuan shipping costs 5 yuan. What\'s the full price? Build the equation.',
        },
        sub:  { zh: '半价怎么表示？', ja: '半額はどう表す？', en: 'How do you show half price?' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 1, d: 2 }, label: { zh: '半价', ja: '半額', en: 'half price' } },
          { s: 'n', c: { n: 2, d: 1 }, label: { zh: '运费', ja: '送料', en: 'shipping' } },
          { s: 'n', c: { n: 5, d: 1 }, label: { zh: '一共', ja: '合計', en: 'total' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:2 } }, { t:'term', s:'n', c:{ n:2, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:5, d:1 } }] },
        },
        target: { n: 6, d: 1 },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
   *  第 5 章  把故事写成等式 — 建模练习
   * ═══════════════════════════════════════════════════════ */
  {
    id: 'ch5',
    name: { zh: '第五章：把故事写成等式 — 建模练习', ja: '第5章：お話を等式に — モデリング練習', en: 'Chapter 5: Stories into Equations — Modeling Practice' },
    desc: {
      zh: '读完应用题，把卡片拖到等式的正确位置，拼出方程！',
      ja: 'お話を読んで、カードを等式の正しい場所にドラッグして、方程式を作ろう！',
      en: 'Read the problem, drag cards to the right spots, and build the equation!',
    },
    levels: [
      /* ── 5-1 build ── */
      {
        type: 'build',
        title: { zh: '5-1 数糖果', ja: '5-1 キャンディを数えよう', en: '5-1 Counting Candies' },
        story: {
          zh: '小明口袋里有一些糖果。妈妈又给了他 2 颗，数了数一共 5 颗。请列出方程。',
          ja: 'たけしくんのポケットにキャンディが何個か入っています。お母さんが 2 個くれて、全部で 5 個。方程式を作ろう。',
          en: 'Alex has some candies. Mom gives him 2 more, making 5 total. Build the equation.',
        },
        sub:  { zh: '把卡片拖到正确的一边', ja: 'カードを正しい側にドラッグしよう', en: 'Drag cards to the correct side' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '原有的糖果', ja: 'もとのキャンディ', en: 'original candies' } },
          { s: 'n', c: { n: 2, d: 1 }, label: { zh: '妈妈给的', ja: 'もらった分', en: 'from Mom' } },
          { s: 'n', c: { n: 5, d: 1 }, label: { zh: '一共', ja: '合計', en: 'total' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:2, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:5, d:1 } }] },
        },
        target: { n: 3, d: 1 },
      },
      /* ── 5-2 build ── */
      {
        type: 'build',
        title: { zh: '5-2 借书', ja: '5-2 本を借りる', en: '5-2 Borrowing Books' },
        story: {
          zh: '书架上有一些书。小红借走了 3 本后，还剩 7 本。请列出方程。',
          ja: '本棚に本が何冊かあります。花子さんが 3 冊借りたら 7 冊残りました。方程式を作ろう。',
          en: 'There are some books on the shelf. After Beth borrows 3, there are 7 left. Build the equation.',
        },
        sub:  { zh: '"借走"用什么符号表示？', ja: '「借りた」はどの記号？', en: 'What sign means "borrowing"?' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '原有的书', ja: 'もとの本', en: 'original books' } },
          { s: 'n', c: { n: -3, d: 1 }, label: { zh: '借走的', ja: '借りた分', en: 'borrowed' } },
          { s: 'n', c: { n: 7, d: 1 }, label: { zh: '还剩的', ja: '残り', en: 'remaining' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:-3, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:7, d:1 } }] },
        },
        target: { n: 10, d: 1 },
      },
      /* ── 5-3 build ── */
      {
        type: 'build',
        title: { zh: '5-3 攒零花钱', ja: '5-3 おこづかい貯金', en: '5-3 Saving Pocket Money' },
        story: {
          zh: '小明攒了一些钱，周一得了 2 元零花钱，周二又得了 1 元。他现在和有 8 元的小红一样多。请列出方程。',
          ja: 'たけしくんはいくらか貯めていて、月曜に 2 円、火曜にさらに 1 円もらいました。花子さんの 8 円と同じです。方程式を作ろう。',
          en: 'Alex saved some money. He got 2 yuan on Monday and 1 on Tuesday. Now he has the same as Beth\'s 8 yuan. Build the equation.',
        },
        sub:  { zh: '三张卡放同一边', ja: '3 枚のカードを同じ側に', en: 'Put all 3 cards on one side' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '攒的', ja: '貯めた分', en: 'saved' } },
          { s: 'n', c: { n: 2, d: 1 }, label: { zh: '周一得的', ja: '月曜の分', en: 'Monday\'s' } },
          { s: 'n', c: { n: 1, d: 1 }, label: { zh: '周二得的', ja: '火曜の分', en: 'Tuesday\'s' } },
          { s: 'n', c: { n: 8, d: 1 }, label: { zh: '小红有的', ja: '花子の分', en: 'Beth\'s' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:2, d:1 } }, { t:'term', s:'n', c:{ n:1, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:8, d:1 } }] },
        },
        target: { n: 5, d: 1 },
      },
      /* ── 5-4 build ── */
      {
        type: 'build',
        title: { zh: '5-4 买铅笔', ja: '5-4 えんぴつを買おう', en: '5-4 Buying Pencils' },
        story: {
          zh: '妈妈给小明和弟弟各买了一支同样的铅笔，2 支一共花了 6 元。请列出方程。',
          ja: 'お母さんがたけしくんと弟に同じ鉛筆を 1 本ずつ買いました。2 本で合計 6 円。方程式を作ろう。',
          en: 'Mom bought the same pencil for Alex and his brother. 2 pencils cost 6 yuan. Build the equation.',
        },
        sub:  { zh: '2 支铅笔怎么用一张卡表示？', ja: '2 本の鉛筆を 1 枚のカードで？', en: 'How do you show 2 pencils with one card?' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 2, d: 1 }, label: { zh: '2 支铅笔', ja: 'えんぴつ 2 本', en: '2 pencils' } },
          { s: 'n', c: { n: 6, d: 1 }, label: { zh: '一共花的', ja: '合計金額', en: 'total spent' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:2, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:6, d:1 } }] },
        },
        target: { n: 3, d: 1 },
      },
      /* ── 5-5 build ── */
      {
        type: 'build',
        title: { zh: '5-5 运动会得分', ja: '5-5 運動会の得点', en: '5-5 Sports Day Score' },
        story: {
          zh: '运动会接力赛跑了 3 轮，每轮得分相同。加上开幕式 2 分团体加分，总共 11 分。请列出方程。',
          ja: '運動会のリレーを 3 回走り、毎回同じ点数。開会式のボーナス 2 点を足して、合計 11 点。方程式を作ろう。',
          en: '3 relay rounds with equal scores. Plus a 2-point opening bonus, totaling 11. Build the equation.',
        },
        sub:  { zh: '系数和常数要分开放', ja: '係数と定数は別々に置こう', en: 'Keep coefficients and constants separate' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 3, d: 1 }, label: { zh: '3 轮接力', ja: 'リレー3回分', en: '3 relay rounds' } },
          { s: 'n', c: { n: 2, d: 1 }, label: { zh: '团体加分', ja: 'ボーナス', en: 'team bonus' } },
          { s: 'n', c: { n: 11, d: 1 }, label: { zh: '总得分', ja: '合計得点', en: 'total score' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:3, d:1 } }, { t:'term', s:'n', c:{ n:2, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:11, d:1 } }] },
        },
        target: { n: 3, d: 1 },
      },
      /* ── 5-6 build ── */
      {
        type: 'build',
        title: { zh: '5-6 三瓶饮料', ja: '5-6 ジュース3本', en: '5-6 Three Bottles' },
        story: {
          zh: '三瓶同价饮料再加 3 元打包费，一共 15 元。请列出方程。',
          ja: '同じ値段のジュース 3 本に包装代 3 円を足して、合計 15 円。方程式を作ろう。',
          en: 'Three same-priced drinks plus 3 yuan packing fee, 15 yuan total. Build the equation.',
        },
        sub:  { zh: '完整走完建模链路', ja: '最後までモデリングしよう', en: 'Complete the whole modeling process' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 3, d: 1 }, label: { zh: '3 瓶饮料', ja: 'ジュース3本', en: '3 bottles' } },
          { s: 'n', c: { n: 3, d: 1 }, label: { zh: '打包费', ja: '包装代', en: 'packing fee' } },
          { s: 'n', c: { n: 15, d: 1 }, label: { zh: '一共', ja: '合計', en: 'total' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:3, d:1 } }, { t:'term', s:'n', c:{ n:3, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:15, d:1 } }] },
        },
        target: { n: 4, d: 1 },
      },
      /* ── 5-7 build 干扰卡 ── */
      {
        type: 'build',
        title: { zh: '5-7 谁的弹珠多', ja: '5-7 ビー玉はいくつ？', en: '5-7 Whose Marbles?' },
        story: {
          zh: '小明有一些弹珠，又赢了 3 颗，现在一共 8 颗。请列出方程。注意：不是所有卡片都需要哦！',
          ja: 'たけしくんはビー玉を何個か持っています。さらに 3 個勝ち取って、今は全部で 8 個。方程式を作ろう。全部のカードを使わなくてもいいよ！',
          en: 'Alex has some marbles. He wins 3 more and now has 8. Build the equation. Not every card is needed!',
        },
        sub:  { zh: '有一张卡没有用，仔细想想', ja: '使わないカードが 1 枚あるよ', en: 'One card isn\'t needed — think carefully' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '原有的弹珠', ja: 'もとのビー玉', en: 'original marbles' } },
          { s: 'n', c: { n: 3, d: 1 }, label: { zh: '赢来的', ja: '勝ち取った分', en: 'won' } },
          { s: 'n', c: { n: 8, d: 1 }, label: { zh: '现在一共', ja: '今の合計', en: 'current total' } },
          { s: 'n', c: { n: 5, d: 1 }, label: { zh: '（输掉的？）', ja: '（負けた分？）', en: '(lost ones?)' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:3, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:8, d:1 } }] },
        },
        target: { n: 5, d: 1 },
      },
      /* ── 5-8 build 干扰卡 ── */
      {
        type: 'build',
        title: { zh: '5-8 课外班', ja: '5-8 習い事', en: '5-8 After-School Class' },
        story: {
          zh: '小明每周上 2 次课外班，外加 1 元材料费。小红每周上 1 次同样的课外班，加 4 元交通费。两人费用相同，请列出方程。注意有多余卡片！',
          ja: 'たけしくんは週 2 回の習い事と材料費 1 円。花子さんは同じ習い事を週 1 回と交通費 4 円。同じ費用の方程式を作ろう。余計なカードに注意！',
          en: 'Alex takes 2 classes a week plus 1 yuan for materials. Beth takes 1 class plus 4 yuan for transport. Same cost. Build the equation. Watch for extra cards!',
        },
        sub:  { zh: '读清楚题目，别被多余卡片骗了', ja: '問題をよく読んで、余計なカードに惑わされないで', en: 'Read carefully — don\'t be fooled by extra cards' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 2, d: 1 }, label: { zh: '小明 2 次课', ja: 'たけし2回分', en: 'Alex\'s 2 classes' } },
          { s: 'n', c: { n: 1, d: 1 }, label: { zh: '材料费', ja: '材料費', en: 'material fee' } },
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '小红 1 次课', ja: '花子1回分', en: 'Beth\'s 1 class' } },
          { s: 'n', c: { n: 4, d: 1 }, label: { zh: '小红另付的', ja: '花子のほか', en: 'Beth\'s extra' } },
          { s: 'n', c: { n: 3, d: 1 }, label: { zh: '（交通费？）', ja: '（交通費？）', en: '(bus fare?)' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:2, d:1 } }, { t:'term', s:'n', c:{ n:1, d:1 } }] },
          right: { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:4, d:1 } }] },
        },
        target: { n: 3, d: 1 },
      },
      /* ── 5-9 build 带符号选择 ── */
      {
        type: 'build',
        title: { zh: '5-9 买铅笔（选符号）', ja: '5-9 えんぴつを買おう（符号選び）', en: '5-9 Buying Pencils (Pick Signs)' },
        story: {
          zh: '小明有一些钱，花 4 元买了铅笔后还剩 6 元。你能选对 +/− 符号列出方程吗？',
          ja: 'たけしくんはお金を持っています。えんぴつに 4 円使って残り 6 円。+/− を正しく選んで式を作ろう！',
          en: 'Alex has some money. After spending 4 yuan on pencils, 6 yuan is left. Can you pick the right +/- signs?',
        },
        sub:  { zh: '+4 还是 −4？想一想"花掉"意味着什么', ja: '+4 か −4？「使った」はどういう意味？', en: '+4 or -4? Think about what "spending" means' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '原有的钱', ja: 'もとのお金', en: 'original money' } },
          { s: 'n', c: { n: 4, d: 1 }, label: { zh: '+4', ja: '+4', en: '+4' } },
          { s: 'n', c: { n: -4, d: 1 }, label: { zh: '−4', ja: '−4', en: '-4' } },
          { s: 'n', c: { n: 6, d: 1 }, label: { zh: '+6', ja: '+6', en: '+6' } },
          { s: 'n', c: { n: -6, d: 1 }, label: { zh: '−6', ja: '−6', en: '-6' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:-4, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:6, d:1 } }] },
        },
        target: { n: 10, d: 1 },
      },
      /* ── 5-10 build 带符号选择 ── */
      {
        type: 'build',
        title: { zh: '5-10 赚了又花了（选符号）', ja: '5-10 稼いで使って（符号選び）', en: '5-10 Earn and Spend (Pick Signs)' },
        story: {
          zh: '小明有一些零用钱。帮邻居洗车赚了 3 元，又花 2 元买了冰棍，现在有 9 元。选对每张卡的 +/−！',
          ja: 'たけしくんは小遣いを持っています。洗車で 3 円稼ぎ、アイスに 2 円使い、今 9 円。+/− を正しく選ぼう！',
          en: 'Alex has some pocket money. He earns 3 yuan washing cars and spends 2 on ice pops. Now he has 9. Pick the right +/-!',
        },
        sub:  { zh: '赚了是 +，花了是 −', ja: '稼いだら +、使ったら −', en: 'Earning is +, spending is -' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '原有的钱', ja: 'もとのお金', en: 'original money' } },
          { s: 'n', c: { n: 3, d: 1 }, label: { zh: '+3', ja: '+3', en: '+3' } },
          { s: 'n', c: { n: -3, d: 1 }, label: { zh: '−3', ja: '−3', en: '-3' } },
          { s: 'n', c: { n: 2, d: 1 }, label: { zh: '+2', ja: '+2', en: '+2' } },
          { s: 'n', c: { n: -2, d: 1 }, label: { zh: '−2', ja: '−2', en: '-2' } },
          { s: 'n', c: { n: 9, d: 1 }, label: { zh: '+9', ja: '+9', en: '+9' } },
          { s: 'n', c: { n: -9, d: 1 }, label: { zh: '−9', ja: '−9', en: '-9' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:3, d:1 } }, { t:'term', s:'n', c:{ n:-2, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:9, d:1 } }] },
        },
        target: { n: 8, d: 1 },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
   *  第 6 章  括号是一整包 — 展开括号
   * ═══════════════════════════════════════════════════════ */
  {
    id: 'ch6',
    name: { zh: '第六章：括号是一整包 — 展开括号', ja: '第6章：カッコは1パック — カッコを展開しよう', en: 'Chapter 6: Brackets Are a Pack — Expand Them' },
    desc: {
      zh: '括号外面的数字要乘进括号里每一项。点"展开"按钮打开它！',
      ja: 'カッコの外の数字をカッコの中の各項にかけよう。「展開」ボタンを押してみて！',
      en: 'Multiply the outside number into every term inside the brackets. Tap the "Expand" button to open them!',
    },
    levels: [
      /* ── 6-1 ── */
      {
        title: { zh: '6-1 两袋礼包', ja: '6-1 ギフトバッグ2つ', en: '6-1 Two Gift Bags' },
        story: {
          zh: '两袋一样的礼包，每袋里有几颗糖和 1 块饼干，一共 8 件。每袋的糖有几颗？',
          ja: '同じギフトバッグが 2 つ。各袋にキャンディ何個かとクッキー 1 枚。合計 8 個。キャンディは何個？',
          en: 'Two identical gift bags, each with some candies and 1 cookie. 8 items total. How many candies per bag?',
        },
        sub:  { zh: '点"展开"按钮把括号打开', ja: '「展開」ボタンでカッコを開こう', en: 'Tap "Expand" to open the brackets' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        hint: { zh: '先点括号旁边的"展开"按钮，再把数字移到右边。', ja: 'まずカッコの横の「展開」ボタンを押して、それから数字を右に移そう。', en: 'First tap "Expand" next to the brackets, then move numbers to the right.' },
        annotations: {
          left:  [{ zh: '2袋礼包', ja: '2袋パック', en: '2 gift bags' }],
          right: [{ zh: '一共', ja: '合計', en: 'total' }],
        },
        target: { n: 3, d: 1 },
        eq: {
          left: {
            items: [
              { t:'group', m:{ n:2, d:1 }, items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:1, d:1 } }] },
            ],
          },
          right: { items: [{ t:'term', s:'n', c:{ n:8, d:1 } }] },
        },
      },
      /* ── 6-2 ── */
      {
        title: { zh: '6-2 零食大礼包', ja: '6-2 お菓子パック', en: '6-2 Snack Packs' },
        story: {
          zh: '妈妈买了 2 袋零食大礼包，每袋里有几颗糖和 1 块饼干。另外还多买了 2 颗散装糖，一共 10 件。',
          ja: 'お母さんがお菓子パックを 2 袋買いました。各袋にキャンディ何個かとクッキー 1 枚。さらにバラのキャンディを 2 個買って、合計 10 個です。',
          en: 'Mom bought 2 snack packs, each with some candies and 1 cookie. Plus 2 loose candies, 10 items total.',
        },
        sub:  { zh: '展开括号后再移项', ja: 'カッコを展開してから項を移動しよう', en: 'Expand brackets, then move terms' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        annotations: {
          left:  [{ zh: '2袋礼包', ja: '2袋パック', en: '2 gift bags' }, { zh: '散装糖', ja: 'バラの分', en: 'loose candies' }],
          right: [{ zh: '一共', ja: '合計', en: 'total' }],
        },
        target: { n: 3, d: 1 },
        eq: {
          left: {
            items: [
              { t:'group', m:{ n:2, d:1 }, items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:1, d:1 } }] },
              { t:'term', s:'n', c:{ n:2, d:1 } },
            ],
          },
          right: { items: [{ t:'term', s:'n', c:{ n:10, d:1 } }] },
        },
      },
      /* ── 6-3 ── */
      {
        title: { zh: '6-3 三盒彩笔', ja: '6-3 色えんぴつ3箱', en: '6-3 Three Crayon Boxes' },
        story: {
          zh: '三盒彩笔，每盒有几支铅笔和 1 块橡皮，一共 12 件。每盒铅笔几支？',
          ja: '色えんぴつ 3 箱。各箱に鉛筆何本かと消しゴム 1 個。合計 12 個。鉛筆は何本？',
          en: 'Three crayon boxes, each with some pencils and 1 eraser. 12 items total. How many pencils per box?',
        },
        sub:  { zh: '倍数增大后操作一样', ja: '倍数が増えても操作は同じ', en: 'Same steps with bigger multipliers' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        annotations: {
          left:  [{ zh: '3盒彩笔', ja: '3箱分', en: '3 crayon boxes' }],
          right: [{ zh: '一共', ja: '合計', en: 'total' }],
        },
        target: { n: 3, d: 1 },
        eq: {
          left: {
            items: [
              { t:'group', m:{ n:3, d:1 }, items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:1, d:1 } }] },
            ],
          },
          right: { items: [{ t:'term', s:'n', c:{ n:12, d:1 } }] },
        },
      },
      /* ── 6-4 ── */
      {
        title: { zh: '6-4 文具盒', ja: '6-4 ふでばこ', en: '6-4 Pencil Cases' },
        story: {
          zh: '班上分了 3 个文具盒，每个文具盒有几支铅笔和 1 块橡皮。拿走 1 支铅笔后，一共剩 8 件文具。',
          ja: 'クラスで 3 つのふでばこをもらいました。各ふでばこに鉛筆何本かと消しゴム 1 個。鉛筆を 1 本取ったら、残りは全部で 8 個です。',
          en: 'The class got 3 pencil cases, each with some pencils and 1 eraser. After removing 1 pencil, 8 items remain.',
        },
        sub:  { zh: '展开括号后再移项整理', ja: 'カッコを展開してから項を移動しよう', en: 'Expand brackets, then rearrange' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        annotations: {
          left:  [{ zh: '3个文具盒', ja: '3つ分', en: '3 pencil cases' }, { zh: '拿走的', ja: '取った分', en: 'removed' }],
          right: [{ zh: '剩下的', ja: '残り', en: 'remaining' }],
        },
        target: { n: 2, d: 1 },
        eq: {
          left: {
            items: [
              { t:'group', m:{ n:3, d:1 }, items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:1, d:1 } }] },
              { t:'term', s:'n', c:{ n:-1, d:1 } },
            ],
          },
          right: { items: [{ t:'term', s:'n', c:{ n:8, d:1 } }] },
        },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
   *  第 7 章  两边都有未知数
   * ═══════════════════════════════════════════════════════ */
  {
    id: 'ch7',
    name: { zh: '第七章：两边都有 △ — 集中未知数', ja: '第7章：両辺に △ — 未知数をまとめよう', en: 'Chapter 7: x on Both Sides — Collect Unknowns' },
    desc: {
      zh: '△ 出现在等号两边？把它们集中到一边来！',
      ja: '△ が等号の両側にある？片側に集めよう！',
      en: 'x on both sides of the equation? Collect them on one side!',
    },
    levels: [
      /* ── 7-1 ── */
      {
        title: { zh: '7-1 零花钱比较', ja: '7-1 おこづかい比べ', en: '7-1 Comparing Pocket Money' },
        story: {
          zh: '小红有一些钱，小明的钱是小红的 2 倍。后来妈妈给小明 3 元、给小红 7 元，两人的钱恰好一样多。小红原来有多少钱？',
          ja: '花子さんはいくらかお金を持っていて、たけしくんは花子さんの 2 倍です。お母さんがたけしくんに 3 円、花子さんに 7 円あげたら、二人はちょうど同じ金額になりました。花子さんはもとは何円持っていた？',
          en: 'Beth has some money and Alex has twice as much. Mom gives Alex 3 yuan and Beth 7 yuan — now they\'re equal. How much did Beth start with?',
        },
        sub:  { zh: '把右边的 △ 拖到左边来合并', ja: '右側の △ を左側にドラッグしてまとめよう', en: 'Drag x from the right to combine on the left' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        hint: { zh: '把右边的 △ 拖到左边，2△ 和 −△ 会合并成 △。', ja: '右の △ を左にドラッグすると、2△ と −△ がまとまって △ になるよ。', en: 'Drag x from the right to the left. 2x and -x combine into x.' },
        annotations: {
          left:  [{ zh: '小明的△', ja: 'たけしの△', en: 'Alex\'s x' }, { zh: '另有的', ja: 'さらに', en: 'extra' }],
          right: [{ zh: '小红的△', ja: '花子の△', en: 'Beth\'s x' }, { zh: '另有的', ja: 'さらに', en: 'extra' }],
        },
        target: { n: 4, d: 1 },
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:2, d:1 } }, { t:'term', s:'n', c:{ n:3, d:1 } }] },
          right: { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:7, d:1 } }] },
        },
      },
      /* ── 7-2 ── */
      {
        title: { zh: '7-2 苹果一样多', ja: '7-2 りんごが同じ数', en: '7-2 Equal Apples' },
        story: {
          zh: '小明有一些苹果，另外还有 6 个橘子。小红的苹果是小明的 2 倍，另外有 1 个橘子。两人的水果总数一样多，小明有几个苹果？',
          ja: 'たけしくんはりんごを何個かと、みかんを 6 個持っています。花子さんのりんごはたけしくんの 2 倍で、みかんは 1 個。二人の果物は合わせて同じ数。たけしくんのりんごは何個？',
          en: 'Alex has some apples and 6 oranges. Beth has twice Alex\'s apples and 1 orange. Same total fruit. How many apples does Alex have?',
        },
        sub:  { zh: '右边系数更大也不怕', ja: '右辺の係数が大きくても大丈夫', en: 'Don\'t worry if the right side has a bigger coefficient' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        annotations: {
          left:  [{ zh: '小明的△', ja: 'たけしの△', en: 'Alex\'s x' }, { zh: '另有的', ja: 'さらに', en: 'extra' }],
          right: [{ zh: '小红的△', ja: '花子の△', en: 'Beth\'s x' }, { zh: '另有的', ja: 'さらに', en: 'extra' }],
        },
        target: { n: 5, d: 1 },
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:6, d:1 } }] },
          right: { items: [{ t:'term', s:'x', c:{ n:2, d:1 } }, { t:'term', s:'n', c:{ n:1, d:1 } }] },
        },
      },
      /* ── 7-3 ── */
      {
        title: { zh: '7-3 文具店', ja: '7-3 文房具屋さん', en: '7-3 Stationery Shop' },
        story: {
          zh: '3 支同价铅笔加 1 元，和 2 支同价铅笔加 6 元一样多。每支铅笔多少钱？',
          ja: '同じ鉛筆 3 本と 1 円で、鉛筆 2 本と 6 円と同じ金額。1 本いくら？',
          en: '3 same-priced pencils plus 1 yuan equals 2 pencils plus 6 yuan. How much is each pencil?',
        },
        sub:  { zh: '先集中 △ 再处理常数', ja: 'まず △ を集めてから定数を処理', en: 'Collect x first, then handle constants' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        annotations: {
          left:  [{ zh: '3支铅笔', ja: 'えんぴつ3本', en: '3 pencils' }, { zh: '加的', ja: '足した分', en: 'added' }],
          right: [{ zh: '2支铅笔', ja: 'えんぴつ2本', en: '2 pencils' }, { zh: '加的', ja: '足した分', en: 'added' }],
        },
        target: { n: 5, d: 1 },
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:3, d:1 } }, { t:'term', s:'n', c:{ n:1, d:1 } }] },
          right: { items: [{ t:'term', s:'x', c:{ n:2, d:1 } }, { t:'term', s:'n', c:{ n:6, d:1 } }] },
        },
      },
      /* ── 7-4 ── */
      {
        title: { zh: '7-4 手工花', ja: '7-4 手作りの花', en: '7-4 Paper Flowers' },
        story: {
          zh: '小明做了 2 束手工花，每束里有一些玫瑰和 1 朵菊花。小红做的玫瑰和小明每束一样多，另外又加了 5 朵菊花。两人做的花总数一样多，每束有几朵玫瑰？',
          ja: 'たけしくんは花束を 2 つ作りました。各束にバラ何本かと菊 1 本。花子さんのバラはたけしくんの 1 束分と同じで、さらに菊を 5 本足しました。二人の花の総数は同じ。1 束のバラは何本？',
          en: 'Alex made 2 bouquets, each with some roses and 1 daisy. Beth has the same roses as one bunch, plus 5 daisies. Same total. How many roses per bunch?',
        },
        sub:  { zh: '展开括号 + 两边都有 △', ja: 'カッコ展開 + 両辺に △', en: 'Expand brackets + x on both sides' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        annotations: {
          left:  [{ zh: '2束花', ja: '花束2つ', en: '2 bunches' }],
          right: [{ zh: '小红的△', ja: '花子の△', en: 'Beth\'s x' }, { zh: '另有的', ja: 'さらに', en: 'extra' }],
        },
        target: { n: 3, d: 1 },
        eq: {
          left: {
            items: [
              { t:'group', m:{ n:2, d:1 }, items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:1, d:1 } }] },
            ],
          },
          right: { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:5, d:1 } }] },
        },
      },
      /* ── 7-5 ── */
      {
        title: { zh: '7-5 教室人数', ja: '7-5 教室の人数', en: '7-5 Classroom Headcount' },
        story: {
          zh: '教室有 3 组学生，每组人数相同，但每组都有 2 人请假。另外还有 4 个值日生。隔壁教室的人数是这边每组满员人数的 2 倍再加 5 人。两间教室实到人数相等，每组满员多少人？',
          ja: '教室に 3 グループの生徒がいて、各グループ同じ人数ですが、毎グループ 2 人は欠席。さらに日直が 4 人います。隣の教室はこちらの 1 グループの定員の 2 倍に 5 人を足した人数です。両方の教室の実際の人数は同じ。1 グループの定員は何人？',
          en: '3 groups of students, same size, 2 absent from each, plus 4 monitors. The next room has twice one full group plus 5. Same attendance. How many per full group?',
        },
        sub:  { zh: '括号 + 移项 + 合并，一步步来', ja: 'カッコ → 移項 → まとめ、一歩ずつ！', en: 'Brackets + move terms + combine — step by step' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        annotations: {
          left:  [{ zh: '3组学生', ja: '3グループ', en: '3 groups' }, { zh: '值日生', ja: '日直', en: 'monitors' }],
          right: [{ zh: '隔壁的△', ja: '隣の△', en: 'next room\'s x' }, { zh: '隔壁的', ja: '隣の', en: 'next room\'s' }],
        },
        target: { n: 7, d: 1 },
        eq: {
          left: {
            items: [
              { t:'group', m:{ n:3, d:1 }, items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:-2, d:1 } }] },
              { t:'term', s:'n', c:{ n:4, d:1 } },
            ],
          },
          right: { items: [{ t:'term', s:'x', c:{ n:2, d:1 } }, { t:'term', s:'n', c:{ n:5, d:1 } }] },
        },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
   *  第 8 章  逆向思考挑战
   * ═══════════════════════════════════════════════════════ */
  {
    id: 'ch8',
    name: { zh: '第八章：逆向思考 — 神秘机器', ja: '第8章：逆向き思考 — ふしぎマシン', en: 'Chapter 8: Think Backwards — Mystery Machine' },
    desc: {
      zh: '一个数经过"加、乘"等操作变成了结果——倒着想，就能找到原来的数！',
      ja: '数が「足す・かける」などの操作で結果になった——逆に考えれば元の数が分かるよ！',
      en: 'A number goes through "add" and "multiply" to get a result — think backwards to find the original!',
    },
    levels: [
      /* ── 8-1 ── */
      {
        title: { zh: '8-1 神秘机器一号', ja: '8-1 ふしぎマシン1号', en: '8-1 Mystery Machine No.1' },
        story: {
          zh: '一个数先加 3，再乘 2，最后得到 14。原来的数是多少？',
          ja: 'ある数にまず 3 を足して、次に 2 をかけたら 14 になりました。元の数はいくつ？',
          en: 'Add 3 to a number, then multiply by 2 to get 14. What was the number?',
        },
        sub:  { zh: '先加后乘 → 括号结构', ja: '先に足して次にかける → カッコの形', en: 'Add then multiply → bracket structure' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        hint: { zh: '"先加 3 再乘 2"写成 2(△+3)=14。展开括号后移项即可。', ja: '「先に3を足して次に2をかける」は 2(△+3)=14。カッコを展開して移項しよう。', en: '"Add 3 then multiply by 2" means 2(x+3)=14. Expand and rearrange.' },
        annotations: {
          left:  [{ zh: '先加后乘', ja: '足してかける', en: 'add then multiply' }],
          right: [{ zh: '结果', ja: '結果', en: 'result' }],
        },
        target: { n: 4, d: 1 },
        eq: {
          left: {
            items: [
              { t:'group', m:{ n:2, d:1 }, items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:3, d:1 } }] },
            ],
          },
          right: { items: [{ t:'term', s:'n', c:{ n:14, d:1 } }] },
        },
      },
      /* ── 8-2 ── */
      {
        title: { zh: '8-2 神秘机器二号', ja: '8-2 ふしぎマシン2号', en: '8-2 Mystery Machine No.2' },
        story: {
          zh: '一个数先除以 2，再加 5，结果是 11。原来的数是多少？',
          ja: 'ある数をまず 2 で割って、次に 5 を足したら 11 になりました。元の数はいくつ？',
          en: 'Divide a number by 2, then add 5 to get 11. What was the number?',
        },
        sub:  { zh: '先除后加 → 分数系数 + 常数', ja: '先に割って次に足す → 分数の係数 + 定数', en: 'Divide then add → fraction coefficient + constant' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        annotations: {
          left:  [{ zh: '先除后加', ja: '割って足す', en: 'divide then add' }],
          right: [{ zh: '结果', ja: '結果', en: 'result' }],
        },
        target: { n: 12, d: 1 },
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:2 } }, { t:'term', s:'n', c:{ n:5, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:11, d:1 } }] },
        },
      },
      /* ── 8-3 ── */
      {
        title: { zh: '8-3 神秘机器三号', ja: '8-3 ふしぎマシン3号', en: '8-3 Mystery Machine No.3' },
        story: {
          zh: '一个数先减 4，再乘 3，结果是 18。原来的数是多少？',
          ja: 'ある数からまず 4 を引いて、次に 3 をかけたら 18 になりました。元の数はいくつ？',
          en: 'Subtract 4 from a number, then multiply by 3 to get 18. What was the number?',
        },
        sub:  { zh: '先减后乘 → 括号里有减法', ja: '先に引いて次にかける → カッコの中に引き算', en: 'Subtract then multiply → subtraction in brackets' },
        goal: { zh: '求出 △ 等于几', ja: '△ の値を求めよう', en: 'Find the value of x' },
        annotations: {
          left:  [{ zh: '先减后乘', ja: '引いてかける', en: 'subtract then multiply' }],
          right: [{ zh: '结果', ja: '結果', en: 'result' }],
        },
        target: { n: 10, d: 1 },
        eq: {
          left: {
            items: [
              { t:'group', m:{ n:3, d:1 }, items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:-4, d:1 } }] },
            ],
          },
          right: { items: [{ t:'term', s:'n', c:{ n:18, d:1 } }] },
        },
      },
      /* ── 8-4 build ── */
      {
        type: 'build',
        title: { zh: '8-4 逆向列式', ja: '8-4 逆向き式を作ろう', en: '8-4 Reverse Equation' },
        story: {
          zh: '一个数先乘以 3 再加 5，得到 20。请列出方程。',
          ja: 'ある数にまず 3 をかけて、次に 5 を足したら 20 になりました。方程式を作ろう。',
          en: 'Multiply a number by 3 then add 5 to get 20. Build the equation.',
        },
        sub:  { zh: '把"先乘后加"翻成等式', ja: '「かけて足す」を等式にしよう', en: 'Turn "multiply then add" into an equation' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 3, d: 1 }, label: { zh: '先乘以 3', ja: '3をかける', en: 'multiply by 3' } },
          { s: 'n', c: { n: 5, d: 1 }, label: { zh: '再加 5', ja: '次に5を足す', en: 'then add 5' } },
          { s: 'n', c: { n: 20, d: 1 }, label: { zh: '结果', ja: '結果', en: 'result' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:3, d:1 } }, { t:'term', s:'n', c:{ n:5, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:20, d:1 } }] },
        },
        target: { n: 5, d: 1 },
      },
      /* ── 8-5 build 干扰卡 ── */
      {
        type: 'build',
        title: { zh: '8-5 迷惑数字', ja: '8-5 まどわす数字', en: '8-5 Tricky Numbers' },
        story: {
          zh: '一个数先乘以 2 再加 3，得到 13。请列出方程。注意：有多余卡片！',
          ja: 'ある数に 2 をかけて 3 を足したら 13 になりました。方程式を作ろう。余計なカードに注意！',
          en: 'Multiply a number by 2 then add 3 to get 13. Build the equation. Watch for extra cards!',
        },
        sub:  { zh: '别把不相关的数字放进去', ja: '関係ない数字を入れないように', en: 'Don\'t include unrelated numbers' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 2, d: 1 }, label: { zh: '乘以 2', ja: '2をかける', en: 'multiply by 2' } },
          { s: 'n', c: { n: 3, d: 1 }, label: { zh: '加 3', ja: '次に3を足す', en: 'add 3' } },
          { s: 'n', c: { n: 13, d: 1 }, label: { zh: '结果', ja: '結果', en: 'result' } },
          { s: 'n', c: { n: 7, d: 1 }, label: { zh: '（先加的？）', ja: '（先に足す？）', en: '(add first?)' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:2, d:1 } }, { t:'term', s:'n', c:{ n:3, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:13, d:1 } }] },
        },
        target: { n: 5, d: 1 },
      },
      /* ── 8-6 build 带符号选择 ── */
      {
        type: 'build',
        title: { zh: '8-6 先减后加（选符号）', ja: '8-6 引いて足す（符号選び）', en: '8-6 Subtract Then Add (Pick Signs)' },
        story: {
          zh: '一个数先减去 4 再加 7，得到 18。注意选对 +/− 符号！',
          ja: 'ある数からまず 4 を引き、次に 7 を足したら 18。+/− を正しく選ぼう！',
          en: 'Subtract 4 from a number then add 7 to get 18. Pick the right +/- signs!',
        },
        sub:  { zh: '"减去"是 −4 还是 +4？', ja: '「引く」は −4？+4？', en: 'Is "subtract" -4 or +4?' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '想的数', ja: '考えた数', en: 'the number' } },
          { s: 'n', c: { n: 4, d: 1 }, label: { zh: '+4', ja: '+4', en: '+4' } },
          { s: 'n', c: { n: -4, d: 1 }, label: { zh: '−4', ja: '−4', en: '-4' } },
          { s: 'n', c: { n: 7, d: 1 }, label: { zh: '+7', ja: '+7', en: '+7' } },
          { s: 'n', c: { n: -7, d: 1 }, label: { zh: '−7', ja: '−7', en: '-7' } },
          { s: 'n', c: { n: 18, d: 1 }, label: { zh: '+18', ja: '+18', en: '+18' } },
          { s: 'n', c: { n: -18, d: 1 }, label: { zh: '−18', ja: '−18', en: '-18' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:-4, d:1 } }, { t:'term', s:'n', c:{ n:7, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:18, d:1 } }] },
        },
        target: { n: 15, d: 1 },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
   *  第 9 章  和差倍问题
   * ═══════════════════════════════════════════════════════ */
  {
    id: 'ch9',
    name: { zh: '第九章：和差倍问题 — 设一个就够', ja: '第9章：和差倍の問題 — 1つ決めれば十分', en: 'Chapter 9: Sum, Difference & Multiples' },
    desc: {
      zh: '"和、差、倍"三种关系，用 △ 全部能表示！设一个未知数就可以列方程。',
      ja: '「和・差・倍」の 3 つの関係を △ で表そう！未知数を 1 つ決めれば方程式が作れるよ。',
      en: 'Sum, difference, and multiples — x can express them all! One unknown is enough to build the equation.',
    },
    levels: [
      /* ── 9-1 build ── */
      {
        type: 'build',
        title: { zh: '9-1 和是20差是4', ja: '9-1 和が20、差が4', en: '9-1 Sum 20, Difference 4' },
        story: {
          zh: '两个数的和是 20，其中大数比小数大 4。请列出方程。',
          ja: '2 つの数の和が 20 で、大きい方が小さい方より 4 大きい。方程式を作ろう。',
          en: 'Two numbers add up to 20, and the bigger one is 4 more. Build the equation.',
        },
        sub:  { zh: '两个未知数用 2△ 表示', ja: '2 つの未知数を 2△ で表そう', en: 'Two unknowns shown as 2x' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 2, d: 1 }, label: { zh: '两个△（小+大的△部分）', ja: '2つ分の△', en: 'both x (small + big\'s x part)' } },
          { s: 'n', c: { n: 4, d: 1 }, label: { zh: '大数比小数多的', ja: '大きい方が多い分', en: 'how much bigger' } },
          { s: 'n', c: { n: 20, d: 1 }, label: { zh: '两数之和', ja: '2つの和', en: 'sum of both' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:2, d:1 } }, { t:'term', s:'n', c:{ n:4, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:20, d:1 } }] },
        },
        target: { n: 8, d: 1 },
      },
      /* ── 9-2 build ── */
      {
        type: 'build',
        title: { zh: '9-2 哥哥的糖', ja: '9-2 お兄ちゃんのキャンディ', en: '9-2 Brother\'s Candies' },
        story: {
          zh: '哥哥的糖是弟弟的 2 倍，两人一共 18 颗。请列出方程。',
          ja: 'お兄ちゃんのキャンディは弟の 2 倍。合わせて 18 個。方程式を作ろう。',
          en: 'Big brother has twice as many candies as little brother. 18 in total. Build the equation.',
        },
        sub:  { zh: '哥哥 = 2△，弟弟 = △', ja: 'お兄ちゃん = 2△、弟 = △', en: 'Brother = 2x, little brother = x' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 2, d: 1 }, label: { zh: '哥哥的糖', ja: 'お兄ちゃんの分', en: 'big brother\'s' } },
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '弟弟的糖', ja: '弟の分', en: 'little brother\'s' } },
          { s: 'n', c: { n: 18, d: 1 }, label: { zh: '一共', ja: '合計', en: 'total' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:2, d:1 } }, { t:'term', s:'x', c:{ n:1, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:18, d:1 } }] },
        },
        target: { n: 6, d: 1 },
      },
      /* ── 9-3 build ── */
      {
        type: 'build',
        title: { zh: '9-3 大数和小数', ja: '9-3 大きい数と小さい数', en: '9-3 Big and Small Numbers' },
        story: {
          zh: '大数是小数的 3 倍，大数比小数多 6。请列出方程。',
          ja: '大きい数は小さい数の 3 倍で、差は 6。方程式を作ろう。',
          en: 'The big number is 3 times the small one, and 6 more. Build the equation.',
        },
        sub:  { zh: '大数在一边，小数+6 在另一边', ja: '大きい方を片側、小さい方 + 6 をもう片側に', en: 'Big on one side, small + 6 on the other' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 3, d: 1 }, label: { zh: '大数（3倍）', ja: '大きい数（3倍）', en: 'big number (×3)' } },
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '小数', ja: '小さい数', en: 'small number' } },
          { s: 'n', c: { n: 6, d: 1 }, label: { zh: '多出的', ja: '差の分', en: 'the extra' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:3, d:1 } }] },
          right: { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:6, d:1 } }] },
        },
        target: { n: 3, d: 1 },
      },
      /* ── 9-4 build ── */
      {
        type: 'build',
        title: { zh: '9-4 姐弟零花钱', ja: '9-4 姉と弟のおこづかい', en: '9-4 Siblings\' Pocket Money' },
        story: {
          zh: '姐姐的钱是弟弟的 3 倍，姐姐比弟弟多 12 元。请列出方程。',
          ja: 'お姉ちゃんのお金は弟の 3 倍で、弟より 12 円多い。方程式を作ろう。',
          en: 'Sister has 3 times brother\'s money and 12 yuan more. Build the equation.',
        },
        sub:  { zh: '3 倍 = 比……多 2 倍', ja: '3 倍 = 2 倍分多い', en: '3 times = 2 times more than…' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 3, d: 1 }, label: { zh: '姐姐的钱', ja: 'お姉ちゃんの分', en: 'sister\'s money' } },
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '弟弟的钱', ja: '弟の分', en: 'brother\'s money' } },
          { s: 'n', c: { n: 12, d: 1 }, label: { zh: '多出的', ja: '差の分', en: 'the extra' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:3, d:1 } }] },
          right: { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:12, d:1 } }] },
        },
        target: { n: 6, d: 1 },
      },
      /* ── 9-5 build 干扰卡 ── */
      {
        type: 'build',
        title: { zh: '9-5 多余条件', ja: '9-5 余分な条件', en: '9-5 Extra Clues' },
        story: {
          zh: '大数是小数的 3 倍，大数比小数多 8。请列出方程。注意：有一张卡是多余的！',
          ja: '大きい数は小さい数の 3 倍で、差は 8。方程式を作ろう。余計なカードが 1 枚あるよ！',
          en: 'The big number is 3 times the small one, and 8 more. Build the equation. One card is extra!',
        },
        sub:  { zh: '用差去表示关系，不需要和', ja: '差を使って関係を表そう。和は要らないよ', en: 'Use difference for the relation — no sum needed' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 3, d: 1 }, label: { zh: '大数（3倍）', ja: '大きい数（3倍）', en: 'big number (×3)' } },
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '小数', ja: '小さい数', en: 'small number' } },
          { s: 'n', c: { n: 8, d: 1 }, label: { zh: '多出的', ja: '差の分', en: 'the extra' } },
          { s: 'n', c: { n: 16, d: 1 }, label: { zh: '（两数之和？）', ja: '（2つの和？）', en: '(their sum?)' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:3, d:1 } }] },
          right: { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:8, d:1 } }] },
        },
        target: { n: 4, d: 1 },
      },
      /* ── 9-6 build 带符号选择 ── */
      {
        type: 'build',
        title: { zh: '9-6 姐弟攒钱（选符号）', ja: '9-6 姉弟の貯金（符号選び）', en: '9-6 Siblings Saving (Pick Signs)' },
        story: {
          zh: '弟弟有一些钱，姐姐的钱是弟弟的 2 倍。弟弟又收到 5 元红包后，和姐姐一样多了。注意选对 +/−！',
          ja: '弟はいくらかお金を持っていて、お姉ちゃんは弟の 2 倍。弟が 5 円のお年玉をもらったらお姉ちゃんと同じに。+/− に注意！',
          en: 'Brother has some money, sister has twice as much. After brother gets 5 yuan, they\'re equal. Pick the right +/-!',
        },
        sub:  { zh: '弟弟 + 5 = 姐姐，姐姐 = 2△', ja: '弟 + 5 = 姉、姉 = 2△', en: 'Brother + 5 = sister, sister = 2x' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '弟弟的钱', ja: '弟の分', en: 'brother\'s money' } },
          { s: 'n', c: { n: 5, d: 1 }, label: { zh: '+5', ja: '+5', en: '+5' } },
          { s: 'n', c: { n: -5, d: 1 }, label: { zh: '−5', ja: '−5', en: '-5' } },
          { s: 'x', c: { n: 2, d: 1 }, label: { zh: '姐姐的钱', ja: 'お姉ちゃんの分', en: 'sister\'s money' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:5, d:1 } }] },
          right: { items: [{ t:'term', s:'x', c:{ n:2, d:1 } }] },
        },
        target: { n: 5, d: 1 },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
   *  第 10 章  年龄问题
   * ═══════════════════════════════════════════════════════ */
  {
    id: 'ch10',
    name: { zh: '第十章：年龄问题 — 时间在变，关系不变', ja: '第10章：年齢の問題 — 時間が変わっても関係は同じ', en: 'Chapter 10: Age Problems — Time Changes, Gaps Don\'t' },
    desc: {
      zh: '把"现在、将来"的年龄关系写成等式，年龄差永远不变！',
      ja: '「今」と「将来」の年齢を等式にしよう。年齢差はずっと変わらない！',
      en: 'Write "now" and "future" ages as an equation — the age gap never changes!',
    },
    levels: [
      /* ── 10-1 build ── */
      {
        type: 'build',
        title: { zh: '10-1 今年和5年后', ja: '10-1 今年と5年後', en: '10-1 This Year & 5 Years Later' },
        story: {
          zh: '小明 5 年后是 12 岁。小明今年几岁？请列出方程。',
          ja: 'たけしくんは 5 年後に 12 歳になります。今年は何歳？方程式を作ろう。',
          en: 'Alex will be 12 in 5 years. How old is he now? Build the equation.',
        },
        sub:  { zh: '5 年后 = 今年 + 5', ja: '5 年後 = 今年 + 5', en: '5 years later = this year + 5' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '今年的年龄', ja: '今年の歳', en: 'this year\'s age' } },
          { s: 'n', c: { n: 5, d: 1 }, label: { zh: '5年', ja: '5年', en: '5 years' } },
          { s: 'n', c: { n: 12, d: 1 }, label: { zh: '5年后的年龄', ja: '5年後の歳', en: 'age in 5 years' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:5, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:12, d:1 } }] },
        },
        target: { n: 7, d: 1 },
      },
      /* ── 10-2 build ── */
      {
        type: 'build',
        title: { zh: '10-2 爸爸比我大', ja: '10-2 お父さんとの年齢差', en: '10-2 Dad Is Older' },
        story: {
          zh: '爸爸比小明大 25 岁，爸爸今年 33 岁。小明今年几岁？请列出方程。',
          ja: 'お父さんはたけしくんより 25 歳年上。お父さんは今年 33 歳。たけしくんは今年何歳？方程式を作ろう。',
          en: 'Dad is 25 years older than Alex. Dad is 33. How old is Alex? Build the equation.',
        },
        sub:  { zh: '小明 + 25 = 爸爸', ja: 'たけし + 25 = お父さん', en: 'Alex + 25 = Dad' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '小明的年龄', ja: 'たけしの歳', en: 'Alex\'s age' } },
          { s: 'n', c: { n: 25, d: 1 }, label: { zh: '爸爸大的', ja: '年齢差', en: 'age gap' } },
          { s: 'n', c: { n: 33, d: 1 }, label: { zh: '爸爸的年龄', ja: 'お父さんの歳', en: 'Dad\'s age' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:1, d:1 } }, { t:'term', s:'n', c:{ n:25, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:33, d:1 } }] },
        },
        target: { n: 8, d: 1 },
      },
      /* ── 10-3 build ── */
      {
        type: 'build',
        title: { zh: '10-3 哥弟年龄和', ja: '10-3 兄弟の年齢の和', en: '10-3 Brothers\' Age Sum' },
        story: {
          zh: '哥哥今年年龄是弟弟的 2 倍，两人年龄和是 21 岁。请列出方程。',
          ja: 'お兄ちゃんの年齢は弟の 2 倍。ふたりの年齢の和は 21。方程式を作ろう。',
          en: 'Brother is twice little brother\'s age. Their ages add up to 21. Build the equation.',
        },
        sub:  { zh: '哥哥 = 2△，弟弟 = △', ja: 'お兄ちゃん = 2△、弟 = △', en: 'Brother = 2x, little brother = x' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 2, d: 1 }, label: { zh: '哥哥的年龄', ja: 'お兄ちゃんの歳', en: 'brother\'s age' } },
          { s: 'x', c: { n: 1, d: 1 }, label: { zh: '弟弟的年龄', ja: '弟の歳', en: 'little brother\'s age' } },
          { s: 'n', c: { n: 21, d: 1 }, label: { zh: '年龄和', ja: '年齢の和', en: 'age sum' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:2, d:1 } }, { t:'term', s:'x', c:{ n:1, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:21, d:1 } }] },
        },
        target: { n: 7, d: 1 },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════
   *  第 11 章  盈亏与平均数
   * ═══════════════════════════════════════════════════════ */
  {
    id: 'ch11',
    name: { zh: '第十一章：盈亏与平均数 — 多了少了都能列', ja: '第11章：過不足と平均 — 多くても少なくても式になる', en: 'Chapter 11: Surplus & Shortage' },
    desc: {
      zh: '"每人分 3 个还多 2 个；每人分 4 个就少 3 个"——两种分法写成方程，人数就知道了！',
      ja: '「1 人 3 個ずつだと 2 個余り、4 個ずつだと 3 個足りない」—— 方程式にすれば人数が分かる！',
      en: '"3 each with 2 left; 4 each and 3 short" — write both ways as an equation to find the count!',
    },
    levels: [
      /* ── 11-1 build ── */
      {
        type: 'build',
        title: { zh: '11-1 分糖果', ja: '11-1 キャンディを配ろう', en: '11-1 Sharing Candies' },
        story: {
          zh: '有一些糖果，每人分 3 个还多 2 个；每人分 4 个就少 3 个。请列出方程。',
          ja: 'キャンディがいくつか。1 人 3 個ずつだと 2 個余り、4 個ずつだと 3 個足りない。方程式を作ろう。',
          en: 'Some candies: 3 per person leaves 2 extra; 4 per person needs 3 more. Build the equation.',
        },
        sub:  { zh: '两种分法，糖果总数一样', ja: '2 通りの配り方、キャンディの合計は同じ', en: 'Two ways to share, same total candies' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 3, d: 1 }, label: { zh: '每人 3 个', ja: '1人3個', en: '3 per person' } },
          { s: 'n', c: { n: 2, d: 1 }, label: { zh: '还多 2 个', ja: '2個余る', en: '2 left over' } },
          { s: 'x', c: { n: 4, d: 1 }, label: { zh: '每人 4 个', ja: '1人4個', en: '4 per person' } },
          { s: 'n', c: { n: -3, d: 1 }, label: { zh: '少 3 个', ja: '3個足りない', en: '3 short' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:3, d:1 } }, { t:'term', s:'n', c:{ n:2, d:1 } }] },
          right: { items: [{ t:'term', s:'x', c:{ n:4, d:1 } }, { t:'term', s:'n', c:{ n:-3, d:1 } }] },
        },
        target: { n: 5, d: 1 },
      },
      /* ── 11-2 build ── */
      {
        type: 'build',
        title: { zh: '11-2 分组坐', ja: '11-2 グループ分け', en: '11-2 Seating Groups' },
        story: {
          zh: '同一批同学，每组 5 人还剩 2 人；每组 6 人就少 2 人。请列出方程。',
          ja: '同じクラスの生徒。1 グループ 5 人だと 2 人余り、6 人だと 2 人足りない。方程式を作ろう。',
          en: 'Same students: groups of 5 leave 2 extra; groups of 6 need 2 more. Build the equation.',
        },
        sub:  { zh: '同一批人，总人数一样', ja: '同じ人数なので合計は同じ', en: 'Same group of people, same total' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 5, d: 1 }, label: { zh: '每组 5 人', ja: '1組5人', en: '5 per group' } },
          { s: 'n', c: { n: 2, d: 1 }, label: { zh: '还剩 2 人', ja: '2人余る', en: '2 left over' } },
          { s: 'x', c: { n: 6, d: 1 }, label: { zh: '每组 6 人', ja: '1組6人', en: '6 per group' } },
          { s: 'n', c: { n: -2, d: 1 }, label: { zh: '少 2 人', ja: '2人足りない', en: '2 short' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:5, d:1 } }, { t:'term', s:'n', c:{ n:2, d:1 } }] },
          right: { items: [{ t:'term', s:'x', c:{ n:6, d:1 } }, { t:'term', s:'n', c:{ n:-2, d:1 } }] },
        },
        target: { n: 4, d: 1 },
      },
      /* ── 11-3 build ── */
      {
        type: 'build',
        title: { zh: '11-3 装球', ja: '11-3 ボールを箱に入れよう', en: '11-3 Packing Balls' },
        story: {
          zh: '19 个球装进 4 个盒子，每盒装一样多，还剩 3 个。每盒几个？请列出方程。',
          ja: 'ボール 19 個を 4 箱に入れます。各箱同じ数で 3 個余ります。1 箱何個？方程式を作ろう。',
          en: '19 balls into 4 boxes, same amount each, 3 left over. How many per box? Build the equation.',
        },
        sub:  { zh: '装的 + 剩的 = 总数', ja: '入れた分 + 余り = 合計', en: 'packed + leftover = total' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 4, d: 1 }, label: { zh: '4 盒装的', ja: '4箱分', en: '4 boxes' } },
          { s: 'n', c: { n: 3, d: 1 }, label: { zh: '剩余的', ja: '余り', en: 'leftover' } },
          { s: 'n', c: { n: 19, d: 1 }, label: { zh: '总数', ja: '合計', en: 'total' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:4, d:1 } }, { t:'term', s:'n', c:{ n:3, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:19, d:1 } }] },
        },
        target: { n: 4, d: 1 },
      },
      /* ── 11-4 build ── */
      {
        type: 'build',
        title: { zh: '11-4 平均每盒', ja: '11-4 1箱あたりの平均', en: '11-4 Average Per Box' },
        story: {
          zh: '5 盒糖，每盒一样多。又多加了 2 颗散装糖后，一共有 27 颗。每盒几颗？请列出方程。',
          ja: '5 箱のキャンディ、各箱同じ数。バラ 2 個を足したら合計 27 個。1 箱何個？方程式を作ろう。',
          en: '5 boxes of candy, same amount each. Adding 2 loose ones makes 27. How many per box? Build the equation.',
        },
        sub:  { zh: '5 盒 + 散装 = 总数', ja: '5 箱分 + バラ = 合計', en: '5 boxes + loose = total' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 5, d: 1 }, label: { zh: '5 盒糖', ja: '5箱分', en: '5 boxes' } },
          { s: 'n', c: { n: 2, d: 1 }, label: { zh: '散装糖', ja: 'バラの分', en: 'loose candies' } },
          { s: 'n', c: { n: 27, d: 1 }, label: { zh: '总数', ja: '合計', en: 'total' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:5, d:1 } }, { t:'term', s:'n', c:{ n:2, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:27, d:1 } }] },
        },
        target: { n: 5, d: 1 },
      },
      /* ── 11-5 build 干扰卡 ── */
      {
        type: 'build',
        title: { zh: '11-5 多余数据', ja: '11-5 余分なデータ', en: '11-5 Extra Data' },
        story: {
          zh: '24 个橘子装进 3 个袋子，每袋一样多，一个也不剩。每袋几个？请列出方程。注意：有一张卡是多余的！',
          ja: 'みかん 24 個を 3 袋に入れます。各袋同じ数でちょうどぴったり。1 袋何個？方程式を作ろう。余計なカードが 1 枚あるよ！',
          en: '24 oranges into 3 bags, same number each, none left. How many per bag? Build the equation. One card is extra!',
        },
        sub:  { zh: '"一个也不剩"说明没有余数', ja: '「ちょうど」ということは余りなし', en: '"None left" means no remainder' },
        goal: { zh: '列出等式：左边 = 右边', ja: '等式を作ろう：左辺 = 右辺', en: 'Build the equation: left = right' },
        tray: [
          { s: 'x', c: { n: 3, d: 1 }, label: { zh: '3 袋装的', ja: '3袋分', en: '3 bags' } },
          { s: 'n', c: { n: 24, d: 1 }, label: { zh: '总数', ja: '合計', en: 'total' } },
          { s: 'n', c: { n: 4, d: 1 }, label: { zh: '（多出来的？）', ja: '（余り？）', en: '(leftover?)' } },
        ],
        eq: {
          left:  { items: [{ t:'term', s:'x', c:{ n:3, d:1 } }] },
          right: { items: [{ t:'term', s:'n', c:{ n:24, d:1 } }] },
        },
        target: { n: 8, d: 1 },
      },
    ],
  },
];

/** 展平所有关卡为单一数组（带 chapterIdx 和 levelIdx） */
export function flattenLevels() {
  const all = [];
  chapters.forEach((ch, ci) => {
    ch.levels.forEach((lv, li) => {
      all.push({ ...lv, chapterIdx: ci, levelIdx: li });
    });
  });
  return all;
}
