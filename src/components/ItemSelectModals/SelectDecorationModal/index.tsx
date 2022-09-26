import React, { useEffect, useMemo, useState } from 'react';
import { Group, ModalProps, Space, TextInput } from '@mantine/core';
import { Search } from 'react-feather';
import { decorationTable, rampageDecorationTable } from '@/assets/game-data';
import { Decoration, RampageDecoration } from '@/assets/game-data/types';
import { getDecorationSlotIcon, stringifySkill } from '@/util/items';
import { usePrevious } from '@/hooks/usePrevious';
import SortableTable, { DataColumn } from '@/components/SortableTable';
import GameIcon from '@/components/GameIcon';
import { StyledModal, TableWrapper } from '../shared';

const DECO_TABLE_DATA = (Object.values(decorationTable) as Decoration[]).sort((a, b) => b.size - a.size);
const RAMPAGE_DECO_TABLE_DATA = (Object.values(rampageDecorationTable) as RampageDecoration[]).sort((a, b) => b.size - a.size);

const DECO_TABLE_COLUMNS: Array<DataColumn<Decoration>> = [
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
    key: 'size',
    label: 'Size',
    render: (item) => {
      const icon = getDecorationSlotIcon(item.size);
      return <GameIcon src={icon} size={20} />;
    },
    sort: (a, b) => {
      if (a.size > b.size) return 1;
      if (a.size < b.size) return -1;
      return 0;
    },
  },
  {
    key: 'skill',
    label: 'Skill',
    render: (item) => stringifySkill(item.skill),
    sort: (a, b) => {
      if (stringifySkill(a.skill) > stringifySkill(b.skill)) return 1;
      if (stringifySkill(a.skill) < stringifySkill(b.skill)) return -1;
      return 0;
    },
  },
];

const RAMPAGE_DECO_TABLE_COLUMNS: Array<DataColumn<RampageDecoration>> = [
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
    key: 'size',
    label: 'Size',
    render: (item) => {
      const icon = getDecorationSlotIcon(item.size);
      return <GameIcon src={icon} size={20} />;
    },
    sort: (a, b) => {
      if (a.size > b.size) return 1;
      if (a.size < b.size) return -1;
      return 0;
    },
  },
  {
    key: 'skill',
    label: 'Skill',
    render: (item) => item.skill,
    sort: (a, b) => {
      if (a.skill > b.skill) return 1;
      if (a.skill < b.skill) return -1;
      return 0;
    },
  },
];

function getItemKey(item: Decoration | RampageDecoration) {
  return item.name;
}

export type SelectDecorationModalProps = {
  rampage?: boolean,
  slotSize: number,
  onSelectItem: (value: string) => void,
} & ModalProps;
const SelectDecorationModal = ({ rampage, slotSize, onSelectItem, opened, ...modalProps }: SelectDecorationModalProps) => {
  const [search, setSearch] = useState<string>('');

  const prevOpened = usePrevious(opened);
  useEffect(() => {
    if (!prevOpened && opened) {
      setSearch('');
    }
  }, [opened, prevOpened]);

  const renderedTable = useMemo(() => {
    if (rampage) {
      return (
        <SortableTable
          key='rampage-deco-table'
          columns={RAMPAGE_DECO_TABLE_COLUMNS}
          data={RAMPAGE_DECO_TABLE_DATA}
          getItemKey={getItemKey}
          onSelectItem={(item) => { onSelectItem(item.name); modalProps.onClose(); }}
          filter={(item) => {
            if (item.size > slotSize) return false;
            return item.name.toLowerCase().includes(search.toLowerCase())
              || item.skill.toLowerCase().includes(search.toLowerCase());
          }}
        />
      );
    }
    return (
      <SortableTable
        key='deco-table'
        columns={DECO_TABLE_COLUMNS}
        data={DECO_TABLE_DATA}
        getItemKey={getItemKey}
        onSelectItem={(item) => { onSelectItem(item.name); modalProps.onClose(); }}
        filter={(item) => {
          if (item.size > slotSize) return false;
          return item.name.toLowerCase().includes(search.toLowerCase())
            || item.skill.name.toLowerCase().includes(search.toLowerCase());
        }}
      />
    );
  }, [modalProps, onSelectItem, rampage, search, slotSize]);

  return (
    <StyledModal
      title="Select Decoration"
      centered
      opened={opened}
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
          data-autofocus
        />
      </Group>
      <Space h="md" />
      <TableWrapper>
        {renderedTable}
      </TableWrapper>
    </StyledModal>
  );
};

export default SelectDecorationModal;
