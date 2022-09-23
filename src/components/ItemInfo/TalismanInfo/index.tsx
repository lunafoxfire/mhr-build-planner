import React, { useCallback, useMemo, useState } from 'react';
import { Title } from '@mantine/core';
import talismanIcon from '@/assets/icons/items/talisman.png';
import { useBuildContext } from '@/contexts/build';
import { stringifySkill } from '@/util/items';
import { TalismanDecorationChoice, TalismanSkillChoice } from '@/contexts/build/types';
import CreateTalismanModal, { InProgressTalisman } from '@/components/ItemSelectModals/CreateTalismanModal';
import DecorationSelector from '@/components/DecorationSelector';
import { GridSection, ItemIconWrapper, ItemSkillEntry, TitleIconWrapper, TitleWrapper, Vertical } from '../shared';

export interface TalismanInfoProps {};
const TalismanInfo = ({ }: TalismanInfoProps) => {
  const { state, dispatch } = useBuildContext();
  const [modalOpen, setModalOpen] = useState(false);

  const { skills, slots } = useMemo(() => {
    const skills = [state.talisman.skill1, state.talisman.skill2].filter((skill) => !!skill) as TalismanSkillChoice[];
    const slots = [state.talisman.slot1, state.talisman.slot2, state.talisman.slot3].filter((slot) => !!slot) as TalismanDecorationChoice[];
    return { skills, slots };
  }, [state.talisman.skill1, state.talisman.skill2, state.talisman.slot1, state.talisman.slot2, state.talisman.slot3]);

  const handleCreateTalisman = useCallback((talisman: InProgressTalisman) => {
    const newData = {
      skill1: (talisman.skill1Name && talisman.skill1Level) ? { name: talisman.skill1Name, level: parseInt(talisman.skill1Level) } : null,
      skill2: (talisman.skill2Name && talisman.skill2Level) ? { name: talisman.skill2Name, level: parseInt(talisman.skill2Level) } : null,
      slot1: talisman.slot1Size ? { size: parseInt(talisman.slot1Size), name: null } : null,
      slot2: talisman.slot2Size ? { size: parseInt(talisman.slot2Size), name: null } : null,
      slot3: talisman.slot3Size ? { size: parseInt(talisman.slot3Size), name: null } : null,
    };
    dispatch({ type: 'SET_TALISMAN', data: newData });
  }, [dispatch]);

  const handleSelectDeco = useCallback((index: number, value: string | null) => {
    switch (index) {
      case 0: {
        const newData = {
          ...state.talisman,
          slot1: { ...state.talisman.slot1!, name: value },
        };
        dispatch({ type: 'SET_TALISMAN', data: newData });
        break;
      }
      case 1: {
        const newData = {
          ...state.talisman,
          slot2: { ...state.talisman.slot2!, name: value },
        };
        dispatch({ type: 'SET_TALISMAN', data: newData });
        break;
      }
      case 2: {
        const newData = {
          ...state.talisman,
          slot3: { ...state.talisman.slot3!, name: value },
        };
        dispatch({ type: 'SET_TALISMAN', data: newData });
        break;
      }
      default:
        break;
    }
  }, [dispatch, state.talisman]);

  function renderModal() {
    return (
      <CreateTalismanModal
        opened={modalOpen}
        onClose={() => { setModalOpen(false); }}
        onCreate={handleCreateTalisman}
      />
    );
  }

  return (
    <>
      {renderModal()}
      <GridSection section="icon">
        <ItemIconWrapper img={talismanIcon} onActivate={() => { setModalOpen(true); }} />
      </GridSection>
      <GridSection section="name">
        <TitleWrapper onActivate={() => { setModalOpen(true); }}>
          <Title order={4}>Talisman</Title>
          <TitleIconWrapper>▼</TitleIconWrapper>
        </TitleWrapper>
      </GridSection>
      <GridSection section="skills">
        <Vertical>
          {
            skills.map((skill) => (
              <ItemSkillEntry key={skill.name}>{stringifySkill(skill)}</ItemSkillEntry>
            ))
          }
        </Vertical>
      </GridSection>
      <GridSection section="slots">
        {
          slots.map(({ size, name }, index) => (
            <DecorationSelector
              key={index}
              slotSize={size}
              value={name}
              onChange={(val) => { handleSelectDeco(index, val); }}
            />
          ))
        }
      </GridSection>
      <GridSection section="stats">
      </GridSection>
    </>
  );
};

export default TalismanInfo;
