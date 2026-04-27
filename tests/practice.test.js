import { describe, it, expect } from 'vitest';
import {
  practiceDecks,
  createPracticeQuestion,
  parsePracticeAnswer,
  evaluatePracticeResult,
  formatElapsed,
} from '../src/js/practice.js';

describe('practice deck', () => {
  it('exports the smart-calc deck', () => {
    expect(practiceDecks).toHaveLength(1);
    expect(practiceDecks[0].id).toBe('smart-calc');
  });

  it('creates a valid question for each template', () => {
    const templateIds = ['factor-pair', 'factor-diff', 'regroup-diff', 'mul-div-chain'];
    templateIds.forEach((templateId) => {
      const question = createPracticeQuestion('smart-calc', {
        templateId,
        random: () => 0.2,
      });
      expect(question.deck.id).toBe('smart-calc');
      expect(question.expression).toBeTruthy();
      expect(Number.isInteger(question.answer)).toBe(true);
      expect(question.strategy.zh).toBeTruthy();
      expect(question.strategy.ja).toBeTruthy();
      expect(question.strategy.en).toBeTruthy();
      expect(question.hint.zh).toBeTruthy();
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