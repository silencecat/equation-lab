import { describe, it, expect } from 'vitest';
import {
  practiceDecks,
  createPracticeQuestion,
  parsePracticeAnswer,
  evaluatePracticeResult,
  formatElapsed,
} from '../src/js/practice.js';

describe('practice deck', () => {
  it('exports focused practice decks plus the mixed deck', () => {
    expect(practiceDecks.map((deck) => deck.id)).toEqual([
      'smart-calc',
      'inverse-missing',
      'order-ops',
      'multiplicative-structure',
      'rounding-sum',
      'factor-sense',
      'factor-multiple',
      'mul-div-pair',
      'unit-conversion',
      'average-total',
    ]);
  });

  it('creates a valid question for each template', () => {
    const templateIds = [
      'round-sum',
      'inverse-missing',
      'order-ops',
      'factor-partner',
      'factor-pair-count',
      'multiple-step',
      'first-common-multiple',
      'same-unit-merge',
      'factor-pair',
      'factor-diff',
      'regroup-diff',
      'mul-div-chain',
      'unit-conversion',
      'average-total',
      'factor-multiple',
      'factor-count',
      'common-factor-count',
      'gcd',
      'lcm',
      'common-multiple-count',
    ];
    templateIds.forEach((templateId) => {
      const question = createPracticeQuestion('smart-calc', {
        templateId,
        random: () => 0.2,
      });
      expect(question.deck.id).toBe('smart-calc');
      expect(question.expression).toBeTruthy();
      expect(Number.isInteger(question.answer)).toBe(true);
      expect(Number.isInteger(question.points)).toBe(true);
      expect(question.strategy.zh).toBeTruthy();
      expect(question.strategy.ja).toBeTruthy();
      expect(question.strategy.en).toBeTruthy();
      expect(question.hint.zh).toBeTruthy();
    });
  });

  it('creates questions scoped to each deck', () => {
    practiceDecks.forEach((deck) => {
      const question = createPracticeQuestion(deck.id, {
        random: () => 0.01,
      });
      expect(question.deck.id).toBe(deck.id);
      expect(question.deckId).toBe(deck.id);
      expect(Number.isInteger(question.answer)).toBe(true);
      expect(Number.isInteger(question.points)).toBe(true);
    });
  });

  it('uses visible friendly-number signals instead of opaque random numbers', () => {
    const expectations = [
      ['round-sum', /198|125|399|246|720|100|200|500/],
      ['inverse-missing', /□|逆算|inverse|96|72/],
      ['order-ops', /×|÷|括号|順番|order|Parentheses/],
      ['factor-partner', /24|36|乘法结构|かけ算|multiplication structure/],
      ['factor-pair-count', /乘法搭档|かけ算ペア|factor pairs|1×24/],
      ['multiple-step', /每次跳|リズム|jump rhythm|6|7/],
      ['first-common-multiple', /第一次相遇|初めて|first meeting|6|8/],
      ['same-unit-merge', /几份|何個分|groups of|37/],
      ['factor-pair', /65|35|100|25|125|48/],
      ['factor-diff', /37|23|48|200|100|10/],
      ['regroup-diff', /276|398|463|725|512/],
      ['mul-div-chain', /25|125|4|8/],
      ['unit-conversion', /厘米|分|角|cm|minutes|unit/],
      ['average-total', /平均|总量|average|total/],
      ['factor-count', /24|因数|factors/],
      ['common-factor-count', /12|18|公因数|common factors/],
      ['gcd', /24|36|最大公因数|greatest common factor/],
      ['lcm', /6|8|最小公倍数|least common multiple/],
      ['common-multiple-count', /60|公倍数|common multiples/],
    ];

    expectations.forEach(([templateId, signal]) => {
      const question = createPracticeQuestion('smart-calc', {
        templateId,
        random: () => 0.01,
      });
      const expressionText = typeof question.expression === 'string'
        ? question.expression
        : Object.values(question.expression).join(' ');
      const joinedText = [expressionText, question.hint.zh, question.strategy.zh, question.strategy.en].join(' ');
      expect(joinedText).toMatch(signal);
    });
  });
});

describe('practice answer parsing', () => {
  it('accepts full-width digits and commas', () => {
    expect(parsePracticeAnswer('１,２５０')).toEqual({ ok: true, value: 1250 });
  });

  it('rejects empty or invalid answers', () => {
    expect(parsePracticeAnswer('')).toEqual({ ok: false, reason: 'empty' });
    expect(parsePracticeAnswer('12.5')).toEqual({ ok: false, reason: 'invalid' });
  });
});

describe('practice evaluation', () => {
  it('rates a correct fast answer', () => {
    const question = createPracticeQuestion('smart-calc', {
      templateId: 'factor-pair',
      random: () => 0.2,
    });
    const result = evaluatePracticeResult(question, String(question.answer), 18000);
    expect(result.correct).toBe(true);
    expect(result.points).toBe(question.points);
    expect(result.tier).toBe('flash');
  });

  it('marks a wrong answer', () => {
    const question = createPracticeQuestion('smart-calc', {
      templateId: 'mul-div-chain',
      random: () => 0.2,
    });
    const result = evaluatePracticeResult(question, String(question.answer + 1), 18000);
    expect(result).toMatchObject({ correct: false, reason: 'wrong' });
  });

  it('formats elapsed time for seconds and minutes', () => {
    expect(formatElapsed(9000)).toBe('9s');
    expect(formatElapsed(65000)).toBe('1:05');
  });
});
