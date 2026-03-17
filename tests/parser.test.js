/**
 * parser.test.js — 表达式解析器单元测试
 */
import { describe, it, expect } from 'vitest';
import { parseFracToken, parseSide } from '../src/js/parser.js';
import { frac, fracNeg } from '../src/js/math.js';

/* ---------- parseFracToken ---------- */
describe('parseFracToken', () => {
  it('整数', () => {
    expect(parseFracToken('7')).toEqual(frac(7));
  });
  it('分数', () => {
    expect(parseFracToken('3/4')).toEqual(frac(3, 4));
  });
  it('非法输入抛错', () => {
    expect(() => parseFracToken('abc')).toThrow();
    expect(() => parseFracToken('-2')).toThrow(); // 不允许自带负号
  });
});

/* ---------- parseSide ---------- */
describe('parseSide — 简单项', () => {
  it('单个常数', () => {
    const side = parseSide('5');
    expect(side.items).toEqual([{ t: 'term', s: 'n', c: frac(5) }]);
  });

  it('单个 x', () => {
    const side = parseSide('x');
    expect(side.items).toEqual([{ t: 'term', s: 'x', c: frac(1) }]);
  });

  it('系数 x', () => {
    const side = parseSide('3x');
    expect(side.items).toEqual([{ t: 'term', s: 'x', c: frac(3) }]);
  });

  it('负 x', () => {
    const side = parseSide('-x');
    expect(side.items).toEqual([{ t: 'term', s: 'x', c: frac(-1) }]);
  });

  it('分数系数 x', () => {
    const side = parseSide('1/2x');
    expect(side.items).toEqual([{ t: 'term', s: 'x', c: frac(1, 2) }]);
  });
});

describe('parseSide — 多项式', () => {
  it('x+3', () => {
    const side = parseSide('x+3');
    expect(side.items).toHaveLength(2);
    expect(side.items[0]).toEqual({ t: 'term', s: 'x', c: frac(1) });
    expect(side.items[1]).toEqual({ t: 'term', s: 'n', c: frac(3) });
  });

  it('2x-5+1', () => {
    const side = parseSide('2x-5+1');
    expect(side.items).toHaveLength(3);
    expect(side.items[0]).toEqual({ t: 'term', s: 'x', c: frac(2) });
    expect(side.items[1]).toEqual({ t: 'term', s: 'n', c: frac(-5) });
    expect(side.items[2]).toEqual({ t: 'term', s: 'n', c: frac(1) });
  });

  it('-x+1', () => {
    const side = parseSide('-x+1');
    expect(side.items[0]).toEqual({ t: 'term', s: 'x', c: frac(-1) });
    expect(side.items[1]).toEqual({ t: 'term', s: 'n', c: frac(1) });
  });
});

describe('parseSide — 括号组', () => {
  it('2(x+1)', () => {
    const side = parseSide('2(x+1)');
    expect(side.items).toHaveLength(1);
    const g = side.items[0];
    expect(g.t).toBe('group');
    expect(g.m).toEqual(frac(2));
    expect(g.items).toHaveLength(2);
    expect(g.items[0]).toEqual({ t: 'term', s: 'x', c: frac(1) });
    expect(g.items[1]).toEqual({ t: 'term', s: 'n', c: frac(1) });
  });

  it('-3(x-2)+5', () => {
    const side = parseSide('-3(x-2)+5');
    expect(side.items).toHaveLength(2);
    const g = side.items[0];
    expect(g.t).toBe('group');
    expect(g.m).toEqual(frac(-3));
    expect(side.items[1]).toEqual({ t: 'term', s: 'n', c: frac(5) });
  });
});

describe('parseSide — 错误处理', () => {
  it('空字符串', () => {
    expect(() => parseSide('')).toThrow();
  });
  it('未闭合括号', () => {
    expect(() => parseSide('2(x+1')).toThrow(/括号/);
  });
});
