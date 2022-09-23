import { nanoid } from 'nanoid';
import { ArmorChoice, BuildState, RankOption, TalismanChoice, WeaponChoice } from './types';

function getDefaultWeapon(): WeaponChoice {
  return {
    name: 'Defender Great Sword I',
    decorations: [],
    rampageDecorations: [],
  };
}

function getDefaultHeadArmor(): ArmorChoice {
  return {
    name: 'Kamura Head Scarf',
    decorations: [],
  };
}

function getDefaultBodyArmor(): ArmorChoice {
  return {
    name: 'Kamura Garb',
    decorations: [],
  };
}

function getDefaultArmsArmor(): ArmorChoice {
  return {
    name: 'Kamura Braces',
    decorations: [],
  };
}

function getDefaultWaistArmor(): ArmorChoice {
  return {
    name: 'Kamura Obi',
    decorations: [],
  };
}

function getDefaultLegsArmor(): ArmorChoice {
  return {
    name: 'Kamura Leggings',
    decorations: [],
  };
}

function getDefaultTalisman(): TalismanChoice {
  return {
    skill1: null,
    skill2: null,
    slot1: null,
    slot2: null,
    slot3: null,
  };
}

export function getInitialState(): BuildState {
  return {
    id: nanoid(),
    buildName: '',
    weapon: getDefaultWeapon(),
    head: getDefaultHeadArmor(),
    body: getDefaultBodyArmor(),
    arms: getDefaultArmsArmor(),
    waist: getDefaultWaistArmor(),
    legs: getDefaultLegsArmor(),
    talisman: getDefaultTalisman(),

    targetRank: 'master',
    prioritySkills: [],
  };
}

export type BuildDispatchAction =
  | { type: 'RESET_BUILD' }
  | { type: 'SET_BUILD_NAME', name: string }
  | { type: 'SET_TARGET_RANK', rank: string }
  | { type: 'ADD_PRIORITY_SKILL', name: string }
  | { type: 'REMOVE_PRIORITY_SKILL', name: string }
  | { type: 'SET_WEAPON', data: WeaponChoice }
  | { type: 'SET_HEAD_ARMOR', data: ArmorChoice }
  | { type: 'SET_BODY_ARMOR', data: ArmorChoice }
  | { type: 'SET_ARMS_ARMOR', data: ArmorChoice }
  | { type: 'SET_WAIST_ARMOR', data: ArmorChoice }
  | { type: 'SET_LEGS_ARMOR', data: ArmorChoice }
  | { type: 'SET_TALISMAN', data: TalismanChoice };

export function reducer(state: BuildState, action: BuildDispatchAction): BuildState {
  switch (action.type) {
    case 'RESET_BUILD': {
      return getInitialState();
    }
    case 'SET_BUILD_NAME': {
      return {
        ...state,
        buildName: action.name,
      };
    }
    case 'SET_TARGET_RANK': {
      let newRank = action.rank;
      if (newRank !== 'low' && newRank !== 'high' && newRank !== 'master') {
        newRank = 'master';
      }
      return {
        ...state,
        targetRank: (newRank as RankOption),
      };
    }
    case 'ADD_PRIORITY_SKILL': {
      const newSkillList = [...state.prioritySkills];
      newSkillList.push(action.name);
      return {
        ...state,
        prioritySkills: newSkillList.sort(),
      };
    }
    case 'REMOVE_PRIORITY_SKILL': {
      const newSkillList = state.prioritySkills.filter((s) => s !== action.name);
      return {
        ...state,
        prioritySkills: newSkillList.sort(),
      };
    }
    case 'SET_WEAPON': {
      return {
        ...state,
        weapon: { ...action.data },
      };
    }
    case 'SET_HEAD_ARMOR': {
      return {
        ...state,
        head: { ...action.data },
      };
    }
    case 'SET_BODY_ARMOR': {
      return {
        ...state,
        body: { ...action.data },
      };
    }
    case 'SET_ARMS_ARMOR': {
      return {
        ...state,
        arms: { ...action.data },
      };
    }
    case 'SET_WAIST_ARMOR': {
      return {
        ...state,
        waist: { ...action.data },
      };
    }
    case 'SET_LEGS_ARMOR': {
      return {
        ...state,
        legs: { ...action.data },
      };
    }
    case 'SET_TALISMAN': {
      return {
        ...state,
        talisman: { ...action.data },
      };
    }
    default:
      return state;
  }
}
