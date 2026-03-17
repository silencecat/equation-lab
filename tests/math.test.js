/**
 * math.test.js — 分数运算纯函数单元测试
 */
import { describe, it, expect } from 'vitest';
import {
  gcd, frac, fracAdd, fracMul, fracDiv, fracNeg, fracAbs,
  fracEq, isZero, isOne, fracStr, signedText, plainText,
} from '../src/js/math.js';

describe('gcd', () => {
  it('基本最大公约数', () => {
    expect(gcd(12, 8)).toBe(4);
    expect(gcd(7, 3)).toBe(1);
    expect(gcd(0, 5)).toBe(5);
    expect(gcd(-6, 9)).toBe(3);
  });
});

describe('frac (分数构造)', () => {
  it('自动约分', () => {
    expect(frac(4, 6)).toEqual({ n: 2, d: 3 });
    expect(frac(10, 5)).toEqual({ n: 2, d: 1 });
  });
  it('负分母归正', () => {
    expect(frac(3, -4)).toEqual({ n: -3, d: 4 });
    expect(frac(-2, -6)).toEqual({ n: 1, d: 3 });
  });
  it('零分子', () => {
    expect(frac(0, 7)).toEqual({ n: 0, d: 1 });
  });
  it('零分母抛错', () => {
    expect(() => frac(1, 0)).toThrow();
  });
});

describe('fracAdd', () => {
  it('同分母', () => {
    expect(fracAdd(frac(1, 3), frac(2, 3))).toEqual(frac(1));
  });
  it('不同分母', () => {
    expect(fracAdd(frac(1, 2), frac(1, 3))).toEqual(frac(5, 6));
  });
  it('负数相加', () => {
    expect(fracAdd(frac(3), frac(-5))).toEqual(frac(-2));
  });
});

describe('fracMul', () => {
  it('正数相乘', () => {
    expect(fracMul(frac(2, 3), frac(3, 4))).toEqual(frac(1, 2));
  });
  it('乘以零', () => {
    expect(fracMul(frac(5), frac(0))).toEqual(frac(0));
  });
});

describe('fracDiv', () => {
  it('正数相除', () => {
    expect(fracDiv(frac(1, 2), frac(2))).toEqual(frac(1, 4));
  });
  it('除以分数', () => {
    expect(fracDiv(frac(3), frac(1, 2))).toEqual(frac(6));
  });
});

describe('fracNeg / fracAbs', () => {
  it('取反', () => {
    expect(fracNeg(frac(3, 4))).toEqual(frac(-3, 4));
    expect(fracNeg(frac(-2))).toEqual(frac(2));
  });
  it('绝对值', () => {
    expect(fracAbs(frac(-5, 3))).toEqual(frac(5, 3));
    expect(fracAbs(frac(7))).toEqual(frac(7));
  });
});

describe('fracEq / isZero / isOne', () => {
  it('相等判断', () => {
    expect(fracEq(frac(2, 4), frac(1, 2))).toBe(true);
    expect(fracEq(frac(1), frac(2))).toBe(false);
  });
  it('零判断', () => {
    expect(isZero(frac(0))).toBe(true);
    expect(isZero(frac(1))).toBe(false);
  });
  it('一判断', () => {
    expect(isOne(frac(3, 3))).toBe(true);
    expect(isOne(frac(2))).toBe(false);
  });
});

describe('fracStr', () => {
  it('整数', () => {
    expect(fracStr(frac(5))).toBe('5');
    expect(fracStr(frac(-3))).toBe('-3');
  });
  it('分数', () => {
    expect(fracStr(frac(1, 2))).toBe('1/2');
  });
});

describe('signedText / plainText', () => {
  it('常数项', () => {
    expect(signedText(frac(3), 'n')).toBe('+3');
    expect(signedText(frac(-2), 'n')).toBe('-2');
  });
  it('未知数项', () => {
    expect(signedText(frac(1), 'x')).toBe('+△');
    expect(signedText(frac(-1), 'x')).toBe('-△');
    expect(signedText(frac(2), 'x')).toBe('+2×△');
    expect(signedText(frac(1, 2), 'x')).toBe('+1/2×△');
  });
  it('plainText 无前导加号', () => {
    expect(plainText(frac(3), 'n')).toBe('3');
    expect(plainText(frac(-2), 'x')).toBe('-2×△');
  });
});
