import React, { useCallback, useMemo, useState } from 'react';
import { Group, ModalProps, Select, Space, TextInput } from '@mantine/core';
import { Search } from 'react-feather';
import { weaponTable } from '@/assets/game-data';
import { Weapon } from '@/assets/game-data/types';
import { compareElements, compareSlots, getWeaponsByTypeAndRank, stringifyRank } from '@/util/items';
import { useBuildContext } from '@/contexts/build';
import SortableTable, { DataColumn } from '@/components/SortableTable';
import { ElementDisplay, SlotsDisplay, StyledModal, TableWrapper } from '../shared';

const WEAPON_TYPE_OPTIONS = [
  { value: 'GREAT_SWORD', label: 'Great Sword' },
  { value: 'SWORD_AND_SHIELD', label: 'Sword and Shield' },
  { value: 'DUAL_BLADES', label: 'Dual Blades' },
  { value: 'LONG_SWORD', label: 'Long Sword' },
  { value: 'HAMMER', label: 'Hammer' },
  { value: 'HUNTING_HORN', label: 'Hunting Horn' },
  { value: 'LANCE', label: 'Lance' },
  { value: 'GUNLANCE', label: 'Gunlance' },
  { value: 'SWITCH_AXE', label: 'Switch Axe' },
  { value: 'CHARGE_BLADE', label: 'Charge Blade' },
  { value: 'INSECT_GLAIVE', label: 'Insect Glaive' },
  { value: 'BOW', label: 'Bow' },
  { value: 'HEAVY_BOWGUN', label: 'Heavy Bowgun' },
  { value: 'LIGHT_BOWGUN', label: 'Light Bowgun' },
];

const TABLE_COLUMNS: Array<DataColumn<Weapon>> = [
  {
    key: 'name',
    label: 'Name',
    render: (item) => item.name,
    sort: (a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    },
  },
  {
    key: 'attack',
    label: 'Atk',
    render: (item) => item.stats.attack,
    sort: (a, b) => {
      if (a.stats.attack > b.stats.attack) return 1;
      if (a.stats.attack < b.stats.attack) return -1;
      return 0;
    },
  },
  {
    key: 'affinity',
    label: 'Aff',
    render: (item) => `${item.stats.affinity}%`,
    sort: (a, b) => {
      if (a.stats.affinity > b.stats.affinity) return 1;
      if (a.stats.affinity < b.stats.affinity) return -1;
      return 0;
    },
  },
  {
    key: 'defense',
    label: 'Def',
    render: (item) => item.stats.defense,
    sort: (a, b) => {
      if (a.stats.defense > b.stats.defense) return 1;
      if (a.stats.defense < b.stats.defense) return -1;
      return 0;
    },
  },
  {
    key: 'element',
    label: 'Element',
    render: (item) => <ElementDisplay element={item.stats.element} />,
    sort: (a, b) => compareElements(a.stats.element, b.stats.element),
  },
  {
    key: 'status',
    label: 'Status',
    render: (item) => <ElementDisplay element={item.stats.status} />,
    sort: (a, b) => compareElements(a.stats.status, b.stats.status),
  },
  {
    key: 'slots',
    label: 'Slots',
    render: (item) => <SlotsDisplay slots={item.slots} />,
    sort: (a, b) => {
      return compareSlots(a.slots, b.slots);
    },
  },
  {
    key: 'rampage-slots',
    label: 'Rampage Slots',
    render: (item) => <SlotsDisplay slots={item.rampageSlots} />,
    sort: (a, b) => {
      return compareSlots(a.rampageSlots, b.rampageSlots);
    },
  },
];

function getItemKey(item: Weapon) {
  return item.name;
}

export type SelectWeaponModalProps = {
  onSelectItem: (value: string) => void,
} & ModalProps;
const SelectWeaponModal = ({ onSelectItem, ...modalProps }: SelectWeaponModalProps) => {
  const { state } = useBuildContext();
  const [search, setSearch] = useState<string>('');
  const [weaponType, setWeaponType] = useState<string | null>('GREAT_SWORD');

  const handleSelectItem = useCallback((item: Weapon) => {
    onSelectItem(item.name);
    modalProps.onClose();
  }, [modalProps, onSelectItem]);

  const handleFilter = useCallback((item: Weapon) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  }, [search]);

  const tableData = useMemo(() => {
    const data: Weapon[] = [];
    getWeaponsByTypeAndRank(weaponType, state.targetRank)
      .forEach((itemName) => {
        const itemData = weaponTable[itemName];
        if (itemData) {
          data.push(itemData);
        }
      });
    return data;
  }, [state.targetRank, weaponType]);

  return (
    <StyledModal
      title="Select Weapon"
      centered
      {...modalProps}
    >
      <Group>
        <TextInput
          aria-label='search'
          placeholder='Type to search'
          value={search}
          onChange={(e) => { setSearch(e.currentTarget.value); }}
          icon={<Search size={14} />}
          style={{ width: '400px' }}
        />
        <Select
          value={weaponType}
          onChange={setWeaponType}
          data={WEAPON_TYPE_OPTIONS}
        />
        <TextInput
          value={stringifyRank(state.targetRank)}
          disabled
        />
      </Group>
      <Space h="md" />
      <TableWrapper>
        <SortableTable
          columns={TABLE_COLUMNS}
          data={tableData}
          getItemKey={getItemKey}
          onSelectItem={handleSelectItem}
          filter={handleFilter}
        />
      </TableWrapper>
    </StyledModal>
  );
};

export default SelectWeaponModal;
