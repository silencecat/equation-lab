/**
 * ui.js — DOM 渲染 + Pointer-Event 拖拽 + 事件绑定（入口模块）
 *
 * 用 Pointer Events 替代 HTML5 Drag & Drop，保证触屏兼容。
 */

import {
  frac, fracAdd, fracMul, fracDiv, fracNeg, fracAbs,
  fracEq, isZero, isOne, fracStr, fracHtml, signedText, signedHtml, plainText, plainHtml, clone,
} from './math.js';
import { parseFracToken, parseSide } from './parser.js';
import {
  listText, sideText, simplify, simplifyTerms,
  termCount, firstTerm, loneFractionX, loneGroup,
  convertTerm, actionText, applyDrop, applyExpand,
  applyToolOperation as engineToolOp, applyMerge as engineMerge,
  isSolved, hasHiddenSigns, solveForX,
} from './engine.js';
import { chapters, flattenLevels } from './levels.js';
import { getCoachTip } from './coach.js';
import { t, lt, setLocale, getLocale, applyStaticI18n, initLocale } from './i18n.js';
import { loadState, getState, updateState } from './state.js';

/* ═══════════════════════════════════════════
   DOM 辅助
   ═══════════════════════════════════════════ */
const $ = (id) => document.getElementById(id);

/* GitHub Issues 基础 URL */
const ISSUES_URL = 'https://github.com/silencecat/equation-lab/issues/new';

/* ═══════════════════════════════════════════
   全局状态
   ═══════════════════════════════════════════ */
const allLevels = flattenLevels();

const gameState = {
  mode: 'level',         // 'level' | 'play'
  levelIdx: 0,           // 当前关卡在 allLevels 中的索引
  equation: null,        // 当前等式
  custom: null,          // 实验线自定义场景
  history: [],           // 撤销栈
  steps: 0,              // 当前关卡步数
};

const uiState = {
  logs: [],
  status: { k: '', t: '现在先动手试试', m: '把一张卡片拖到新的位置上。允许的落点会亮起来。' },
  drag: null,
  hint: null,   // { type:'move'|'tool'|'expand', ... }
  anim: null,   // 动画状态机: { phase, raw, final, merges, mulInfo, op, timer }
  celebrated: false,  // 防止 confetti 重复触发
};

/* ═══════════════════════════════════════════
   动画辅助
   ═══════════════════════════════════════════ */

const ANIM_DELAY = 550;          // 每阶段间隔 (ms)
const MERGE_ANIM_DURATION = 1350; // 组合入场+聚拢动画总时长 (ms)
const EXPAND_ANIM_DURATION = 1200; // 展开动画: 分身飞行 + 交叉淡入结果 (ms)
const TOOL_SHOW_DURATION = 900;  // 工具操作第一阶段: 展示运算过程 (ms)

/** 动画期间锁定容器高度（只增不减），防止布局跳动 */
function lockAnimLayout() {
  document.querySelectorAll('.half, .row').forEach(el => {
    const h = el.offsetHeight;
    const cur = parseInt(el.style.minHeight) || 0;
    el.style.minHeight = Math.max(cur, h) + 'px';
  });
}
/** 动画结束时释放容器高度锁定 */
function releaseAnimLayout() {
  document.querySelectorAll('.half, .row').forEach(el => {
    el.style.minHeight = '';
  });
}

/**
 * FLIP 布局过渡：记录当前所有可见卡片的屏幕位置，
 * 在 DOM 重建后让它们从旧位置平滑滑动到新位置。
 * 支持多种动画阶段的 DOM 结构：
 *   - 正常/appear: 直接子 .chip 或 merge-group 内的 .anim-merge-pop
 *   - expand: .result-content.chip (展开结果卡) + 普通 .chip
 *   - tool-show: .tool-mul-wrap > .chip + 普通 .chip
 */
function snapshotChipPositions() {
  const map = new Map();
  ['left', 'right'].forEach(side => {
    const box = $(side);
    if (!box) return;
    // 收集所有可见的 chip 元素（各种嵌套结构）
    const chips = box.querySelectorAll(
      ':scope > .chip,' +                               // 普通卡片
      ':scope > .merge-group > .anim-merge-pop,' +      // 合并结果卡
      ':scope > .expand-wrap .result-content.chip,' +   // 展开结果卡
      ':scope > .tool-mul-wrap > .chip'                 // 工具乘除包裹卡
    );
    chips.forEach(el => {
      const span = el.querySelector('span');
      if (!span) return;
      // 跳过不可见的元素（如展开动画中还未显示的结果卡）
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;
      // 统一 key 格式：首项可能省略 +，这里补回以确保跨阶段匹配
      let text = span.textContent;
      if (text && !text.startsWith('+') && !text.startsWith('-')) text = '+' + text;
      const key = side + '::' + text;
      const finalKey = map.has(key) ? key + '#' + map.size : key;
      map.set(finalKey, rect);
    });
  });
  return map;
}

/** 在 DOM 重建后，将新卡片从旧位置平滑过渡到新位置 */
function applyFlipTransition(oldPositions) {
  if (!oldPositions || oldPositions.size === 0) return;
  const FLIP_DURATION = 350;
  ['left', 'right'].forEach(side => {
    const box = $(side);
    if (!box) return;
    // 匹配新 DOM 中所有可见卡片
    const chips = box.querySelectorAll(
      ':scope > .chip,' +
      ':scope > .merge-group > .chip,' +
      ':scope > .merge-group > .anim-merge-pop'
    );
    chips.forEach(el => {
      const span = el.querySelector('span');
      if (!span) return;
      // 统一 key 格式，与 snapshot 一致
      let text = span.textContent;
      if (text && !text.startsWith('+') && !text.startsWith('-')) text = '+' + text;
      const key = side + '::' + text;
      let oldRect = oldPositions.get(key);
      if (!oldRect) {
        for (const [k, v] of oldPositions) {
          if (k.startsWith(key)) { oldRect = v; break; }
        }
      }
      if (!oldRect) return;

      const newRect = el.getBoundingClientRect();
      const dx = oldRect.left - newRect.left;
      const dy = oldRect.top - newRect.top;
      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) return;

      el.style.transform = `translate(${dx}px, ${dy}px)`;
      el.style.transition = 'none';
      el.classList.add('flip-moving');
      el.getBoundingClientRect(); // 强制回流
      el.style.transition = `transform ${FLIP_DURATION}ms cubic-bezier(.4,0,.2,1)`;
      el.style.transform = '';
      el.addEventListener('transitionend', () => {
        el.style.transition = '';
        el.style.transform = '';
        el.classList.remove('flip-moving');
      }, { once: true });
    });
  });
}
/** 轻量重绘棋盘（动画中间阶段用，不重建侧边栏/状态栏） */
function repaintBoard() {
  clearDropZones();
  paintSide('left');
  paintSide('right');
  registerDropZone($('eqToolDrop'), { k: 'tool' });
  lockAnimLayout();
}

/**
 * 检测一侧中哪些同类项会被合并。
 * 对比 raw（未化简）与 final（化简后），找出被 simplifyTerms 合并的项组。
 * 返回 [{ symbol: 'x'|'n', indices: [rawIdx...], result: term }]
 */
function detectMerges(rawSide, finalSide) {
  const merges = [];
  // 收集 raw 中所有顶层 term 按 symbol 分组
  const bySymbol = {};
  rawSide.items.forEach((it, i) => {
    if (it.t !== 'term') return;
    (bySymbol[it.s] = bySymbol[it.s] || []).push(i);
  });
  // 统计 final 中各符号的项数
  const finalCount = {};
  finalSide.items.forEach(it => {
    if (it.t !== 'term') return;
    finalCount[it.s] = (finalCount[it.s] || 0) + 1;
  });
  // 只有同类项确实被合并（final 中项数减少）时才算合并
  for (const [sym, indices] of Object.entries(bySymbol)) {
    if (indices.length < 2) continue;
    // 如果 final 中同符号项数未减少，说明没有发生合并
    if ((finalCount[sym] || 0) >= indices.length) continue;
    // 在 final 中找对应的合并结果
    const merged = finalSide.items.find(x => x.t === 'term' && x.s === sym);
    if (merged) {
      merges.push({ symbol: sym, indices, result: merged });
    } else {
      // 合并结果为 0，被消除了
      merges.push({ symbol: sym, indices, result: null });
    }
  }
  return merges;
}

/** 清除动画状态，设置最终等式 */
function finishAnim() {
  if (!uiState.anim) return;
  if (uiState.anim.timer) clearTimeout(uiState.anim.timer);

  // FLIP: 快照当前卡片位置
  const oldPos = snapshotChipPositions();

  gameState.equation = uiState.anim.final;
  uiState.anim = null;
  releaseAnimLayout();
  render();

  // FLIP: 从旧位置平滑过渡到新位置
  applyFlipTransition(oldPos);
}

/** 启动分步动画 */
function startAnim(result, op, expandInfo, toolInfo) {
  const leftMerges = detectMerges(result.raw.left, result.equation.left);
  const rightMerges = detectMerges(result.raw.right, result.equation.right);
  const hasMerges = leftMerges.length > 0 || rightMerges.length > 0;

  // 如果没有合并也没有展开也没有工具操作，跳过动画（移项变号时仍需动画）
  const hasSignFlip = op === 'move' && result.moveInfo?.signChanged;
  if (!hasMerges && !hasSignFlip && op !== 'expand' && op !== 'tool') {
    gameState.equation = result.equation;
    return false;
  }

  uiState.anim = {
    phase: op === 'expand' && expandInfo ? 'expand' : (op === 'tool' ? 'tool-show' : 'appear'),
    raw: result.raw,
    final: result.equation,
    merges: { left: leftMerges, right: rightMerges },
    expandInfo: expandInfo || null,
    toolInfo: toolInfo || null,
    moveInfo: result.moveInfo || null,
    op,
    timer: null,
  };

  if (op === 'expand' && expandInfo) {
    // 单次渲染：CSS 编排「分身飞行 → 交叉淡入结果卡片」
    // gameState.equation 保持展开前原始等式
    render();
    lockAnimLayout();

    uiState.anim.timer = setTimeout(() => {
      if (!uiState.anim) return;
      if (hasMerges) {
        // FLIP: 快照展开结果卡片位置
        const oldPos = snapshotChipPositions();
        // 切换到合并阶段（轻量重绘，不重建侧边栏）
        uiState.anim.phase = 'appear';
        gameState.equation = result.raw;
        repaintBoard();
        applyFlipTransition(oldPos);
        uiState.anim.timer = setTimeout(finishAnim, MERGE_ANIM_DURATION);
      } else {
        // 无需合并，直接完成
        finishAnim();
      }
    }, EXPAND_ANIM_DURATION);
  } else if (op === 'tool') {
    // Phase 1: tool-show 展示运算过程（保持原等式渲染）
    // gameState.equation 仍为原始等式，paintToolShow 在上面叠加运算效果
    render();
    lockAnimLayout();

    uiState.anim.timer = setTimeout(() => {
      if (!uiState.anim) return;
      // FLIP: 快照 tool-show 阶段卡片位置
      const oldPos = snapshotChipPositions();
      // Phase 2: 切换到 appear 阶段，显示运算结果
      uiState.anim.phase = 'appear';
      gameState.equation = result.raw;
      repaintBoard();
      applyFlipTransition(oldPos);

      const wait = hasMerges ? MERGE_ANIM_DURATION : ANIM_DELAY;
      uiState.anim.timer = setTimeout(finishAnim, wait);
    }, TOOL_SHOW_DURATION);
  } else {
    // move / tool: 直接用 raw 渲染 appear 阶段
    gameState.equation = result.raw;
    render();
    lockAnimLayout();

    if (hasMerges) {
      uiState.anim.timer = setTimeout(finishAnim, MERGE_ANIM_DURATION);
    } else {
      // tool without merges (mul/div or add/sub to empty side): 短动画后完成
      uiState.anim.timer = setTimeout(finishAnim, ANIM_DELAY);
    }
  }
  return true;
}

/* ═══════════════════════════════════════════
   关卡完成追踪
   ═══════════════════════════════════════════ */

function getClearedSet() {
  return new Set(getState().progress.clearedLevelIds);
}
function markCleared(idx) {
  const s = getClearedSet();
  s.add(idx);
  updateState('progress.clearedLevelIds', [...s]);
}

/* ═══════════════════════════════════════════
   场景 & 日志
   ═══════════════════════════════════════════ */

function currentScene() {
  if (gameState.mode === 'play') {
    return gameState.custom || makePlayScene(parseSide('x+1'), parseSide('5'));
  }
  return allLevels[gameState.levelIdx];
}

/** 解析场景文本：{zh,ja}对象用 lt()，字符串键用 t() */
function resolveText(val) {
  if (typeof val === 'object' && val !== null) return lt(val);
  return t(val);
}

function makePlayScene(left, right, titleKey, subKey) {
  return {
    title: titleKey || 'play_default_t',
    sub: subKey || 'play_default_s',
    goal: 'play_free_goal',
    eq: { left, right },
    target: null,
  };
}

function pushHistory() {
  gameState.history.push(clone(gameState.equation));
  if (gameState.history.length > 30) gameState.history.shift();
  gameState.steps++;
  uiState.hint = null;  // 执行操作时清除提示
}

/** 当前关卡是否列方程模式 */
function isBuildMode() {
  return currentScene().type === 'build';
}

/** 获取当前关卡的引擎选项 */
function sceneOptions() {
  const s = currentScene();
  const opts = {};
  if (s.manualSimplify) opts.manualSimplify = true;
  // hideSign 暂时屏蔽：移项自带符号翻转动画，额外选符号体验冗余
  // if (s.hideSign) opts.hideSign = true;
  return opts;
}

/** 列方程模式：获取已放置的 tray 索引集合 */
function getPlacedTrayIndices() {
  const placed = new Set();
  ['left', 'right'].forEach(side => {
    gameState.equation[side].items.forEach(item => {
      if (item._trayIdx !== undefined) placed.add(item._trayIdx);
    });
  });
  return placed;
}

/** 列方程模式：tray 卡片放入画布 */
function executeTrayDrop(trayIdx, target) {
  const scene = currentScene();
  const item = scene.tray[trayIdx];
  pushHistory();
  const term = { t: 'term', s: item.s, c: clone(item.c), _trayIdx: trayIdx };
  gameState.equation[target.side].items.splice(target.at, 0, term);
  addLog(t('step_ok'));
  uiState.status = { k: '', t: t('step_ok'), m: '' };
  render();
}

/** 列方程模式：从画布移回 tray */
function executeBuildRemove(side, idx) {
  pushHistory();
  gameState.equation[side].items.splice(idx, 1);
  addLog(t('undone_t'));
  uiState.status = { k: '', t: t('undone_t'), m: '' };
  render();
}

/** 列方程模式：比较等式是否匹配（顺序无关） */
function equationsMatch(eq1, eq2) {
  return (sidesMatch(eq1.left, eq2.left) && sidesMatch(eq1.right, eq2.right))
      || (sidesMatch(eq1.left, eq2.right) && sidesMatch(eq1.right, eq2.left));
}
function sidesMatch(s1, s2) {
  const terms1 = s1.items.filter(i => i.t === 'term');
  const terms2 = s2.items.filter(i => i.t === 'term');
  if (terms1.length !== terms2.length) return false;
  const key = (t) => t.s + ':' + t.c.n + '/' + t.c.d;
  const sorted1 = terms1.map(key).sort();
  const sorted2 = terms2.map(key).sort();
  return sorted1.every((v, i) => v === sorted2[i]);
}

function addLog(text) {
  uiState.logs.unshift(text);
  uiState.logs = uiState.logs.slice(0, 6);
}

function randomInt(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

/* ═══════════════════════════════════════════
   抽屉菜单
   ═══════════════════════════════════════════ */

function openDrawer() { $('drawerOverlay').classList.add('open'); }
function closeDrawer() { $('drawerOverlay').classList.remove('open'); }

/* ═══════════════════════════════════════════
   加载
   ═══════════════════════════════════════════ */

function loadLevel(idx) {
  closeDrawer();
  gameState.mode = 'level';
  gameState.custom = null;
  gameState.levelIdx = idx;
  const lv = allLevels[idx];
  if (lv.type === 'build') {
    // 列方程模式：空方程起步
    gameState.equation = { left: { items: [] }, right: { items: [] } };
  } else {
    gameState.equation = simplify(clone(lv.eq));
  }
  gameState.history = [];
  gameState.steps = 0;
  uiState.celebrated = false;
  removeNextArrow();
  clearTutorial();
  uiState.logs = [t('log_loaded')];
  uiState.status = {
    k: '',
    t: t('status_reset_t'),
    m: t('status_reset_m'),
  };
  render();
}

function loadPlayScene(scene, logText, statusTitle, statusMsg) {
  closeDrawer();
  gameState.mode = 'play';
  gameState.custom = scene;
  // 自动计算实验线的 target
  const autoTarget = solveForX(scene.eq);
  if (autoTarget) scene.target = autoTarget;
  gameState.equation = simplify(clone(scene.eq));
  gameState.history = [];
  gameState.steps = 0;
  uiState.celebrated = false;
  removeNextArrow();
  clearTutorial();
  uiState.logs = [logText];
  uiState.status = { k: '', t: statusTitle, m: statusMsg };
  render();
}

function syncFreeInputs(eqData) {
  $('freeLeft').value = sideText(eqData.left);
  $('freeRight').value = sideText(eqData.right);
}

function loadFree() {
  try {
    const left = parseSide($('freeLeft').value);
    const right = parseSide($('freeRight').value);
    loadPlayScene(
      makePlayScene(left, right, 'play_custom_t', 'play_custom_s'),
      t('play_loaded'),
      t('play_start_t'),
      t('play_start_m'),
    );
  } catch (err) {
    uiState.status = { k: 'err', t: t('parse_err'), m: String(err.message || err) };
    render();
  }
}

function loadRandomPlay() {
  const picks = [
    () => ({
      left: parseSide('x+' + randomInt(2, 8)),
      right: parseSide(String(randomInt(9, 16))),
      title: 'rand_const_t',
      sub: 'rand_const_s',
    }),
    () => ({
      left: parseSide(randomInt(2, 4) + 'x+' + randomInt(1, 6)),
      right: parseSide(String(randomInt(10, 24))),
      title: 'rand_coeff_t',
      sub: 'rand_coeff_s',
    }),
    () => ({
      left: parseSide('1/2x+' + randomInt(1, 4)),
      right: parseSide(String(randomInt(5, 12))),
      title: 'rand_frac_t',
      sub: 'rand_frac_s',
    }),
    () => ({
      left: parseSide('2(x+' + randomInt(1, 4) + ')+' + randomInt(2, 6)),
      right: parseSide(String(randomInt(10, 20))),
      title: 'rand_bracket_t',
      sub: 'rand_bracket_s',
    }),
  ];
  const pick = picks[randomInt(0, picks.length - 1)]();
  const scene = makePlayScene(pick.left, pick.right, pick.title, pick.sub);
  syncFreeInputs(scene.eq);
  loadPlayScene(
    scene,
    t('rand_log'),
    t('rand_t'),
    t('rand_m'),
  );
}

/* ═══════════════════════════════════════════
   工具箱 & 对称操作
   ═══════════════════════════════════════════ */

function getToolValue() {
  return parseFracToken($('toolValue').value.trim());
}

function refreshToolbox() {
  let valHtml = '2';
  try {
    valHtml = fracHtml(getToolValue());
  } catch { /* 忽略 */ }
  $('toolAdd').innerHTML = '+' + valHtml;
  $('toolSub').innerHTML = '−' + valHtml;
  $('toolMul').innerHTML = '×' + valHtml;
  $('toolDiv').innerHTML = '÷' + valHtml;
}

function doToolOperation(op, value) {
  if (op === 'div' && isZero(value)) {
    uiState.status = { k: 'err', t: t('div_zero'), m: t('div_zero_m') };
    render();
    return;
  }
  if (uiState.anim) finishAnim();
  pushHistory();
  const origLeftLen = gameState.equation.left.items.length;
  const origRightLen = gameState.equation.right.items.length;
  const result = engineToolOp(gameState.equation, op, value, sceneOptions());
  addLog(result.text);
  uiState.status = { k: '', t: t('tool_done'), m: result.text };
  const toolInfo = { op, value, origLeftLen, origRightLen };
  if (!startAnim(result, 'tool', null, toolInfo)) {
    gameState.equation = result.equation;
    render();
  }
  // startAnim 成功时已内部调用 render()
}

/* ═══════════════════════════════════════════
   Smart Actions（下一步建议）
   ═══════════════════════════════════════════ */

function normalizeAction(term, side) {
  const c = term.c;
  if (isOne(c)) return null;
  if (fracEq(c, frac(-1))) {
    return {
      label: t('both_mul_neg1'),
      hint: { type: 'tool', op: 'mul', value: frac(-1) },
      note: t('neg1_note'),
    };
  }
  const ac = fracAbs(c);
  if (ac.d === 1) {
    return {
      label: t('both_div', fracHtml(ac)),
      hint: { type: 'tool', op: 'div', value: ac },
      note: t('norm_div_note', plainText(c, 'x')),
    };
  }
  return {
    label: t('both_mul', fracHtml(frac(ac.d, ac.n))),
    hint: { type: 'tool', op: 'mul', value: frac(ac.d, ac.n) },
    note: t('norm_mul_note', plainText(c, 'x')),
  };
}

function moveConstantAction(side) {
  const own = gameState.equation[side];
  const otherSide = side === 'left' ? 'right' : 'left';
  const other = gameState.equation[otherSide];
  if (termCount(own, 'x') !== 1 || termCount(own, 'n') !== 1) return null;
  if (!other.items.every((it) => it.t === 'term' && it.s === 'n')) return null;
  const idx = own.items.findIndex((it) => it.t === 'term' && it.s === 'n');
  if (idx === -1) return null;
  const term = own.items[idx];
  return {
    label: t('move_to', signedHtml(term.c, term.s), otherSide === 'left' ? t('left_side') : t('right_side')),
    hint: { type: 'move', side, idx, targetSide: otherSide },
    note: t('move_note'),
  };
}

/** 当两边都有 x 时，建议把一边的 x 移到另一边 */
function moveXAction(side) {
  const own = gameState.equation[side];
  const otherSide = side === 'left' ? 'right' : 'left';
  const other = gameState.equation[otherSide];
  // 本侧必须有 x 项
  const xIdx = own.items.findIndex((it) => it.t === 'term' && it.s === 'x');
  if (xIdx === -1) return null;
  // 对面也必须有 x 项
  if (!other.items.some((it) => it.t === 'term' && it.s === 'x')) return null;
  const term = own.items[xIdx];
  const target = { k: 'side', side: otherSide, at: other.items.length };
  return {
    label: t('move_to', signedHtml(term.c, term.s), otherSide === 'left' ? t('left_side') : t('right_side')),
    run: () => {
      pushHistory();
      const result = applyDrop(gameState.equation, side, xIdx, target, sceneOptions());
      if (result) {
        gameState.equation = result.equation;
        addLog(result.text);
        uiState.status = { k: '', t: t('step_ok'), m: result.text };
      }
      render();
    },
    note: t('move_note'),
  };
}

function getSmartActions() {
  const out = [];
  const L = gameState.equation.left;
  const R = gameState.equation.right;

  const mx = moveConstantAction('left');
  const my = moveConstantAction('right');
  if (mx) out.push(mx);
  if (my) out.push(my);

  // 两边都有 x 时，建议把 x 集中到一边
  if (termCount(L, 'x') >= 1 && termCount(R, 'x') >= 1) {
    const mxr = moveXAction('right');
    if (mxr) out.push(mxr);
    else {
      const mxl = moveXAction('left');
      if (mxl) out.push(mxl);
    }
  }

  const loneLX =
    L.items.length === 1 && L.items[0].t === 'term' && L.items[0].s === 'x'
      ? L.items[0]
      : null;
  const loneRX =
    R.items.length === 1 && R.items[0].t === 'term' && R.items[0].s === 'x'
      ? R.items[0]
      : null;
  const norm = loneLX
    ? normalizeAction(loneLX, 'left')
    : loneRX
      ? normalizeAction(loneRX, 'right')
      : null;
  if (norm) out.push(norm);

  const gL = loneGroup(L);
  const gR = loneGroup(R);
  if (gL)
    out.push({
      label: t('expand_left'),
      hint: { type: 'expand', side: 'left', idx: 0 },
      note: t('expand_note'),
    });
  if (gR)
    out.push({
      label: t('expand_right'),
      hint: { type: 'expand', side: 'right', idx: 0 },
      note: t('expand_note'),
    });

  return out.slice(0, 3);
}

function doExpandGroup(side, gi) {
  if (uiState.anim) finishAnim();
  pushHistory();
  const result = applyExpand(gameState.equation, side, gi, sceneOptions());
  if (result) {
    addLog(result.text);
    uiState.status = { k: '', t: t('bracket_done'), m: result.text };
    // 传递展开信息：哪一侧、从哪个索引开始、展开了几项
    const expandInfo = { side, gi, count: result.mulInfo.length, mulInfo: result.mulInfo };
    if (!startAnim(result, 'expand', expandInfo)) {
      gameState.equation = result.equation;
    } else {
      return; // startAnim 已调用 render()
    }
  }
  render();
}

/* ═══════════════════════════════════════════
   Pointer-Event 拖拽系统
   ═══════════════════════════════════════════ */

/** 当前所有注册的落点区域 */
let dropZones = [];

function registerDropZone(el, target) {
  dropZones.push({ el, target });
}

function clearDropZones() {
  dropZones = [];
}

function hitTest(x, y) {
  const PAD = 16; // 扩大命中范围
  for (const dz of dropZones) {
    const r = dz.el.getBoundingClientRect();
    if (x >= r.left - PAD && x <= r.right + PAD &&
        y >= r.top - PAD && y <= r.bottom + PAD) {
      return dz;
    }
  }
  return null;
}

let activeDropZone = null;

function startDrag(info, floatEl, startX, startY) {
  clearTutorial();
  uiState.drag = { ...info, float: floatEl };
  document.body.appendChild(floatEl);
  moveFloat(startX, startY);
  if (info.sourceEl) info.sourceEl.classList.add('drag');
}

function moveFloat(x, y) {
  if (!uiState.drag?.float) return;
  uiState.drag.float.style.left = (x + 18) + 'px';
  uiState.drag.float.style.top = (y + 12) + 'px';
}

function endDrag() {
  const drag = uiState.drag;
  if (!drag) return;

  // 清理浮动元素
  if (drag.float?.parentNode) drag.float.parentNode.removeChild(drag.float);

  // 如果有命中的落点，执行放置
  if (activeDropZone) {
    if (drag.kind === 'tray' && activeDropZone.target.k === 'side') {
      executeTrayDrop(drag.trayIdx, activeDropZone.target);
    } else if (drag.kind === 'term' && isBuildMode() && activeDropZone.target.k === 'tray-trash') {
      executeBuildRemove(drag.side, drag.idx);
    } else if (drag.kind === 'term' && activeDropZone.target.k === 'merge') {
      executeMerge(activeDropZone.target);
    } else if (drag.kind === 'term') {
      executeDrop(activeDropZone.target);
    } else if (drag.kind === 'tool' && activeDropZone.target.k === 'tool') {
      doToolOperation(drag.op, drag.val);
    }
    activeDropZone.el.classList.remove('on');
    activeDropZone = null;
  }

  // 清除工具幽灵卡
  removeToolGhosts();

  // 恢复源元素样式
  if (drag.sourceEl) drag.sourceEl.classList.remove('drag');

  uiState.drag = null;
  document.querySelectorAll('.chip.drag, .opcard.drag, .tool-op.drag').forEach(
    (x) => x.classList.remove('drag'),
  );
}

function executeDrop(target) {
  const drag = uiState.drag;
  if (!drag || drag.kind !== 'term') return;
  if (uiState.anim) finishAnim();  // 上一个动画还在播放则立即结束
  pushHistory();
  const result = applyDrop(gameState.equation, drag.side, drag.idx, target, sceneOptions());
  if (result) {
    addLog(result.text);
    uiState.status = { k: '', t: t('step_ok'), m: result.text };
    if (!startAnim(result, 'move')) {
      gameState.equation = result.equation;
      render();
    }
    // startAnim 成功时已内部调用 render()
  } else {
    uiState.status = { k: 'err', t: t('drag_fail'), m: t('drag_fail_m') };
    render();
  }
}

/** 手动合并同类项（manualSimplify 模式） */
function executeMerge(target) {
  const drag = uiState.drag;
  if (!drag || drag.kind !== 'term') return;
  if (uiState.anim) finishAnim();
  pushHistory();
  const result = engineMerge(gameState.equation, drag.side, drag.idx, target.idx);
  if (result) {
    gameState.equation = result.equation;
    addLog(result.text);
    uiState.status = { k: '', t: t('merge_done'), m: result.text };
    // 标记合并结果用于高亮
    if (result.mergedIdx >= 0) {
      uiState.mergeFlash = { side: drag.side, idx: result.mergedIdx };
    }
    render();
    // 清除高亮
    setTimeout(() => { uiState.mergeFlash = null; }, 600);
  }
}

/** 确认隐藏符号（hideSign 模式） */
function confirmSign(side, idx, isPositive) {
  const term = gameState.equation[side].items[idx];
  if (!term || !term._signHidden) return;
  const termIsPositive = term.c.n > 0;

  if (isPositive === termIsPositive) {
    delete term._signHidden;
    addLog(t('sign_correct'));
    uiState.status = { k: '', t: t('sign_correct'), m: '' };
    // 若 manualSimplify 关闭且所有符号已确认，执行化简
    if (!currentScene().manualSimplify && !hasHiddenSigns(gameState.equation)) {
      gameState.equation = simplify(gameState.equation);
    }
  } else {
    uiState.status = { k: 'err', t: t('sign_wrong'), m: t('sign_wrong_m') };
  }
  render();
}

/** 全局 pointer 事件 */
function onPointerMove(e) {
  if (!uiState.drag) return;
  e.preventDefault();
  moveFloat(e.clientX, e.clientY);

  // ── 跨等号即时符号翻转（卡片拖拽，列方程模式下禁用） ──
  if (uiState.drag.kind === 'term' && !isBuildMode()) {
    const eqSign = document.getElementById('eqToolDrop');
    const eqRect = eqSign.getBoundingClientRect();
    const eqCenterX = eqRect.left + eqRect.width / 2;
    const fromSide = uiState.drag.side;
    const onOtherSide = fromSide === 'left' ? e.clientX > eqCenterX : e.clientX < eqCenterX;

    if (onOtherSide !== !!uiState.drag.flipped) {
      uiState.drag.flipped = onOtherSide;
      const term = gameState.equation[fromSide].items[uiState.drag.idx];
      if (term && term.t === 'term') {
        if (onOtherSide) {
          if (currentScene().hideSign) {
            // hideSign 模式：跨等号时显示 ? 而非变号后的值
            updateFloatChipHidden(term);
          } else {
            updateFloatChip({ t: 'term', s: term.s, c: fracNeg(term.c) });
          }
          uiState.drag.float.classList.add('sign-flip-flash');
        } else {
          updateFloatChip(term);
          uiState.drag.float.classList.remove('sign-flip-flash');
        }
      }
    }
  }

  // 命中检测
  let hit = hitTest(e.clientX, e.clientY);

  // 过滤：根据拖拽类型和模式，只允许有效的落点
  if (hit) {
    if (isBuildMode()) {
      // 列方程模式：tray→side, term→tray-trash
      if (uiState.drag.kind === 'tray' && hit.target.k !== 'side') hit = null;
      else if (uiState.drag.kind === 'term' && hit.target.k !== 'tray-trash') hit = null;
      else if (uiState.drag.kind !== 'tray' && uiState.drag.kind !== 'term') hit = null;
    } else {
      const isTool = uiState.drag.kind === 'tool';
      const isToolZone = hit.target.k === 'tool';
      if (isTool !== isToolZone) hit = null;
      // merge 区域过滤：只允许同侧同类项
      if (hit?.target.k === 'merge' && uiState.drag.kind === 'term') {
        const dragTerm = gameState.equation[uiState.drag.side]?.items[uiState.drag.idx];
        const targetTerm = gameState.equation[hit.target.side]?.items[hit.target.idx];
        if (!dragTerm || !targetTerm ||
            uiState.drag.side !== hit.target.side ||
            dragTerm.s !== targetTerm.s ||
            uiState.drag.idx === hit.target.idx) {
          hit = null;
        }
      }
    }
  }

  if (activeDropZone && activeDropZone !== hit) {
    activeDropZone.el.classList.remove('on');
    activeDropZone = null;
  }

  if (hit && hit !== activeDropZone) {
    hit.el.classList.add('on');
    activeDropZone = hit;

    // 如果是 term 拖拽且命中了具体落点，精确计算转换（可能含除以括号系数）
    if (uiState.drag.kind === 'term') {
      const term = gameState.equation[uiState.drag.side].items[uiState.drag.idx];
      if (term && term.t === 'term') {
        const r = convertTerm(term, uiState.drag.side, hit.target, gameState.equation);
        updateFloatChip(r.term);
      }
    }
  }

  if (!hit && uiState.drag.kind === 'term') {
    // 没有命中具体落点 → 依靠上面的跨等号检测已更新预览，无需额外处理
  }
}

function onPointerUp(e) {
  if (!uiState.drag) return;
  e.preventDefault();
  endDrag();
}

function updateFloatChip(term) {
  const f = uiState.drag?.float;
  if (!f || uiState.drag.kind !== 'term') return;
  const wasFlash = f.classList.contains('sign-flip-flash');
  f.className = 'chip drag-float ' + (term.s === 'x' ? 'x' : 'n');
  if (wasFlash) f.classList.add('sign-flip-flash');
  f.innerHTML = '<span>' + signedHtml(term.c, term.s) + '</span>';
}

/** hideSign 模式浮动预览：显示 ? 代替符号 */
function updateFloatChipHidden(term) {
  const f = uiState.drag?.float;
  if (!f || uiState.drag.kind !== 'term') return;
  f.className = 'chip drag-float ' + (term.s === 'x' ? 'x' : 'n');
  f.innerHTML = '<span>?' + plainHtml(fracAbs(term.c), term.s) + '</span>';
}

/* ═══════════════════════════════════════════
   DOM 元素工厂
   ═══════════════════════════════════════════ */

function createFloatChip(term) {
  const d = document.createElement('div');
  d.className = 'chip drag-float ' + (term.s === 'x' ? 'x' : 'n');
  d.innerHTML = '<span>' + signedHtml(term.c, term.s) + '</span>';
  return d;
}

function createFloatTool(op, val) {
  const d = document.createElement('div');
  d.className =
    'opcard drag-float ' + (op === 'mul' || op === 'div' ? 'mul' : 'add');
  d.innerHTML =
    (op === 'add' ? '+' : op === 'sub' ? '−' : op === 'mul' ? '×' : '÷') +
    fracHtml(val);
  return d;
}

/** 创建落点竖条 */
function createSlot(target) {
  const d = document.createElement('div');
  d.className = 'slot';
  registerDropZone(d, target);
  return d;
}

/** 获取初始状态标注（仅首次操作前显示） */
function getAnnotation(side, idx) {
  const scene = currentScene();

  // 列方程模式：始终显示 tray 标签
  if (scene.type === 'build') {
    const term = gameState.equation[side]?.items?.[idx];
    if (term?._trayIdx !== undefined && scene.tray[term._trayIdx]?.label) {
      const raw = resolveText(scene.tray[term._trayIdx].label);
      // 跳过纯带符号数字的标签（如 "+5"、"−5"），因为卡片本身已显示
      if (/^[+\-\u2212]\d+$/.test(raw.trim())) return null;
      return raw;
    }
    return null;
  }

  // 解方程模式：仅首次操作前
  if (gameState.history.length > 0) return null;
  const ann = scene.annotations;
  if (!ann) return null;
  const arr = ann[side];
  if (!arr || idx >= arr.length || !arr[idx]) return null;
  return resolveText(arr[idx]);
}

/** 当前等式中是否包含指定符号类型（'x' 或 'n'） */
function hasSymbol(sym) {
  const eq = gameState.equation;
  for (const side of [eq.left, eq.right]) {
    for (const it of side.items) {
      if (it.t === 'term' && it.s === sym) return true;
      if (it.t === 'group') {
        for (const gi of it.items) { if (gi.s === sym) return true; }
      }
    }
  }
  return false;
}

/** 创建可拖拽卡片 */
function createChip(side, it, idx) {
  const d = document.createElement('div');
  d.className = 'chip ' + (it.s === 'x' ? 'x' : 'n');
  // 提示高亮
  if (uiState.hint?.type === 'move' && uiState.hint.side === side && uiState.hint.idx === idx) {
    d.classList.add('hint-glow');
  }
  // 手动合并结果高亮
  if (uiState.mergeFlash && uiState.mergeFlash.side === side && uiState.mergeFlash.idx === idx) {
    d.classList.add('merge-flash');
  }

  // 动画阶段样式
  const anim = uiState.anim;
  if (anim) {
    const merges = anim.merges[side] || [];
    const inMerge = merges.find(m => m.indices.includes(idx));

    // 移项符号反转反馈（hideSign 时不显示，因为符号隐藏）
    if (anim.phase === 'appear' && anim.moveInfo?.signChanged
        && side === anim.moveInfo.targetSide && idx === anim.moveInfo.targetIdx
        && !it._signHidden) {
      d.classList.add('anim-sign-flip');
    }

    if (anim.phase === 'appear' && inMerge) {
      d.classList.add('anim-new');
    } else if (anim.phase === 'appear' && anim.toolInfo && !inMerge) {
      // 工具操作动画（非合并项）
      const ti = anim.toolInfo;
      if (ti.op === 'add' || ti.op === 'sub') {
        // add/sub：新增项入场动画
        const origLen = side === 'left' ? ti.origLeftLen : ti.origRightLen;
        if (idx >= origLen) {
          d.classList.add('anim-new');
        }
      } else if (ti.op === 'mul' || ti.op === 'div') {
        // mul/div：所有项脉冲动画
        d.classList.add('anim-tool-pulse');
      }
    }
  }

  const annotation = getAnnotation(side, idx);
  const scene = currentScene();
  const anyHidden = hasHiddenSigns(gameState.equation);

  // ── hideSign: 符号隐藏渲染 ──
  if (it._signHidden) {
    d.classList.add('sign-hidden');
    d.innerHTML =
      '<span class="sign-q">?</span>' +
      '<span>' + plainHtml(fracAbs(it.c), it.s) + '</span>' +
      '<div class="sign-btns">' +
        '<button class="sign-btn pos" type="button">+</button>' +
        '<button class="sign-btn neg" type="button">\u2212</button>' +
      '</div>';
    d.querySelector('.sign-btn.pos').onclick = (e) => { e.stopPropagation(); confirmSign(side, idx, true); };
    d.querySelector('.sign-btn.neg').onclick = (e) => { e.stopPropagation(); confirmSign(side, idx, false); };
    d.style.touchAction = 'none';
    d.draggable = false;
    return d;
  }

  d.innerHTML =
    '<span>' +
    signedHtml(it.c, it.s) +
    '</span>' +
    (annotation ? '<em class="story-label">' + annotation + '</em>' : '');
  d.style.touchAction = 'none'; // 防止触屏滚动
  d.draggable = false;            // 禁止原生拖拽

  // manualSimplify 模式：注册为合并落点
  if (scene.manualSimplify && !anim) {
    registerDropZone(d, { k: 'merge', side, idx });
  }

  // 动画播放时或隐藏符号待确认时禁止拖拽
  if (!anim && !anyHidden) {
    d.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      d.setPointerCapture(e.pointerId);
      startDrag(
        { kind: 'term', side, idx, sourceEl: d },
        createFloatChip(it),
        e.clientX,
        e.clientY,
      );
    });
  }

  return d;
}

/** 创建括号组（内联数学表达式风格） */
function createGroup(side, it, gi) {
  const d = document.createElement('div');
  d.className = 'group';

  // 倍数（小学阶段乘号不省略）
  const mul = document.createElement('span');
  mul.className = 'gmul';
  mul.innerHTML = fracHtml(it.m) + '×';
  d.appendChild(mul);

  // 左括号
  const lp = document.createElement('span');
  lp.className = 'gparen';
  lp.textContent = '(';
  d.appendChild(lp);

  // 括号内容（也是落点区域）
  const inner = document.createElement('span');
  inner.className = 'ginner';
  registerDropZone(inner, { k: 'group', side, gi, at: it.items.length });

  if (!it.items.length) {
    inner.textContent = '?';
  } else {
    it.items.forEach((x, i) => {
      const s = document.createElement('span');
      s.className = 'gterm ' + (x.s === 'x' ? 'x' : 'n');
      const txt = signedHtml(x.c, x.s);
      s.innerHTML = i === 0 ? txt.replace(/^\+/, '') : txt;
      inner.appendChild(s);
    });
  }
  d.appendChild(inner);

  // 右括号
  const rp = document.createElement('span');
  rp.className = 'gparen';
  rp.textContent = ')';
  d.appendChild(rp);

  // 展开按钮
  const btn = document.createElement('button');
  btn.className = 'gexpand' +
    (uiState.hint?.type === 'expand' && uiState.hint.side === side && uiState.hint.idx === gi ? ' hint-glow' : '');
  btn.type = 'button';
  btn.textContent = t('expand_btn');
  btn.onclick = (e) => {
    e.stopPropagation();
    hideExpandPreview();
    doExpandGroup(side, gi);
  };

  // ── 展开预览：hover / touch 时在各项上方显示 ×N 标签 ──
  const mulPreviewHtml = fracHtml(it.m) + '×';
  function showExpandPreview() {
    inner.querySelectorAll('.gterm').forEach((gt, j) => {
      if (gt.querySelector('.expand-preview-badge')) return;
      gt.classList.add('expand-preview-glow');
      const badge = document.createElement('span');
      badge.className = 'expand-preview-badge';
      badge.innerHTML = mulPreviewHtml;
      badge.style.animationDelay = (j * 80) + 'ms';
      gt.appendChild(badge);
    });
  }
  function hideExpandPreview() {
    inner.querySelectorAll('.expand-preview-badge').forEach(b => b.remove());
    inner.querySelectorAll('.expand-preview-glow').forEach(g => g.classList.remove('expand-preview-glow'));
  }
  btn.addEventListener('mouseenter', showExpandPreview);
  btn.addEventListener('mouseleave', hideExpandPreview);
  btn.addEventListener('pointerdown', showExpandPreview);
  d.appendChild(btn);

  // 初始状态标注（括号组也显示故事标签）
  const groupAnn = getAnnotation(side, gi);
  if (groupAnn) {
    const em = document.createElement('em');
    em.className = 'story-label';
    em.textContent = groupAnn;
    d.appendChild(em);
  }

  return d;
}

/** 绘制列方程模式的卡片工具箱 */
function paintBuildTray(scene) {
  const cards = $('buildTrayCards');
  cards.innerHTML = '';
  const placed = getPlacedTrayIndices();

  scene.tray.forEach((item, i) => {
    const d = document.createElement('div');
    const isPlaced = placed.has(i);
    const sign = item.c.n >= 0 ? ' pos' : ' neg';
    d.className = 'chip tray-chip ' + (item.s === 'x' ? 'x' : 'n') + sign + (isPlaced ? ' placed' : '');
    const rawLabel = item.label ? resolveText(item.label) : '';
    // 跳过纯带符号数字的标签（如 "+4"、"−4"），因为卡片本身已显示
    const label = rawLabel && /^[+\-\u2212]\d+$/.test(rawLabel.trim()) ? '' : rawLabel;
    d.innerHTML =
      '<span>' + signedHtml(item.c, item.s) + '</span>' +
      (label ? '<em class="story-label">' + label + '</em>' : '');

    if (!isPlaced) {
      d.style.touchAction = 'none';
      d.draggable = false;
      d.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        d.setPointerCapture(e.pointerId);
        const floatEl = document.createElement('div');
        floatEl.className = 'chip drag-float ' + (item.s === 'x' ? 'x' : 'n') + sign;
        floatEl.innerHTML = '<span>' + signedHtml(item.c, item.s) + '</span>' +
          (label ? '<em class="story-label">' + label + '</em>' : '');
        startDrag(
          { kind: 'tray', trayIdx: i, sourceEl: d },
          floatEl,
          e.clientX,
          e.clientY,
        );
      });
    }

    cards.appendChild(d);
  });
}

/** 创建视觉摘要（底部小方块） */
function paintVisual(el, side) {
  el.innerHTML = '';
  if (!side.items.length) {
    el.innerHTML = "<div class='badge n'>0</div>";
    return;
  }
  side.items.forEach((it) => {
    const d = document.createElement('div');
    if (it.t === 'term') {
      d.className = 'badge ' + (it.s === 'x' ? 'x' : 'n');
      d.innerHTML = plainHtml(it.c, it.s);
    } else {
      d.className = 'badge g';
      d.innerHTML = fracHtml(it.m) + '×(' + listText(it.items) + ')';
    }
    el.appendChild(d);
  });
}

/** 绘制一侧的拖拽区域 */
function paintSide(side) {
  const box = $(side);
  const s = gameState.equation[side];
  box.innerHTML = '';

  const anim = uiState.anim;

  // ── expand 阶段：分身飞行 + 交叉淡入结果（单次渲染，CSS 编排） ──
  if (anim?.phase === 'expand' && side === anim.expandInfo?.side) {
    paintExpand(box, side, s, anim);
  }
  // ── tool-show 阶段：展示运算过程 ──
  else if (anim?.phase === 'tool-show') {
    paintToolShow(box, side, s, anim);
  }
  // ── appear 阶段且有合并：合并容器 + 组合动画 ──
  else {
    const sideMerges = (anim && anim.phase === 'appear') ? (anim.merges[side] || []) : [];
    if (sideMerges.length > 0) {
      const mergedIndices = new Set();
      sideMerges.forEach(m => m.indices.forEach(i => mergedIndices.add(i)));

      box.appendChild(createSlot({ k: 'side', side, at: 0 }));
      s.items.forEach((it, i) => {
        if (it.t !== 'term') {
          box.appendChild(createGroup(side, it, i));
          box.appendChild(createSlot({ k: 'side', side, at: i + 1 }));
          return;
        }

        const merge = sideMerges.find(m => m.indices.includes(i));
        if (merge) {
          if (i === merge.indices[0]) {
            const group = document.createElement('div');
            group.className = 'merge-group';

            if (merge.result) {
              const resultChip = createChip(side, merge.result, i);
              resultChip.classList.remove('anim-new');
              resultChip.classList.add('anim-merge-pop');
              group.appendChild(resultChip);
            }

            const count = merge.indices.length;
            const centerPos = (count - 1) / 2;
            merge.indices.forEach((mi, pos) => {
              const chip = createChip(side, s.items[mi], mi);
              chip.classList.remove('anim-new');
              chip.classList.add('anim-appear-merge');
              const dx = Math.round((centerPos - pos) * 100);
              chip.style.setProperty('--merge-dx', dx + 'px');
              group.appendChild(chip);
            });

            box.appendChild(group);
          }
        } else {
          box.appendChild(createChip(side, it, i));
        }
        box.appendChild(createSlot({ k: 'side', side, at: i + 1 }));
      });
    } else {
      // 正常/expand-raw 阶段，或 appear 无合并
      box.appendChild(createSlot({ k: 'side', side, at: 0 }));
      s.items.forEach((it, i) => {
        const el = it.t === 'term' ? createChip(side, it, i) : createGroup(side, it, i);
        // 工具乘除：给 group 元素也加脉冲动画
        if (anim?.phase === 'appear' && anim.toolInfo
            && (anim.toolInfo.op === 'mul' || anim.toolInfo.op === 'div')
            && it.t !== 'term') {
          el.classList.add('anim-tool-pulse');
        }
        box.appendChild(el);
        box.appendChild(createSlot({ k: 'side', side, at: i + 1 }));
      });
    }
  }

  if (!s.items.length) {
    const h = document.createElement('div');
    h.className = 'hint';
    h.textContent = isBuildMode() ? t('build_drop_here') : t('empty_side');
    box.appendChild(h);
  }
}

/**
 * expand 阶段渲染 —— 单次 DOM 构建，CSS 编排全流程：
 *   0-550ms  分身飞行（乘法标签从中心飞向各项）
 *   500-900ms 交叉淡入（分身层淡出，结果卡片淡入）
 *   900-1200ms 结果卡片稳定可见
 * 两层叠放在同一 grid cell，无布局跳动。
 */
function paintExpand(box, side, s, anim) {
  const ei = anim.expandInfo;
  box.appendChild(createSlot({ k: 'side', side, at: 0 }));
  s.items.forEach((it, i) => {
    if (i === ei.gi && it.t === 'group') {
      const wrap = document.createElement('div');
      wrap.className = 'expand-wrap';

      const mulText = fracHtml(it.m) + '×';
      const count = it.items.length;
      const center = (count - 1) / 2;

      it.items.forEach((inner, j) => {
        const cell = document.createElement('div');
        cell.className = 'expand-term';

        /* ── 分身层：倍数标签飞入 + 原始项 ── */
        const splitDiv = document.createElement('div');
        splitDiv.className = 'split-content';
        splitDiv.style.animationDelay = (j * 100) + 'ms';

        const badge = document.createElement('span');
        badge.className = 'split-mul';
        badge.innerHTML = mulText;
        const flyFrom = Math.round((center - j) * 60);
        badge.style.setProperty('--fly-from', flyFrom + 'px');
        badge.style.animationDelay = (j * 100) + 'ms';
        splitDiv.appendChild(badge);

        const termSpan = document.createElement('span');
        termSpan.className = 'split-term ' + (inner.s === 'x' ? 'x' : 'n');
        const txt = signedHtml(inner.c, inner.s);
        termSpan.innerHTML = j === 0 ? txt.replace(/^\+/, '') : txt;
        splitDiv.appendChild(termSpan);

        cell.appendChild(splitDiv);

        /* ── 结果层：交叉淡入的卡片 ── */
        const resultDiv = document.createElement('div');
        const resultItem = ei.mulInfo[j].result;
        const rTxt = signedHtml(resultItem.c, resultItem.s);
        const cls = resultItem.s === 'x' ? 'x' : 'n';
        resultDiv.className = 'result-content chip ' + cls;
        resultDiv.innerHTML = '<span>' + (j === 0 ? rTxt.replace(/^\+/, '') : rTxt) + '</span>';
        resultDiv.style.animationDelay = (550 + j * 70) + 'ms';

        cell.appendChild(resultDiv);
        wrap.appendChild(cell);
      });

      box.appendChild(wrap);
    } else {
      box.appendChild(
        it.t === 'term' ? createChip(side, it, i) : createGroup(side, it, i),
      );
    }
    box.appendChild(createSlot({ k: 'side', side, at: i + 1 }));
  });
}

/**
 * tool-show 阶段渲染 —— 展示运算过程：
 *   add/sub: 在原有项后追加飞入的运算卡片
 *   mul/div: 在每项上叠加 ×N / ÷N 标签
 */
function paintToolShow(box, side, s, anim) {
  const ti = anim.toolInfo;

  if (ti.op === 'add' || ti.op === 'sub') {
    // ── add/sub: 渲染原始项 + 飞入运算卡片 ──
    box.appendChild(createSlot({ k: 'side', side, at: 0 }));
    s.items.forEach((it, i) => {
      const el = it.t === 'term' ? createChip(side, it, i) : createGroup(side, it, i);
      box.appendChild(el);
      box.appendChild(createSlot({ k: 'side', side, at: i + 1 }));
    });

    // 飞入的运算卡片（大号、带标签）
    const amount = ti.op === 'add' ? ti.value : fracNeg(ti.value);
    const flyCard = document.createElement('div');
    flyCard.className = 'chip n tool-fly-card';
    flyCard.innerHTML = '<span>' + signedHtml(amount, 'n') + '</span>';
    // 从等号方向飞入：左侧从右侧飞入，右侧从左侧飞入
    const flyFrom = side === 'left' ? '120px' : '-120px';
    flyCard.style.setProperty('--fly-from', flyFrom);
    box.appendChild(flyCard);
  } else {
    // ── mul/div: 在每项上叠加运算标签 ──
    box.appendChild(createSlot({ k: 'side', side, at: 0 }));
    s.items.forEach((it, i) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'tool-mul-wrap';

      const el = it.t === 'term' ? createChip(side, it, i) : createGroup(side, it, i);
      el.classList.add('tool-mul-glow');
      wrapper.appendChild(el);

      // ×N / ÷N 标签
      const badge = document.createElement('span');
      badge.className = 'tool-mul-badge';
      const opSign = ti.op === 'mul' ? '×' : '÷';
      badge.innerHTML = opSign + fracHtml(ti.value);
      badge.style.animationDelay = (i * 150) + 'ms';
      wrapper.appendChild(badge);

      box.appendChild(wrapper);
      box.appendChild(createSlot({ k: 'side', side, at: i + 1 }));
    });
  }
}

/** 工具拖拽时在两侧显示幽灵预览卡 */
function showToolGhosts(op, val) {
  removeToolGhosts();
  const opSign = op === 'add' ? '+' : op === 'sub' ? '−' : op === 'mul' ? '×' : '÷';
  const html = opSign + fracHtml(val);
  ['left', 'right'].forEach((side) => {
    const ghost = document.createElement('div');
    ghost.className = 'tool-ghost';
    ghost.innerHTML = html;
    $(side).appendChild(ghost);
  });
}

function removeToolGhosts() {
  document.querySelectorAll('.tool-ghost').forEach(el => el.remove());
}

/* ═══════════════════════════════════════════
   彩带庆祝动画
   ═══════════════════════════════════════════ */

function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff922b','#cc5de8','#20c997','#f06595'];
  const COUNT = 80;
  const particles = [];
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: canvas.width * (.2 + Math.random() * .6),
      y: canvas.height * .45,
      vx: (Math.random() - .5) * 14,
      vy: -8 - Math.random() * 10,
      w: 6 + Math.random() * 6,
      h: 4 + Math.random() * 4,
      color: COLORS[i % COLORS.length],
      rot: Math.random() * Math.PI * 2,
      rv: (Math.random() - .5) * .3,
      gravity: .25 + Math.random() * .1,
      opacity: 1,
    });
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const p of particles) {
      p.x += p.vx;
      p.vy += p.gravity;
      p.y += p.vy;
      p.rot += p.rv;
      p.vx *= .99;
      if (frame > 40) p.opacity = Math.max(0, p.opacity - .02);
      if (p.opacity <= 0) continue;
      alive = true;
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    frame++;
    if (alive && frame < 120) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  requestAnimationFrame(draw);
}

/* ═══════════════════════════════════════════
   下一关引导箭头
   ═══════════════════════════════════════════ */

function showNextArrow() {
  removeNextArrow();
  const btn = $('next');
  if (!btn || btn.disabled) return;
  const arrow = document.createElement('span');
  arrow.className = 'next-arrow';
  arrow.id = 'nextArrow';
  arrow.textContent = '👇';
  btn.style.position = 'relative';
  btn.appendChild(arrow);
}

function removeNextArrow() {
  const el = document.getElementById('nextArrow');
  if (el) el.remove();
}

/* ═══════════════════════════════════════════
   第一关教学引导
   ═══════════════════════════════════════════ */

let tutorialStep = -1; // -1 表示不在教学模式

function isTutorialLevel() {
  return gameState.mode === 'level' && gameState.levelIdx === 0;
}

function getTutorialStep() {
  if (!isTutorialLevel()) return -1;
  const L = gameState.equation.left.items;
  const R = gameState.equation.right.items;
  const scene = currentScene();
  // 已完成
  if (isSolved(gameState.equation, scene.target)) return 99;
  // 初始状态：x+2 = 5，需要把+2移到右边
  if (L.length === 2 && L[0].s === 'x' && L[1].s === 'n') return 0;
  // +2已移走，等式自动化简变成 x = 3（已完成）
  return 99;
}

function renderTutorial() {
  clearTutorial();
  if (!isTutorialLevel()) return;
  const step = getTutorialStep();
  tutorialStep = step;

  if (step === 0 && !uiState.anim) {
    // 指向+2卡片：找到左侧第二个chip（idx=1）
    const chips = document.querySelectorAll('#left > .chip');
    const chip = chips.length >= 2 ? chips[1] : null;
    const rightHalf = document.querySelector('#right')?.closest('.half');
    if (chip && rightHalf) {
      const chipRect = chip.getBoundingClientRect();
      const rightRect = rightHalf.getBoundingClientRect();

      // 箭头指向+2卡片上方
      const arrow = document.createElement('div');
      arrow.className = 'tut-arrow down';
      arrow.id = 'tutArrow';
      arrow.textContent = '👇';
      arrow.style.left = (chipRect.left + chipRect.width / 2 - 16) + 'px';
      arrow.style.top = (chipRect.top - 38) + 'px';
      document.body.appendChild(arrow);

      // 提示文字
      const text = document.createElement('div');
      text.className = 'tut-text';
      text.id = 'tutText';
      text.textContent = t('tut_drag_hint');
      // 文字放在右侧区域上方
      text.style.left = (rightRect.left + rightRect.width / 2) + 'px';
      text.style.top = (rightRect.top - 48) + 'px';
      text.style.transform = 'translateX(-50%)';
      document.body.appendChild(text);
    }
  }
}

function clearTutorial() {
  const arrow = document.getElementById('tutArrow');
  const text = document.getElementById('tutText');
  if (arrow) arrow.remove();
  if (text) text.remove();
}

/* ═══════════════════════════════════════════
   渲染主函数
   ═══════════════════════════════════════════ */

function render() {
  // 清除旧的落点注册
  clearDropZones();

  const scene = currentScene();
  const buildMode = scene.type === 'build';
  const coach = buildMode
    ? { t: t('build_coach_t'), m: t('build_coach_m') }
    : getCoachTip(
        gameState.equation,
        scene,
        gameState.mode,
        gameState.levelIdx,
        allLevels.length,
      );

  /* ── 提前检测解出状态（用于关卡列表的 cleared 标记） ── */
  const target = scene.target;
  let done;
  if (scene.type === 'build') {
    done = !uiState.anim && equationsMatch(gameState.equation, scene.eq);
  } else {
    done = !uiState.anim && !hasHiddenSigns(gameState.equation) && isSolved(gameState.equation, target);
  }
  if (done && gameState.mode === 'level') markCleared(gameState.levelIdx);

  /* ── 侧边栏关卡列表 ── */
  const cleared = getClearedSet();
  const clearCount = cleared.size;

  $('levels').innerHTML = '';

  // 进度条
  const progBar = document.createElement('div');
  progBar.className = 'progress-bar';
  progBar.innerHTML =
    '<div class="progress-fill" style="width:' +
    Math.round((clearCount / allLevels.length) * 100) + '%"></div>' +
    '<span class="progress-text">' + t('progress', clearCount, allLevels.length) + '</span>';
  $('levels').appendChild(progBar);

  chapters.forEach((ch, ci) => {
    const header = document.createElement('div');
    header.className = 'chapter-header';
    header.innerHTML = '<strong>' + lt(ch.name) + '</strong><small>' + lt(ch.desc) + '</small>';
    $('levels').appendChild(header);

    ch.levels.forEach((lv, li) => {
      const globalIdx = allLevels.findIndex(
        (a) => a.chapterIdx === ci && a.levelIdx === li,
      );
      const b = document.createElement('button');
      b.className =
        'level' +
        (gameState.mode === 'level' && globalIdx === gameState.levelIdx ? ' active' : '') +
        (cleared.has(globalIdx) ? ' cleared' : '');
      b.innerHTML = lt(lv.title) + '<small>' + lt(lv.sub) + '</small>';
      b.onclick = () => { closeDrawer(); loadLevel(globalIdx); };
      $('levels').appendChild(b);
    });
  });

  $('reset').textContent =
    gameState.mode === 'play' ? t('reset_play') : t('reset_level');

  /* ── 标题栏 ── */
  $('title').textContent = resolveText(scene.title);
  $('subtitle').textContent = resolveText(scene.sub);
  $('goal').textContent = resolveText(scene.goal);

  /* ── 故事卡片（应用题） ── */
  const storyCard = $('storyCard');
  const storyText = $('storyText');
  if (scene.story) {
    storyText.textContent = resolveText(scene.story);
    storyCard.style.display = '';
    /* 每次切关 / 重渲染都重新触发 fadeIn 动画 */
    storyCard.style.animation = 'none';
    storyCard.offsetHeight;           // force reflow
    storyCard.style.animation = '';
  } else {
    storyCard.style.display = 'none';
    storyText.textContent = '';
  }

  if (gameState.mode === 'level') {
    const lv = allLevels[gameState.levelIdx];
    const progParts = [t('ch_prog', lv.chapterIdx + 1, lv.levelIdx + 1)];
    if (gameState.steps > 0) progParts.push(t('steps_count', gameState.steps));
    $('prog').textContent = progParts.join('　');
  } else {
    const progParts = [t('play_track')];
    if (gameState.steps > 0) progParts.push(t('steps_count', gameState.steps));
    $('prog').textContent = progParts.join('　');
  }

  /* ── 绘制棋盘 ── */
  paintSide('left');
  paintSide('right');

  /* ── 侧容器整体作为兜底落点（追加到末尾），精确 slot 优先 ── */
  ['left', 'right'].forEach(side => {
    const len = gameState.equation[side].items.length;
    registerDropZone($(side), { k: 'side', side, at: len });
  });

  /* ── 列方程模式：工具箱 + tray-trash ── */
  const buildTray = $('buildTray');
  const toolRow = document.querySelector('.tool-row');
  if (buildMode) {
    toolRow.style.display = 'none';
    buildTray.style.display = '';
    paintBuildTray(scene);
    registerDropZone(buildTray, { k: 'tray-trash' });
  } else {
    buildTray.style.display = 'none';
    toolRow.style.display = '';
  }

  /* ── 图例（列方程模式隐藏，标签已在卡片上） ── */
  const legend = $('cardLegend');
  if (buildMode) {
    legend.style.display = 'none';
  } else {
    const hasX = hasSymbol('x');
    const hasN = hasSymbol('n');
    if (hasX || hasN) {
      legend.style.display = '';
      legend.innerHTML =
        (hasX ? '<span class="legend-item x"><span class="legend-swatch x">△</span>' + t('unknown_box') + '</span>' : '') +
        (hasN ? '<span class="legend-item n"><span class="legend-swatch n">5</span>' + t('number_block') + '</span>' : '');
    } else {
      legend.style.display = 'none';
    }
  }

  /* ── 等号作为工具拖拽落点 ── */
  if (!buildMode) registerDropZone($('eqToolDrop'), { k: 'tool' });

  /* ── 动画期间：禁止交互、显示遮罩 ── */
  const eqArea = document.querySelector('.eq-area');
  if (uiState.anim) {
    eqArea.classList.add('anim-playing');
    // 点击可跳过动画（延迟生效，防止工具拖拽释放时的幽灵 click 立即触发）
    eqArea.onclick = null;
    const animT0 = performance.now();
    requestAnimationFrame(() => {
      if (!uiState.anim) return;
      eqArea.onclick = (e) => {
        e.stopPropagation();
        if (performance.now() - animT0 < 120) return;
        finishAnim();
      };
    });
  } else {
    eqArea.classList.remove('anim-playing');
    eqArea.onclick = null;
  }

  /* ── 提示高亮：目标侧 ── */
  document.querySelectorAll('.half').forEach((el) => el.classList.remove('hint-target'));
  if (uiState.hint?.type === 'move') {
    const targetHalf = $(uiState.hint.targetSide)?.closest('.half');
    if (targetHalf) targetHalf.classList.add('hint-target');
  }

  /* ── 提示高亮：工具栏 ── */
  const toolInput = $('toolValue');
  document.querySelectorAll('.tool-op').forEach((el) => el.classList.remove('hint-glow'));
  toolInput.classList.remove('hint-glow');
  if (uiState.hint?.type === 'tool') {
    toolInput.value = fracStr(uiState.hint.value);  // input value 保持纯文本
    toolInput.classList.add('hint-glow');
    const opName = uiState.hint.op;
    document.querySelectorAll('.tool-op').forEach((el) => {
      if (el.dataset.op === opName) el.classList.add('hint-glow');
    });
  }

  /* ── 解出判定（done 已在前面计算） ── */
  const allCleared = clearCount === allLevels.length;
  if (done) {
    uiState.hint = null; // 解出后清除提示
    const stepsNote = gameState.mode === 'level'
      ? ' (' + t('steps_count', gameState.steps) + ')'
      : '';
    if (allCleared && gameState.mode === 'level') {
      uiState.status = {
        k: 'ok',
        t: t('all_clear_title'),
        m: t('all_clear_msg'),
      };
    } else {
      const statusT = buildMode ? t('build_done_t') : t('solved_t') + stepsNote;
      const statusM = buildMode ? t('build_done_m')
        : (gameState.mode === 'level' ? t('solved_next') : t('solved_correct', fracHtml(target)));
      uiState.status = {
        k: 'ok',
        t: statusT,
        m: statusM,
      };
    }
    if (!uiState.logs[0]?.startsWith(t('solved_log').substring(0, 2)))
      addLog(t('solved_log'));
    // 庆祝动画
    const eqDiv = document.querySelector('.eq-area');
    if (eqDiv && !eqDiv.classList.contains('solve-celebrate')) {
      eqDiv.classList.add('solve-celebrate');
      setTimeout(() => eqDiv.classList.remove('solve-celebrate'), 800);
    }
    if (!uiState.celebrated) {
      uiState.celebrated = true;
      launchConfetti();
    }
  }

  /* ── Smart Actions（引导提示按钮 — 列方程模式隐藏） ── */
  const smartBox = $('smartActions');
  if (buildMode) {
    smartBox.innerHTML = '';
  } else {
    const actions = getSmartActions();
    smartBox.innerHTML = '';
    if (!actions.length) {
      smartBox.innerHTML =
        "<div class='smartempty'>" + t('no_smart') + "</div>";
    } else {
      actions.forEach((a) => {
        const btn = document.createElement('button');
        btn.className = 'smartbtn';
        btn.type = 'button';
        btn.innerHTML = a.label;
        btn.title = a.note;
        btn.onclick = () => {
          uiState.hint = a.hint;
          render();
        };
        smartBox.appendChild(btn);
      });
    }
  }

  /* ── 教练气泡 & 状态提示 ── */
  const coachEl = $('coach');
  const anyHidden = hasHiddenSigns(gameState.equation);
  if (done) {
    coachEl.className = 'coach-bubble solved';
    coachEl.innerHTML = '<div class="coach-icon">🎉</div><div class="coach-body"><strong>' +
      uiState.status.t + '</strong><span>' + uiState.status.m + '</span></div>';
  } else if (anyHidden) {
    // 有隐藏符号时优先提示符号选择
    coachEl.className = 'coach-bubble';
    coachEl.innerHTML = '<div class="coach-icon">❓</div><div class="coach-body"><strong>' +
      t('coach_sign_t') + '</strong><span>' + t('coach_sign_m') + '</span></div>';
  } else if (uiState.hint) {
    // 显示提示引导消息
    const hintMsg = uiState.hint.type === 'move'  ? t('hint_move_msg')
                  : uiState.hint.type === 'tool'  ? t('hint_tool_msg')
                  : t('hint_expand_msg');
    coachEl.className = 'coach-bubble';
    coachEl.innerHTML = '<div class="coach-icon">👆</div><div class="coach-body"><strong>' +
      t('hint_title') + '</strong><span>' + hintMsg + '</span></div>';
  } else {
    coachEl.className = 'coach-bubble';
    coachEl.innerHTML = '<div class="coach-icon">💡</div><div class="coach-body"><strong>' +
      coach.t + '</strong><span>' + coach.m + '</span></div>';
  }
  const statusEl = $('status');
  if (uiState.status.k === 'err') {
    statusEl.className = 'status-toast err';
    statusEl.innerHTML = '<strong>' + uiState.status.t + '</strong> ' + uiState.status.m;
  } else {
    statusEl.className = 'status-toast hide';
    statusEl.innerHTML = '';
  }

  /* ── 按钮状态 ── */
  $('undo').disabled = !gameState.history.length;
  // 下一关按钮：已解且闯关模式时可用（总有一个未通关的，或可继续下一个）
  const hasUnsolved = done && gameState.mode === 'level' &&
    (clearCount < allLevels.length || gameState.levelIdx < allLevels.length - 1);
  $('next').disabled = !hasUnsolved;

  // 下一关引导箭头
  if (hasUnsolved) showNextArrow(); else removeNextArrow();

  // 第一关教学引导
  renderTutorial();
}

/* ═══════════════════════════════════════════
   事件绑定
   ═══════════════════════════════════════════ */

function bindEvents() {
  /* ── 禁用浏览器原生 drag-and-drop（否则会抢走 pointer 事件） ── */
  document.addEventListener('dragstart', (e) => e.preventDefault());

  /* ── 全局 pointer 事件 ── */
  window.addEventListener('pointermove', onPointerMove, { passive: false });
  window.addEventListener('pointerup', onPointerUp, { passive: false });
  window.addEventListener('pointercancel', onPointerUp, { passive: false });

  /* ── 工具栏按钮 ── */
  $('reset').onclick = () => {
    if (uiState.anim) { if (uiState.anim.timer) clearTimeout(uiState.anim.timer); uiState.anim = null; }
    if (gameState.mode === 'play' && gameState.custom) {
      loadPlayScene(
        clone(gameState.custom),
        uiState.logs[0] || t('play_reloaded'),
        t('play_reset_t'),
        t('play_reset_m'),
      );
    } else {
      loadLevel(gameState.levelIdx);
    }
  };

  $('undo').onclick = () => {
    if (uiState.anim) {
      // 动画期间撤销：中断动画并恢复
      if (uiState.anim.timer) clearTimeout(uiState.anim.timer);
      uiState.anim = null;
    }
    if (!gameState.history.length) return;
    gameState.equation = gameState.history.pop();
    gameState.steps = Math.max(0, gameState.steps - 1);
    uiState.hint = null;
    uiState.status = { k: '', t: t('undone_t'), m: t('undone_m') };
    addLog(t('undo_log'));
    render();
  };

  /* ── 下一关：跳到下一个未通关关卡 ── */
  $('next').onclick = () => {
    const cleared = getClearedSet();
    // 优先找当前关卡之后的第一个未通关
    let next = -1;
    for (let i = gameState.levelIdx + 1; i < allLevels.length; i++) {
      if (!cleared.has(i)) { next = i; break; }
    }
    // 如果后面全通了，找前面的
    if (next === -1) {
      for (let i = 0; i < gameState.levelIdx; i++) {
        if (!cleared.has(i)) { next = i; break; }
      }
    }
    // 如果全部通关，还是跳到下一顺序关
    if (next === -1 && gameState.levelIdx < allLevels.length - 1) {
      next = gameState.levelIdx + 1;
    }
    if (next >= 0) loadLevel(next);
  };

  $('loadFree').onclick = loadFree;
  $('randomFree').onclick = loadRandomPlay;

  /* ── 样例按钮 ── */
  document.querySelectorAll('[data-left][data-right]').forEach((btn) => {
    btn.onclick = () => {
      $('freeLeft').value = btn.dataset.left;
      $('freeRight').value = btn.dataset.right;
      loadFree();
    };
  });

  /* ── 迷你工具栏（两边同时操作 — 拖到等号上触发） ── */
  document.querySelectorAll('.tool-op').forEach((btn) => {
    btn.style.touchAction = 'none';
    btn.draggable = false;
    btn.addEventListener('pointerdown', (e) => {
      if (uiState.anim) return;
      let val;
      try {
        val = getToolValue();
      } catch (err) {
        uiState.status = { k: 'err', t: t('tool_invalid'), m: String(err.message || err) };
        render();
        return;
      }
      e.preventDefault();
      btn.setPointerCapture(e.pointerId);
      const op = btn.dataset.op;
      startDrag(
        { kind: 'tool', op, val, sourceEl: btn },
        createFloatTool(op, val),
        e.clientX,
        e.clientY,
      );
      // 在两侧显示幽灵预览卡
      showToolGhosts(op, val);
    });
  });

  /* ── 抽屉菜单 ── */
  $('menuBtn').onclick = openDrawer;
  $('drawerClose').onclick = closeDrawer;
  $('drawerOverlay').onclick = (e) => {
    if (e.target === $('drawerOverlay')) closeDrawer();
  };
}

function bindToolCard(id, op) {
  const el = $(id);
  el.style.touchAction = 'none';
  el.draggable = false;

  el.addEventListener('pointerdown', (e) => {
    let val;
    try {
      val = getToolValue();
    } catch (err) {
      uiState.status = { k: 'err', t: t('tool_invalid'), m: String(err.message || err) };
      render();
      return;
    }
    e.preventDefault();
    el.setPointerCapture(e.pointerId);

    startDrag(
      { kind: 'tool', op, val, sourceEl: el },
      createFloatTool(op, val),
      e.clientX,
      e.clientY,
    );
  });
}

/* ═══════════════════════════════════════════
   初始化
   ═══════════════════════════════════════════ */

export function init() {
  loadState();
  initLocale();
  bindEvents();
  loadLevel(0);

  /* ── 语言切换 ── */
  applyStaticI18n();
  document.querySelectorAll('.langbtn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === getLocale());
    btn.addEventListener('click', () => {
      setLocale(btn.dataset.lang);
      document.querySelectorAll('.langbtn').forEach((b) =>
        b.classList.toggle('active', b.dataset.lang === btn.dataset.lang),
      );
      applyStaticI18n();
      // 切换语言后刷新状态栏和日志
      uiState.status = {
        k: '',
        t: gameState.mode === 'level' ? t('status_reset_t') : t('play_start_t'),
        m: gameState.mode === 'level' ? t('status_reset_m') : t('play_start_m'),
      };
      uiState.logs = [t('log_loaded')];
      document.title = t('app_title');
      render();
    });
  });

  /* ── 清除进度 ── */
  const resetProg = document.getElementById('resetProgress');
  if (resetProg) {
    resetProg.addEventListener('click', () => {
      if (!confirm(t('reset_confirm'))) return;
      try { updateState('progress.clearedLevelIds', []); } catch {}
      loadLevel(0);
    });
  }

  /* ── 反馈按钮 ── */
  document.querySelectorAll('.feedback-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tpl = btn.dataset.tpl;
      const lvInfo = gameState.mode === 'level'
        ? allLevels[gameState.levelIdx]?.id || ''
        : 'sandbox';
      const params = new URLSearchParams({
        template: tpl + '.yml',
        level: lvInfo,
        language: getLocale(),
      });
      window.open(`${ISSUES_URL}?${params}`, '_blank', 'noopener');
    });
  });

  /* ── 新手引导 ── */
  const overlay = document.getElementById('onboard');
  if (overlay && !getState().learning.seenOnboarding) {
    overlay.style.display = '';
    const dismiss = document.getElementById('onboardDismiss');
    const close = () => {
      overlay.classList.add('hide');
      updateState('learning.seenOnboarding', true);
      setTimeout(() => overlay.remove(), 350);
    };
    if (dismiss) dismiss.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  }
}
