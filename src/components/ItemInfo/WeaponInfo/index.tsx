import React, { useCallback, useMemo, useState } from 'react';
import { Stack, Title } from '@mantine/core';
import weaponIcon from '@/assets/icons/items/weapon_gs.png';
import { weaponTable } from '@/assets/game-data';
import { getElementIcon } from '@/util/items';
import { useBuildContext } from '@/contexts/build';
import SelectWeaponModal from '@/components/ItemSelectModals/SelectWeaponModal';
import DecorationSelector from '@/components/DecorationSelector';
import { GridSection, ItemIconWrapper, ItemStatEntry, ItemStatWithIcon, SlotSelection, TitleIconWrapper, TitleWrapper } from '../shared';

export interface WeaponInfoProps {};
const WeaponInfo = ({ }: WeaponInfoProps) => {
  const { state, dispatch } = useBuildContext();
  const [modalOpen, setModalOpen] = useState(false);

  const { weaponData, name, slots, rampageSlots } = useMemo(() => {
    const weaponData = weaponTable[state.weapon.name];
    const name = weaponData.name;
    const slots: SlotSelection[] = [];
    const rampageSlots: SlotSelection[] = [];

    weaponData.slots.forEach((size, i) => {
      const decoration = state.weapon.decorations[i] || null;
      slots.push({ size, decoration });
    });
    weaponData.rampageSlots.forEach((size, i) => {
      const decoration = state.weapon.rampageDecorations[i] || null;
      rampageSlots.push({ size, decoration });
    });

    return {
      weaponData,
      name,
      slots,
      rampageSlots,
    };
  }, [state.weapon.decorations, state.weapon.name, state.weapon.rampageDecorations]);

  const handleSelectItem = useCallback((item: string) => {
    const newData = {
      ...state.weapon,
      name: item,
      decorations: [],
      rampageDecorations: [],
    };
    dispatch({ type: 'SET_WEAPON', data: newData });
  }, [dispatch, state.weapon]);

  const handleSelectDeco = useCallback((index: number, value: string | null) => {
    const newData = {
      ...state.weapon,
      decorations: [...state.weapon.decorations],
    };
    newData.decorations[index] = value;
    dispatch({ type: 'SET_WEAPON', data: newData });
  }, [dispatch, state.weapon]);

  const handleSelectRampageDeco = useCallback((index: number, value: string | null) => {
    const newData = {
      ...state.weapon,
      rampageDecorations: [...state.weapon.rampageDecorations],
    };
    newData.rampageDecorations[index] = value;
    dispatch({ type: 'SET_WEAPON', data: newData });
  }, [dispatch, state.weapon]);

  function renderModal() {
    return (
      <SelectWeaponModal
        opened={modalOpen}
        onClose={() => { setModalOpen(false); }}
        onSelectItem={handleSelectItem}
      />
    );
  }

  return (
    <>
      {renderModal()}
      <GridSection section="icon">
        <ItemIconWrapper img={weaponIcon} onActivate={() => { setModalOpen(true); }} />
      </GridSection>
      <GridSection section="name">
        <TitleWrapper onActivate={() => { setModalOpen(true); }}>
          <Title order={4}>{name}</Title>
          <TitleIconWrapper>▼</TitleIconWrapper>
        </TitleWrapper>
      </GridSection>
      <GridSection section="skills">
        <Stack>
          {
            rampageSlots.map(({ size, decoration }, index) => (
              <DecorationSelector
                key={index}
                slotSize={size}
                value={decoration}
                onChange={(val) => { handleSelectRampageDeco(index, val); }}
                rampage
              />
            ))
          }
        </Stack>
      </GridSection>
      <GridSection section="slots">
        {
          slots.map(({ size, decoration }, index) => (
            <DecorationSelector
              key={index}
              slotSize={size}
              value={decoration}
              onChange={(val) => { handleSelectDeco(index, val); }}
            />
          ))
        }
      </GridSection>
      <GridSection section="stats">
        <ItemStatEntry>Atk: {weaponData.stats.attack}</ItemStatEntry>
        <ItemStatEntry>Aff: {weaponData.stats.affinity}%</ItemStatEntry>
        {!!weaponData.stats.defense && (<ItemStatEntry>Def: {weaponData.stats.defense}</ItemStatEntry>)}
        {!!weaponData.stats.element && (<ItemStatWithIcon text={`${weaponData.stats.element.power}`} icon={getElementIcon(weaponData.stats.element.type)} />)}
        {!!weaponData.stats.status && (<ItemStatWithIcon text={`${weaponData.stats.status.power}`} icon={getElementIcon(weaponData.stats.status.type)} />)}
      </GridSection>
    </>
  );
};

export default WeaponInfo;