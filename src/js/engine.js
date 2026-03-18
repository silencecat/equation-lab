/**
 * engine.js — 等式状态机
 *
 * 负责化简 (simplify)、变换 (convert)、对称操作 (scale)、判定 (solved) 等核心逻辑。
 */

import {
  frac, fracAdd, fracMul, fracDiv, fracNeg, fracAbs,
  fracEq, isZero, isOne, fracStr, signedText, clone,
} from './math.js';
import { t } from './i18n.js';

/* ═══════════════════════════════════════════
   文本输出
   ═══════════════════════════════════════════ */

/** 把一组 term 渲染成文本 */
export function listText(items) {
  if (!items.length) return '0';
  return items
    .map((it, i) => {
      const v = signedText(it.c, it.s);
      return i ? v : v.replace(/^\+/, '');
    })
    .join(' ');
}

/** 把一侧（包含 group）渲染成文本 */
export function sideText(side) {
  if (!side.items.length) return '0';
  return side.items
    .map((it, i) => {
      if (it.t === 'term') {
        const v = signedText(it.c, it.s);
        return i ? v : v.replace(/^\+/, '');
      }
      // group
      const prefix =
        it.m.n < 0 ? '-' : i ? '+' : '';
      const mStr = isOne(fracAbs(it.m)) ? '' : fracStr(fracAbs(it.m)) + '×';
      return prefix + mStr + '(' + listText(it.items) + ')';
    })
    .join(' ');
}

/* ═══════════════════════════════════════════
   化简
   ═══════════════════════════════════════════ */

/** 合并同类项（只处理 term 数组） */
export function simplifyTerms(items) {
  let xSum = frac(0);
  let nSum = frac(0);
  let xOrder = null;
  let nOrder = null;

  items.forEach((it, i) => {
    if (it.s === 'x') {
      xSum = fracAdd(xSum, it.c);
      if (xOrder === null) xOrder = i + 0.1;
    } else {
      nSum = fracAdd(nSum, it.c);
      if (nOrder === null) nOrder = i + 0.2;
    }
  });

  const out = [];
  if (!isZero(xSum))
    out.push({ o: xOrder ?? items.length + 0.1, it: { t: 'term', s: 'x', c: xSum } });
  if (!isZero(nSum))
    out.push({ o: nOrder ?? items.length + 0.2, it: { t: 'term', s: 'n', c: nSum } });
  out.sort((a, b) => a.o - b.o);
  return out.map((x) => x.it);
}

/** 化简一侧 */
export function simplifySide(side) {
  const entries = [];
  const terms = [];

  side.items.forEach((it, i) => {
    if (it.t === 'term') {
      terms.push(it);
    } else {
      const inner = simplifyTerms(it.items);
      if (!inner.length || isZero(it.m)) return;
      if (isOne(it.m)) {
        inner.forEach((x) => terms.push(x));
      } else {
        entries.push({
          o: i,
          it: { t: 'group', m: frac(it.m.n, it.m.d), items: inner },
        });
      }
    }
  });

  const simplified = simplifyTerms(terms);
  const first = side.items.findIndex((x) => x.t === 'term');
  simplified.forEach((it, i) =>
    entries.push({ o: first === -1 ? side.items.length + i : first + i * 0.1, it }),
  );
  entries.sort((a, b) => a.o - b.o);
  return { items: entries.map((x) => x.it) };
}

/** 化简整个等式 */
export function simplify(equation) {
  return {
    left: simplifySide(equation.left),
    right: simplifySide(equation.right),
  };
}

/* ═══════════════════════════════════════════
   查询辅助
   ═══════════════════════════════════════════ */

export function termCount(side, symbol) {
  return side.items.filter(
    (it) => it.t === 'term' && (!symbol || it.s === symbol),
  ).length;
}

export function firstTerm(side, symbol) {
  return side.items.find(
    (it) => it.t === 'term' && (!symbol || it.s === symbol),
  );
}

/**
 * 如果这一侧恰好只有一个分数系数的 x 项，返回它；否则 null。
 */
export function loneFractionX(side) {
  const t =
    side.items.length === 1 &&
    side.items[0].t === 'term' &&
    side.items[0].s === 'x'
      ? side.items[0]
      : null;
  return t && !isOne(fracAbs(t.c)) ? t : null;
}

/** 这一侧是否恰好只有一个 group？ */
export function loneGroup(side) {
  return side.items.length === 1 && side.items[0].t === 'group'
    ? side.items[0]
    : null;
}

/* ═══════════════════════════════════════════
   变换操作
   ═══════════════════════════════════════════ */

/**
 * 计算一个 term 从 fromSide 移动到 target 后的新系数
 * @returns {{ term, notes: string[] }}
 */
export function convertTerm(term, fromSide, target, equation) {
  let c = frac(term.c.n, term.c.d);
  const notes = [];

  if (fromSide !== target.side) {
    c = fracNeg(c);
    notes.push(t('cross_note'));
  }
  if (target.k === 'group') {
    const g = equation[target.side].items[target.gi];
    c = fracDiv(c, g.m);
    notes.push(t('into_group_note', fracStr(g.m)));
  }

  return { term: { t: 'term', s: term.s, c }, notes };
}

/** 生成操作描述文本 */
export function actionText(from, target, to, notes) {
  const dst =
    target.k === 'side'
      ? target.side === 'left'
        ? t('dst_left')
        : t('dst_right')
      : target.side === 'left'
        ? t('dst_left_g')
        : t('dst_right_g');
  return t('action_drop',
    signedText(from.c, from.s),
    dst,
    signedText(to.c, to.s),
    notes.length ? notes.join('，') + '。' : '',
  );
}

/**
 * 执行拖拽放置（纯数据操作）
 * @param {object} [options]  { manualSimplify, hideSign }
 * @returns {{ equation, text }}  新等式 + 描述文本
 */
export function applyDrop(equation, fromSide, fromIdx, target, options) {
  const eq = clone(equation);
  const term = eq[fromSide].items[fromIdx];
  if (!term || term.t !== 'term') return null;

  const result = convertTerm(term, fromSide, target, eq);
  const crossEquals = fromSide !== target.side;

  // hideSign: 跨等号移项时隐藏符号
  if (options?.hideSign && crossEquals && target.k === 'side') {
    result.term._signHidden = true;
  }

  // 移除原项
  eq[fromSide].items.splice(fromIdx, 1);

  // 插入到目标
  let insertAt = -1;
  if (target.k === 'side') {
    insertAt = target.at;
    if (fromSide === target.side && fromIdx < target.at) insertAt--;
    eq[target.side].items.splice(insertAt, 0, result.term);
  } else {
    eq[target.side].items[target.gi].items.splice(target.at, 0, result.term);
  }

  const raw = clone(eq);           // 未化简的中间态
  const skipSimplify = options?.manualSimplify || (options?.hideSign && crossEquals);
  const simplified = skipSimplify ? clone(eq) : simplify(eq);
  const text = actionText(term, target, result.term, result.notes);
  const signChanged = crossEquals;
  const moveInfo = { targetSide: target.side, targetIdx: insertAt, signChanged };
  return { equation: simplified, raw, text, moveInfo };
}

/**
 * 展开括号
 * @param {object} [options]  { manualSimplify }
 * @returns {{ equation, text }}
 */
export function applyExpand(equation, side, gi, options) {
  const eq = clone(equation);
  const group = eq[side].items[gi];
  if (!group || group.t !== 'group') return null;

  const expanded = group.items.map((item) => ({
    t: 'term',
    s: item.s,
    c: fracMul(item.c, group.m),
  }));

  eq[side].items.splice(gi, 1, ...expanded);
  const raw = clone(eq);           // 未化简的中间态
  const simplified = options?.manualSimplify ? clone(eq) : simplify(eq);

  const expandedStr = expanded
    .map((x, i) => {
      const v = signedText(x.c, x.s);
      return i ? v : v.replace(/^\+/, '');
    })
    .join(' ');
  const text = t('action_expand', fracStr(group.m), listText(group.items), expandedStr);

  // mulInfo: 乘法过程信息（用于动画显示 m×item → result）
  const mulInfo = group.items.map((item, i) => ({
    m: group.m,
    original: item,
    result: expanded[i],
  }));

  return { equation: simplified, raw, mulInfo, text };
}

/**
 * 两边同时做工具箱操作（加/减/乘/除）
 * @param {'add'|'sub'|'mul'|'div'} op
 * @param {object} [options]  { manualSimplify }
 * @returns {{ equation, text }}
 */
export function applyToolOperation(equation, op, value, options) {
  if (op === 'div' && isZero(value)) {
    return { equation: null, text: t('div_zero') };
  }

  const eq = clone(equation);

  if (op === 'add' || op === 'sub') {
    const amount = op === 'add' ? value : fracNeg(value);
    ['left', 'right'].forEach((side) =>
      eq[side].items.push({ t: 'term', s: 'n', c: amount }),
    );
  } else {
    const factor = op === 'mul' ? value : fracDiv(frac(1), value);
    ['left', 'right'].forEach((side) => {
      eq[side].items = eq[side].items.map((it) =>
        it.t === 'term'
          ? { ...it, c: fracMul(it.c, factor) }
          : { ...it, m: fracMul(it.m, factor) },
      );
    });
  }

  const raw = clone(eq);           // 未化简的中间态
  const simplified = options?.manualSimplify ? clone(eq) : simplify(eq);
  const verb = t('verb_' + op);
  const text = t('tool_balance', verb, fracStr(value));

  return { equation: simplified, raw, text };
}

/**
 * 手动合并两个同类项（manualSimplify 模式）
 * @returns {{ equation, raw, text, mergedIdx }}
 */
export function applyMerge(equation, side, fromIdx, toIdx) {
  const eq = clone(equation);
  const from = eq[side].items[fromIdx];
  const to = eq[side].items[toIdx];
  if (!from || !to || from.t !== 'term' || to.t !== 'term' || from.s !== to.s) return null;

  const merged = { t: 'term', s: from.s, c: fracAdd(from.c, to.c) };
  const raw = clone(eq);

  if (isZero(merged.c)) {
    const lo = Math.min(fromIdx, toIdx);
    const hi = Math.max(fromIdx, toIdx);
    eq[side].items.splice(hi, 1);
    eq[side].items.splice(lo, 1);
  } else {
    eq[side].items[toIdx] = merged;
    eq[side].items.splice(fromIdx, 1);
  }

  const text = t('action_merge', signedText(from.c, from.s), signedText(to.c, to.s));
  let mergedIdx = isZero(merged.c) ? -1 : (fromIdx < toIdx ? toIdx - 1 : toIdx);
  return { equation: eq, raw, text, mergedIdx };
}

/** 检查等式中是否有隐藏符号的项 */
export function hasHiddenSigns(equation) {
  for (const side of [equation.left, equation.right]) {
    for (const it of side.items) {
      if (it._signHidden) return true;
    }
  }
  return false;
}

/**
 * 判定是否解出 x = target
 */
export function isSolved(equation, target) {
  if (!target) return false;
  const L = equation.left.items;
  const R = equation.right.items;
  if (L.length !== 1 || R.length !== 1) return false;
  const a = L[0];
  const b = R[0];
  return (
    a.t === 'term' &&
    b.t === 'term' &&
    ((a.s === 'x' && fracEq(a.c, frac(1)) && b.s === 'n' && fracEq(b.c, target)) ||
      (b.s === 'x' && fracEq(b.c, frac(1)) && a.s === 'n' && fracEq(a.c, target)))
  );
}

/**
 * 从等式数据中自动计算 x 的值（仅处理一元一次方程）
 * 返回 frac 或 null
 */
export function solveForX(equation) {
  // 先把整个等式化简，展开所有括号
  let eq = clone(equation);

  // 展开所有 group
  ['left', 'right'].forEach((side) => {
    const flatItems = [];
    eq[side].items.forEach((it) => {
      if (it.t === 'term') {
        flatItems.push(it);
      } else if (it.t === 'group') {
        it.items.forEach((inner) => {
          flatItems.push({ t: 'term', s: inner.s, c: fracMul(inner.c, it.m) });
        });
      }
    });
    eq[side].items = flatItems;
  });

  // 收集所有 x 系数和常数
  let xCoeff = frac(0);
  let nConst = frac(0);

  eq.left.items.forEach((it) => {
    if (it.s === 'x') xCoeff = fracAdd(xCoeff, it.c);
    else nConst = fracAdd(nConst, it.c);
  });
  eq.right.items.forEach((it) => {
    if (it.s === 'x') xCoeff = fracAdd(xCoeff, fracNeg(it.c));
    else nConst = fracAdd(nConst, fracNeg(it.c));
  });

  // xCoeff * x + nConst = 0  →  x = -nConst / xCoeff
  if (isZero(xCoeff)) return null;
  return fracDiv(fracNeg(nConst), xCoeff);
}
