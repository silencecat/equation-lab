const SMART_CALC_DECK = {
  id: 'smart-calc',
  icon: '🧠',
  name: {
    zh: '巧算练习区',
    ja: 'くふう計算トレーニング',
    en: 'Smart Calc Practice',
  },
  desc: {
    zh: '练拆分、合并、提公因数，把算式看出结构。',
    ja: '分ける・まとめる・くくる力で、式の形を見抜く練習。',
    en: 'Practice spotting structure with regrouping, pairing, and factoring.',
  },
};

export const practiceDecks = [SMART_CALC_DECK];

const ratingTiers = [
  {
    id: 'flash',
    maxFactor: 1,
    title: {
      zh: '闪电巧算',
      ja: 'ひらめき満点',
      en: 'Lightning Solve',
    },
    comment: {
      zh: '几乎一眼就看出了结构，拆分和合并都很自然。',
      ja: '式の形をすぐ見抜けています。分け方もまとめ方も自然です。',
      en: 'You spotted the structure almost immediately and regrouped cleanly.',
    },
  },
  {
    id: 'smooth',
    maxFactor: 1.6,
    title: {
      zh: '拆得很顺',
      ja: 'いい流れ',
      en: 'Smooth Strategy',
    },
    comment: {
      zh: '已经在用巧算思路了，再多练会更快。',
      ja: 'くふうして計算できています。もう少しでさらに速くなります。',
      en: 'You are already using a smart strategy. A bit more practice will make it faster.',
    },
  },
  {
    id: 'steady',
    maxFactor: 2.5,
    title: {
      zh: '稳稳做对',
      ja: 'ていねいに正解',
      en: 'Steady Work',
    },
    comment: {
      zh: '算对了，下一次可以先找能凑整或能合并的一对。',
      ja: '正しくできました。次は先に、まとまりやすい組を探してみましょう。',
      en: 'Correct. Next time, look first for a pair that makes a round or easy number.',
    },
  },
  {
    id: 'patient',
    maxFactor: Infinity,
    title: {
      zh: '继续找结构',
      ja: '形をもう一度見よう',
      en: 'Keep Looking for Structure',
    },
    comment: {
      zh: '答对了。先别急着硬算，先看哪些数能先配成整十、整百或同因数。',
      ja: '正解です。いきなり計算せず、先にきりのよい数や同じ因数を探しましょう。',
      en: 'Correct. Before grinding through it, look for round numbers or a common factor.',
    },
  },
];

function pick(list, random) {
  return list[Math.floor(random() * list.length) % list.length];
}

function randomInt(min, max, random) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function choiceExcept(list, blocked, random) {
  const picks = list.filter((item) => item !== blocked);
  return pick(picks, random);
}

function asQuestion(partial) {
  return {
    deckId: SMART_CALC_DECK.id,
    inputMode: 'integer',
    ...partial,
  };
}

function makePairSumQuestion(random) {
  const factor = pick([12, 15, 18, 23, 24, 25, 36, 37, 48], random);
  const total = pick([40, 50, 60, 80, 100], random);
  const left = randomInt(8, total - 8, random);
  const right = total - left;
  const flip = random() > 0.5;
  const expression = flip
    ? `${factor} × ${left} + ${right} × ${factor}`
    : `${left} × ${factor} + ${factor} × ${right}`;
  return asQuestion({
    id: `smart-calc-factor-pair-${factor}-${left}-${right}`,
    templateId: 'factor-pair',
    benchmarkMs: 22000,
    expression,
    answer: total * factor,
    strategy: {
      zh: `先把 ${factor} 提出来：${left}×${factor} + ${right}×${factor} = (${left}+${right})×${factor} = ${total}×${factor}`,
      ja: `まず ${factor} をくくります。(${left}+${right})×${factor} = ${total}×${factor}`,
      en: `Factor out ${factor}: (${left} + ${right}) × ${factor} = ${total} × ${factor}.`,
    },
    hint: {
      zh: '找两项里重复出现的因数。',
      ja: '二つの式で共通する因数を探そう。',
      en: 'Look for the factor repeated in both terms.',
    },
  });
}

function makePairDifferenceQuestion(random) {
  const factor = pick([14, 16, 19, 21, 23, 27], random);
  const keep = pick([6, 8, 10, 12, 15], random);
  const removed = randomInt(2, keep - 1, random);
  const addA = pick([9, 12, 15, 18], random);
  const addB = pick([7, 11, 13, 16], random);
  const expression = `${addA} × ${factor} + ${factor} × ${addB} - ${removed} × ${factor}`;
  const collapsed = addA + addB - removed;
  return asQuestion({
    id: `smart-calc-factor-diff-${factor}-${addA}-${addB}-${removed}`,
    templateId: 'factor-diff',
    benchmarkMs: 26000,
    expression,
    answer: collapsed * factor,
    strategy: {
      zh: `把 ${factor} 当作一串共同的“单位”：(${addA}+${addB}-${removed})×${factor} = ${collapsed}×${factor}`,
      ja: `${factor} を共通のまとまりとして考えます。(${addA}+${addB}-${removed})×${factor} = ${collapsed}×${factor}`,
      en: `Treat ${factor} as the common unit: (${addA} + ${addB} - ${removed}) × ${factor} = ${collapsed} × ${factor}.`,
    },
    hint: {
      zh: '不是每次都要先乘出来，也可以先把“几个 23”合在一起。',
      ja: '毎回かけ算を先にする必要はありません。「${factor} が何個か」を先にまとめましょう。',
      en: 'You do not need to multiply first. Combine how many groups of the same factor you have.',
    },
  });
}

function makeRegroupQuestion(random) {
  const baseA = pick([60, 70, 80, 90], random);
  const baseB = pick([150, 180, 200, 240], random);
  const plusA = randomInt(6, 19, random);
  const minusA = randomInt(1, plusA - 1, random);
  const plusB = randomInt(8, 29, random);
  const minusB = randomInt(1, plusB - 1, random);
  const a = baseA + plusA;
  const b = baseB + plusB;
  const c = baseA + minusA;
  const d = baseB + minusB;
  const expression = `${a} + ${b} - ${c} - ${d}`;
  const leftDiff = a - c;
  const rightDiff = b - d;
  return asQuestion({
    id: `smart-calc-regroup-${a}-${b}-${c}-${d}`,
    templateId: 'regroup-diff',
    benchmarkMs: 24000,
    expression,
    answer: leftDiff + rightDiff,
    strategy: {
      zh: `把前后能配对的数放一起：(${a}-${c}) + (${b}-${d}) = ${leftDiff} + ${rightDiff}`,
      ja: `組みにしやすい数どうしを先にまとめます。(${a}-${c}) + (${b}-${d}) = ${leftDiff} + ${rightDiff}`,
      en: `Pair the numbers that are easy to compare first: (${a} - ${c}) + (${b} - ${d}) = ${leftDiff} + ${rightDiff}.`,
    },
    hint: {
      zh: '先别按顺序算，先把接近的两对数配起来。',
      ja: '順番どおりではなく、近い数のペアを先につくろう。',
      en: 'Do not compute left to right first. Pair the close numbers.',
    },
  });
}

function makeMulDivQuestion(random) {
  const divisor = pick([2, 4, 5, 8], random);
  const quotient = pick([4, 8, 12, 16, 20], random);
  const first = divisor * quotient;
  const pack = pick([25, 125, 50], random);
  const partnerMap = {
    25: [12, 14, 16, 18],
    50: [13, 15, 17, 19],
    125: [6, 7, 8, 9],
  };
  const partner = pick(partnerMap[pack], random);
  const expression = `${first} ÷ ${divisor} × ${pack} × ${partner}`;
  return asQuestion({
    id: `smart-calc-mul-div-${first}-${divisor}-${pack}-${partner}`,
    templateId: 'mul-div-chain',
    benchmarkMs: 20000,
    expression,
    answer: quotient * pack * partner,
    strategy: {
      zh: `先把 ${first}÷${divisor} 算成 ${quotient}，再看 ${quotient} 和 ${pack} 能不能凑整。`,
      ja: `まず ${first}÷${divisor} を ${quotient} にしてから、${quotient} と ${pack} のまとまりを見ます。`,
      en: `First reduce ${first} ÷ ${divisor} to ${quotient}, then look for a clean pair with ${pack}.`,
    },
    hint: {
      zh: '先把除法变小，再找 4×25、8×125 这种整百整千组合。',
      ja: '先にわり算で小さくして、4×25 や 8×125 のような組を探そう。',
      en: 'Shrink it with division first, then look for pairs like 4×25 or 8×125.',
    },
  });
}

const smartCalcTemplates = {
  'factor-pair': makePairSumQuestion,
  'factor-diff': makePairDifferenceQuestion,
  'regroup-diff': makeRegroupQuestion,
  'mul-div-chain': makeMulDivQuestion,
};

function getDeck(deckId = SMART_CALC_DECK.id) {
  return practiceDecks.find((deck) => deck.id === deckId) || SMART_CALC_DECK;
}

export function createPracticeQuestion(deckId = SMART_CALC_DECK.id, options = {}) {
  const deck = getDeck(deckId);
  const random = options.random || Math.random;
  const forcedTemplate = options.templateId;
  const templateId = forcedTemplate || pick(Object.keys(smartCalcTemplates), random);
  const factory = smartCalcTemplates[templateId] || makePairSumQuestion;
  return {
    deck,
    ...factory(random),
  };
}

export function normalizeAnswerText(value) {
  if (value == null) return '';
  return String(value)
    .trim()
    .replace(/[，,\s]/g, '')
    .replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 65248))
    .replace(/[－−]/g, '-')
    .replace(/[＋]/g, '+');
}

export function parsePracticeAnswer(value) {
  const text = normalizeAnswerText(value);
  if (!text) return { ok: false, reason: 'empty' };
  if (!/^[+-]?\d+$/.test(text)) return { ok: false, reason: 'invalid' };
  return { ok: true, value: Number(text) };
}

export function evaluatePracticeResult(question, answerText, elapsedMs) {
  const parsed = parsePracticeAnswer(answerText);
  if (!parsed.ok) {
    return {
      correct: false,
      reason: parsed.reason,
    };
  }
  if (parsed.value !== question.answer) {
    return {
      correct: false,
      reason: 'wrong',
      submitted: parsed.value,
    };
  }

  const benchmarkMs = question.benchmarkMs || 24000;
  const tier = ratingTiers.find((item) => elapsedMs <= benchmarkMs * item.maxFactor) || ratingTiers[ratingTiers.length - 1];
  return {
    correct: true,
    submitted: parsed.value,
    elapsedMs,
    tier: tier.id,
    title: tier.title,
    comment: tier.comment,
  };
}

export function formatElapsed(elapsedMs) {
  const safeMs = Math.max(0, elapsedMs || 0);
  const totalSeconds = Math.round(safeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes > 0 ? `${minutes}:${String(seconds).padStart(2, '0')}` : `${seconds}s`;
}