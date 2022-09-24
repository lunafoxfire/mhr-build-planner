import React, { useState, useCallback, useMemo } from 'react';
import { Group, ModalProps, Space, TextInput } from '@mantine/core';
import { Search } from 'react-feather';
import { armorTable } from '@/assets/game-data';
import { Armor, ArmorType } from '@/assets/game-data/types';
import { capitalize } from '@/util/string';
import { compareSlots, getArmorByTypeAndRank, getArmorScore, getElementIcon, stringifyRank, stringifySkill, stringifySkillList } from '@/util/items';
import { useBuildContext } from '@/contexts/build';
import SortableTable, { DataColumn } from '@/components/SortableTable';
import GameIcon from '@/components/GameIcon';
import { SlotsDisplay, StyledModal, TableWrapper } from '../shared';

export type ArmorWithScore = {
  score: number,
} & Armor;

const TABLE_COLUMNS: Array<DataColumn<ArmorWithScore>> = [
  {
    key: 'score',
    label: 'Score',
    render: (item) => item.score ? item.score : null,
    sort: (a, b) => {
      if (a.score > b.score) return 1;
      if (a.score < b.score) return -1;
      return 0;
    },
  },
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
    key: 'fireRes',
    label: <GameIcon src={getElementIcon('fire')} size={24} />,
    render: (item) => item.stats.fireRes,
    sort: (a, b) => {
      if (a.stats.fireRes > b.stats.fireRes) return 1;
      if (a.stats.fireRes < b.stats.fireRes) return -1;
      return 0;
    },
  },
  {
    key: 'waterRes',
    label: <GameIcon src={getElementIcon('water')} size={24} />,
    render: (item) => item.stats.waterRes,
    sort: (a, b) => {
      if (a.stats.waterRes > b.stats.waterRes) return 1;
      if (a.stats.waterRes < b.stats.waterRes) return -1;
      return 0;
    },
  },
  {
    key: 'thunderRes',
    label: <GameIcon src={getElementIcon('thunder')} size={24} />,
    render: (item) => item.stats.thunderRes,
    sort: (a, b) => {
      if (a.stats.thunderRes > b.stats.thunderRes) return 1;
      if (a.stats.thunderRes < b.stats.thunderRes) return -1;
      return 0;
    },
  },
  {
    key: 'iceRes',
    label: <GameIcon src={getElementIcon('ice')} size={24} />,
    render: (item) => item.stats.iceRes,
    sort: (a, b) => {
      if (a.stats.iceRes > b.stats.iceRes) return 1;
      if (a.stats.iceRes < b.stats.iceRes) return -1;
      return 0;
    },
  },
  {
    key: 'dragonRes',
    label: <GameIcon src={getElementIcon('dragon')} size={24} />,
    render: (item) => item.stats.dragonRes,
    sort: (a, b) => {
      if (a.stats.dragonRes > b.stats.dragonRes) return 1;
      if (a.stats.dragonRes < b.stats.dragonRes) return -1;
      return 0;
    },
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
    key: 'skills',
    label: 'Skills',
    render: (item) => item.skills.map((skill) => (
      <div key={skill.name}>{stringifySkill(skill)}</div>
    )),
    sort: (a, b) => {
      const aText = stringifySkillList(a.skills);
      const bText = stringifySkillList(b.skills);
      if (aText > bText) return 1;
      if (aText < bText) return -1;
      return 0;
    },
  },
];

function getItemKey(item: Armor) {
  return item.name;
}

export type SelectArmorModalProps = {
  armorType: ArmorType,
  onSelectItem: (value: string) => void,
} & ModalProps;
const SelectArmorModal = ({ armorType, onSelectItem, ...modalProps }: SelectArmorModalProps) => {
  const { state } = useBuildContext();
  const [search, setSearch] = useState<string>('');


  const handleSelectItem = useCallback((item: Armor) => {
    onSelectItem(item.name);
    modalProps.onClose();
  }, [modalProps, onSelectItem]);

  const handleFilter = useCallback((item: Armor) => {
    return item.name.toLowerCase().includes(search.toLowerCase())
      || stringifySkillList(item.skills).toLowerCase().includes(search.toLowerCase());
  }, [search]);

  const tableData = useMemo(() => {
    const data: ArmorWithScore[] = [];
    getArmorByTypeAndRank(armorType, state.targetRank)
      .forEach((itemName) => {
        const itemData = armorTable[itemName];
        if (itemData) {
          data.push({
            ...itemData,
            score: getArmorScore(itemData, state.prioritySkills),
          });
        }
      });
    return data.sort((a, b) => b.score - a.score);
  }, [armorType, state.prioritySkills, state.targetRank]);

  return (
    <StyledModal
      title="Select Armor"
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
          style={{ width: '350px' }}
        />
        <TextInput
          value={capitalize(armorType.toLowerCase())}
          disabled
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

export default SelectArmorModal;
