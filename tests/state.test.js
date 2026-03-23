/**
 * state.test.js — 统一状态管理单元测试
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

/* ── 模拟 localStorage ── */
const store = {};
const fakeStorage = {
  getItem:    (k) => store[k] ?? null,
  setItem:    (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; },
};
globalThis.localStorage = fakeStorage;

/* 每次测试前清空存储并重新加载模块 */
beforeEach(() => {
  for (const k of Object.keys(store)) delete store[k];
  vi.resetModules();
});

async function freshModule() {
  return await import('../src/js/state.js');
}

describe('state.js', () => {

  describe('空白启动（无旧 key）', () => {
    it('loadState 返回默认状态', async () => {
      const { loadState } = await freshModule();
      const s = loadState();
      expect(s.version).toBe(1);
      expect(s.profile.locale).toBe('zh');
      expect(s.progress.clearedLevelIds).toEqual([]);
      expect(s.learning.seenOnboarding).toBe(false);
    });

    it('loadState 后 localStorage 已写入 eqlab_state_v1', async () => {
      const { loadState } = await freshModule();
      loadState();
      expect(store['eqlab_state_v1']).toBeDefined();
      const obj = JSON.parse(store['eqlab_state_v1']);
      expect(obj.version).toBe(1);
    });
  });

  describe('旧 key 迁移', () => {
    it('迁移 eqlab_lang=ja', async () => {
      store['eqlab_lang'] = 'ja';
      const { loadState } = await freshModule();
      const s = loadState();
      expect(s.profile.locale).toBe('ja');
    });

    it('迁移 eqlab_cleared', async () => {
      store['eqlab_cleared'] = JSON.stringify([0, 3, 5]);
      const { loadState } = await freshModule();
      const s = loadState();
      expect(s.progress.clearedLevelIds).toEqual([0, 3, 5]);
    });

    it('迁移 eqlab_onboard_done=1', async () => {
      store['eqlab_onboard_done'] = '1';
      const { loadState } = await freshModule();
      const s = loadState();
      expect(s.learning.seenOnboarding).toBe(true);
    });

    it('同时迁移三个旧 key', async () => {
      store['eqlab_lang'] = 'en';
      store['eqlab_cleared'] = JSON.stringify([1, 2]);
      store['eqlab_onboard_done'] = '1';
      const { loadState } = await freshModule();
      const s = loadState();
      expect(s.profile.locale).toBe('en');
      expect(s.progress.clearedLevelIds).toEqual([1, 2]);
      expect(s.learning.seenOnboarding).toBe(true);
    });
  });

  describe('updateState + getState', () => {
    it('更新 locale 并持久化', async () => {
      const { loadState, updateState, getState } = await freshModule();
      loadState();
      updateState('profile.locale', 'ja');
      expect(getState().profile.locale).toBe('ja');
      // localStorage 也被更新
      const obj = JSON.parse(store['eqlab_state_v1']);
      expect(obj.profile.locale).toBe('ja');
    });

    it('更新 clearedLevelIds', async () => {
      const { loadState, updateState, getState } = await freshModule();
      loadState();
      updateState('progress.clearedLevelIds', [0, 1, 2]);
      expect(getState().progress.clearedLevelIds).toEqual([0, 1, 2]);
    });

    it('updateState 同步旧 key（向后兼容）', async () => {
      const { loadState, updateState } = await freshModule();
      loadState();
      updateState('profile.locale', 'ja');
      expect(store['eqlab_lang']).toBe('ja');

      updateState('progress.clearedLevelIds', [7, 8]);
      expect(store['eqlab_cleared']).toBe(JSON.stringify([7, 8]));

      updateState('learning.seenOnboarding', true);
      expect(store['eqlab_onboard_done']).toBe('1');
    });
  });

  describe('已有 eqlab_state_v1 时不再迁移', () => {
    it('直接读取已有状态（数字索引自动迁移为字符串 ID）', async () => {
      store['eqlab_state_v1'] = JSON.stringify({
        version: 1,
        profile: { locale: 'ja' },
        progress: { clearedLevelIds: [10, 20] },
        learning: { seenOnboarding: true, lastPlayedAt: null },
        meta: { schemaVersion: 1 },
      });
      store['eqlab_lang'] = 'zh'; // 旧 key 不应覆盖新状态
      const { loadState } = await freshModule();
      const s = loadState();
      expect(s.profile.locale).toBe('ja');
      // 10 → ch2-6 (ch1 有 5 关，所以第 11 个是 ch2 的第 6 关)
      // 20 → ch4-5 (ch1:5 + ch2:6 + ch3:5 + ch4:5 中第 21 个，ch4 最后一关)
      expect(s.progress.clearedLevelIds).toEqual(['ch2-6', 'ch4-5']);
    });

    it('字符串 ID 不重复迁移', async () => {
      store['eqlab_state_v1'] = JSON.stringify({
        version: 1,
        profile: { locale: 'zh' },
        progress: { clearedLevelIds: ['ch1-1', 'ch3-2'] },
        learning: { seenOnboarding: false, lastPlayedAt: null },
        meta: { schemaVersion: 1 },
      });
      const { loadState } = await freshModule();
      const s = loadState();
      expect(s.progress.clearedLevelIds).toEqual(['ch1-1', 'ch3-2']);
    });
  });
});
