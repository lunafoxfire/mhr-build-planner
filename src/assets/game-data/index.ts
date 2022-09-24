import armorJson from './json/armor.json';
import weaponJson from './json/weapons.json';
import decorationJson from './json/decorations.json';
import rampageDecorationJson from './json/rampageDecorations.json';
import skillJson from './json/skills.json';
import rampageSkillJson from './json/rampageSkills.json';
import categorizedItemsJson from './json/categorizedItems.json';
import skillDecorationJson from './json/skillDecorationMap.json';
import { ArmorTable, CategorizedItems, DecorationTable, RampageDecorationTable, RampageSkillTable, SkillDecorationMap, SkillTable, WeaponTable } from './types';

export const armorTable = (armorJson as ArmorTable);
export const weaponTable = (weaponJson as WeaponTable);
export const decorationTable = (decorationJson as DecorationTable);
export const rampageDecorationTable = (rampageDecorationJson as RampageDecorationTable);
export const skillTable = (skillJson as SkillTable);
export const rampageSkillTable = (rampageSkillJson as RampageSkillTable);
export const categorizedItems = (categorizedItemsJson as CategorizedItems);
export const skillDecorationMap = (skillDecorationJson as SkillDecorationMap);
