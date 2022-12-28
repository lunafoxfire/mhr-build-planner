import fs from 'fs';
import path from 'path';
import url from 'url';
import util from 'util';
import {
  Armor, Weapon, ItemsByRank, CategorizedItems,
  ArmorTable, WeaponTable, DecorationTable, RampageDecorationTable, SkillTable, RampageSkillTable, SkillDecorationMap, SkillDecorationInfo,
} from '@/assets/game-data/types';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, './data');
const DATA_FILE = {
  ARMOR: path.join(DATA_DIR, 'armor.json'),
  WEAPONS: path.join(DATA_DIR, 'weapons.json'),
  DECORATIONS: path.join(DATA_DIR, 'decorations.json'),
  RAMPAGE_DECORATIONS: path.join(DATA_DIR, 'rampageDecorations.json'),
  SKILLS: path.join(DATA_DIR, 'skills.json'),
  RAMPAGE_SKILLS: path.join(DATA_DIR, 'rampageSkills.json'),
};
const OUTPUT_DIR = path.join(ROOT_DIR, './src/assets/game-data/json');

function fileToJSON(path: string): any {
  const decoder = new util.TextDecoder('utf-8');
  return JSON.parse(decoder.decode(fs.readFileSync(path)));
}

const armorData = fileToJSON(DATA_FILE.ARMOR);
const weaponsData = fileToJSON(DATA_FILE.WEAPONS);
const decorationData = fileToJSON(DATA_FILE.DECORATIONS);
const rampageDecorationData = fileToJSON(DATA_FILE.RAMPAGE_DECORATIONS);
const skillData = fileToJSON(DATA_FILE.SKILLS);
const rampageSkillData = fileToJSON(DATA_FILE.RAMPAGE_SKILLS);


const armorTable: ArmorTable = {};
const weaponTable: WeaponTable = {};
const decorationTable: DecorationTable = {};
const rampageDecorationTable: RampageDecorationTable = {};
const skillTable: SkillTable = {};
const rampageSkillTable: RampageSkillTable = {};

const skillDecorationMap: SkillDecorationMap = {};
const categorizedItems: CategorizedItems = {
  armor: {
    HEAD: { lowRank: [], highRank: [], masterRank: [] },
    BODY: { lowRank: [], highRank: [], masterRank: [] },
    ARMS: { lowRank: [], highRank: [], masterRank: [] },
    WAIST: { lowRank: [], highRank: [], masterRank: [] },
    LEGS: { lowRank: [], highRank: [], masterRank: [] },
  },
  weapons: {
    GREAT_SWORD: { lowRank: [], highRank: [], masterRank: [] },
    SWORD_AND_SHIELD: { lowRank: [], highRank: [], masterRank: [] },
    DUAL_BLADES: { lowRank: [], highRank: [], masterRank: [] },
    LONG_SWORD: { lowRank: [], highRank: [], masterRank: [] },
    HAMMER: { lowRank: [], highRank: [], masterRank: [] },
    HUNTING_HORN: { lowRank: [], highRank: [], masterRank: [] },
    LANCE: { lowRank: [], highRank: [], masterRank: [] },
    GUNLANCE: { lowRank: [], highRank: [], masterRank: [] },
    SWITCH_AXE: { lowRank: [], highRank: [], masterRank: [] },
    CHARGE_BLADE: { lowRank: [], highRank: [], masterRank: [] },
    INSECT_GLAIVE: { lowRank: [], highRank: [], masterRank: [] },
    BOW: { lowRank: [], highRank: [], masterRank: [] },
    HEAVY_BOWGUN: { lowRank: [], highRank: [], masterRank: [] },
    LIGHT_BOWGUN: { lowRank: [], highRank: [], masterRank: [] },
  },
};


const LOW_RANK = [1, 2, 3];
const HIGH_RANK = [4, 5, 6, 7];
const MASTER_RANK = [8, 9, 10];
function pushToRank(item: Weapon | Armor, list: ItemsByRank) {
  if (LOW_RANK.includes(item.rarity)) {
    list.lowRank.push(item.name);
  } else if (HIGH_RANK.includes(item.rarity)) {
    list.highRank.push(item.name);
  } else if (MASTER_RANK.includes(item.rarity)) {
    list.masterRank.push(item.name);
  }
}


armorData.forEach((item: any) => {
  if (armorTable[item.name]) return;

  switch (item.type) {
    case 'HEAD':
      pushToRank(item, categorizedItems.armor.HEAD);
      break;
    case 'BODY':
      pushToRank(item, categorizedItems.armor.BODY);
      break;
    case 'ARMS':
      pushToRank(item, categorizedItems.armor.ARMS);
      break;
    case 'WAIST':
      pushToRank(item, categorizedItems.armor.WAIST);
      break;
    case 'LEGS':
      pushToRank(item, categorizedItems.armor.LEGS);
      break;
    default:
      return;
  }

  armorTable[item.name] = item;
});

weaponsData.forEach((item: any) => {
  if (weaponTable[item.name]) return;

  switch (item.type) {
    case 'GREAT_SWORD':
      pushToRank(item, categorizedItems.weapons.GREAT_SWORD);
      break;
    case 'SWORD_AND_SHIELD':
      pushToRank(item, categorizedItems.weapons.SWORD_AND_SHIELD);
      break;
    case 'DUAL_BLADES':
      pushToRank(item, categorizedItems.weapons.DUAL_BLADES);
      break;
    case 'LONG_SWORD':
      pushToRank(item, categorizedItems.weapons.LONG_SWORD);
      break;
    case 'HAMMER':
      pushToRank(item, categorizedItems.weapons.HAMMER);
      break;
    case 'HUNTING_HORN':
      pushToRank(item, categorizedItems.weapons.HUNTING_HORN);
      break;
    case 'LANCE':
      pushToRank(item, categorizedItems.weapons.LANCE);
      break;
    case 'GUNLANCE':
      pushToRank(item, categorizedItems.weapons.GUNLANCE);
      break;
    case 'SWITCH_AXE':
      pushToRank(item, categorizedItems.weapons.SWITCH_AXE);
      break;
    case 'CHARGE_BLADE':
      pushToRank(item, categorizedItems.weapons.CHARGE_BLADE);
      break;
    case 'INSECT_GLAIVE':
      pushToRank(item, categorizedItems.weapons.INSECT_GLAIVE);
      break;
    case 'BOW':
      pushToRank(item, categorizedItems.weapons.BOW);
      break;
    case 'HEAVY_BOWGUN':
      pushToRank(item, categorizedItems.weapons.HEAVY_BOWGUN);
      break;
    case 'LIGHT_BOWGUN':
      pushToRank(item, categorizedItems.weapons.LIGHT_BOWGUN);
      break;
    default:
      return;
  }

  weaponTable[item.name] = item;
});

decorationData.forEach((item: any) => {
  if (decorationTable[item.name]) return;
  decorationTable[item.name] = item;
});

rampageDecorationData.forEach((item: any) => {
  if (rampageDecorationTable[item.name]) return;
  rampageDecorationTable[item.name] = item;
});

skillData.forEach((skill: any) => {
  if (skillTable[skill.name]) return;
  skillTable[skill.name] = skill;

  const skillDecorations: SkillDecorationInfo[] = [];
  Object.entries(decorationTable).forEach(([decoration, decoInfo]) => {
    if (decoInfo!.skill.name === skill.name) {
      skillDecorations.push({
        decoName: decoration,
        decoSize: decoInfo!.size,
        skillLevel: decoInfo!.skill.level,
      });
    }
  });
  if (skillDecorations.length) {
    skillDecorationMap[skill.name] = skillDecorations;
  }
});

rampageSkillData.forEach((skill: any) => {
  if (rampageSkillTable[skill.name]) return;
  rampageSkillTable[skill.name] = skill;
});


writeFileSafe('armor.json', armorTable);
writeFileSafe('weapons.json', weaponTable);
writeFileSafe('decorations.json', decorationTable);
writeFileSafe('rampageDecorations.json', rampageDecorationTable);
writeFileSafe('skills.json', skillTable);
writeFileSafe('rampageSkills.json', rampageSkillTable);
writeFileSafe('categorizedItems.json', categorizedItems);
writeFileSafe('skillDecorationMap.json', skillDecorationMap);

function writeFileSafe(fileName: string, data: any) {
  const filePath = path.join(OUTPUT_DIR, fileName);
  const json = JSON.stringify(data, null, 2);
  const pathInfo = path.parse(filePath);
  fs.mkdirSync(pathInfo.dir, { recursive: true });
  fs.writeFileSync(filePath, json);
  console.log(`Successfully wrote ${filePath}`);
}
