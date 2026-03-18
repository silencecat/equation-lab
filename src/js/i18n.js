/**
 * i18n.js — 国际化（中文 / 日本語 / English）
 *
 * 提供 t(key, ...args) 和 lt(obj) 两种翻译方式。
 * t() 用于固定 UI 字符串，lt() 用于 {zh, ja, en} 内联对象（如关卡数据）。
 */

import { getState, updateState } from './state.js';

let _locale = 'zh';

/** 从 state 读取 locale（启动时由 ui.js 调 loadState 后执行） */
export function initLocale() {
  try {
    const s = getState().profile.locale;
    if (s === 'ja' || s === 'en') _locale = s;
  } catch { /* Node / test 环境安全 */ }
}

export function getLocale() { return _locale; }

export function setLocale(lang) {
  _locale = lang;
  updateState('profile.locale', lang);
  if (typeof document !== 'undefined') {
    document.documentElement.lang =
      lang === 'ja' ? 'ja' : lang === 'en' ? 'en' : 'zh-CN';
  }
}

/**
 * 按键取翻译，支持 {0}, {1} 参数替换
 */
export function t(key, ...args) {
  let s = dict[_locale]?.[key] ?? dict.zh[key] ?? key;
  args.forEach((v, i) => { s = s.replaceAll(`{${i}}`, String(v)); });
  return s;
}

/**
 * 从 { zh, ja } 对象取当前语言的值；若传入纯字符串则直接返回
 */
export function lt(obj) {
  if (!obj || typeof obj === 'string') return obj ?? '';
  return obj[_locale] ?? obj.zh ?? '';
}

/**
 * 遍历 DOM 中 data-i18n / data-i18n-html 属性并翻译
 */
export function applyStaticI18n() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const args = [];
    for (let i = 0; i < 5; i++) {
      const p = el.dataset[`i18nP${i}`];
      if (p !== undefined) args.push(p);
      else break;
    }
    el.textContent = t(key, ...args);
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
}

/* ═══════════════════════════════════════════
   翻译词典
   ═══════════════════════════════════════════ */

const dict = {
  /* ───────── 中文 ───────── */
  zh: {
    /* 通用 UI */
    app_title:    '等式实验室',
    app_desc:     '拖卡片，亲手做等式变形。支持触屏和鼠标。',
    level_track:  '闯关线',
    play_track:   '实验线',
    load_custom:  '载入自定义等式',
    random_btn:   '随机来一题',
    sample:       '样例 {0}',
    input_hint:   '支持 <code>△</code>、整数、分数、以及一层倍数括号，例如 <code>2(△+1)</code>、<code>1/2△+1</code>。',
    rules_title:  '规则',
    rule_1:       '跨等号时，卡片会先变成相反项。',
    rule_2:       '放进 <code>2( )</code> 里时，要先缩成一半，值才不变。',
    rule_3:       '看到 <code>1/2△</code> 这种分数系数时，可以用两边同时 <code>×2</code>。',
    recent_title: '最近操作',
    tool_value:   '工具值',
    undo_btn:     '撤销一步',
    reset_level:  '重置关卡',
    reset_play:   '重置实验',
    next_btn:     '下一关',
    current_eq:   '当前式子',
    left_side:    '左边',
    right_side:   '右边',
    smart_title:  '下一步建议',
    eq_hint_1:    '把工具卡拖到这里',
    eq_hint_2:    '两边同时操作',
    drop_title:   '落点',
    drop_note_1:  '竖条表示插回这一侧。',
    drop_note_2:  '绿色括号表示吸进倍数括号。',
    visual_title: '故事图',
    visual_note_1:'蓝盒子是未知的 <code>△</code>。',
    visual_note_2:'橙块是固定数量。',
    visual_note_3:'绿箱是被倍数包住的一串东西。',
    design_title: '设计意图',
    design_note_1:'闯关线负责循序渐进，实验线负责自由试错。',
    design_note_2:'"跨等号变号"是等价变形。',
    design_note_3:'"进括号"按倍数缩放。',

    /* 新手引导 */
    onboard_title:   '欢迎来到等式实验室！',
    onboard_sub:     '三步学操作，然后就能自己动手啦',
    onboard_s1:      '<strong>拖卡片</strong> — 按住数字 / 字母卡片，拖到等号另一侧。跨过等号时卡片会自动变号。',
    onboard_s2:      '<strong>建议按钮</strong> — 不确定该怎么做？点建议按钮会高亮提示下一步要操作的地方，但实际操作还是要自己动手。',
    onboard_s3:      '<strong>菜单</strong> — 点左上角 ☰ 可以切换关卡、尝试实验模式、查看规则。',
    onboard_dismiss: '知道了，开始！',

    /* 状态消息 */
    log_loaded:     '新关卡已装载。先观察式子，再动手。',
    status_reset_t: '关卡已重置',
    status_reset_m: '拖动卡片试一试。跨等号会变成相反项，放进倍数括号会先按倍数缩放。',
    play_loaded:    '实验线已载入。现在可以自己试各种移动。',
    play_start_t:   '实验线已启动',
    play_start_m:   '输入的等式已载入。尽情实验吧！',
    play_reset_t:   '实验线已重置',
    play_reset_m:   '回到这一题最初的状态，再试另一条路线。',
    play_return_t:  '实验线已恢复',
    play_return_m:  '继续用你刚才那道式子做实验。',
    play_return_log:'返回实验线。',
    parse_err:      '自定义式子解析失败',
    rand_log:       '随机实验题已生成。先观察结构，再决定是拖项还是用工具箱。',
    rand_t:         '随机题已装载',
    rand_m:         '这一题没有标准路线，重点是比较不同操作的效果。',
    tool_invalid:   '工具值无效',
    div_zero:       '不能除以 0',
    div_zero_m:     '请在工具箱里输入一个不为 0 的数字。',
    tool_done:      '工具箱操作已执行',
    step_ok:        '这一步成立',
    drag_fail:      '拖拽来源失效',
    drag_fail_m:    '请重新拖一次。',
    undone_t:       '已撤销一步',
    undone_m:       '系统恢复到了上一个稳定状态。',
    undo_log:       '撤销：回到上一步。',
    solved_t:       '你已经把未知数单独请出来了！',
    solved_next:    '现在可以点"下一关"，继续练习。',
    solved_correct: '△ = {0}  答对了！',
    solved_all:     '所有关卡都通了！',
    solved_log:     '成功：未知数已经被单独留下。',
    no_smart:       '当前没有固定下一步。你可以继续自由拖拽，或者用工具箱尝试两边同时操作。',
    n_items:        '{0} 项',
    ch_prog:        '第 {0} 章 · 第 {1} 关',
    unknown_box:    '未知盒',
    number_block:   '数量块',
    expand_btn:     '展开',
    expand_hint:    '放进来时会先按倍数缩放',
    empty_group:    '把卡片拖到这里。系统会先按外面的倍数缩放。',
    empty_side:     '这一边现在空了，等价于 0。',
    bracket_done:   '括号已展开',

    /* Smart Actions */
    move_to:       '把 {0} 移到{1}',
    move_note:     '先把 △ 身边的常数请走。',
    both_mul_neg1: '两边同时 × -1',
    both_div:      '两边同时 ÷ {0}',
    both_mul:      '两边同时 × {0}',
    norm_div_note: '把 {0} 平均分成一个 △。',
    norm_mul_note: '让 {0} 变成一个完整的 △。',
    neg1_note:     '先把 -△ 变回 +△。',
    expand_left:   '展开左边括号',
    expand_right:  '展开右边括号',
    expand_note:   '把乘法分到括号里。',

    /* 提示引导 */
    hint_title:      '👆 试试看！',
    hint_move_msg:   '把闪烁的卡片拖到另一边去吧！',
    hint_tool_msg:   '在工具栏输入闪烁的数字，把闪烁的运算按钮拖到等号上！',
    hint_expand_msg: '点击闪烁的「展开」按钮！',
    tool_label:      '两边同时',

    /* 列方程模式 */
    build_tray:      '可用卡片',
    build_return:    '拖回这里可以取下',
    build_drop_here: '把卡片拖进来',
    build_goal:      '读懂故事，把卡片放到正确的一边',
    build_done_t:    '方程正确！',
    build_done_m:    '你成功把故事翻译成了等式。',
    build_coach_t:   '列方程提示',
    build_coach_m:   '仔细读题：“一共”、“剩下”这样的词表示结果，通常放在等号另一边。',

    /* 引擎文本 */
    cross_note:      '跨过等号，先变成相反项',
    into_group_note: '为了放进 {0}×( )，再按倍数缩放',
    dst_left:        '左边',
    dst_right:       '右边',
    dst_left_g:      '左边的倍数括号',
    dst_right_g:     '右边的倍数括号',
    action_drop:     '把 {0} 拖到{1}，得到 {2}。{3}',
    action_expand:   '把 {0}×({1}) 展开成 {2}。',
    tool_balance:    '两边同时{0}{1}，所以等式还保持平衡。',
    verb_add:        '加上 ',
    verb_sub:        '减去 ',
    verb_mul:        '乘以 ',
    verb_div:        '除以 ',

    /* 教练 */
    coach_done_t:     '教练总结',
    coach_done_next:  '这一关已经通了。可以点"下一关"，看看同一套规则怎样处理更复杂的式子。',
    coach_done_all:   '所有关卡都通了！接下来可以去实验线自己出题试试。',
    coach_play_t:     '实验提醒',
    coach_play_group: '实验线里没有标准答案。你可以比较两种路线：先展开，或者先把外面的常数移走。',
    coach_play_one:   '这里只有一个未知数块。试试把它身边的常数清走，再看系数要不要处理。',
    coach_play_def:   '先选一条你想验证的规则：移项、展开、还是两边同时乘除。实验线的重点是比较路线，不是抢最快答案。',
    coach_advice:     '教练建议',
    coach_const:      '先把和 △ 同侧的常数拖到另一边。这样能把未知数身边的数字朋友请走。',
    coach_group:      '这一关有倍数括号。试着把外面的常数拖进括号里，系统会先按外面的倍数缩放。',
    coach_expand:     '如果你想看清乘法怎样作用到里面每一项，可以直接点括号上的"展开"。',
    coach_half_x:     '看到 1/2△ 了。试试两边同时 × 2，让半个 △ 变回一个完整的 △。',
    coach_frac_x:     '未知数已经几乎被单独留下。最后一步通常是把系数变成 1。',
    coach_both_x:     '两边都有未知数。先把一边的 △ 拖到另一边去，让 △ 集中到同一侧。',
    coach_hint:       '教练提示',
    coach_default:    '先观察：哪一边有未知数？哪一个操作既简单，又能让 △ 更孤单？',

    /* 随机题模板 */
    rand_const_t:   '实验线：随机常数题',
    rand_const_s:   '先把常数请到另一边，再观察自动合并。',
    rand_coeff_t:   '实验线：随机整系数题',
    rand_coeff_s:   '先清掉常数，再想办法把几个 △ 平均分开。',
    rand_frac_t:    '实验线：随机分数题',
    rand_frac_s:    '注意什么时候该用两边同时乘法。',
    rand_bracket_t: '实验线：随机括号题',
    rand_bracket_s: '可以试试拖进括号，也可以展开后再整理。',
    play_default_t: '实验线：自由试验台',
    play_default_s: '自己输入式子，观察每一步如何改写结构。',
    play_free_goal: '自由实验，不设固定答案',
    play_custom_t:  '实验线：自定义等式',
    play_custom_s:  '这是你自己输入的等式。',
    play_reloaded:  '实验线已重载。',

    /* 进度 & 步数 */
    progress:       '{0}/{1} 已通关',
    steps_count:    '本关 {0} 步',
    all_clear_title:'🎉 恭喜全通关！',
    all_clear_msg:  '你已经掌握了等式变形的所有基本技巧。试试实验线，挑战更复杂的自定义题目吧！',
    reset_progress: '清除进度',
    reset_confirm:  '确定要清除所有通关记录吗？',
    next_unsolved:  '跳到下一个未通关的关卡',

    /* 反馈 */
    feedback_title:    '反馈',
    feedback_bug:      '🐛 报告问题',
    feedback_level:    '💡 建议新题',
    feedback_learning: '📝 学习反馈',

    /* 手动合并 & 符号选择 */
    action_merge:      '{0} 与 {1} 合并',
    merge_done:        '合并完成',
    sign_correct:      '符号正确！',
    sign_wrong:        '符号不对',
    sign_wrong_m:      '移过等号后符号会变，再想想吧。',
    coach_merge_t:     '提示',
    coach_merge_m:     '这一关需要你手动合并同类项——把一张同类卡片拖到另一张上。',
    coach_sign_t:      '注意符号',
    coach_sign_m:      '移过等号后符号会变，请选择正确的 +/−。',
  },

  /* ───────── 日本語 ───────── */
  ja: {
    /* きほん */
    app_title:    '等式ラボ',
    app_desc:     'カードをドラッグして式をかえよう。タッチもマウスもOK！',
    level_track:  'ステージ',
    play_track:   '実験モード',
    load_custom:  '自分の等式を読みこむ',
    random_btn:   'ランダム出題',
    sample:       'サンプル {0}',
    input_hint:   '<code>△</code>、整数、分数、かけ算かっこがつかえるよ。れい: <code>2(△+1)</code>、<code>1/2△+1</code>',
    rules_title:  'ルール',
    rule_1:       '等号をまたぐと、カードのプラス・マイナスがぎゃくになるよ。',
    rule_2:       '<code>2( )</code> の中に入れるには、先に半分にするよ。',
    rule_3:       '<code>1/2△</code> のように分数がついたら、両がわに <code>×2</code> して消せるよ。',
    recent_title: 'きろく',
    tool_value:   'ツールの数',
    undo_btn:     '一手もどす',
    reset_level:  'やりなおす',
    reset_play:   '実験リセット',
    next_btn:     '次のステージ',
    current_eq:   '今の式',
    left_side:    '左がわ',
    right_side:   '右がわ',
    smart_title:  '次にやること',
    eq_hint_1:    'ツールカードをここにドラッグ',
    eq_hint_2:    '両がわいっしょにそうさ',
    drop_title:   'おける場所',
    drop_note_1:  'たて線は、こちらがわに入れる場所だよ。',
    drop_note_2:  '緑のかっこは、倍のかっこの中に入るよ。',
    visual_title: 'ものがたり図',
    visual_note_1:'青い箱はわからない <code>△</code>。',
    visual_note_2:'オレンジはきまった数。',
    visual_note_3:'緑の箱は倍でつつまれたまとまり。',
    design_title: 'つくりの話',
    design_note_1:'ステージでじゅんばんに学んで、実験モードで自由にためそう。',
    design_note_2:'「等号をまたぐとプラスマイナスが変わる」はいつも正しい変形だよ。',
    design_note_3:'「かっこに入れると倍のぶん小さくなる」も正しい変形だよ。',

    /* はじめてガイド */
    onboard_title:   '等式ラボへようこそ！',
    onboard_sub:     '3つのステップでやり方をおぼえよう',
    onboard_s1:      '<strong>カードをドラッグ</strong> — 数字や △ のカードをおして、等号の反対がわへ動かそう。等号をまたぐとプラスマイナスが自動でぎゃくになるよ。',
    onboard_s2:      '<strong>ヒントボタン</strong> — なにをすればいいかわからない？下のボタンをおすと、次にやることがひかるよ。でも実際の操作は自分でやってみよう！',
    onboard_s3:      '<strong>メニュー</strong> — 左上の ☰ をおすと、ステージをかえたり、実験モードをためしたり、ルールを見たりできるよ。',
    onboard_dismiss: 'わかった、はじめよう！',

    /* メッセージ */
    log_loaded:     'ステージを読みこんだよ。まず式をよく見てから動かそう。',
    status_reset_t: 'やりなおしたよ',
    status_reset_m: 'カードをドラッグしてみよう。等号をまたぐとプラスマイナスがぎゃくに、倍のかっこに入れると小さくなるよ。',
    play_loaded:    '実験モードスタート。いろいろためしてみよう。',
    play_start_t:   '実験モードスタート',
    play_start_m:   '入力した等式を読みこんだよ。自由に実験しよう！',
    play_reset_t:   '実験リセットしたよ',
    play_reset_m:   '最初の形にもどしたよ。べつのやり方をためしてみよう。',
    play_return_t:  '実験モードにもどったよ',
    play_return_m:  'さっきの式で実験をつづけよう。',
    play_return_log:'実験モードにもどる。',
    parse_err:      '入力した式を読みとれなかったよ',
    rand_log:       'ランダム問題をつくったよ。まず式のかたちを見てから動かそう。',
    rand_t:         'ランダム問題を読みこみ',
    rand_m:         '正かいルートは決まっていないよ。いろいろなやり方をくらべてみよう。',
    tool_invalid:   'ツールの数がおかしいよ',
    div_zero:       '0でわることはできないよ',
    div_zero_m:     'ツールに0いがいの数字を入れてね。',
    tool_done:      'ツールをつかったよ',
    step_ok:        'このステップは正しいよ',
    drag_fail:      'ドラッグもとがきえちゃった',
    drag_fail_m:    'もう一回ドラッグしてみてね。',
    undone_t:       '一手もどしたよ',
    undone_m:       '一つ前の形にもどしたよ。',
    undo_log:       'やりなおし：一つ前にもどる。',
    solved_t:       '△ だけにできたね！',
    solved_next:    '「次のステージ」をおして次へいこう。',
    solved_correct: '△ = {0}　正かい！',
    solved_all:     'ぜんぶのステージクリア！',
    solved_log:     '正かい：△ だけになったよ。',
    no_smart:       '次のおすすめはないよ。自由にドラッグするか、ツールで両がわいっしょにそうさしてみよう。',
    n_items:        '{0} こ',
    ch_prog:        '第 {0} 章・ステージ {1}',
    unknown_box:    'ナゾの箱',
    number_block:   '数ブロック',
    expand_btn:     'ひらく',
    expand_hint:    '中に入れると倍のぶん小さくなるよ',
    empty_group:    'カードをここにドラッグ。外の倍のぶん小さくなるよ。',
    empty_side:     'このがわはからっぽ（= 0）。',
    bracket_done:   'かっこをひらいたよ',

    /* 次にやること */
    move_to:       '{0} を{1}にうつす',
    move_note:     'まず △ のとなりの数を反対がわへ。',
    both_mul_neg1: '両がわに × -1',
    both_div:      '両がわを ÷ {0}',
    both_mul:      '両がわに × {0}',
    norm_div_note: '{0} をわって △ 1つぶんにする。',
    norm_mul_note: '{0} を 1つぶんの △ にする。',
    neg1_note:     'まず -△ を +△ にかえよう。',
    expand_left:   '左がわのかっこをひらく',
    expand_right:  '右がわのかっこをひらく',
    expand_note:   'かけ算をかっこの中にくばるよ。',

    /* ヒント */
    hint_title:      '👆 やってみよう！',
    hint_move_msg:   'ひかっているカードを反対がわにドラッグしよう！',
    hint_tool_msg:   'ツールバーにひかっている数字を入れて、ひかっているボタンを等号にドラッグしよう！',
    hint_expand_msg: 'ひかっている「ひらく」ボタンをおそう！',
    tool_label:      '両がわ同時',

    /* 方程式を作るモード */
    build_tray:      'つかえるカード',
    build_return:    'ここに戻して外す',
    build_drop_here: 'カードをここにドラッグ',
    build_goal:      'お話を読んで、カードを正しい側に置こう',
    build_done_t:    '方程式が正しいよ！',
    build_done_m:    'お話を方程式にできたね。',
    build_coach_t:   '方程式づくりヒント',
    build_coach_m:   'よく読んでみよう：「合計」「残り」ということばが結果を表していて、ふつうは等号の反対側におくよ。',

    /* エンジンテキスト */
    cross_note:      '等号をまたいだのでプラスマイナスがぎゃくになったよ',
    into_group_note: '{0}×( ) に入れるために、倍のぶん小さくしたよ',
    dst_left:        '左がわ',
    dst_right:       '右がわ',
    dst_left_g:      '左がわの倍のかっこ',
    dst_right_g:     '右がわの倍のかっこ',
    action_drop:     '{0} を{1}にドラッグ → {2}。{3}',
    action_expand:   '{0}×({1}) をひらいて → {2}。',
    tool_balance:    '両がわいっしょに{0}{1}。だから等式はつりあったままだよ。',
    verb_add:        '+ ',
    verb_sub:        '- ',
    verb_mul:        '× ',
    verb_div:        '÷ ',

    /* コーチ */
    coach_done_t:     'コーチまとめ',
    coach_done_next:  'このステージクリア！「次のステージ」で、もっとむずかしい式にちょうせんしよう。',
    coach_done_all:   'ぜんぶのステージクリア！実験モードで自分で問題をつくってみよう。',
    coach_play_t:     '実験ヒント',
    coach_play_group: '実験モードには正かいがないよ。かっこをひらくか、外の数を先にうつすか、2つのやり方をくらべてみよう。',
    coach_play_one:   'わからない数ブロックは1つだけ。となりの数をうつしてから、△ の前の数をどうするか考えよう。',
    coach_play_def:   'ためしたいルールをえらぼう：うつしかえ、かっこをひらく、両がわいっしょのかけ算・わり算？実験ではやり方のくらべっこがだいじだよ。',
    coach_advice:     'コーチのアドバイス',
    coach_const:      'まず △ と同じがわにある数を反対がわにうつそう。△ のそばの数をかたづけるのが先だよ。',
    coach_group:      'この問題には倍のかっこがあるよ。外の数をかっこの中にドラッグしてみよう。',
    coach_expand:     'かけ算が中のそれぞれにどうかかるか見たいなら、「ひらく」ボタンをおしてみよう。',
    coach_half_x:     '1/2△ があるね。両がわに × 2 して、半分の △ をもとにもどそう。',
    coach_frac_x:     '△ はもうほとんどひとりだよ。さいごに △ の前の数を 1 にしよう。',
    coach_both_x:     '両がわに △ があるね。まず一つの △ を反対がわにうつして、△ を一か所にあつめよう。',
    coach_hint:       'コーチのヒント',
    coach_default:    'よく見てみよう：どちらに △ がある？どうすれば △ をひとりにしやすい？',

    /* ランダム問題 */
    rand_const_t:   '実験：ランダム 数うつし問題',
    rand_const_s:   'まず数を反対がわにうつして、自動でまとまるのを見てみよう。',
    rand_coeff_t:   '実験：ランダム 整数かけ算問題',
    rand_coeff_s:   'まず数を消して、△ を同じ大きさにわけよう。',
    rand_frac_t:    '実験：ランダム 分数問題',
    rand_frac_s:    '両がわいっしょのかけ算をつかうタイミングに気をつけよう。',
    rand_bracket_t: '実験：ランダム かっこ問題',
    rand_bracket_s: 'かっこに入れるか、ひらいてから整理するかためしてみよう。',
    play_default_t: '実験：自由モード',
    play_default_s: '自分で式を入力して、一手ずつどうかわるか見てみよう。',
    play_free_goal: '自由に実験、正かいなし',
    play_custom_t:  '実験：自分の等式',
    play_custom_s:  '自分で入力した等式だよ。',
    play_reloaded:  '実験モードを読みなおしたよ。',

    /* 進み・ステップ */
    progress:       '{0}/{1} クリア',
    steps_count:    'このステージ {0} 手',
    all_clear_title:'🎉 ぜんぶクリア！',
    all_clear_msg:  '等式の変形のきほんをぜんぶおぼえたね。実験モードでもっとむずかしい問題にちょうせんしよう！',
    reset_progress: '記録リセット',
    reset_confirm:  'クリア記録をぜんぶ消してもいい？',
    next_unsolved:  '次のまだクリアしてないステージへ',

    /* フィードバック */
    feedback_title:    'フィードバック',
    feedback_bug:      '🐛 バグを報告',
    feedback_level:    '💡 新しい問題を提案',
    feedback_learning: '📝 学習フィードバック',

    /* 手動合体 & 符号選択 */
    action_merge:      '{0} と {1} を合体',
    merge_done:        '合体完了',
    sign_correct:      '正解！',
    sign_wrong:        'ちがうよ',
    sign_wrong_m:      '等号をこえると符号が変わるよ。もう一度考えてみてね。',
    coach_merge_t:     'ヒント',
    coach_merge_m:     'このステージは同類項を手動で合体しよう——同じ種類のカードを重ねてね。',
    coach_sign_t:      '符号に注意',
    coach_sign_m:      '等号をこえたら符号が変わるよ。正しい +/− を選んでね。',
  },

  /* ───────── English ───────── */
  en: {
    /* General UI */
    app_title:    'Equation Lab',
    app_desc:     'Drag cards to transform equations. Works with touch and mouse.',
    level_track:  'Levels',
    play_track:   'Sandbox',
    load_custom:  'Load custom equation',
    random_btn:   'Random problem',
    sample:       'Example {0}',
    input_hint:   'Supports <code>x</code>, integers, fractions, and one layer of multiplier brackets, e.g. <code>2(x+1)</code>, <code>1/2x+1</code>.',
    rules_title:  'Rules',
    rule_1:       'When a card crosses the equals sign, it flips to the opposite term.',
    rule_2:       'To place something inside <code>2( )</code>, it is first halved so the value stays the same.',
    rule_3:       'When you see a fractional coefficient like <code>1/2x</code>, you can multiply both sides by <code>2</code>.',
    recent_title: 'Recent moves',
    tool_value:   'Tool value',
    undo_btn:     'Undo',
    reset_level:  'Reset level',
    reset_play:   'Reset sandbox',
    next_btn:     'Next level',
    current_eq:   'Current equation',
    left_side:    'Left side',
    right_side:   'Right side',
    smart_title:  'Suggested next step',
    eq_hint_1:    'Drag a tool card here',
    eq_hint_2:    'Apply to both sides',
    drop_title:   'Drop zones',
    drop_note_1:  'The vertical bar means insert on this side.',
    drop_note_2:  'The green bracket means absorb into the multiplier group.',
    visual_title: 'Story diagram',
    visual_note_1:'The blue box is the unknown <code>x</code>.',
    visual_note_2:'Orange blocks are fixed amounts.',
    visual_note_3:'The green crate wraps things inside a multiplier.',
    design_title: 'Design notes',
    design_note_1:'Levels teach step by step; the sandbox is for free experimentation.',
    design_note_2:'"Flipping the sign when crossing the equals sign" is equivalent transformation.',
    design_note_3:'"Scaling when entering a bracket" is equivalent transformation.',

    /* Onboarding */
    onboard_title:   'Welcome to Equation Lab!',
    onboard_sub:     'Learn in 3 steps, then try it yourself',
    onboard_s1:      '<strong>Drag a card</strong> — Hold a number or variable card and drag it to the other side. Crossing the equals sign automatically flips the sign.',
    onboard_s2:      '<strong>Hint button</strong> — Not sure what to do? Tap the hint button to highlight the next step, but you still do the actual move.',
    onboard_s3:      '<strong>Menu</strong> — Tap ☰ at the top-left to switch levels, try sandbox mode, or read the rules.',
    onboard_dismiss: 'Got it — let\'s go!',

    /* Status messages */
    log_loaded:     'New level loaded. Look at the equation first, then start moving.',
    status_reset_t: 'Level reset',
    status_reset_m: 'Drag a card to try. Crossing the equals sign flips the sign; entering a multiplier bracket scales the value.',
    play_loaded:    'Sandbox loaded. Try different moves freely.',
    play_start_t:   'Sandbox started',
    play_start_m:   'Your equation is loaded. Experiment away!',
    play_reset_t:   'Sandbox reset',
    play_reset_m:   'Back to the starting state. Try a different path.',
    play_return_t:  'Sandbox restored',
    play_return_m:  'Continue experimenting with your equation.',
    play_return_log:'Returned to sandbox.',
    parse_err:      'Could not parse the custom equation',
    rand_log:       'Random problem generated. Observe the structure before deciding to drag or use the toolbox.',
    rand_t:         'Random problem loaded',
    rand_m:         'No fixed solution path — compare different approaches.',
    tool_invalid:   'Invalid tool value',
    div_zero:       'Cannot divide by 0',
    div_zero_m:     'Please enter a non-zero number in the toolbox.',
    tool_done:      'Toolbox operation applied',
    step_ok:        'This step is valid',
    drag_fail:      'Drag source lost',
    drag_fail_m:    'Please drag again.',
    undone_t:       'Undone one step',
    undone_m:       'Restored to the previous state.',
    undo_log:       'Undo: back one step.',
    solved_t:       'You isolated the unknown!',
    solved_next:    'Press "Next level" to keep practicing.',
    solved_correct: 'x = {0}  Correct!',
    solved_all:     'All levels cleared!',
    solved_log:     'Success: the unknown is isolated.',
    no_smart:       'No fixed next step. Feel free to drag or try the toolbox for both-sides operations.',
    n_items:        '{0} items',
    ch_prog:        'Chapter {0} · Level {1}',
    unknown_box:    'Unknown box',
    number_block:   'Number block',
    expand_btn:     'Expand',
    expand_hint:    'Entering here first scales by the multiplier',
    empty_group:    'Drag a card here. It will be scaled by the outer multiplier.',
    empty_side:     'This side is now empty (= 0).',
    bracket_done:   'Bracket expanded',

    /* Smart Actions */
    move_to:       'Move {0} to the {1}',
    move_note:     'Clear the constants next to x first.',
    both_mul_neg1: 'Multiply both sides by −1',
    both_div:      'Divide both sides by {0}',
    both_mul:      'Multiply both sides by {0}',
    norm_div_note: 'Divide {0} to get a single x.',
    norm_mul_note: 'Turn {0} into one whole x.',
    neg1_note:     'First turn −x into +x.',
    expand_left:   'Expand left bracket',
    expand_right:  'Expand right bracket',
    expand_note:   'Distribute the multiplication into the bracket.',

    /* Hints */
    hint_title:      '👆 Try it!',
    hint_move_msg:   'Drag the blinking card to the other side!',
    hint_tool_msg:   'Enter the blinking number in the toolbar, then drag the blinking button onto the equals sign!',
    hint_expand_msg: 'Tap the blinking "Expand" button!',
    tool_label:      'Both sides',

    /* Build mode */
    build_tray:      'Available cards',
    build_return:    'Drag here to remove',
    build_drop_here: 'Drag a card here',
    build_goal:      'Read the story, place cards on the correct side',
    build_done_t:    'Equation correct!',
    build_done_m:    'You successfully translated the story into an equation.',
    build_coach_t:   'Build hint',
    build_coach_m:   'Read carefully: words like "total" and "remaining" indicate the result, usually on the other side of the equals sign.',

    /* Engine text */
    cross_note:      'Crossed the equals sign — flipped to the opposite term',
    into_group_note: 'Scaled by the multiplier to enter {0}×( )',
    dst_left:        'left side',
    dst_right:       'right side',
    dst_left_g:      'left multiplier bracket',
    dst_right_g:     'right multiplier bracket',
    action_drop:     'Dragged {0} to the {1}, got {2}. {3}',
    action_expand:   'Expanded {0}×({1}) into {2}.',
    tool_balance:    'Both sides {0}{1}, so the equation stays balanced.',
    verb_add:        'plus ',
    verb_sub:        'minus ',
    verb_mul:        'times ',
    verb_div:        'divided by ',

    /* Coach */
    coach_done_t:     'Coach summary',
    coach_done_next:  'Level cleared! Press "Next level" to see how the same rules handle harder equations.',
    coach_done_all:   'All levels cleared! Head to the sandbox and create your own problems.',
    coach_play_t:     'Sandbox tip',
    coach_play_group: 'There\'s no single right answer in the sandbox. Compare two approaches: expand first, or move outer constants first.',
    coach_play_one:   'Only one unknown block. Clear its neighbors, then decide about the coefficient.',
    coach_play_def:   'Pick a rule to test: moving terms, expanding, or multiplying/dividing both sides. The sandbox is about comparing paths.',
    coach_advice:     'Coach advice',
    coach_const:      'Move the constants on the same side as x to the other side first.',
    coach_group:      'This problem has a multiplier bracket. Try dragging the outer constant into the bracket.',
    coach_expand:     'Want to see how multiplication distributes? Click the "Expand" button on the bracket.',
    coach_half_x:     'You see 1/2 x. Multiply both sides by 2 to turn half an x into a whole one.',
    coach_frac_x:     'x is almost isolated. The last step is usually turning the coefficient into 1.',
    coach_both_x:     'Both sides have x. Move one x to the other side to gather them together.',
    coach_hint:       'Coach hint',
    coach_default:    'Observe: which side has x? Which move makes x more alone?',

    /* Random templates */
    rand_const_t:   'Sandbox: random constant problem',
    rand_const_s:   'Move constants to the other side and watch them combine.',
    rand_coeff_t:   'Sandbox: random integer coefficient problem',
    rand_coeff_s:   'Clear constants first, then divide to split the x\'s.',
    rand_frac_t:    'Sandbox: random fraction problem',
    rand_frac_s:    'Watch for the right moment to multiply both sides.',
    rand_bracket_t: 'Sandbox: random bracket problem',
    rand_bracket_s: 'Try dragging into the bracket, or expand first.',
    play_default_t: 'Sandbox: free mode',
    play_default_s: 'Enter your own equation and see how each step rewrites it.',
    play_free_goal: 'Free experiment — no fixed answer',
    play_custom_t:  'Sandbox: custom equation',
    play_custom_s:  'This is the equation you entered.',
    play_reloaded:  'Sandbox reloaded.',

    /* Progress */
    progress:       '{0}/{1} cleared',
    steps_count:    '{0} steps this level',
    all_clear_title:'🎉 All levels cleared!',
    all_clear_msg:  'You\'ve mastered all the basic equation-transformation skills. Try the sandbox for tougher custom problems!',
    reset_progress: 'Clear progress',
    reset_confirm:  'Are you sure you want to clear all progress?',
    next_unsolved:  'Jump to the next unsolved level',

    /* Feedback */
    feedback_title:    'Feedback',
    feedback_bug:      '🐛 Report a bug',
    feedback_level:    '💡 Suggest a level',
    feedback_learning: '📝 Learning feedback',

    /* Manual merge & sign choice */
    action_merge:      'Merged {0} and {1}',
    merge_done:        'Merged!',
    sign_correct:      'Correct sign!',
    sign_wrong:        'Wrong sign',
    sign_wrong_m:      'The sign flips when crossing the equals sign. Think again.',
    coach_merge_t:     'Hint',
    coach_merge_m:     'Drag one like-term card onto another to merge them.',
    coach_sign_t:      'Watch the sign',
    coach_sign_m:      'The sign changes when crossing = sign. Pick the correct +/−.',
  },
};
