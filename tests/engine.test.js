/**
 * engine.test.js — 等式引擎核心逻辑单元测试
 */
import { describe, it, expect } from 'vitest';
import { parseSide } from '../src/js/parser.js';
import { frac, fracNeg, fracEq } from '../src/js/math.js';
import {
  listText, sideText, simplifyTerms, simplifySide, simplify,
  termCount, firstTerm, loneFractionX, loneGroup,
  convertTerm, applyDrop, applyExpand, applyToolOperation,
  isSolved, solveForX,
} from '../src/js/engine.js';

/* ── 辅助 ── */
function eq(left, right) {
  return { left: parseSide(left), right: parseSide(right) };
}

/* ═══════════════════════════════════════════
   文本输出
   ═══════════════════════════════════════════ */
describe('listText', () => {
  it('空数组', () => expect(listText([])).toBe('0'));
  it('单项', () => expect(listText([{ t:'term', s:'x', c:frac(2) }])).toBe('2×△'));
  it('多项', () => {
    const items = parseSide('x-3').items;
    expect(listText(items)).toBe('△ -3');
  });
});

describe('sideText', () => {
  it('简单多项式', () => {
    expect(sideText(parseSide('2x+5'))).toBe('2×△ +5');
  });
  it('含括号', () => {
    expect(sideText(parseSide('3(x+1)'))).toBe('3×(△ +1)');
  });
});

/* ═══════════════════════════════════════════
   化简
   ═══════════════════════════════════════════ */
describe('simplifyTerms — 合并同类项', () => {
  it('合并两个x项', () => {
    const items = [
      { t:'term', s:'x', c:frac(2) },
      { t:'term', s:'x', c:frac(3) },
    ];
    const r = simplifyTerms(items);
    expect(r).toHaveLength(1);
    expect(r[0]).toEqual({ t:'term', s:'x', c:frac(5) });
  });
  it('x项和常数项分别合并', () => {
    const items = [
      { t:'term', s:'x', c:frac(1) },
      { t:'term', s:'n', c:frac(3) },
      { t:'term', s:'n', c:frac(-5) },
    ];
    const r = simplifyTerms(items);
    expect(r).toHaveLength(2);
    expect(r.find(x=>x.s==='x').c).toEqual(frac(1));
    expect(r.find(x=>x.s==='n').c).toEqual(frac(-2));
  });
  it('全部归零', () => {
    const items = [
      { t:'term', s:'n', c:frac(3) },
      { t:'term', s:'n', c:frac(-3) },
    ];
    expect(simplifyTerms(items)).toHaveLength(0);
  });
});

describe('simplifySide', () => {
  it('化简含重复项的一侧', () => {
    const side = { items: [
      { t:'term', s:'x', c:frac(2) },
      { t:'term', s:'x', c:frac(3) },
      { t:'term', s:'n', c:frac(1) },
    ]};
    const r = simplifySide(side);
    expect(r.items).toHaveLength(2);
    expect(r.items.find(x=>x.s==='x').c).toEqual(frac(5));
  });
});

describe('simplify — 完整等式', () => {
  it('x+1=5 不再化简', () => {
    const e = simplify(eq('x+1', '5'));
    expect(e.left.items).toHaveLength(2);
    expect(e.right.items).toHaveLength(1);
  });
});

/* ═══════════════════════════════════════════
   查询辅助
   ═══════════════════════════════════════════ */
describe('termCount / firstTerm', () => {
  it('统计x项数量', () => {
    const side = parseSide('2x+3');
    expect(termCount(side, 'x')).toBe(1);
    expect(termCount(side, 'n')).toBe(1);
    expect(termCount(side)).toBe(2);
  });
  it('firstTerm 找到第一个x', () => {
    const side = parseSide('5+x');
    const t = firstTerm(side, 'x');
    expect(t.s).toBe('x');
    expect(t.c).toEqual(frac(1));
  });
});

describe('loneFractionX', () => {
  it('单个分数x项', () => {
    const side = parseSide('1/2x');
    const t = loneFractionX(side);
    expect(t).not.toBeNull();
    expect(t.c).toEqual(frac(1, 2));
  });
  it('非分数系数返回null', () => {
    expect(loneFractionX(parseSide('x'))).toBeNull();
    expect(loneFractionX(parseSide('x+1'))).toBeNull();
  });
});

describe('loneGroup', () => {
  it('单个group', () => {
    const side = parseSide('2(x+1)');
    const g = loneGroup(side);
    expect(g).not.toBeNull();
    expect(g.t).toBe('group');
  });
  it('多项返回null', () => {
    expect(loneGroup(parseSide('2(x+1)+3'))).toBeNull();
  });
});

/* ═══════════════════════════════════════════
   变换操作
   ═══════════════════════════════════════════ */
describe('convertTerm', () => {
  it('跨边取反', () => {
    const term = { t:'term', s:'n', c:frac(1) };
    const e = eq('x+1', '5');
    const r = convertTerm(term, 'left', { side:'right', k:'side', at:1 }, e);
    expect(r.term.c).toEqual(frac(-1));
    expect(r.notes.length).toBeGreaterThan(0);
  });
  it('同侧不变', () => {
    const term = { t:'term', s:'n', c:frac(3) };
    const e = eq('x+3', '5');
    const r = convertTerm(term, 'left', { side:'left', k:'side', at:0 }, e);
    expect(r.term.c).toEqual(frac(3));
    expect(r.notes).toHaveLength(0);
  });
});

describe('applyDrop', () => {
  it('把 +1 从左边拖到右边 → x+1=5 变成 x=4', () => {
    const e = eq('x+1', '5');
    const result = applyDrop(e, 'left', 1, { side:'right', k:'side', at:1 });
    expect(result).not.toBeNull();
    // 化简后：左边只剩 x，右边是 5+(-1) = 4
    expect(result.equation.left.items).toHaveLength(1);
    expect(result.equation.left.items[0].s).toBe('x');
    expect(result.equation.right.items).toHaveLength(1);
    expect(result.equation.right.items[0].c).toEqual(frac(4));
  });
});

describe('applyExpand', () => {
  it('展开 2(x+1)=6 左边', () => {
    const e = eq('2(x+1)', '6');
    const result = applyExpand(e, 'left', 0);
    expect(result).not.toBeNull();
    // 展开后：左边 2x+2
    const lItems = result.equation.left.items;
    expect(lItems).toHaveLength(2);
    expect(lItems.find(x=>x.s==='x').c).toEqual(frac(2));
    expect(lItems.find(x=>x.s==='n').c).toEqual(frac(2));
  });
});

describe('applyToolOperation', () => {
  it('两边加2', () => {
    const e = eq('x', '3');
    const r = applyToolOperation(e, 'add', frac(2));
    expect(r.equation.right.items[0].c).toEqual(frac(5));
  });
  it('两边乘2', () => {
    const e = eq('x', '3');
    const r = applyToolOperation(e, 'mul', frac(2));
    expect(r.equation.left.items[0].c).toEqual(frac(2));
    expect(r.equation.right.items[0].c).toEqual(frac(6));
  });
  it('两边除以2', () => {
    const e = eq('2x', '6');
    const r = applyToolOperation(e, 'div', frac(2));
    expect(r.equation.left.items[0].c).toEqual(frac(1));
    expect(r.equation.right.items[0].c).toEqual(frac(3));
  });
  it('除以0报错', () => {
    const e = eq('x', '3');
    const r = applyToolOperation(e, 'div', frac(0));
    expect(r.equation).toBeNull();
  });
});

/* ═══════════════════════════════════════════
   判定 & 求解
   ═══════════════════════════════════════════ */
describe('isSolved', () => {
  it('x=4 匹配 target=4', () => {
    const e = simplify(eq('x', '4'));
    expect(isSolved(e, frac(4))).toBe(true);
  });
  it('4=x 匹配 target=4', () => {
    const e = simplify(eq('4', 'x'));
    expect(isSolved(e, frac(4))).toBe(true);
  });
  it('x=4 不匹配 target=5', () => {
    const e = simplify(eq('x', '4'));
    expect(isSolved(e, frac(5))).toBe(false);
  });
  it('2x=8 未化简不匹配', () => {
    const e = simplify(eq('2x', '8'));
    expect(isSolved(e, frac(4))).toBe(false);
  });
});

describe('solveForX', () => {
  it('x+1=5 → x=4', () => {
    const x = solveForX(eq('x+1', '5'));
    expect(fracEq(x, frac(4))).toBe(true);
  });
  it('2x-3=7 → x=5', () => {
    const x = solveForX(eq('2x-3', '7'));
    expect(fracEq(x, frac(5))).toBe(true);
  });
  it('3(x+2)=15 → x=3', () => {
    const x = solveForX(eq('3(x+2)', '15'));
    expect(fracEq(x, frac(3))).toBe(true);
  });
  it('1/2x=3 → x=6', () => {
    const x = solveForX(eq('1/2x', '3'));
    expect(fracEq(x, frac(6))).toBe(true);
  });
  it('两边都有x: 3x+1=x+7 → x=3', () => {
    const x = solveForX(eq('3x+1', 'x+7'));
    expect(fracEq(x, frac(3))).toBe(true);
  });
  it('无解（0x=5）返回 null', () => {
    // 手工构造 0x = 5
    const e = {
      left: { items: [{ t:'term', s:'x', c:frac(0) }] },
      right: { items: [{ t:'term', s:'n', c:frac(5) }] },
    };
    expect(solveForX(e)).toBeNull();
  });
});
