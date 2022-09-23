import fireIcon from '@/assets/icons/elements/element_fire.png';
import waterIcon from '@/assets/icons/elements/element_water.png';
import thunderIcon from '@/assets/icons/elements/element_thunder.png';
import iceIcon from '@/assets/icons/elements/element_ice.png';
import dragonIcon from '@/assets/icons/elements/element_dragon.png';
import poisonIcon from '@/assets/icons/elements/status_poison.png';
import sleepIcon from '@/assets/icons/elements/status_sleep.png';
import paralyzeIcon from '@/assets/icons/elements/status_paralyze.png';
import blastIcon from '@/assets/icons/elements/status_blast.png';
import gemLv1Icon from '@/assets/icons/gems/gem_lv1.png';
import gemLv2Icon from '@/assets/icons/gems/gem_lv2.png';
import gemLv3Icon from '@/assets/icons/gems/gem_lv3.png';
import gemLv4Icon from '@/assets/icons/gems/gem_lv4.png';
import { armorTable, categorizedItems, decorationTable } from '@/assets/game-data';
import { ArmorSkill, ArmorType, WeaponElement, WeaponType } from '@/assets/game-data/types';
import { ArmorChoice, RankOption, TalismanChoice } from '@/contexts/build/types';

export const WEAPON_TYPES = [
  'GREAT_SWORD',
  'SWORD_AND_SHIELD',
  'DUAL_BLADES',
  'LONG_SWORD',
  'HAMMER',
  'HUNTING_HORN',
  'LANCE',
  'GUNLANCE',
  'SWITCH_AXE',
  'CHARGE_BLADE',
  'INSECT_GLAIVE',
  'BOW',
  'HEAVY_BOWGUN',
  'LIGHT_BOWGUN',
];

export function getWeaponsByTypeAndRank(type: string | null, rank: RankOption): string[] {
  let items: string[] = [];
  if (!type || !WEAPON_TYPES.includes(type)) {
    return items;
  }

  switch (rank) {
    case 'master':
      items = categorizedItems.weapons[(type as WeaponType)].masterRank;
      break;
    case 'high':
      items = categorizedItems.weapons[(type as WeaponType)].highRank;
      break;
    case 'low':
      items = categorizedItems.weapons[(type as WeaponType)].lowRank;
      break;
  }

  return items;
}

export function getArmorByTypeAndRank(type: ArmorType, rank: RankOption): string[] {
  switch (rank) {
    case 'master':
      return categorizedItems.armor[type].masterRank;
    case 'high':
      return categorizedItems.armor[type].highRank;
    case 'low':
      return categorizedItems.armor[type].lowRank;
  }
}

export function getElementIcon(element: string): string {
  switch (element) {
    case 'fire':
      return fireIcon;
    case 'water':
      return waterIcon;
    case 'thunder':
      return thunderIcon;
    case 'ice':
      return iceIcon;
    case 'dragon':
      return dragonIcon;
    case 'poison':
      return poisonIcon;
    case 'sleep':
      return sleepIcon;
    case 'paralyze':
      return paralyzeIcon;
    case 'blast':
      return blastIcon;
    default:
      return '';
  }
}

export function getDecorationSlotIcon(slotSize: number): string {
  switch (slotSize) {
    case 1:
      return gemLv1Icon;
    case 2:
      return gemLv2Icon;
    case 3:
      return gemLv3Icon;
    case 4:
      return gemLv4Icon;
    default:
      return '';
  }
}

export function stringifyRank(rank: RankOption): string {
  switch (rank) {
    case 'master':
      return 'Master Rank';
    case 'high':
      return 'High Rank';
    case 'low':
      return 'Low Rank';
    default:
      return '';
  }
}

export function stringifySkill(skill: ArmorSkill): string {
  return `${skill.name} ${skill.level}`;
}

export function stringifySkillList(skills: ArmorSkill[]): string {
  return skills.map((skill) => stringifySkill(skill)).join(', ');
}

export function compareSlots(a: number[], b: number[]): -1 | 0 | 1 {
  for (let i = 0; i < a.length; i++) {
    const aSize = a[i] || 0;
    const bSize = b[i] || 0;
    if (aSize > bSize) return 1;
    if (aSize < bSize) return -1;
  }
  if (a.length > b.length) return 1;
  if (a.length < b.length) return -1;
  return 0;
}

export function compareElements(a: WeaponElement, b: WeaponElement): -1 | 0 | 1 {
  if (a === null && b === null) return 0;
  if (a !== null && b === null) return 1;
  if (a === null && b !== null) return -1;
  if (a!.type > b!.type) return 1;
  if (a!.type < b!.type) return -1;
  if (a!.power > b!.power) return 1;
  if (a!.power < b!.power) return -1;
  return 0;
}

export function getDecorationSkills(decorations: Array<string | null>): ArmorSkill[] {
  const skills: ArmorSkill[] = [];
  decorations.forEach((decoration) => {
    if (decoration) {
      const decoInfo = decorationTable[decoration];
      skills.push(decoInfo.skill);
    }
  });
  return skills;
}

export function getArmorSkills(item: ArmorChoice): ArmorSkill[] {
  const itemData = armorTable[item.name];
  return [
    ...itemData.skills,
    ...getDecorationSkills(item.decorations),
  ];
}

export function getTalismanSkills(item: TalismanChoice): ArmorSkill[] {
  const skills: ArmorSkill[] = [];
  if (item.skill1) {
    skills.push(item.skill1);
  }
  if (item.skill2) {
    skills.push(item.skill2);
  }
  const decorations = [item.slot1, item.slot2, item.slot3].map((slot) => slot?.name ?? null);
  skills.push(...getDecorationSkills(decorations));
  return skills;
}
