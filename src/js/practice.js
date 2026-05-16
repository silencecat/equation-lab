const SMART_CALC_DECK = {
  id: 'smart-calc',
  icon: '🧠',
  name: {
    zh: '巧算综合',
    ja: 'くふう計算ミックス',
    en: 'Smart Calc Mix',
  },
  desc: {
    zh: '练拆分、合并、提公因数，把算式看出结构。',
    ja: '分ける・まとめる・くくる力で、式の形を見抜く練習。',
    en: 'Practice spotting structure with regrouping, pairing, and factoring.',
  },
};

const ROUNDING_DECK = {
  id: 'rounding-sum',
  icon: '🎯',
  name: {
    zh: '凑整加减',
    ja: 'きりよく加減',
    en: 'Round-Number Add/Subtract',
  },
  desc: {
    zh: '先找能凑整、能抵消的数对，再做小计算。',
    ja: 'きりのよい組や消しやすい組を先に見つけます。',
    en: 'Find pairs that make round numbers or cancel before calculating.',
  },
};

const INVERSE_MISSING_DECK = {
  id: 'inverse-missing',
  icon: '🔎',
  name: {
    zh: '缺数逆算',
    ja: '逆算の穴うめ',
    en: 'Missing Number Inverses',
  },
  desc: {
    zh: '从结果倒着想，练加减乘除的逆运算。',
    ja: '答えから逆に考えて、たし算・ひき算・かけ算・わり算の逆算を練習します。',
    en: 'Work backward from the result using inverse operations.',
  },
};

const ORDER_OPS_DECK = {
  id: 'order-ops',
  icon: '🧮',
  name: {
    zh: '运算顺序',
    ja: '計算の順序',
    en: 'Order of Operations',
  },
  desc: {
    zh: '分清先乘除、后加减，以及括号先算。',
    ja: 'かっこ、かけ算・わり算、たし算・ひき算の順番を練習します。',
    en: 'Practice parentheses first, then multiplication/division before addition/subtraction.',
  },
};

const MULTIPLICATIVE_STRUCTURE_DECK = {
  id: 'multiplicative-structure',
  icon: '🧱',
  name: {
    zh: '乘法结构感',
    ja: 'かけ算の構造',
    en: 'Multiplicative Structure',
  },
  desc: {
    zh: '练乘法拆法、倍数节奏和“几份同一个数”。',
    ja: 'かけ算の分解、倍数のリズム、同じものが何個分あるかを練習します。',
    en: 'Practice factor pairs, multiple rhythms, and groups of the same unit.',
  },
};

const FACTOR_DECK = {
  id: 'factor-sense',
  icon: '🧩',
  name: {
    zh: '因数观察',
    ja: '共通因数さがし',
    en: 'Factor Spotting',
  },
  desc: {
    zh: '把重复出现的乘数看成“几份”，再合并。',
    ja: '同じ数が何個分あるかを見て、まとめます。',
    en: 'See repeated factors as groups, then combine them.',
  },
};

const UNIT_CONVERSION_DECK = {
  id: 'unit-conversion',
  icon: '📏',
  name: {
    zh: '单位换算',
    ja: '単位換算',
    en: 'Unit Conversion',
  },
  desc: {
    zh: '练长度、时间、钱和质量的常见整数换算。',
    ja: '長さ・時間・お金・重さのよくある整数換算を練習します。',
    en: 'Practice common whole-number conversions for length, time, money, and mass.',
  },
};

const AVERAGE_TOTAL_DECK = {
  id: 'average-total',
  icon: '📊',
  name: {
    zh: '平均与总量',
    ja: '平均と合計',
    en: 'Average & Total',
  },
  desc: {
    zh: '把“平均每份”“一共有多少”这类关系算清楚。',
    ja: '平均・一つ分・合計の関係を整理して計算します。',
    en: 'Connect average per group, number of groups, and total amount.',
  },
};

const FACTOR_MULTIPLE_DECK = {
  id: 'factor-multiple',
  icon: '🔢',
  name: {
    zh: '公因数公倍数',
    ja: '公約数・公倍数',
    en: 'Common Factors & Multiples',
  },
  desc: {
    zh: '练因数、倍数、最大公因数和最小公倍数。',
    ja: '約数・倍数・最大公約数・最小公倍数を練習します。',
    en: 'Practice factors, multiples, GCF, and LCM.',
  },
};

const MUL_DIV_DECK = {
  id: 'mul-div-pair',
  icon: '⚙️',
  name: {
    zh: '乘除配对',
    ja: 'かけ算わり算ペア',
    en: 'Multiply/Divide Pairing',
  },
  desc: {
    zh: '先把除法变小，再找 4×25、8×125 这样的组合。',
    ja: 'わり算を先に小さくして、4×25 や 8×125 を探します。',
    en: 'Reduce divisions first, then look for pairs like 4×25 or 8×125.',
  },
};

export const practiceDecks = [
  SMART_CALC_DECK,
  INVERSE_MISSING_DECK,
  ORDER_OPS_DECK,
  MULTIPLICATIVE_STRUCTURE_DECK,
  ROUNDING_DECK,
  FACTOR_DECK,
  FACTOR_MULTIPLE_DECK,
  MUL_DIV_DECK,
  UNIT_CONVERSION_DECK,
  AVERAGE_TOTAL_DECK,
];

const ratingTiers = [
  {
    id: 'flash',
    maxFactor: 1,
    title: {
      zh: '一眼看出结构',
      ja: 'ひらめき満点',
      en: 'Lightning Solve',
    },
    comment: {
      zh: '几乎一眼就看出了关键关系，计算路线很清楚。',
      ja: '大事な関係をすぐ見抜けています。計算の道すじもはっきりしています。',
      en: 'You spotted the key relationship almost immediately and chose a clear route.',
    },
  },
  {
    id: 'smooth',
    maxFactor: 1.6,
    title: {
      zh: '路线很顺',
      ja: 'いい流れ',
      en: 'Smooth Strategy',
    },
    comment: {
      zh: '已经在用结构思路了，再多练会更快。',
      ja: '構造を見て計算できています。もう少しでさらに速くなります。',
      en: 'You are already using the structure of the numbers. A bit more practice will make it faster.',
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
      zh: '算对了，下一次可以先找关键关系，再开始计算。',
      ja: '正しくできました。次は先に大事な関係を探してから計算してみましょう。',
      en: 'Correct. Next time, look for the key relationship before calculating.',
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
      zh: '答对了。先别急着硬算，先看数之间有没有因数、倍数、凑整或抵消关系。',
      ja: '正解です。いきなり計算せず、約数・倍数・きりのよい組・消しやすい組を先に探しましょう。',
      en: 'Correct. Before grinding through it, look for factors, multiples, round numbers, or clean cancellations.',
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
    points: 10,
    ...partial,
  };
}

function gcdInt(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const next = x % y;
    x = y;
    y = next;
  }
  return x;
}

function lcmInt(a, b) {
  return Math.abs(a * b) / gcdInt(a, b);
}

function divisorsOf(n) {
  const list = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) list.push(i);
  }
  return list;
}

function commonDivisorsOf(a, b) {
  const bSet = new Set(divisorsOf(b));
  return divisorsOf(a).filter((value) => bSet.has(value));
}

function factorPairsOf(n) {
  const pairs = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) pairs.push([i, n / i]);
  }
  return pairs;
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

function makeInverseMissingPractice(random) {
  return makeDesignedQuestion('inverse-missing', [
    () => makeInverseMissingQuestion({
      id: 'inverse-missing-add-37-100',
      expression: {
        zh: '□ + 37 = 100，□ 是几？',
        ja: '□ + 37 = 100。□ はいくつ？',
        en: '□ + 37 = 100. What is □?',
      },
      answer: 63,
      points: 8,
      routeZh: '想 100−37=63。',
      routeJa: '100−37=63 と逆に考えます。',
      routeEn: 'Think backward: 100 − 37 = 63.',
    }),
    () => makeInverseMissingQuestion({
      id: 'inverse-missing-sub-right-96-28',
      expression: {
        zh: '96 − □ = 28，□ 是几？',
        ja: '96 − □ = 28。□ はいくつ？',
        en: '96 − □ = 28. What is □?',
      },
      answer: 68,
      points: 10,
      routeZh: '被拿走的数 = 原来 96 − 剩下 28，所以是 68。',
      routeJa: '取った数は、もとの 96 から残りの 28 をひくので 68 です。',
      routeEn: 'The missing subtracted amount is 96 − 28 = 68.',
    }),
    () => makeInverseMissingQuestion({
      id: 'inverse-missing-sub-left-45-28',
      expression: {
        zh: '□ − 45 = 28，□ 是几？',
        ja: '□ − 45 = 28。□ はいくつ？',
        en: '□ − 45 = 28. What is □?',
      },
      answer: 73,
      points: 10,
      routeZh: '原来的数 = 剩下 28 + 拿走 45，所以是 73。',
      routeJa: 'もとの数は、残り 28 と取った 45 を足して 73 です。',
      routeEn: 'The starting number is 28 + 45 = 73.',
    }),
    () => makeInverseMissingQuestion({
      id: 'inverse-missing-mul-8-72',
      expression: {
        zh: '□ × 8 = 72，□ 是几？',
        ja: '□ × 8 = 72。□ はいくつ？',
        en: '□ × 8 = 72. What is □?',
      },
      answer: 9,
      points: 8,
      routeZh: '想 72÷8=9。',
      routeJa: '72÷8=9 と逆に考えます。',
      routeEn: 'Think backward: 72 ÷ 8 = 9.',
    }),
    () => makeInverseMissingQuestion({
      id: 'inverse-missing-div-right-84-7',
      expression: {
        zh: '84 ÷ □ = 7，□ 是几？',
        ja: '84 ÷ □ = 7。□ はいくつ？',
        en: '84 ÷ □ = 7. What is □?',
      },
      answer: 12,
      points: 12,
      routeZh: '想 7 组平均分完 84，每组是 12；也就是 84÷7=12。',
      routeJa: '84 を 7 こずつに分けると 12 組なので、84÷7=12 です。',
      routeEn: 'If 84 divided by the missing number gives 7 groups, the missing number is 84 ÷ 7 = 12.',
    }),
    () => makeInverseMissingQuestion({
      id: 'inverse-missing-div-left-6-9',
      expression: {
        zh: '□ ÷ 6 = 9，□ 是几？',
        ja: '□ ÷ 6 = 9。□ はいくつ？',
        en: '□ ÷ 6 = 9. What is □?',
      },
      answer: 54,
      points: 10,
      routeZh: '原来的总数 = 每份 6 × 9 份，所以是 54。',
      routeJa: 'もとの数は 6 が 9 つ分なので、6×9=54 です。',
      routeEn: 'The original total is 6 × 9 = 54.',
    }),
  ], random);
}

function makeInverseMissingQuestion({ id, expression, answer, points, routeZh, routeJa, routeEn }) {
  return asQuestion({
    id,
    templateId: 'inverse-missing',
    benchmarkMs: 18000,
    points,
    expression,
    answer,
    strategy: {
      zh: `不要乱试，从等式结果倒着走：${routeZh}`,
      ja: `当てずっぽうではなく、式の答えから逆にたどります。${routeJa}`,
      en: `Do not guess. Walk backward from the result: ${routeEn}`,
    },
    hint: {
      zh: '缺的是加数就用减法，缺的是乘数就用除法；减法和除法要先看缺的是哪一边。',
      ja: 'たし算の穴はひき算、かけ算の穴はわり算で考えます。ひき算・わり算は、穴の位置を先に見ましょう。',
      en: 'Use subtraction for a missing addend and division for a missing factor. For subtraction and division, first check where the blank is.',
    },
  });
}

function makeRoundSumQuestion(random) {
  return makeDesignedQuestion('round-sum', [
    () => makeRoundSumVariant({
      id: 'round-sum-198-47-2-53',
      expression: '198 + 47 + 2 + 53',
      answer: 300,
      routeZh: '198+2=200，47+53=100，所以一共 300。',
      routeJa: '198+2=200、47+53=100、合わせて 300 です。',
      routeEn: '198+2=200 and 47+53=100, so the total is 300.',
    }),
    () => makeRoundSumVariant({
      id: 'round-sum-125-68-75-32',
      expression: '125 + 68 + 75 + 32',
      answer: 300,
      routeZh: '125+75=200，68+32=100，所以一共 300。',
      routeJa: '125+75=200、68+32=100、合わせて 300 です。',
      routeEn: '125+75=200 and 68+32=100, so the total is 300.',
    }),
    () => makeRoundSumVariant({
      id: 'round-sum-399-85-1-15',
      expression: '399 + 85 + 1 + 15',
      answer: 500,
      routeZh: '399+1=400，85+15=100，所以一共 500。',
      routeJa: '399+1=400、85+15=100、合わせて 500 です。',
      routeEn: '399+1=400 and 85+15=100, so the total is 500.',
    }),
    () => makeRoundSumVariant({
      id: 'round-sum-246-154-37-63',
      expression: '246 + 154 + 37 + 63',
      answer: 500,
      routeZh: '246+154=400，37+63=100，所以一共 500。',
      routeJa: '246+154=400、37+63=100、合わせて 500 です。',
      routeEn: '246+154=400 and 37+63=100, so the total is 500.',
    }),
    () => makeRoundSumVariant({
      id: 'round-sum-720-198-80-2',
      expression: '720 − 198 + 80 − 2',
      answer: 600,
      routeZh: '720+80=800，198+2=200，所以 800−200=600。',
      routeJa: '720+80=800、198+2=200、つまり 800−200=600 です。',
      routeEn: '720+80=800 and 198+2=200, so 800−200=600.',
    }),
  ], random);
}

function makeRoundSumVariant({ id, expression, answer, routeZh, routeJa, routeEn }) {
  return asQuestion({
    id,
    templateId: 'round-sum',
    benchmarkMs: 16000,
    expression,
    answer,
    strategy: {
      zh: `先凑整再计算：${routeZh}`,
      ja: `きりよくまとめてから計算します。${routeJa}`,
      en: `Make round numbers first: ${routeEn}`,
    },
    hint: {
      zh: '先找能凑成整百、整十，或者能一起抵消的数对。',
      ja: '100 や 10 になりやすい組、または消しやすい組を先に探そう。',
      en: 'First look for pairs that make hundreds, tens, or cancel cleanly.',
    },
  });
}

function makeOrderOpsPractice(random) {
  return makeDesignedQuestion('order-ops', [
    () => makeOrderOpsQuestion({
      id: 'order-ops-3-plus-4-times-5',
      expression: '3 + 4 × 5',
      answer: 23,
      points: 8,
      routeZh: '先算 4×5=20，再加 3，得到 23。',
      routeJa: '先に 4×5=20 を計算して、3 を足すと 23 です。',
      routeEn: 'Compute 4×5=20 first, then add 3 to get 23.',
    }),
    () => makeOrderOpsQuestion({
      id: 'order-ops-parentheses-3-plus-4-times-5',
      expression: '(3 + 4) × 5',
      answer: 35,
      points: 8,
      routeZh: '括号先算，3+4=7，再算 7×5=35。',
      routeJa: 'かっこを先に計算して、3+4=7、7×5=35 です。',
      routeEn: 'Parentheses first: 3+4=7, then 7×5=35.',
    }),
    () => makeOrderOpsQuestion({
      id: 'order-ops-72-div-parentheses-3-times-4',
      expression: '72 ÷ (3 × 4)',
      answer: 6,
      points: 10,
      routeZh: '括号先算，3×4=12，再算 72÷12=6。',
      routeJa: 'かっこを先に計算して、3×4=12、72÷12=6 です。',
      routeEn: 'Parentheses first: 3×4=12, then 72÷12=6.',
    }),
    () => makeOrderOpsQuestion({
      id: 'order-ops-48-minus-6-times-5',
      expression: '48 − 6 × 5',
      answer: 18,
      points: 10,
      routeZh: '先算乘法 6×5=30，再算 48−30=18。',
      routeJa: '先にかけ算 6×5=30、次に 48−30=18 です。',
      routeEn: 'Multiplication first: 6×5=30, then 48−30=18.',
    }),
    () => makeOrderOpsQuestion({
      id: 'order-ops-parentheses-48-minus-6-times-5',
      expression: '(48 − 6) × 5',
      answer: 210,
      points: 12,
      routeZh: '括号先算，48−6=42，再算 42×5=210。',
      routeJa: 'かっこを先に計算して、48−6=42、42×5=210 です。',
      routeEn: 'Parentheses first: 48−6=42, then 42×5=210.',
    }),
    () => makeOrderOpsQuestion({
      id: 'order-ops-64-div-8-plus-7-times-3',
      expression: '64 ÷ 8 + 7 × 3',
      answer: 29,
      points: 12,
      routeZh: '先算 64÷8=8 和 7×3=21，再算 8+21=29。',
      routeJa: '64÷8=8 と 7×3=21 を先に計算して、8+21=29 です。',
      routeEn: 'Do 64÷8=8 and 7×3=21 first, then 8+21=29.',
    }),
  ], random);
}

function makeOrderOpsQuestion({ id, expression, answer, points, routeZh, routeJa, routeEn }) {
  return asQuestion({
    id,
    templateId: 'order-ops',
    benchmarkMs: 18000,
    points,
    expression,
    answer,
    strategy: {
      zh: `先看运算顺序：${routeZh}`,
      ja: `計算の順番を先に見ます。${routeJa}`,
      en: `Check the order first: ${routeEn}`,
    },
    hint: {
      zh: '先算括号；没有括号时，乘除先于加减。同级运算再从左到右。',
      ja: 'かっこが最初。かっこがなければ、かけ算・わり算をたし算・ひき算より先にします。',
      en: 'Parentheses first. Without parentheses, multiplication/division come before addition/subtraction.',
    },
  });
}

function makeFactorPartnerPractice(random) {
  return makeDesignedQuestion('factor-partner', [
    () => makeFactorPartnerQuestion({ total: 24, known: 4, missingSide: 'right' }),
    () => makeFactorPartnerQuestion({ total: 36, known: 9, missingSide: 'left' }),
    () => makeFactorPartnerQuestion({ total: 42, known: 7, missingSide: 'right' }),
    () => makeFactorPartnerQuestion({ total: 56, known: 8, missingSide: 'left' }),
    () => makeFactorPartnerQuestion({ total: 72, known: 9, missingSide: 'right' }),
    () => makeFactorPartnerQuestion({ total: 48, known: 6, missingSide: 'left' }),
  ], random);
}

function makeFactorPartnerQuestion({ total, known, missingSide }) {
  const answer = total / known;
  const zhExpression = missingSide === 'left'
    ? `${total} = □ × ${known}，□ 是几？`
    : `${total} = ${known} × □，□ 是几？`;
  const jaExpression = missingSide === 'left'
    ? `${total} = □ × ${known}。□ はいくつ？`
    : `${total} = ${known} × □。□ はいくつ？`;
  const enExpression = missingSide === 'left'
    ? `${total} = □ × ${known}. What is □?`
    : `${total} = ${known} × □. What is □?`;

  return asQuestion({
    id: `factor-partner-${total}-${known}-${missingSide}`,
    templateId: 'factor-partner',
    benchmarkMs: 14000,
    points: 8,
    expression: {
      zh: zhExpression,
      ja: jaExpression,
      en: enExpression,
    },
    answer,
    strategy: {
      zh: `把 ${total} 看成乘法结构：${known}×${answer}=${total}，所以缺的是 ${answer}。`,
      ja: `${total} をかけ算の形で見ると、${known}×${answer}=${total} なので、答えは ${answer} です。`,
      en: `See ${total} as a multiplication structure: ${known}×${answer}=${total}, so the missing number is ${answer}.`,
    },
    hint: {
      zh: `先想：${known} 的几倍是 ${total}？不要只把 ${total} 当成一个孤立的数。`,
      ja: `まず「${known} の何倍が ${total} か」を考えよう。${total} を一つの数としてだけ見ないこと。`,
      en: `Ask first: what times ${known} makes ${total}? Do not treat ${total} as an isolated number.`,
    },
  });
}

function makeFactorPairCountPractice(random) {
  return makeDesignedQuestion('factor-pair-count', [
    () => makeFactorPairCountQuestion(24),
    () => makeFactorPairCountQuestion(36),
    () => makeFactorPairCountQuestion(48),
    () => makeFactorPairCountQuestion(60),
    () => makeFactorPairCountQuestion(72),
    () => makeFactorPairCountQuestion(16),
  ], random);
}

function makeFactorPairCountQuestion(n) {
  const pairs = factorPairsOf(n);
  const pairText = pairs.map(([a, b]) => `${a}×${b}`).join('、');
  const pairTextEn = pairs.map(([a, b]) => `${a}×${b}`).join(', ');
  return asQuestion({
    id: `factor-pair-count-${n}`,
    templateId: 'factor-pair-count',
    benchmarkMs: 22000,
    points: 12,
    expression: {
      zh: `${n} 可以写成几组不同的乘法搭档？`,
      ja: `${n} は、何組のかけ算ペアで表せる？`,
      en: `How many different factor pairs can make ${n}?`,
    },
    answer: pairs.length,
    strategy: {
      zh: `${n} 的乘法搭档是：${pairText}，一共有 ${pairs.length} 组。`,
      ja: `${n} のかけ算ペアは ${pairText} で、全部で ${pairs.length} 組です。`,
      en: `The factor pairs of ${n} are ${pairTextEn}, so there are ${pairs.length} pairs.`,
    },
    hint: {
      zh: '按 1×自己、2×一半……这样一组一组找，反过来的顺序不重复算。',
      ja: '1×自分、2×半分……のようにペアで探そう。反対向きは重ねて数えません。',
      en: 'Look for pairs like 1×itself, 2×half, and so on. Do not count the reversed order twice.',
    },
  });
}

function makeMultipleStepPractice(random) {
  return makeDesignedQuestion('multiple-step', [
    () => makeMultipleStepQuestion(6, 7),
    () => makeMultipleStepQuestion(8, 6),
    () => makeMultipleStepQuestion(9, 5),
    () => makeMultipleStepQuestion(12, 4),
    () => makeMultipleStepQuestion(7, 8),
    () => makeMultipleStepQuestion(15, 6),
  ], random);
}

function makeMultipleStepQuestion(step, count) {
  const answer = step * count;
  const sequence = Array.from({ length: count }, (_, i) => step * (i + 1));
  return asQuestion({
    id: `multiple-step-${step}-${count}`,
    templateId: 'multiple-step',
    benchmarkMs: 16000,
    points: 8,
    expression: {
      zh: `从 0 开始每次跳 ${step}，第 ${count} 次落在哪？`,
      ja: `0 から ${step} ずつ進むと、${count} 回目はどこ？`,
      en: `Starting at 0 and jumping by ${step}, where do you land on the ${count}th jump?`,
    },
    answer,
    strategy: {
      zh: `每次跳 ${step}，第 ${count} 次就是 ${step}×${count}=${answer}。路线：${sequence.join('、')}。`,
      ja: `${step} ずつ ${count} 回進むので、${step}×${count}=${answer} です。道すじ：${sequence.join('、')}。`,
      en: `Jumping by ${step} for ${count} jumps gives ${step}×${count}=${answer}. Path: ${sequence.join(', ')}.`,
    },
    hint: {
      zh: '倍数就是固定步长一直跳；第几次跳到哪里，就是“步长 × 次数”。',
      ja: '倍数は同じ幅で進むリズムです。何回目かは「幅×回数」で考えます。',
      en: 'Multiples are a fixed jump rhythm. The landing point is jump size × number of jumps.',
    },
  });
}

function makeFirstCommonMultiplePractice(random) {
  return makeDesignedQuestion('first-common-multiple', [
    () => makeFirstCommonMultipleQuestion(6, 8),
    () => makeFirstCommonMultipleQuestion(4, 10),
    () => makeFirstCommonMultipleQuestion(9, 12),
    () => makeFirstCommonMultipleQuestion(6, 14),
    () => makeFirstCommonMultipleQuestion(8, 12),
    () => makeFirstCommonMultipleQuestion(5, 9),
  ], random);
}

function makeFirstCommonMultipleQuestion(a, b) {
  const answer = lcmInt(a, b);
  const aMultiples = Array.from({ length: answer / a }, (_, i) => a * (i + 1));
  const bMultiples = Array.from({ length: answer / b }, (_, i) => b * (i + 1));
  return asQuestion({
    id: `first-common-multiple-${a}-${b}`,
    templateId: 'first-common-multiple',
    benchmarkMs: 24000,
    points: 14,
    expression: {
      zh: `${a} 和 ${b} 从 0 开始跳格，第一次一起落在哪个数？`,
      ja: `${a} と ${b} が 0 から進むと、初めて同じ場所に着く数は？`,
      en: `${a} and ${b} start jumping from 0. What is their first shared landing number?`,
    },
    answer,
    strategy: {
      zh: `${a} 的节奏：${aMultiples.join('、')}；${b} 的节奏：${bMultiples.join('、')}。第一次相遇是 ${answer}。`,
      ja: `${a} のリズム：${aMultiples.join('、')}。${b} のリズム：${bMultiples.join('、')}。初めて出会うのは ${answer} です。`,
      en: `${a}'s rhythm: ${aMultiples.join(', ')}. ${b}'s rhythm: ${bMultiples.join(', ')}. The first meeting point is ${answer}.`,
    },
    hint: {
      zh: '先各自按倍数往前跳，找第一次两个节奏同时落到的地方。',
      ja: 'それぞれ倍数で進み、二つのリズムが初めて同じ場所に来るところを探そう。',
      en: 'List each jump rhythm and find the first number where both rhythms land.',
    },
  });
}

function makeSameUnitMergePractice(random) {
  return makeDesignedQuestion('same-unit-merge', [
    () => makeSameUnitMergeQuestion({
      factor: 37,
      expression: '37 × 22 + 37 × 78',
      partsText: '22+78',
      answer: 100,
      points: 12,
    }),
    () => makeSameUnitMergeQuestion({
      factor: 24,
      expression: '24 × 13 + 24 × 7',
      partsText: '13+7',
      answer: 20,
      points: 10,
    }),
    () => makeSameUnitMergeQuestion({
      factor: 15,
      expression: '15 × 18 + 15 × 22',
      partsText: '18+22',
      answer: 40,
      points: 10,
    }),
    () => makeSameUnitMergeQuestion({
      factor: 8,
      expression: '8 × 125 + 8 × 75',
      partsText: '125+75',
      answer: 200,
      points: 12,
    }),
    () => makeSameUnitMergeQuestion({
      factor: 23,
      expression: '23 × 9 + 23 × 16 − 23 × 15',
      partsText: '9+16−15',
      answer: 10,
      points: 14,
    }),
  ], random);
}

function makeSameUnitMergeQuestion({ factor, expression, partsText, answer, points }) {
  return asQuestion({
    id: `same-unit-merge-${factor}-${partsText.replace(/[+−]/g, '-')}`,
    templateId: 'same-unit-merge',
    benchmarkMs: 24000,
    points,
    expression: {
      zh: `${expression} 里，一共有几份 ${factor}？`,
      ja: `${expression} には、${factor} が何個分ありますか？`,
      en: `In ${expression}, how many groups of ${factor} are there?`,
    },
    answer,
    strategy: {
      zh: `先数“几份 ${factor}”，不要先算乘积：${partsText}=${answer}，所以一共有 ${answer} 份 ${factor}。`,
      ja: `先に積を計算せず、「${factor} が何個分か」を数えます。${partsText}=${answer} なので、${answer} 個分です。`,
      en: `Do not multiply first. Count the groups of ${factor}: ${partsText}=${answer}, so there are ${answer} groups of ${factor}.`,
    },
    hint: {
      zh: `把每个乘法都读成“几份 ${factor}”，再把份数合并。`,
      ja: `それぞれのかけ算を「${factor} が何個分」と読んでから、個数をまとめよう。`,
      en: `Read each product as groups of ${factor}, then combine the group counts.`,
    },
  });
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

function makeUnitConversionPractice(random) {
  return makeDesignedQuestion('unit-conversion', [
    () => makeUnitConversionQuestion({
      id: 'unit-conversion-3m-45cm',
      expression: {
        zh: '3 米 45 厘米 = 多少厘米？',
        ja: '3 m 45 cm は何 cm？',
        en: '3 m 45 cm equals how many cm?',
      },
      answer: 345,
      points: 8,
      routeZh: '3 米 = 300 厘米，300+45=345。',
      routeJa: '3 m = 300 cm、300+45=345 です。',
      routeEn: '3 m = 300 cm, and 300+45=345.',
    }),
    () => makeUnitConversionQuestion({
      id: 'unit-conversion-2h-15min',
      expression: {
        zh: '2 小时 15 分 = 多少分？',
        ja: '2 時間 15 分は何分？',
        en: '2 hours 15 minutes equals how many minutes?',
      },
      answer: 135,
      points: 8,
      routeZh: '2 小时 = 120 分，120+15=135。',
      routeJa: '2 時間 = 120 分、120+15=135 です。',
      routeEn: '2 hours = 120 minutes, and 120+15=135.',
    }),
    () => makeUnitConversionQuestion({
      id: 'unit-conversion-1yuan-5jiao',
      expression: {
        zh: '1 元 5 角 = 多少角？',
        ja: '1 元 5 角は何角？',
        en: '1 yuan 5 jiao equals how many jiao?',
      },
      answer: 15,
      points: 8,
      routeZh: '1 元 = 10 角，10+5=15。',
      routeJa: '1 元 = 10 角、10+5=15 です。',
      routeEn: '1 yuan = 10 jiao, and 10+5=15.',
    }),
    () => makeUnitConversionQuestion({
      id: 'unit-conversion-4kg-250g',
      expression: {
        zh: '4 千克 250 克 = 多少克？',
        ja: '4 kg 250 g は何 g？',
        en: '4 kg 250 g equals how many g?',
      },
      answer: 4250,
      points: 10,
      routeZh: '4 千克 = 4000 克，4000+250=4250。',
      routeJa: '4 kg = 4000 g、4000+250=4250 です。',
      routeEn: '4 kg = 4000 g, and 4000+250=4250.',
    }),
    () => makeUnitConversionQuestion({
      id: 'unit-conversion-360s',
      expression: {
        zh: '360 秒 = 多少分？',
        ja: '360 秒は何分？',
        en: '360 seconds equals how many minutes?',
      },
      answer: 6,
      points: 8,
      routeZh: '60 秒 = 1 分，360÷60=6。',
      routeJa: '60 秒 = 1 分、360÷60=6 です。',
      routeEn: '60 seconds = 1 minute, and 360÷60=6.',
    }),
    () => makeUnitConversionQuestion({
      id: 'unit-conversion-3km-200m',
      expression: {
        zh: '3 千米 200 米 = 多少米？',
        ja: '3 km 200 m は何 m？',
        en: '3 km 200 m equals how many m?',
      },
      answer: 3200,
      points: 10,
      routeZh: '3 千米 = 3000 米，3000+200=3200。',
      routeJa: '3 km = 3000 m、3000+200=3200 です。',
      routeEn: '3 km = 3000 m, and 3000+200=3200.',
    }),
  ], random);
}

function makeUnitConversionQuestion({ id, expression, answer, points, routeZh, routeJa, routeEn }) {
  return asQuestion({
    id,
    templateId: 'unit-conversion',
    benchmarkMs: 20000,
    points,
    expression,
    answer,
    strategy: {
      zh: `先把大单位换成小单位，再相加或相除：${routeZh}`,
      ja: `大きい単位を小さい単位に直してから計算します。${routeJa}`,
      en: `Convert the larger unit first, then add or divide: ${routeEn}`,
    },
    hint: {
      zh: '先想清楚 1 个大单位等于多少小单位，再处理剩下的零头。',
      ja: 'まず 1 つの大きい単位が小さい単位でいくつかを思い出し、残りを合わせます。',
      en: 'First recall how many small units make one large unit, then handle the leftover part.',
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

function makeAverageTotalPractice(random) {
  return makeDesignedQuestion('average-total', [
    () => makeAverageTotalQuestion({
      id: 'average-total-5-boxes-40',
      expression: {
        zh: '5 盒彩笔一共 40 支，平均每盒多少支？',
        ja: '5 箱で全部 40 本。1 箱平均何本？',
        en: '5 boxes have 40 pencils in total. How many per box on average?',
      },
      answer: 8,
      points: 8,
      routeZh: '总量 40 ÷ 份数 5 = 每份 8。',
      routeJa: '合計 40 ÷ 個数 5 = 1 つ分 8 です。',
      routeEn: 'Total 40 ÷ 5 groups = 8 per group.',
    }),
    () => makeAverageTotalQuestion({
      id: 'average-total-6-per-4-people',
      expression: {
        zh: '平均每人 6 个，4 人一共有多少个？',
        ja: '1 人平均 6 個、4 人では全部で何個？',
        en: 'Each person has 6 on average. How many do 4 people have in total?',
      },
      answer: 24,
      points: 8,
      routeZh: '每份 6 × 份数 4 = 总量 24。',
      routeJa: '1 つ分 6 × 個数 4 = 合計 24 です。',
      routeEn: '6 per group × 4 groups = 24 total.',
    }),
    () => makeAverageTotalQuestion({
      id: 'average-total-3-games-avg-12',
      expression: {
        zh: '3 次得分平均 12 分，总分是多少？',
        ja: '3 回の平均が 12 点。合計は何点？',
        en: 'The average score of 3 games is 12. What is the total score?',
      },
      answer: 36,
      points: 10,
      routeZh: '平均 12 × 次数 3 = 总分 36。',
      routeJa: '平均 12 × 回数 3 = 合計 36 です。',
      routeEn: 'Average 12 × 3 games = 36 total.',
    }),
    () => makeAverageTotalQuestion({
      id: 'average-total-84-pages-4-days',
      expression: {
        zh: '4 天共读 84 页，平均每天读多少页？',
        ja: '4 日で 84 ページ読んだ。1 日平均何ページ？',
        en: '84 pages were read over 4 days. How many pages per day on average?',
      },
      answer: 21,
      points: 10,
      routeZh: '总页数 84 ÷ 天数 4 = 每天 21 页。',
      routeJa: '合計 84 ÷ 日数 4 = 1 日 21 ページです。',
      routeEn: 'Total 84 ÷ 4 days = 21 pages per day.',
    }),
    () => makeAverageTotalQuestion({
      id: 'average-total-avg-15-count-5',
      expression: {
        zh: '5 个数的平均数是 15，它们的总和是多少？',
        ja: '5 個の数の平均が 15。合計はいくつ？',
        en: 'The average of 5 numbers is 15. What is their total?',
      },
      answer: 75,
      points: 10,
      routeZh: '平均数 15 × 个数 5 = 总和 75。',
      routeJa: '平均 15 × 個数 5 = 合計 75 です。',
      routeEn: 'Average 15 × 5 numbers = 75 total.',
    }),
    () => makeAverageTotalQuestion({
      id: 'average-total-72-split-8',
      expression: {
        zh: '72 个苹果平均分给 8 人，每人几个？',
        ja: '72 個のりんごを 8 人で同じ数ずつ分けると、1 人何個？',
        en: '72 apples are shared equally by 8 people. How many per person?',
      },
      answer: 9,
      points: 8,
      routeZh: '总量 72 ÷ 人数 8 = 每人 9 个。',
      routeJa: '合計 72 ÷ 人数 8 = 1 人 9 個です。',
      routeEn: 'Total 72 ÷ 8 people = 9 per person.',
    }),
  ], random);
}

function makeAverageTotalQuestion({ id, expression, answer, points, routeZh, routeJa, routeEn }) {
  return asQuestion({
    id,
    templateId: 'average-total',
    benchmarkMs: 20000,
    points,
    expression,
    answer,
    strategy: {
      zh: `先分清总量、份数、每份：${routeZh}`,
      ja: `合計・個数・1つ分を先に分けて考えます。${routeJa}`,
      en: `Identify total, number of groups, and amount per group first: ${routeEn}`,
    },
    hint: {
      zh: '看到“平均每份”通常用 总量÷份数；看到“平均是几，问总量”通常用 平均×份数。',
      ja: '「1つ分」を聞かれたら 合計÷個数、「合計」を聞かれたら 平均×個数 を考えます。',
      en: 'If asked for each share, use total ÷ groups. If asked for total, use average × groups.',
    },
  });
}

function makeFactorMultipleQuestion(random) {
  return makeDesignedQuestion('factor-multiple', [
    () => makeFactorCountPractice(random),
    () => makeCommonFactorCountPractice(random),
    () => makeGcdPractice(random),
    () => makeLcmPractice(random),
    () => makeCommonMultipleCountPractice(random),
  ], random);
}

function makeFactorCountPractice(random) {
  return makeDesignedQuestion('factor-count', [
    () => makeFactorCountQuestion(24),
    () => makeFactorCountQuestion(36),
    () => makeFactorCountQuestion(18),
    () => makeFactorCountQuestion(48),
  ], random);
}

function makeCommonFactorCountPractice(random) {
  return makeDesignedQuestion('common-factor-count', [
    () => makeCommonFactorCountQuestion(12, 18),
    () => makeCommonFactorCountQuestion(20, 30),
    () => makeCommonFactorCountQuestion(16, 24),
    () => makeCommonFactorCountQuestion(18, 27),
  ], random);
}

function makeGcdPractice(random) {
  return makeDesignedQuestion('gcd', [
    () => makeGcdQuestion(24, 36),
    () => makeGcdQuestion(28, 42),
    () => makeGcdQuestion(18, 30),
    () => makeGcdQuestion(16, 40),
  ], random);
}

function makeLcmPractice(random) {
  return makeDesignedQuestion('lcm', [
    () => makeLcmQuestion(6, 8),
    () => makeLcmQuestion(9, 12),
    () => makeLcmQuestion(10, 15),
    () => makeLcmQuestion(6, 14),
  ], random);
}

function makeCommonMultipleCountPractice(random) {
  return makeDesignedQuestion('common-multiple-count', [
    () => makeCommonMultipleCountQuestion(6, 8, 60),
    () => makeCommonMultipleCountQuestion(8, 12, 120),
    () => makeCommonMultipleCountQuestion(12, 15, 100),
    () => makeCommonMultipleCountQuestion(6, 10, 90),
  ], random);
}

function makeFactorCountQuestion(n) {
  const divisors = divisorsOf(n);
  return asQuestion({
    id: `factor-count-${n}`,
    templateId: 'factor-count',
    benchmarkMs: 18000,
    points: 8,
    expression: {
      zh: `${n} 的因数有几个？`,
      ja: `${n} の約数は何個？`,
      en: `How many factors does ${n} have?`,
    },
    answer: divisors.length,
    strategy: {
      zh: `${n} 的因数是：${divisors.join('、')}，一共有 ${divisors.length} 个。`,
      ja: `${n} の約数は ${divisors.join('、')} で、全部で ${divisors.length} 個です。`,
      en: `The factors of ${n} are ${divisors.join(', ')}, so there are ${divisors.length}.`,
    },
    hint: {
      zh: '从 1 开始找能整除它的数，别漏掉一头一尾配对出现的因数。',
      ja: '1 から順に、わり切れる数を探そう。ペアで出てくる約数を見落とさないように。',
      en: 'Start from 1 and find every number that divides it evenly. Factors often come in pairs.',
    },
  });
}

function makeCommonFactorCountQuestion(a, b) {
  const common = commonDivisorsOf(a, b);
  return asQuestion({
    id: `common-factor-count-${a}-${b}`,
    templateId: 'common-factor-count',
    benchmarkMs: 22000,
    points: 12,
    expression: {
      zh: `${a} 和 ${b} 的公因数有几个？`,
      ja: `${a} と ${b} の公約数は何個？`,
      en: `How many common factors do ${a} and ${b} have?`,
    },
    answer: common.length,
    strategy: {
      zh: `${a} 和 ${b} 的公因数是：${common.join('、')}，一共有 ${common.length} 个。`,
      ja: `${a} と ${b} の公約数は ${common.join('、')} で、全部で ${common.length} 個です。`,
      en: `The common factors of ${a} and ${b} are ${common.join(', ')}, so there are ${common.length}.`,
    },
    hint: {
      zh: '先各自列因数，再圈出两边都出现的数。',
      ja: 'それぞれの約数を書き出して、両方に出てくる数を探そう。',
      en: 'List the factors of each number, then keep only the numbers that appear in both lists.',
    },
  });
}

function makeGcdQuestion(a, b) {
  const common = commonDivisorsOf(a, b);
  const answer = common[common.length - 1];
  return asQuestion({
    id: `gcd-${a}-${b}`,
    templateId: 'gcd',
    benchmarkMs: 20000,
    points: 12,
    expression: {
      zh: `${a} 和 ${b} 的最大公因数是几？`,
      ja: `${a} と ${b} の最大公約数は？`,
      en: `What is the greatest common factor of ${a} and ${b}?`,
    },
    answer,
    strategy: {
      zh: `共同出现的因数有：${common.join('、')}，其中最大的是 ${answer}。`,
      ja: `共通する約数は ${common.join('、')} で、その中で一番大きいのは ${answer} です。`,
      en: `The common factors are ${common.join(', ')}, and the greatest one is ${answer}.`,
    },
    hint: {
      zh: '“最大公因数”不是所有公因数的个数，而是公因数里最大的那个。',
      ja: '最大公約数は「個数」ではなく、共通する約数の中で一番大きい数です。',
      en: 'GCF is not the number of common factors. It is the largest common factor.',
    },
  });
}

function makeLcmQuestion(a, b) {
  const answer = lcmInt(a, b);
  return asQuestion({
    id: `lcm-${a}-${b}`,
    templateId: 'lcm',
    benchmarkMs: 22000,
    points: 14,
    expression: {
      zh: `${a} 和 ${b} 的最小公倍数是几？`,
      ja: `${a} と ${b} の最小公倍数は？`,
      en: `What is the least common multiple of ${a} and ${b}?`,
    },
    answer,
    strategy: {
      zh: `${a} 的倍数和 ${b} 的倍数第一次相遇在 ${answer}，所以最小公倍数是 ${answer}。`,
      ja: `${a} の倍数と ${b} の倍数が最初に出会うのは ${answer} なので、最小公倍数は ${answer} です。`,
      en: `The multiples of ${a} and ${b} first meet at ${answer}, so the LCM is ${answer}.`,
    },
    hint: {
      zh: '从较大的数开始数倍数，找第一个也能被另一个数整除的数。',
      ja: '大きい方の数の倍数から見て、もう一方でもわり切れる最初の数を探そう。',
      en: 'Start with multiples of the larger number and find the first one divisible by the other number.',
    },
  });
}

function makeCommonMultipleCountQuestion(a, b, limit) {
  const lcm = lcmInt(a, b);
  const answer = Math.floor(limit / lcm);
  const multiples = Array.from({ length: answer }, (_, i) => lcm * (i + 1));
  return asQuestion({
    id: `common-multiple-count-${a}-${b}-under-${limit}`,
    templateId: 'common-multiple-count',
    benchmarkMs: 26000,
    points: 16,
    expression: {
      zh: `${limit} 以内，${a} 和 ${b} 的公倍数有几个？`,
      ja: `${limit} 以下で、${a} と ${b} の公倍数は何個？`,
      en: `How many common multiples of ${a} and ${b} are at most ${limit}?`,
    },
    answer,
    strategy: {
      zh: `${a} 和 ${b} 的最小公倍数是 ${lcm}，所以 ${limit} 以内的公倍数是：${multiples.join('、')}，共 ${answer} 个。`,
      ja: `${a} と ${b} の最小公倍数は ${lcm} です。${limit} 以下の公倍数は ${multiples.join('、')} で、${answer} 個です。`,
      en: `The LCM of ${a} and ${b} is ${lcm}. The common multiples up to ${limit} are ${multiples.join(', ')}, so there are ${answer}.`,
    },
    hint: {
      zh: '先找最小公倍数，再看它的 1 倍、2 倍、3 倍……有没有超过范围。',
      ja: '先に最小公倍数を見つけて、その 1 倍、2 倍、3 倍……が範囲をこえないか見よう。',
      en: 'Find the LCM first, then count its 1x, 2x, 3x... multiples without going past the limit.',
    },
  });
}

const smartCalcTemplates = {
  'round-sum': makeRoundSumQuestion,
  'inverse-missing': makeInverseMissingPractice,
  'order-ops': makeOrderOpsPractice,
  'factor-partner': makeFactorPartnerPractice,
  'factor-pair-count': makeFactorPairCountPractice,
  'multiple-step': makeMultipleStepPractice,
  'first-common-multiple': makeFirstCommonMultiplePractice,
  'same-unit-merge': makeSameUnitMergePractice,
  'factor-pair': makePairSumQuestion,
  'factor-diff': makePairDifferenceQuestion,
  'regroup-diff': makeRegroupQuestion,
  'mul-div-chain': makeMulDivQuestion,
  'unit-conversion': makeUnitConversionPractice,
  'average-total': makeAverageTotalPractice,
  'factor-multiple': makeFactorMultipleQuestion,
  'factor-count': makeFactorCountPractice,
  'common-factor-count': makeCommonFactorCountPractice,
  gcd: makeGcdPractice,
  lcm: makeLcmPractice,
  'common-multiple-count': makeCommonMultipleCountPractice,
};

const deckTemplateIds = {
  [SMART_CALC_DECK.id]: ['round-sum', 'factor-pair', 'factor-diff', 'regroup-diff', 'mul-div-chain'],
  [INVERSE_MISSING_DECK.id]: ['inverse-missing'],
  [ORDER_OPS_DECK.id]: ['order-ops'],
  [MULTIPLICATIVE_STRUCTURE_DECK.id]: [
    'factor-partner',
    'factor-pair-count',
    'multiple-step',
    'first-common-multiple',
    'same-unit-merge',
  ],
  [ROUNDING_DECK.id]: ['round-sum', 'regroup-diff'],
  [FACTOR_DECK.id]: ['factor-pair', 'factor-diff'],
  [FACTOR_MULTIPLE_DECK.id]: ['factor-count', 'common-factor-count', 'gcd', 'lcm', 'common-multiple-count'],
  [MUL_DIV_DECK.id]: ['mul-div-chain'],
  [UNIT_CONVERSION_DECK.id]: ['unit-conversion'],
  [AVERAGE_TOTAL_DECK.id]: ['average-total'],
};

function getDeck(deckId = SMART_CALC_DECK.id) {
  return practiceDecks.find((deck) => deck.id === deckId) || SMART_CALC_DECK;
}

export function createPracticeQuestion(deckId = SMART_CALC_DECK.id, options = {}) {
  const deck = getDeck(deckId);
  const random = options.random || Math.random;
  const forcedTemplate = options.templateId;
  const templateId = forcedTemplate || pick(deckTemplateIds[deck.id] || Object.keys(smartCalcTemplates), random);
  const factory = smartCalcTemplates[templateId] || makePairSumQuestion;
  const question = factory(random);
  return {
    ...question,
    deck,
    deckId: deck.id,
    points: question.points || 10,
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
    points: question.points || 10,
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
