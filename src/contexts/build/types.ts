export type RankOption = 'low' | 'high' | 'master';

export type WeaponChoice = {
  name: string,
  decorations: Array<string | null>,
  rampageDecorations: Array<string | null>,
};

export type ArmorChoice = {
  name: string,
  decorations: Array<string | null>,
};

export type TalismanSkillChoice = {
  name: string,
  level: number,
};

export type TalismanDecorationChoice = {
  size: number,
  name: string | null,
};

export type TalismanChoice = {
  skill1: TalismanSkillChoice | null,
  skill2: TalismanSkillChoice | null,
  slot1: TalismanDecorationChoice | null,
  slot2: TalismanDecorationChoice | null,
  slot3: TalismanDecorationChoice | null,
};

export type BuildState = {
  id: string,
  buildName: string,
  weapon: WeaponChoice,
  head: ArmorChoice,
  body: ArmorChoice,
  arms: ArmorChoice,
  waist: ArmorChoice,
  legs: ArmorChoice,
  talisman: TalismanChoice,

  targetRank: RankOption,
  prioritySkills: string[],
};

export type CalculatedSkills = {
  [key: string]: {
    level: number,
    maxLevel: number,
    effectiveLevel: number,
  },
};

export type CalculatedStats = {

};
