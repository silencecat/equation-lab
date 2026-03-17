/**
 * coach.js — 教练提示逻辑（i18n 版）
 */

import { frac, fracAbs, fracEq, isOne } from './math.js';
import { termCount, loneFractionX, loneGroup, isSolved } from './engine.js';
import { t } from './i18n.js';

/**
 * 生成教练提示
 * @returns {{ t: string, m: string }}
 */
export function getCoachTip(equation, scene, mode, levelIdx, totalLevels) {
  const L = equation.left;
  const R = equation.right;

  /* ── 已解出 ── */
  if (isSolved(equation, scene.target)) {
    return {
      t: t('coach_done_t'),
      m: levelIdx < totalLevels - 1
        ? t('coach_done_next')
        : t('coach_done_all'),
    };
  }

  /* ── 实验线 ── */
  if (mode === 'play' && !scene.target) {
    if (
      L.items.some((it) => it.t === 'group') ||
      R.items.some((it) => it.t === 'group')
    ) {
      return { t: t('coach_play_t'), m: t('coach_play_group') };
    }
    if (termCount(L, 'x') + termCount(R, 'x') === 1) {
      return { t: t('coach_play_t'), m: t('coach_play_one') };
    }
    return { t: t('coach_play_t'), m: t('coach_play_def') };
  }

  /* ── 闯关线分支提示 ── */
  const gL = loneGroup(L);
  const gR = loneGroup(R);
  const fxL = loneFractionX(L);
  const fxR = loneFractionX(R);

  // 常数可以移走
  if (
    (termCount(L, 'x') === 1 &&
      termCount(L, 'n') === 1 &&
      R.items.every((it) => it.t === 'term' && it.s === 'n')) ||
    (termCount(R, 'x') === 1 &&
      termCount(R, 'n') === 1 &&
      L.items.every((it) => it.t === 'term' && it.s === 'n'))
  ) {
    return { t: t('coach_advice'), m: t('coach_const') };
  }

  // 括号 + 外面有常数
  if (
    (L.items.some((it) => it.t === 'group') && termCount(L, 'n') > 0) ||
    (R.items.some((it) => it.t === 'group') && termCount(R, 'n') > 0)
  ) {
    return { t: t('coach_advice'), m: t('coach_group') };
  }

  // 剩下一个 group 和一个常数
  if (
    (gL && R.items.length === 1 && R.items[0].t === 'term' && R.items[0].s === 'n') ||
    (gR && L.items.length === 1 && L.items[0].t === 'term' && L.items[0].s === 'n')
  ) {
    return { t: t('coach_advice'), m: t('coach_expand') };
  }

  // 1/2x
  if (
    (fxL && fracEq(fracAbs(fxL.c), frac(1, 2)) &&
      R.items.length === 1 && R.items[0].t === 'term' && R.items[0].s === 'n') ||
    (fxR && fracEq(fracAbs(fxR.c), frac(1, 2)) &&
      L.items.length === 1 && L.items[0].t === 'term' && L.items[0].s === 'n')
  ) {
    return { t: t('coach_advice'), m: t('coach_half_x') };
  }

  // 其他分数系数 x
  if (fxL || fxR) {
    return { t: t('coach_advice'), m: t('coach_frac_x') };
  }

  // 两边都有 x
  if (termCount(L, 'x') >= 1 && termCount(R, 'x') >= 1) {
    return { t: t('coach_advice'), m: t('coach_both_x') };
  }

  return { t: t('coach_hint'), m: t('coach_default') };
}
