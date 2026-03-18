/**
 * features.test.js — manualSimplify & hideSign 功能测试
 */
import { describe, it, expect } from 'vitest';
import {
  applyDrop, applyExpand, applyToolOperation, applyMerge,
  simplify, hasHiddenSigns, isSolved,
} from '../src/js/engine.js';
import { frac, fracEq, isZero, clone } from '../src/js/math.js';

/* 便捷构建 */
const term = (s, n, d = 1) => ({ t: 'term', s, c: { n, d } });
const side = (...items) => ({ items });
const eq = (left, right) => ({ left, right });

describe('manualSimplify', () => {
  it('applyDrop 带 manualSimplify 跳过化简', () => {
    // x + 3 = 7, 把 +3 移到右边 → 右边应保留 7 和 -3 两项（不合并）
    const e = eq(side(term('x', 1), term('n', 3)), side(term('n', 7)));
    const target = { k: 'side', side: 'right', at: 1 };
    const result = applyDrop(e, 'left', 1, target, { manualSimplify: true });
    expect(result).not.toBeNull();
    // 右侧应有 2 项（未合并）
    expect(result.equation.right.items.length).toBe(2);
  });

  it('applyDrop 无 manualSimplify 自动合并', () => {
    const e = eq(side(term('x', 1), term('n', 3)), side(term('n', 7)));
    const target = { k: 'side', side: 'right', at: 1 };
    const result = applyDrop(e, 'left', 1, target);
    expect(result).not.toBeNull();
    // 右侧应合并为 1 项（7 + (-3) = 4 → +4）
    // 注意：移过等号变号，所以 +3 → -3，7 + (-3) = 4
    expect(result.equation.right.items.length).toBe(1);
    expect(result.equation.right.items[0].c.n).toBe(4);
  });

  it('applyExpand 带 manualSimplify 跳过化简', () => {
    // 2(x + 3) + x = 10, 展开括号后左边应有 2x, 6, x 三项
    const e = eq(
      side({ t: 'group', m: frac(2), items: [term('x', 1), term('n', 3)] }, term('x', 1)),
      side(term('n', 10)),
    );
    const result = applyExpand(e, 'left', 0, { manualSimplify: true });
    expect(result).not.toBeNull();
    // 左侧应有 3 项（2x, +6, +x 未合并）
    expect(result.equation.left.items.length).toBe(3);
  });

  it('applyToolOperation 带 manualSimplify 跳过化简', () => {
    // x + 3 = 7, 两边 -3 → 左边应有 x, +3, -3 三项
    const e = eq(side(term('x', 1), term('n', 3)), side(term('n', 7)));
    const result = applyToolOperation(e, 'sub', frac(3), { manualSimplify: true });
    expect(result).not.toBeNull();
    expect(result.equation.left.items.length).toBe(3);
  });
});

describe('applyMerge', () => {
  it('合并同侧同类项', () => {
    // 左边: +3, +5 → 合并为 +8
    const e = eq(side(term('n', 3), term('n', 5)), side(term('n', 8)));
    const result = applyMerge(e, 'left', 0, 1);
    expect(result).not.toBeNull();
    expect(result.equation.left.items.length).toBe(1);
    expect(result.equation.left.items[0].c.n).toBe(8);
  });

  it('合并结果为零时移除', () => {
    // 左边: +3, -3 → 合并消除
    const e = eq(side(term('n', 3), term('n', -3), term('x', 1)), side(term('n', 5)));
    const result = applyMerge(e, 'left', 0, 1);
    expect(result).not.toBeNull();
    expect(result.equation.left.items.length).toBe(1); // 只剩 x
    expect(result.equation.left.items[0].s).toBe('x');
  });

  it('不同类型无法合并', () => {
    const e = eq(side(term('x', 1), term('n', 3)), side(term('n', 5)));
    const result = applyMerge(e, 'left', 0, 1);
    expect(result).toBeNull();
  });

  it('返回正确的 mergedIdx', () => {
    const e = eq(side(term('n', 2), term('x', 1), term('n', 5)), side(term('n', 7)));
    // 把 idx 0 (n:2) 合并到 idx 2 (n:5) → 目标在移除后变为 idx 1
    const result = applyMerge(e, 'left', 0, 2);
    expect(result).not.toBeNull();
    expect(result.mergedIdx).toBe(1);
    expect(result.equation.left.items[1].c.n).toBe(7);
  });
});

describe('hideSign', () => {
  it('跨等号移项标记 _signHidden', () => {
    const e = eq(side(term('x', 1), term('n', 3)), side(term('n', 7)));
    const target = { k: 'side', side: 'right', at: 1 };
    const result = applyDrop(e, 'left', 1, target, { hideSign: true });
    expect(result).not.toBeNull();
    // 找到右侧的 -3 项（+3 移过等号变 -3）
    const movedTerm = result.equation.right.items.find(it => it.c.n === -3);
    expect(movedTerm).toBeTruthy();
    expect(movedTerm._signHidden).toBe(true);
  });

  it('同侧移动不标记 _signHidden', () => {
    const e = eq(side(term('x', 1), term('n', 3), term('n', 5)), side(term('n', 10)));
    const target = { k: 'side', side: 'left', at: 0 };
    const result = applyDrop(e, 'left', 2, target, { hideSign: true });
    expect(result).not.toBeNull();
    // 无项带 _signHidden
    expect(hasHiddenSigns(result.equation)).toBe(false);
  });

  it('hasHiddenSigns 正确检测', () => {
    const e1 = eq(side(term('x', 1)), side(term('n', 3)));
    expect(hasHiddenSigns(e1)).toBe(false);

    e1.left.items[0]._signHidden = true;
    expect(hasHiddenSigns(e1)).toBe(true);
  });

  it('hideSign + manualSimplify 同时生效跳过化简', () => {
    const e = eq(side(term('x', 1), term('n', 3)), side(term('n', 7)));
    const target = { k: 'side', side: 'right', at: 1 };
    const result = applyDrop(e, 'left', 1, target, { hideSign: true, manualSimplify: true });
    expect(result).not.toBeNull();
    // 右侧 2 项，未合并
    expect(result.equation.right.items.length).toBe(2);
    // 移过来的项有 _signHidden
    const hidden = result.equation.right.items.find(it => it._signHidden);
    expect(hidden).toBeTruthy();
  });
});

describe('isSolved 不因隐藏符号误判', () => {
  it('隐藏符号时数学上正确但不算 done', () => {
    // 即使等式数学上是 x = 3, 如果有 _signHidden 也不应通过
    const e = eq(side(term('x', 1)), side(term('n', 3)));
    expect(isSolved(e, frac(3))).toBe(true);

    // hasHiddenSigns 是 UI 层的 guard，engine 的 isSolved 不管 _signHidden
    // 但 UI 层会检查 hasHiddenSigns 来阻止 done
    e.left.items[0]._signHidden = true;
    expect(hasHiddenSigns(e)).toBe(true);
  });
});
