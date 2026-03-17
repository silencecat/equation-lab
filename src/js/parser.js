/**
 * parser.js — 等式表达式解析器
 *
 * 支持：整数、分数（1/2）、未知数 x、一层倍数括号 2(x+1)
 */

import { frac, fracNeg } from './math.js';

/**
 * 解析一个分数 token，如 "3" → {n:3,d:1}，"1/2" → {n:1,d:2}
 */
export function parseFracToken(token) {
  if (!/^\d+(\/\d+)?$/.test(token)) {
    throw new Error('数字格式不对：' + token);
  }
  const parts = token.split('/').map(Number);
  return frac(parts[0], parts[1] || 1);
}

/**
 * 解析一侧表达式文本，返回 { items: [...] }
 *
 * @param {string}  text        表达式文本，如 "2(x+1)+3"
 * @param {boolean} allowGroup  是否允许括号（内层递归时为 false）
 * @returns {{ items: Array }}
 */
export function parseSide(text, allowGroup = true) {
  const s = text.replace(/\s+/g, '');
  if (!s) throw new Error('式子不能为空');

  const items = [];
  let i = 0;

  while (i < s.length) {
    /* ── 读取正负号 ── */
    let sign = 1;
    if (s[i] === '+' || s[i] === '-') {
      sign = s[i] === '-' ? -1 : 1;
      i++;
    }
    if (i >= s.length) throw new Error('末尾不能只有符号');

    /* ── 读取数字系数 ── */
    let coeff = null;
    const start = i;
    while (i < s.length && /[\d/]/.test(s[i])) i++;
    if (i > start) coeff = parseFracToken(s.slice(start, i));

    /* ── 判断下一个字符 ── */
    if (i < s.length && (s[i] === 'x' || s[i] === '△')) {
      // 未知数项
      const c = coeff || frac(1);
      items.push({ t: 'term', s: 'x', c: sign === 1 ? c : fracNeg(c) });
      i++;
    } else if (i < s.length && s[i] === '(') {
      // 括号组
      if (!allowGroup) throw new Error('当前版本只支持一层括号');
      let depth = 1;
      let j = i + 1;
      while (j < s.length && depth) {
        if (s[j] === '(') depth++;
        else if (s[j] === ')') depth--;
        j++;
      }
      if (depth) throw new Error('括号没有闭合');
      const multiplier = coeff || frac(1);
      items.push({
        t: 'group',
        m: sign === 1 ? multiplier : fracNeg(multiplier),
        items: parseSide(s.slice(i + 1, j - 1), false).items,
      });
      i = j;
    } else if (coeff) {
      // 纯数字常数项
      items.push({ t: 'term', s: 'n', c: sign === 1 ? coeff : fracNeg(coeff) });
    } else {
      throw new Error('这里无法识别：' + s.slice(i));
    }

    // 下一个字符必须是运算符或结束
    if (i < s.length && s[i] !== '+' && s[i] !== '-') {
      throw new Error('这里缺少运算符：' + s.slice(i));
    }
  }

  return { items };
}
