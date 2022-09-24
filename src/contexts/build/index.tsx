import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { armorTable, skillTable, weaponTable } from '@/assets/game-data';
import { getArmorSkills, getDecorationSkills, getSharpnessMultipliers, getTalismanSkills } from '@/util/items';
import { applySkillEffects } from '@/util/items/applySkillEffects';
import { clamp } from '@/util/number';
import { BuildDispatchAction, getInitialState, reducer } from './reducer';
import { BuildState, CalculatedSkills, CalculatedStats } from './types';

// CONTEXT
export type BuildContextProps = {
  state: BuildState,
  dispatch: React.Dispatch<BuildDispatchAction>,
  calculatedSkills: CalculatedSkills,
  calculatedStats: CalculatedStats,
};
export const BuildContext = createContext<BuildContextProps | null>(null);
BuildContext.displayName = 'BuildContext';


// HELPER HOOK
export function useBuildContext() {
  const ctx = useContext(BuildContext);
  if (!ctx) {
    throw new Error('BuildContext is null');
  }
  return ctx;
}


// PROVIDER
type BuildContextProviderProps = {
  children: React.ReactNode,
};
export const BuildContextProvider = ({ children }: BuildContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  const calculatedSkills = useMemo(() => {
    const calculatedSkills: CalculatedSkills = {};
    const aggregatedSkills = [
      ...getDecorationSkills(state.weapon.decorations),
      ...getArmorSkills(state.head),
      ...getArmorSkills(state.body),
      ...getArmorSkills(state.arms),
      ...getArmorSkills(state.waist),
      ...getArmorSkills(state.legs),
      ...getTalismanSkills(state.talisman),
    ];

    aggregatedSkills.forEach((skill) => {
      const skillInfo = skillTable[skill.name];
      if (calculatedSkills[skill.name]) {
        calculatedSkills[skill.name].level += skill.level;
      } else {
        calculatedSkills[skill.name] = {
          level: skill.level,
          maxLevel: skillInfo.levels.length,
          effectiveLevel: 0,
        };
      }
    });

    Object.values(calculatedSkills).forEach((skill) => {
      skill.effectiveLevel = Math.min(skill.level, skill.maxLevel);
    });

    let stormsoulBonus = 0;
    if (calculatedSkills['Stormsoul']) {
      if (calculatedSkills['Stormsoul'].effectiveLevel === 4) {
        stormsoulBonus = 1;
      } else if (calculatedSkills['Stormsoul'].effectiveLevel === 5) {
        stormsoulBonus = 2;
      }
    }

    if (stormsoulBonus > 0) {
      Object.entries(calculatedSkills).forEach(([name, skill]) => {
        if (name !== 'Stormsoul') {
          skill.level += stormsoulBonus;
          skill.effectiveLevel = Math.min(skill.level, skill.maxLevel);
        }
      });
    }

    return calculatedSkills;
  }, [state.arms, state.body, state.head, state.legs, state.talisman, state.waist, state.weapon.decorations]);

  const calculatedStats = useMemo(() => {
    const weaponInfo = weaponTable[state.weapon.name];
    const headInfo = armorTable[state.head.name];
    const bodyInfo = armorTable[state.body.name];
    const armsInfo = armorTable[state.arms.name];
    const waistInfo = armorTable[state.waist.name];
    const legsInfo = armorTable[state.legs.name];
    const skillEffects = applySkillEffects(calculatedSkills);

    // RAW
    const raw = (weaponInfo.stats.attack + skillEffects.attackBonus) * skillEffects.attackMult;
    const affinity = weaponInfo.stats.affinity + skillEffects.affinityBonus;
    const critMultiplier = affinity < 0 ? 0.75 : skillEffects.critMultiplier;

    // ELEMENT/STATUS
    let element = 0;
    if (weaponInfo.stats.element) {
      const modifiers = skillEffects.elementModifiers[weaponInfo.stats.element.type];
      element = (weaponInfo.stats.element.power + modifiers.bonus) * modifiers.multiplier;
    }
    const elementCritMultiplier = affinity < 0 ? 1 : skillEffects.elementCritMult;

    let status = 0;
    if (weaponInfo.stats.status) {
      const modifiers = skillEffects.statusModifiers[weaponInfo.stats.status.type];
      status = (weaponInfo.stats.status.power + modifiers.bonus) * modifiers.multiplier;
    }

    // DEFENSE/RESISTANCE
    const defense = (
      weaponInfo.stats.defense
      + headInfo.stats.defense + bodyInfo.stats.defense + armsInfo.stats.defense + waistInfo.stats.defense + legsInfo.stats.defense
      + skillEffects.defenseBonus
    ) * skillEffects.defenseMult;
    const fireRes = (
      headInfo.stats.fireRes + bodyInfo.stats.fireRes + armsInfo.stats.fireRes + waistInfo.stats.fireRes + legsInfo.stats.fireRes
      + skillEffects.resistanceModifiers['fire'].bonus
    ) * skillEffects.resistanceModifiers['fire'].multiplier;
    const waterRes = (
      headInfo.stats.waterRes + bodyInfo.stats.waterRes + armsInfo.stats.waterRes + waistInfo.stats.waterRes + legsInfo.stats.waterRes
      + skillEffects.resistanceModifiers['water'].bonus
    ) * skillEffects.resistanceModifiers['water'].multiplier;
    const thunderRes = (
      headInfo.stats.thunderRes + bodyInfo.stats.thunderRes + armsInfo.stats.thunderRes + waistInfo.stats.thunderRes + legsInfo.stats.thunderRes
      + skillEffects.resistanceModifiers['thunder'].bonus
    ) * skillEffects.resistanceModifiers['thunder'].multiplier;
    const iceRes = (
      headInfo.stats.iceRes + bodyInfo.stats.iceRes + armsInfo.stats.iceRes + waistInfo.stats.iceRes + legsInfo.stats.iceRes
      + skillEffects.resistanceModifiers['ice'].bonus
    ) * skillEffects.resistanceModifiers['ice'].multiplier;
    const dragonRes = (
      headInfo.stats.dragonRes + bodyInfo.stats.dragonRes + armsInfo.stats.dragonRes + waistInfo.stats.dragonRes + legsInfo.stats.dragonRes
      + skillEffects.resistanceModifiers['dragon'].bonus
    ) * skillEffects.resistanceModifiers['dragon'].multiplier;

    // SHARPNESS
    const sharpness = [];
    let sharpnessClass = 0;
    let sharpnessBonus = skillEffects.sharpnessBonus;
    for (let i = 0; i < weaponInfo.sharpness.length; i++) {
      const baseSharpness = weaponInfo.sharpness[i];
      const maxSharpness = weaponInfo.maxSharpness[i];
      const diff = maxSharpness - baseSharpness;
      let calculatedSharpness = baseSharpness;
      if (sharpnessBonus > diff) {
        calculatedSharpness += diff;
        sharpnessBonus -= diff;
      } else {
        calculatedSharpness += sharpnessBonus;
        sharpnessBonus = 0;
      }
      if (calculatedSharpness > 0) {
        sharpnessClass = i;
      }
      sharpness.push(calculatedSharpness);
    }
    const sharpnessMultipliers = getSharpnessMultipliers(sharpnessClass);

    console.log(weaponInfo.sharpness);
    console.log(weaponInfo.maxSharpness);
    console.log(sharpness);

    // EFFECTIVE
    const effectiveAffinity = clamp(Math.abs(affinity), 0, 100) / 100;
    const effectiveRaw = raw * sharpnessMultipliers.raw * (1 + (critMultiplier - 1) * effectiveAffinity);
    const effectiveElement = element * sharpnessMultipliers.elemental * (1 + (elementCritMultiplier - 1) * effectiveAffinity);

    return {
      effectiveRaw,
      raw,
      affinity,
      critMultiplier,

      effectiveElement,
      element,
      elementCritMultiplier,
      status,

      defense,
      fireRes,
      waterRes,
      thunderRes,
      iceRes,
      dragonRes,

      sharpness,
      sharpnessClass,
      sharpnessMultipliers,
    };
  }, [calculatedSkills, state.arms.name, state.body.name, state.head.name, state.legs.name, state.waist.name, state.weapon.name]);

  const ctxValue = useMemo(() => {
    return {
      state,
      dispatch,
      calculatedSkills,
      calculatedStats,
    };
  }, [calculatedSkills, calculatedStats, state]);

  return (
    <BuildContext.Provider value={ctxValue}>
      {children}
    </BuildContext.Provider>
  );
};
