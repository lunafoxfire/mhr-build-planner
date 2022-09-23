import armorData from './json/armor.json';
import weaponData from './json/weapons.json';
import decorationData from './json/decorations.json';
import rampageDecorationData from './json/rampageDecorations.json';
import skillData from './json/skills.json';
import rampageSkillData from './json/rampageSkills.json';
import categorizedItemsData from './json/categorizedItems.json';
import { ArmorTable, CategorizedItems, DecorationTable, RampageDecorationTable, RampageSkillTable, SkillTable, WeaponTable } from './types';

export const armorTable = (armorData as ArmorTable);
export const weaponTable = (weaponData as WeaponTable);
export const decorationTable = (decorationData as DecorationTable);
export const rampageDecorationTable = (rampageDecorationData as RampageDecorationTable);
export const skillTable = (skillData as SkillTable);
export const rampageSkillTable = (rampageSkillData as RampageSkillTable);
export const categorizedItems = (categorizedItemsData as CategorizedItems);
