import { WeaponElementType, WeaponStatusType } from '@/assets/game-data/types';
import { CalculatedSkills } from '@/contexts/build/types';

export type ElementModifier = { bonus: number, multiplier: number };

export type SkillEffects = {
  attackBonus: number,
  attackMult: number,
  affinityBonus: number,
  critMultiplier: number,
  elementCritMult: number,
  elementModifiers: { [key in WeaponElementType]: ElementModifier },
  statusModifiers: { [key in WeaponStatusType]: ElementModifier },
  sharpnessBonus: number,
  defenseBonus: number,
  defenseMult: number,
  resistanceModifiers: { [key in WeaponElementType]: ElementModifier },
  dragonheartResistances: number,
};

type SkillFunction = (effects: SkillEffects) => void;

type SkillFunctionMap = { [key: string]: { [key: number]: SkillFunction } };

const BASE_SKILL_EFFECTS: SkillEffects = {
  attackBonus: 0,
  attackMult: 1,
  affinityBonus: 0,
  critMultiplier: 1.25,
  elementCritMult: 1,
  elementModifiers: {
    'fire': { bonus: 0, multiplier: 1 },
    'water': { bonus: 0, multiplier: 1 },
    'thunder': { bonus: 0, multiplier: 1 },
    'ice': { bonus: 0, multiplier: 1 },
    'dragon': { bonus: 0, multiplier: 1 },
  },
  statusModifiers: {
    'poison': { bonus: 0, multiplier: 1 },
    'paralyze': { bonus: 0, multiplier: 1 },
    'sleep': { bonus: 0, multiplier: 1 },
    'blast': { bonus: 0, multiplier: 1 },
  },
  sharpnessBonus: 0,
  defenseBonus: 0,
  defenseMult: 1,
  resistanceModifiers: {
    'fire': { bonus: 0, multiplier: 1 },
    'water': { bonus: 0, multiplier: 1 },
    'thunder': { bonus: 0, multiplier: 1 },
    'ice': { bonus: 0, multiplier: 1 },
    'dragon': { bonus: 0, multiplier: 1 },
  },
  dragonheartResistances: 0,
};

export function applySkillEffects(skills: CalculatedSkills): SkillEffects {
  const currentEffects: SkillEffects = { ...BASE_SKILL_EFFECTS };

  Object.entries(skills).forEach(([skill, { effectiveLevel }]) => {
    SKILL_FUNCTION_MAP[skill]?.[effectiveLevel]?.(currentEffects);
  });

  return currentEffects;
}

const SKILL_FUNCTION_MAP: SkillFunctionMap = {
  'Attack Boost': {
    1: (e) => { e.attackBonus += 3; },
    2: (e) => { e.attackBonus += 6; },
    3: (e) => { e.attackBonus += 9; },
    4: (e) => { e.attackBonus += 7; e.attackMult *= 1.05; },
    5: (e) => { e.attackBonus += 8; e.attackMult *= 1.06; },
    6: (e) => { e.attackBonus += 9; e.attackMult *= 1.08; },
    7: (e) => { e.attackBonus += 10; e.attackMult *= 1.10; },
  },
  'Agitator': {
    1: (e) => { e.attackBonus += 4; e.affinityBonus += 3; },
    2: (e) => { e.attackBonus += 8; e.affinityBonus += 5; },
    3: (e) => { e.attackBonus += 12; e.affinityBonus += 7; },
    4: (e) => { e.attackBonus += 16; e.affinityBonus += 10; },
    5: (e) => { e.attackBonus += 20; e.affinityBonus += 15; },
  },
  'Peak Performance': {
    1: (e) => { e.attackBonus += 5; },
    2: (e) => { e.attackBonus += 10; },
    3: (e) => { e.attackBonus += 20; },
  },
  'Resentment': {
    1: (e) => { e.attackBonus += 5; },
    2: (e) => { e.attackBonus += 10; },
    3: (e) => { e.attackBonus += 15; },
    4: (e) => { e.attackBonus += 20; },
    5: (e) => { e.attackBonus += 25; },
  },
  'Resuscitate': {
    1: (e) => { e.attackBonus += 5; },
    2: (e) => { e.attackBonus += 10; },
    3: (e) => { e.attackBonus += 20; },
  },
  'Critical Eye': {
    1: (e) => { e.affinityBonus += 5; },
    2: (e) => { e.affinityBonus += 10; },
    3: (e) => { e.affinityBonus += 15; },
    4: (e) => { e.affinityBonus += 20; },
    5: (e) => { e.affinityBonus += 25; },
    6: (e) => { e.affinityBonus += 30; },
    7: (e) => { e.affinityBonus += 40; },
  },
  'Critical Boost': {
    1: (e) => { e.critMultiplier = 1.3; },
    2: (e) => { e.critMultiplier = 1.35; },
    3: (e) => { e.critMultiplier = 1.4; },
  },
  'Weakness Exploit': {
    1: (e) => { e.affinityBonus += 15; },
    2: (e) => { e.affinityBonus += 30; },
    3: (e) => { e.affinityBonus += 50; },
  },
  'Latent Power': {
    1: (e) => { e.affinityBonus += 10; },
    2: (e) => { e.affinityBonus += 20; },
    3: (e) => { e.affinityBonus += 30; },
    4: (e) => { e.affinityBonus += 40; },
    5: (e) => { e.affinityBonus += 50; },
  },
  'Maximum Might': {
    1: (e) => { e.affinityBonus += 10; },
    2: (e) => { e.affinityBonus += 20; },
    3: (e) => { e.affinityBonus += 30; },
  },
  'Critical Element': {
    1: (e) => { e.elementCritMult = 1.05; },
    2: (e) => { e.elementCritMult = 1.1; },
    3: (e) => { e.elementCritMult = 1.15; },
  },
  'Fire Attack': {
    1: (e) => { e.elementModifiers['fire'].bonus += 2; },
    2: (e) => { e.elementModifiers['fire'].bonus += 3; },
    3: (e) => { e.elementModifiers['fire'].bonus += 4; e.elementModifiers['fire'].multiplier *= 1.05; },
    4: (e) => { e.elementModifiers['fire'].bonus += 4; e.elementModifiers['fire'].multiplier *= 1.1; },
    5: (e) => { e.elementModifiers['fire'].bonus += 4; e.elementModifiers['fire'].multiplier *= 1.2; },
  },
  'Water Attack': {
    1: (e) => { e.elementModifiers['water'].bonus += 2; },
    2: (e) => { e.elementModifiers['water'].bonus += 3; },
    3: (e) => { e.elementModifiers['water'].bonus += 4; e.elementModifiers['water'].multiplier *= 1.05; },
    4: (e) => { e.elementModifiers['water'].bonus += 4; e.elementModifiers['water'].multiplier *= 1.1; },
    5: (e) => { e.elementModifiers['water'].bonus += 4; e.elementModifiers['water'].multiplier *= 1.2; },
  },
  'Ice Attack': {
    1: (e) => { e.elementModifiers['ice'].bonus += 2; },
    2: (e) => { e.elementModifiers['ice'].bonus += 3; },
    3: (e) => { e.elementModifiers['ice'].bonus += 4; e.elementModifiers['ice'].multiplier *= 1.05; },
    4: (e) => { e.elementModifiers['ice'].bonus += 4; e.elementModifiers['ice'].multiplier *= 1.1; },
    5: (e) => { e.elementModifiers['ice'].bonus += 4; e.elementModifiers['ice'].multiplier *= 1.2; },
  },
  'Thunder Attack': {
    1: (e) => { e.elementModifiers['thunder'].bonus += 2; },
    2: (e) => { e.elementModifiers['thunder'].bonus += 3; },
    3: (e) => { e.elementModifiers['thunder'].bonus += 4; e.elementModifiers['thunder'].multiplier *= 1.05; },
    4: (e) => { e.elementModifiers['thunder'].bonus += 4; e.elementModifiers['thunder'].multiplier *= 1.1; },
    5: (e) => { e.elementModifiers['thunder'].bonus += 4; e.elementModifiers['thunder'].multiplier *= 1.2; },
  },
  'Dragon Attack': {
    1: (e) => { e.elementModifiers['dragon'].bonus += 2; },
    2: (e) => { e.elementModifiers['dragon'].bonus += 3; },
    3: (e) => { e.elementModifiers['dragon'].bonus += 4; e.elementModifiers['dragon'].multiplier *= 1.05; },
    4: (e) => { e.elementModifiers['dragon'].bonus += 4; e.elementModifiers['dragon'].multiplier *= 1.1; },
    5: (e) => { e.elementModifiers['dragon'].bonus += 4; e.elementModifiers['dragon'].multiplier *= 1.2; },
  },
  'Poison Attack': {
    1: (e) => { e.statusModifiers['poison'].bonus += 1; e.statusModifiers['poison'].multiplier *= 1.05; },
    2: (e) => { e.statusModifiers['poison'].bonus += 2; e.statusModifiers['poison'].multiplier *= 1.1; },
    3: (e) => { e.statusModifiers['poison'].bonus += 5; e.statusModifiers['poison'].multiplier *= 1.2; },
  },
  'Paralysis Attack': {
    1: (e) => { e.statusModifiers['paralyze'].bonus += 1; e.statusModifiers['paralyze'].multiplier *= 1.05; },
    2: (e) => { e.statusModifiers['paralyze'].bonus += 2; e.statusModifiers['paralyze'].multiplier *= 1.1; },
    3: (e) => { e.statusModifiers['paralyze'].bonus += 5; e.statusModifiers['paralyze'].multiplier *= 1.2; },
  },
  'Sleep Attack': {
    1: (e) => { e.statusModifiers['sleep'].bonus += 1; e.statusModifiers['sleep'].multiplier *= 1.05; },
    2: (e) => { e.statusModifiers['sleep'].bonus += 2; e.statusModifiers['sleep'].multiplier *= 1.1; },
    3: (e) => { e.statusModifiers['sleep'].bonus += 5; e.statusModifiers['sleep'].multiplier *= 1.2; },
  },
  'Blast Attack': {
    1: (e) => { e.statusModifiers['blast'].bonus += 1; e.statusModifiers['blast'].multiplier *= 1.05; },
    2: (e) => { e.statusModifiers['blast'].bonus += 2; e.statusModifiers['blast'].multiplier *= 1.1; },
    3: (e) => { e.statusModifiers['blast'].bonus += 5; e.statusModifiers['blast'].multiplier *= 1.2; },
  },
  'Handicraft': {
    1: (e) => { e.sharpnessBonus += 10; },
    2: (e) => { e.sharpnessBonus += 20; },
    3: (e) => { e.sharpnessBonus += 30; },
    4: (e) => { e.sharpnessBonus += 40; },
    5: (e) => { e.sharpnessBonus += 50; },
  },
  'Bludgeoner': {
    1: (e) => { e.attackMult *= 1.05; },
    2: (e) => { e.attackMult *= 1.1; },
    3: (e) => { e.attackMult *= 1.1; },
  },
  'Offensive Guard': {
    1: (e) => { e.attackMult *= 1.05; },
    2: (e) => { e.attackMult *= 1.1; },
    3: (e) => { e.attackMult *= 1.15; },
  },
  'Critical Draw': {
    1: (e) => { e.affinityBonus += 10; },
    2: (e) => { e.affinityBonus += 20; },
    3: (e) => { e.affinityBonus += 40; },
  },
  'Punishing Draw': {
    1: (e) => { e.attackBonus += 3; },
    2: (e) => { e.attackBonus += 5; },
    3: (e) => { e.attackBonus += 7; },
  },
  'Affinity Sliding': {
    1: (e) => { e.affinityBonus += 30; },
  },
  'Defense Boost': {
    1: (e) => { e.defenseBonus += 5; },
    2: (e) => { e.defenseBonus += 10; },
    3: (e) => { e.defenseBonus += 10; e.defenseMult *= 1.05; },
    4: (e) => { e.defenseBonus += 20; e.defenseMult *= 1.05; boostAllResistances(e, 3); },
    5: (e) => { e.defenseBonus += 20; e.defenseMult *= 1.08; boostAllResistances(e, 3); },
    6: (e) => { e.defenseBonus += 35; e.defenseMult *= 1.08; boostAllResistances(e, 5); },
    7: (e) => { e.defenseBonus += 35; e.defenseMult *= 1.10; boostAllResistances(e, 5); },
  },
  'Fire Resistance': {
    1: (e) => { e.resistanceModifiers['fire'].bonus += 6; },
    2: (e) => { e.resistanceModifiers['fire'].bonus += 12; },
    3: (e) => { e.resistanceModifiers['fire'].bonus += 20; e.defenseBonus += 10; },
  },
  'Water Resistance': {
    1: (e) => { e.resistanceModifiers['water'].bonus += 6; },
    2: (e) => { e.resistanceModifiers['water'].bonus += 12; },
    3: (e) => { e.resistanceModifiers['water'].bonus += 20; e.defenseBonus += 10; },
  },
  'Ice Resistance': {
    1: (e) => { e.resistanceModifiers['ice'].bonus += 6; },
    2: (e) => { e.resistanceModifiers['ice'].bonus += 12; },
    3: (e) => { e.resistanceModifiers['ice'].bonus += 20; e.defenseBonus += 10; },
  },
  'Thunder Resistance': {
    1: (e) => { e.resistanceModifiers['thunder'].bonus += 6; },
    2: (e) => { e.resistanceModifiers['thunder'].bonus += 12; },
    3: (e) => { e.resistanceModifiers['thunder'].bonus += 20; e.defenseBonus += 10; },
  },
  'Dragon Resistance': {
    1: (e) => { e.resistanceModifiers['dragon'].bonus += 6; },
    2: (e) => { e.resistanceModifiers['dragon'].bonus += 12; },
    3: (e) => { e.resistanceModifiers['dragon'].bonus += 20; e.defenseBonus += 10; },
  },
  'Heroics': {
    1: (e) => { e.defenseBonus += 50; },
    2: (e) => { e.defenseBonus += 50; e.attackMult *= 1.05; },
    3: (e) => { e.defenseBonus += 100; e.attackMult *= 1.05; },
    4: (e) => { e.defenseBonus += 100; e.attackMult *= 1.1; },
    5: (e) => { e.attackMult *= 1.3; },
  },
  'Kushala Blessing': {
    1: (e) => { e.elementModifiers['water'].multiplier *= 1.05; e.elementModifiers['ice'].multiplier *= 1.05; },
    2: (e) => { e.elementModifiers['water'].multiplier *= 1.1; e.elementModifiers['ice'].multiplier *= 1.1; },
    3: (e) => { e.elementModifiers['water'].multiplier *= 1.1; e.elementModifiers['ice'].multiplier *= 1.1; },
    4: (e) => { e.elementModifiers['water'].multiplier *= 1.1; e.elementModifiers['ice'].multiplier *= 1.1; },
  },
  'Teostra Blessing': {
    1: (e) => { e.elementModifiers['fire'].multiplier *= 1.05; e.statusModifiers['blast'].multiplier *= 1.05; },
    2: (e) => { e.elementModifiers['fire'].multiplier *= 1.1; e.statusModifiers['blast'].multiplier *= 1.1; },
    3: (e) => { e.elementModifiers['fire'].multiplier *= 1.1; e.statusModifiers['blast'].multiplier *= 1.1; },
    4: (e) => { e.elementModifiers['fire'].multiplier *= 1.1; e.statusModifiers['blast'].multiplier *= 1.1; },
  },
  'Dragonheart': {
    1: (e) => { e.dragonheartResistances = 30; },
    2: (e) => { e.dragonheartResistances = 50; },
    3: (e) => { e.dragonheartResistances = 50; },
    4: (e) => { e.dragonheartResistances = 50; e.attackMult *= 1.05; },
    5: (e) => { e.dragonheartResistances = 50; e.attackMult *= 1.1; },
  },
  'Counterstrike': {
    1: (e) => { e.attackBonus += 10; },
    2: (e) => { e.attackBonus += 15; },
    3: (e) => { e.attackBonus += 25; },
  },
  'Wind Alignment': {
    1: (e) => { e.resistanceModifiers['dragon'].bonus += 1; },
    2: (e) => { e.resistanceModifiers['dragon'].bonus += 2; },
    3: (e) => { e.resistanceModifiers['dragon'].bonus += 3; },
    4: (e) => { e.resistanceModifiers['dragon'].bonus += 4; },
    5: (e) => { e.resistanceModifiers['dragon'].bonus += 4; },
  },
  'Thunder Alignment': {
    1: (e) => { e.resistanceModifiers['thunder'].bonus += 1; },
    2: (e) => { e.resistanceModifiers['thunder'].bonus += 2; },
    3: (e) => { e.resistanceModifiers['thunder'].bonus += 3; },
    4: (e) => { e.resistanceModifiers['thunder'].bonus += 4; },
    5: (e) => { e.resistanceModifiers['thunder'].bonus += 4; },
  },
  'Stormsoul': {
    1: (e) => { e.elementModifiers['thunder'].multiplier *= 1.05; e.elementModifiers['dragon'].multiplier *= 1.05; },
    2: (e) => { e.elementModifiers['thunder'].multiplier *= 1.1; e.elementModifiers['dragon'].multiplier *= 1.1; },
    3: (e) => { e.elementModifiers['thunder'].multiplier *= 1.15; e.elementModifiers['dragon'].multiplier *= 1.15; },
    4: (e) => { e.elementModifiers['thunder'].multiplier *= 1.15; e.elementModifiers['dragon'].multiplier *= 1.15; },
    5: (e) => { e.elementModifiers['thunder'].multiplier *= 1.15; e.elementModifiers['dragon'].multiplier *= 1.15; },
  },
  'Dereliction': {
    1: (e) => { e.attackBonus += 25; boostAllElements(e, 12); boostAllStatus(e, 6); },
    2: (e) => { e.attackBonus += 30; boostAllElements(e, 15); boostAllStatus(e, 8); },
    3: (e) => { e.attackBonus += 35; boostAllElements(e, 20); boostAllStatus(e, 10); },
  },
  'Furious': {
    1: (e) => { e.defenseBonus += 10; boostAllResistances(e, 5); },
    2: (e) => { e.defenseBonus += 20; boostAllResistances(e, 10); },
    3: (e) => { e.defenseBonus += 30; boostAllResistances(e, 20); },
  },
  'Mail of Hellfire': {
    1: (e) => { e.attackBonus += 15; e.defenseBonus -= 50; multiplyAllElements(e, 1.05); boostAllResistances(e, -10); },
    2: (e) => { e.attackBonus += 25; e.defenseBonus -= 75; multiplyAllElements(e, 1.1); boostAllResistances(e, -25); },
    3: (e) => { e.attackBonus += 35; e.defenseBonus -= 100; multiplyAllElements(e, 1.2); boostAllResistances(e, -50); },
  },
  'Coalescence': {
    1: (e) => { e.attackBonus += 12; boostAllElements(e, 2); multiplyAllStatus(e, 1.05); },
    2: (e) => { e.attackBonus += 15; boostAllElements(e, 3); multiplyAllStatus(e, 1.1); },
    3: (e) => { e.attackBonus += 18; boostAllElements(e, 4); multiplyAllStatus(e, 1.2); },
  },
  'Bloodlust': {
    1: (e) => { e.attackBonus += 10; boostAllElements(e, 5); boostAllStatus(e, 5); },
    2: (e) => { e.attackBonus += 15; boostAllElements(e, 7); boostAllStatus(e, 7); },
    3: (e) => { e.attackBonus += 20; boostAllElements(e, 10); boostAllStatus(e, 10); },
  },
  'Defiance': {
    1: (e) => { },
    2: (e) => { e.defenseBonus += 5; },
    3: (e) => { e.defenseBonus += 10; },
    4: (e) => { e.defenseBonus += 20; },
    5: (e) => { e.defenseBonus += 30; },
  },
  'Sneak Attack': {
    1: (e) => { e.attackMult *= 1.05; },
    2: (e) => { e.attackMult *= 1.1; },
    3: (e) => { e.attackMult *= 1.12; },
  },
  'Adrenaline Rush': {
    1: (e) => { e.attackBonus += 10; },
    2: (e) => { e.attackBonus += 15; },
    3: (e) => { e.attackBonus += 30; },
  },
  'Foray': {
    1: (e) => { e.attackBonus += 10; },
    2: (e) => { e.attackBonus += 10; e.affinityBonus += 10; },
    3: (e) => { e.attackBonus += 15; e.affinityBonus += 20; },
  },
  'Element Exploit': {
    1: (e) => { multiplyAllElements(e, 1.1); },
    2: (e) => { multiplyAllElements(e, 1.125); },
    3: (e) => { multiplyAllElements(e, 1.15); },
  },
};

function boostAllResistances(effects: SkillEffects, bonus: number) {
  effects.resistanceModifiers['fire'].bonus += bonus;
  effects.resistanceModifiers['water'].bonus += bonus;
  effects.resistanceModifiers['thunder'].bonus += bonus;
  effects.resistanceModifiers['ice'].bonus += bonus;
  effects.resistanceModifiers['dragon'].bonus += bonus;
}

function boostAllElements(effects: SkillEffects, bonus: number) {
  effects.elementModifiers['fire'].bonus += bonus;
  effects.elementModifiers['water'].bonus += bonus;
  effects.elementModifiers['thunder'].bonus += bonus;
  effects.elementModifiers['ice'].bonus += bonus;
  effects.elementModifiers['dragon'].bonus += bonus;
}

function multiplyAllElements(effects: SkillEffects, multiplier: number) {
  effects.elementModifiers['fire'].multiplier *= multiplier;
  effects.elementModifiers['water'].multiplier *= multiplier;
  effects.elementModifiers['thunder'].multiplier *= multiplier;
  effects.elementModifiers['ice'].multiplier *= multiplier;
  effects.elementModifiers['dragon'].multiplier *= multiplier;
}

function boostAllStatus(effects: SkillEffects, bonus: number) {
  effects.statusModifiers['poison'].bonus += bonus;
  effects.statusModifiers['paralyze'].bonus += bonus;
  effects.statusModifiers['sleep'].bonus += bonus;
  effects.statusModifiers['blast'].bonus += bonus;
}

function multiplyAllStatus(effects: SkillEffects, multiplier: number) {
  effects.statusModifiers['poison'].multiplier *= multiplier;
  effects.statusModifiers['paralyze'].multiplier *= multiplier;
  effects.statusModifiers['sleep'].multiplier *= multiplier;
  effects.statusModifiers['blast'].multiplier *= multiplier;
}
