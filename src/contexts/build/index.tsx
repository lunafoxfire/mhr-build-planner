import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { skillTable } from '@/assets/game-data';
import { getArmorSkills, getDecorationSkills, getTalismanSkills } from '@/util/items';
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
    return {};
  }, []);

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
