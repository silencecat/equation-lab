/**
 * levels.test.js — 关卡数据结构完整性校验
 */
import { describe, it, expect } from 'vitest';
import { chapters } from '../src/js/levels.js';
import { solveForX } from '../src/js/engine.js';
import { fracEq } from '../src/js/math.js';

/* 收集所有关卡 */
const allLevels = [];
chapters.forEach((ch, ci) => {
  ch.levels.forEach((lv, li) => {
    allLevels.push({ ch, ci, li, lv, label: `${ch.id} L${li + 1}` });
  });
});

describe('章节结构', () => {
  it('每章有 id, name(zh+ja+en), desc(zh+ja+en), levels', () => {
    chapters.forEach((ch) => {
      expect(ch.id).toBeTruthy();
      expect(ch.name.zh).toBeTruthy();
      expect(ch.name.ja).toBeTruthy();
      expect(ch.name.en).toBeTruthy();
      expect(ch.desc.zh).toBeTruthy();
      expect(ch.desc.ja).toBeTruthy();
      expect(ch.desc.en).toBeTruthy();
      expect(Array.isArray(ch.levels)).toBe(true);
      expect(ch.levels.length).toBeGreaterThan(0);
    });
  });

  it('共 11 章 60 关', () => {
    expect(chapters.length).toBe(11);
    expect(allLevels.length).toBe(60);
  });
});

describe('每关基本字段', () => {
  it.each(allLevels)('$label: title 有 zh+ja+en', ({ lv }) => {
    expect(lv.title.zh).toBeTruthy();
    expect(lv.title.ja).toBeTruthy();
    expect(lv.title.en).toBeTruthy();
  });

  it.each(allLevels)('$label: eq + target 存在', ({ lv }) => {
    expect(lv.eq).toBeTruthy();
    expect(lv.eq.left).toBeTruthy();
    expect(lv.eq.right).toBeTruthy();
    expect(lv.target).toBeTruthy();
  });
});

describe('build 关卡 tray 校验', () => {
  const buildLevels = allLevels.filter(({ lv }) => lv.type === 'build');

  it(`共有 ${buildLevels.length} 个 build 关卡`, () => {
    expect(buildLevels.length).toBeGreaterThan(0);
  });

  it.each(buildLevels)('$label: tray 存在且每项有 s, c, label(zh+ja+en)', ({ lv }) => {
    expect(Array.isArray(lv.tray)).toBe(true);
    lv.tray.forEach((item, i) => {
      expect(item.s, `tray[${i}].s`).toBeTruthy();
      expect(item.c, `tray[${i}].c`).toBeTruthy();
      expect(item.label?.zh, `tray[${i}].label.zh`).toBeTruthy();
      expect(item.label?.ja, `tray[${i}].label.ja`).toBeTruthy();
      expect(item.label?.en, `tray[${i}].label.en`).toBeTruthy();
    });
  });

  it.each(buildLevels)('$label: story 有 zh+ja+en', ({ lv }) => {
    expect(lv.story.zh).toBeTruthy();
    expect(lv.story.ja).toBeTruthy();
    expect(lv.story.en).toBeTruthy();
  });
});

describe('target 与 solveForX 一致', () => {
  it.each(allLevels)('$label: target 正确', ({ lv }) => {
    const solved = solveForX(lv.eq);
    expect(solved).not.toBeNull();
    expect(fracEq(solved, lv.target)).toBe(true);
  });
});
