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

function asQuestion(partial) {
  return {
    deckId: SMART_CALC_DECK.id,
    inputMode: 'integer',
    ...partial,
  };
}

function makeDesignedQuestion(templateId, variants, random) {
  return variants[Math.floor(random() * variants.length) % variants.length]();
}

function makePairSumQuestion(random) {
  const pairs = [
    [65, 35, 48],
    [37, 63, 25],
    [42, 58, 36],
    [125, 75, 16],
    [24, 76, 125],
    [83, 17, 32],
  ];
  const [left, right, factor] = pick(pairs, random);
  const expression = random() > 0.5
    ? `${left} × ${factor} + ${factor} × ${right}`
    : `${factor} × ${left} + ${right} × ${factor}`;
  const total = left + right;
  return makeFactorQuestion({
    id: `smart-calc-factor-pair-${left}-${right}-${factor}`,
    templateId: 'factor-pair',
    benchmarkMs: 18000,
    expression,
    answer: total * factor,
    factor,
    coefficientText: `${left}+${right}`,
    total,
    hintZh: `先找重复的 ${factor}，再看 ${left}+${right} 正好凑成 ${total}。`,
    hintJa: `同じ ${factor} を見つけて、${left}+${right} が ${total} になることを見よう。`,
    hintEn: `Find the repeated ${factor}, then notice ${left} + ${right} makes ${total}.`,
  });
}

function makePairDifferenceQuestion(random) {
  return makeDesignedQuestion('factor-diff', [
    () => makeFactorQuestion({
      id: 'smart-calc-factor-triple-37-22-84-94',
      templateId: 'factor-diff',
      benchmarkMs: 24000,
      expression: '37 × 22 + 84 × 37 + 37 × 94',
      answer: 37 * 200,
      factor: 37,
      coefficientText: '22+84+94',
      total: 200,
      hintZh: '三个乘法里都有 37，另外三个数 22、84、94 能凑成 200。',
      hintJa: '三つのかけ算に 37 があり、22・84・94 は合わせて 200 になります。',
      hintEn: 'All three products contain 37, and 22, 84, 94 add to 200.',
    }),
    () => makeFactorQuestion({
      id: 'smart-calc-factor-triple-23-9-16-15',
      templateId: 'factor-diff',
      benchmarkMs: 24000,
      expression: '9 × 23 + 16 × 23 − 23 × 15',
      answer: 23 * 10,
      factor: 23,
      coefficientText: '9+16−15',
      total: 10,
      hintZh: '先别急着乘，先数一数一共有几个 23。',
      hintJa: '先にかけ算せず、23 が何個分あるかをまとめよう。',
      hintEn: 'Do not multiply first. Count how many groups of 23 you have.',
    }),
    () => makeFactorQuestion({
      id: 'smart-calc-factor-triple-48-65-35',
      templateId: 'factor-diff',
      benchmarkMs: 21000,
      expression: '65 × 48 + 48 × 35',
      answer: 48 * 100,
      factor: 48,
      coefficientText: '65+35',
      total: 100,
      hintZh: '48 重复出现，65 和 35 正好凑成 100。',
      hintJa: '48 がくり返し出ていて、65 と 35 は 100 になります。',
      hintEn: '48 is repeated, and 65 + 35 makes 100.',
    }),
  ], random);
}

function makeFactorQuestion({ id, templateId, benchmarkMs, expression, answer, factor, coefficientText, total, hintZh, hintJa, hintEn }) {
  return asQuestion({
    id,
    templateId,
    benchmarkMs,
    expression,
    answer,
    strategy: {
      zh: `把共同因数 ${factor} 提出来：(${coefficientText})×${factor} = ${total}×${factor}`,
      ja: `共通する ${factor} をくくります。(${coefficientText})×${factor} = ${total}×${factor}`,
      en: `Factor out the common ${factor}: (${coefficientText}) × ${factor} = ${total} × ${factor}.`,
    },
    hint: {
      zh: hintZh,
      ja: hintJa,
      en: hintEn,
    },
  });
}

function makeRegroupQuestion(random) {
  return makeDesignedQuestion('regroup-diff', [
    () => makeRegroupVariant(276, 148, 76, 48),
    () => makeRegroupVariant(398, 76, 98, -24, '398 + 76 − 98 + 24'),
    () => makeRegroupVariant(463, 137, 198, 0, '463 + 137 − 198'),
    () => makeRegroupVariant(725, 284, 225, 84),
    () => makeRegroupVariant(512, 89, 212, -11, '512 + 89 − 212 + 11'),
  ], random);
}

function makeRegroupVariant(a, b, c, d, customExpression = null) {
  const expression = customExpression || `${a} + ${b} − ${c} − ${d}`;
  const answer = a + b - c - d;
  return asQuestion({
    id: `smart-calc-regroup-${a}-${b}-${c}-${d}`,
    templateId: 'regroup-diff',
    benchmarkMs: 21000,
    expression,
    answer,
    strategy: {
      zh: `先配能凑整或能抵消的数，再算剩下的小数。`,
      ja: `きりのよい組、または消しやすい組を先にまとめます。`,
      en: `Pair the numbers that make a round number or cancel cleanly, then finish the small calculation.`,
    },
    hint: {
      zh: '找“差一百/差两百”或“能凑整”的那两对，不要从左到右硬算。',
      ja: '100 や 200 に近い差、またはきりのよい組を探そう。左から順に計算しなくて大丈夫。',
      en: 'Look for pairs that differ by 100/200 or make a round number. Do not grind left to right.',
    },
  });
}

function makeMulDivQuestion(random) {
  return makeDesignedQuestion('mul-div-chain', [
    () => makeMulDivVariant('16 ÷ 4 × 25 × 13', 16 / 4 * 25 * 13, '16÷4=4，4×25=100'),
    () => makeMulDivVariant('125 × 24 ÷ 3 × 51', 125 * (24 / 3) * 51, '24÷3=8，125×8=1000'),
    () => makeMulDivVariant('56 ÷ 14 × 75 ÷ 3', (56 / 14) * (75 / 3), '56÷14=4，75÷3=25，4×25=100'),
    () => makeMulDivVariant('32 ÷ 8 × 25 × 17', (32 / 8) * 25 * 17, '32÷8=4，4×25=100'),
    () => makeMulDivVariant('125 × 48 ÷ 6 × 9', 125 * (48 / 6) * 9, '48÷6=8，125×8=1000'),
  ], random);
}

function makeMulDivVariant(expression, answer, visibleRoute) {
  return asQuestion({
    id: `smart-calc-mul-div-${expression.replaceAll(' ', '-')}`,
    templateId: 'mul-div-chain',
    benchmarkMs: 19000,
    expression,
    answer,
    strategy: {
      zh: `先消掉除法，再找 4×25 或 8×125 这样的整百、整千组合：${visibleRoute}`,
      ja: `先にわり算を小さくしてから、4×25 や 8×125 のような組を探します。${visibleRoute}`,
      en: `Cancel or divide first, then look for pairs like 4×25 or 8×125: ${visibleRoute}.`,
    },
    hint: {
      zh: '看到 25 就找 4，看到 125 就找 8；这个 4 或 8 常常藏在前面的除法里。',
      ja: '25 を見たら 4、125 を見たら 8 を探そう。その 4 や 8 は前のわり算に隠れていることがあります。',
      en: 'When you see 25, look for 4; when you see 125, look for 8. The 4 or 8 is often hidden in a division.',
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