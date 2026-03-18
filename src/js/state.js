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
    profile:  { locale: 'zh' },
    progress: { clearedLevelIds: [], currentLevelId: '' },
    learning: { seenOnboarding: false, lastPlayedAt: null },
    meta:     { schemaVersion: 1 },
  };
}

/* ── 从旧散落 key 迁移 ── */
function migrate() {
  const state = defaultState();
  try {
    const lang = localStorage.getItem('eqlab_lang');
    if (lang === 'ja' || lang === 'en') state.profile.locale = lang;

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
    localStorage.setItem('eqlab_cleared', JSON.stringify(_state.progress.clearedLevelIds));
    if (_state.learning.seenOnboarding) localStorage.setItem('eqlab_onboard_done', '1');
  } catch {}
}
