/**
 * state.js — 统一本地存储管理
 *
 * 把 eqlab_lang / eqlab_cleared / eqlab_onboard_done 三个散落 key
 * 收口为单一 eqlab_state_v1 JSON 对象。首次启动时自动迁移旧 key。
 */

const STATE_KEY = 'eqlab_state_v1';

/* ── 默认空状态 ── */
function defaultState() {
  return {
    version: 1,
    profile:  { locale: 'zh', theme: 'lab' },
    progress: { clearedLevelIds: [], currentLevelId: '' },
    learning: { seenOnboarding: false, lastPlayedAt: null },
    practice: {
      currentDeckId: 'smart-calc',
      bestByDeck: {},
      lastResultByDeck: {},
    },
    meta:     { schemaVersion: 1 },
  };
}

/* ── 从旧散落 key 迁移 ── */
function migrate() {
  const state = defaultState();
  try {
    const lang = localStorage.getItem('eqlab_lang');
    if (lang === 'ja' || lang === 'en') state.profile.locale = lang;

    const theme = localStorage.getItem('eqlab_theme');
    if (theme === 'lab' || theme === 'playful') state.profile.theme = theme;

    const cleared = localStorage.getItem('eqlab_cleared');
    if (cleared) {
      const arr = JSON.parse(cleared);
      if (Array.isArray(arr)) state.progress.clearedLevelIds = arr;
    }

    const onboard = localStorage.getItem('eqlab_onboard_done');
    if (onboard === '1') state.learning.seenOnboarding = true;
  } catch { /* 安全忽略 */ }
  return state;
}

/* ── 内存缓存 ── */
let _state = null;

/**
 * v1→v2: clearedLevelIds 曾用全局数字索引，现改为稳定字符串 ID。
 * 此映射表对应重排前的旧章节顺序与关卡数。
 */
function migrateNumericCleared(state) {
  const ids = state.progress?.clearedLevelIds;
  if (!Array.isArray(ids) || ids.length === 0) return;
  if (typeof ids[0] === 'string') return; // 已是新格式
  // 旧章节顺序：[chapterId, levelCount]（仅 ch1-ch11，共 60 关）
  const OLD = [
    ['ch1',5],['ch2',6],['ch3',5],['ch4',5],['ch5',10],
    ['ch6',4],['ch7',5],['ch8',6],['ch9',6],['ch10',3],
    ['ch11',5],
  ];
  const map = [];
  for (const [chId, cnt] of OLD) {
    for (let i = 1; i <= cnt; i++) map.push(`${chId}-${i}`);
  }
  state.progress.clearedLevelIds = ids
    .map(idx => map[idx])
    .filter(Boolean);
}

/** 初始化（启动时调一次） */
export function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) {
      _state = JSON.parse(raw);
      // 确保字段完整（应对旧 schema 缺字段）
      const def = defaultState();
      for (const k of Object.keys(def)) {
        if (!_state[k]) _state[k] = def[k];
      }
      if (!_state.profile.theme) _state.profile.theme = def.profile.theme;
      if (!_state.practice.currentDeckId) _state.practice.currentDeckId = def.practice.currentDeckId;
      if (!_state.practice.bestByDeck) _state.practice.bestByDeck = {};
      if (!_state.practice.lastResultByDeck) _state.practice.lastResultByDeck = {};
      // v1→v2 迁移：数字索引 → 稳定字符串 ID
      migrateNumericCleared(_state);
    }
  } catch { /* ignore */ }

  if (!_state) {
    _state = migrate();
    saveState();
  }
  return _state;
}

/** 写入 localStorage */
export function saveState() {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(_state)); } catch {}
}

/** 获取当前内存状态（只读引用） */
export function getState() {
  if (!_state) loadState();
  return _state;
}

/**
 * 更新状态并保存
 * @param {string} path  — 'profile.locale' 或 'progress.clearedLevelIds'
 * @param {*} value
 */
export function updateState(path, value) {
  if (!_state) loadState();
  const keys = path.split('.');
  let obj = _state;
  for (let i = 0; i < keys.length - 1; i++) {
    obj = obj[keys[i]];
  }
  obj[keys[keys.length - 1]] = value;
  saveState();
  // 同步旧 key（向后兼容）
  syncLegacyKeys();
}

/** 把新状态同步回旧 key，以防用户回退版本 */
function syncLegacyKeys() {
  try {
    localStorage.setItem('eqlab_lang', _state.profile.locale);
    localStorage.setItem('eqlab_theme', _state.profile.theme || 'lab');
    localStorage.setItem('eqlab_cleared', JSON.stringify(_state.progress.clearedLevelIds));
    if (_state.learning.seenOnboarding) localStorage.setItem('eqlab_onboard_done', '1');
  } catch {}
}
