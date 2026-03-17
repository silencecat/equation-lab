/**
 * math.js — 分数运算纯函数库
 *
 * 所有分数用 { n: 分子, d: 分母 } 表示，始终保持最简且 d > 0。
 */

/** 最大公约数 */
export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a || 1;
}

/** 构造最简分数 */
export function frac(n, d = 1) {
  if (!d) throw new Error('分母不能为 0');
  const sign = d < 0 ? -1 : 1;
  const g = gcd(n * sign, Math.abs(d));
  return { n: (n * sign) / g, d: Math.abs(d) / g };
}

/** 分数加法 */
export function fracAdd(a, b) {
  return frac(a.n * b.d + b.n * a.d, a.d * b.d);
}

/** 分数乘法 */
export function fracMul(a, b) {
  return frac(a.n * b.n, a.d * b.d);
}

/** 分数除法 */
export function fracDiv(a, b) {
  return frac(a.n * b.d, a.d * b.n);
}

/** 取相反数 */
export function fracNeg(a) {
  return frac(-a.n, a.d);
}

/** 绝对值 */
export function fracAbs(a) {
  return frac(Math.abs(a.n), a.d);
}

/** 判等 */
export function fracEq(a, b) {
  return a.n === b.n && a.d === b.d;
}

/** 是否为零 */
export function isZero(a) {
  return a.n === 0;
}

/** 是否为 1 */
export function isOne(a) {
  return a.n === a.d;
}

/* ── 格式化工具 ── */

/** 分数 → 纯文本字符串（如 "3" 或 "1/2"），用于日志和 input value */
export function fracStr(a) {
  return a.d === 1 ? String(a.n) : a.n + '/' + a.d;
}

/** 分数 → HTML（整数直接返回数字；真分数渲染为上下排列） */
export function fracHtml(a) {
  if (a.d === 1) return String(a.n);
  const sign = a.n < 0 ? '−' : '';
  const absN = Math.abs(a.n);
  return sign + '<span class="frac"><span class="frac-n">' + absN +
    '</span><span class="frac-d">' + a.d + '</span></span>';
}

/**
 * 带符号的项文本，如 "+3"、"-x"、"+1/2x"
 * @param {object} coeff  分数系数
 * @param {string} symbol "n" 表示常数，"x" 表示未知数
 */
/** 未知数显示符号（小学阶段用 △ 取代 x，避免与乘号 × 混淆） */
export const UNKNOWN_CHAR = '△';

export function signedText(coeff, symbol) {
  const absCoeff = fracAbs(coeff);
  const body =
    symbol === 'n'
      ? fracStr(absCoeff)
      : isOne(absCoeff)
        ? UNKNOWN_CHAR
        : fracStr(absCoeff) + '×' + UNKNOWN_CHAR;
  return (coeff.n < 0 ? '-' : '+') + body;
}

/** 带符号的项 HTML（分数用上下排列） */
export function signedHtml(coeff, symbol) {
  const absCoeff = fracAbs(coeff);
  const body =
    symbol === 'n'
      ? fracHtml(absCoeff)
      : isOne(absCoeff)
        ? UNKNOWN_CHAR
        : fracHtml(absCoeff) + '×' + UNKNOWN_CHAR;
  return (coeff.n < 0 ? '−' : '+') + body;
}

/**
 * 不含前导 "+" 的项文本（用于首项显示）
 */
export function plainText(coeff, symbol) {
  const absCoeff = fracAbs(coeff);
  const body =
    symbol === 'n'
      ? fracStr(absCoeff)
      : isOne(absCoeff)
        ? UNKNOWN_CHAR
        : fracStr(absCoeff) + '×' + UNKNOWN_CHAR;
  return (coeff.n < 0 ? '-' : '') + body;
}

/** 不含前导 "+" 的项 HTML（分数用上下排列） */
export function plainHtml(coeff, symbol) {
  const absCoeff = fracAbs(coeff);
  const body =
    symbol === 'n'
      ? fracHtml(absCoeff)
      : isOne(absCoeff)
        ? UNKNOWN_CHAR
        : fracHtml(absCoeff) + '×' + UNKNOWN_CHAR;
  return (coeff.n < 0 ? '−' : '') + body;
}

/** 深拷贝 */
export function clone(v) {
  return JSON.parse(JSON.stringify(v));
}
