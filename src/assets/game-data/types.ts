// ==== ARMOR ==== //
export type ArmorType = 'HEAD' | 'BODY' | 'ARMS' | 'WAIST' | 'LEGS';

export type ArmorSkill = {
  name: string,
  level: number,
};

export type Armor = {
  id: number,
  name: string,
  href: string,
  rarity: number,
  type: ArmorType,
  slots: number[],
  stats: {
    defense: number,
    fireRes: number,
    waterRes: number,
    iceRes: number,
    thunderRes: number,
    dragonRes: number,
  },
  skills: ArmorSkill[],
};


// ==== WEAPONS ==== //
export type WeaponType =
  'GREAT_SWORD' |
  'SWORD_AND_SHIELD' |
  'DUAL_BLADES' |
  'LONG_SWORD' |
  'HAMMER' |
  'HUNTING_HORN' |
  'LANCE' |
  'GUNLANCE' |
  'SWITCH_AXE' |
  'CHARGE_BLADE' |
  'INSECT_GLAIVE' |
  'BOW' |
  'HEAVY_BOWGUN' |
  'LIGHT_BOWGUN';

export type WeaponElementType =
  'fire' |
  'water' |
  'thunder' |
  'ice' |
  'dragon';

export type WeaponStatusType =
  'poison' |
  'paralyze' |
  'sleep' |
  'blast';

export type WeaponElement = { type: WeaponElementType, power: number } | null;
export type WeaponStatus = { type: WeaponStatusType, power: number } | null;

export type Weapon = {
  id: number,
  name: string,
  href: string,
  type: WeaponType,
  rarity: number,
  slots: number[],
  rampageSlots: number[],
  stats: {
    attack: number,
    affinity: number,
    defense: number,
    element: WeaponElement,
    status: WeaponStatus,
  },
  sharpness: number[],
  maxSharpness: number[],
};


// ==== DECORATIONS ==== //
export type Decoration = {
  id: number,
  name: string,
  href: string,
  skill: ArmorSkill,
  size: number,
};


// ==== RAMPAGE DECORATIONS ==== //
export type RampageDecoration = {
  id: number,
  name: string,
  skill: string,
  size: number,
};


// ==== SKILLS ==== //
export type SkillLevel = {
  level: number,
  description: string,
};

export type Skill = {
  id: number,
  name: string,
  href: string,
  description: string,
  levels: SkillLevel[],
};


// ==== RAMPAGE SKILLS ==== //
export type RampageSkill = {
  id: number,
  name: string,
  href: string,
  description: string,
};


// ==== COLLECTIONS ==== //
export type ItemsByRank = {
  lowRank: string[],
  highRank: string[],
  masterRank: string[],
};

export type CategorizedItems = {
  armor: {
    [key in ArmorType]: ItemsByRank;
  },
  weapons: {
    [key in WeaponType]: ItemsByRank;
  },
};

export type SkillDecorationInfo = {
  decoName: string,
  decoSize: number,
  skillLevel: number,
};

export type SkillDecorationMap = { [key: string]: SkillDecorationInfo[] | undefined };

export type ArmorTable = { [key: string]: Armor | undefined };
export type WeaponTable = { [key: string]: Weapon | undefined };
export type DecorationTable = { [key: string]: Decoration | undefined };
export type RampageDecorationTable = { [key: string]: RampageDecoration | undefined };
export type SkillTable = { [key: string]: Skill | undefined };
export type RampageSkillTable = { [key: string]: RampageSkill | undefined };
