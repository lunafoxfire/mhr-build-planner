import React, { useState } from 'react';
import { Button, Divider, Group, ModalProps, Select, Space, Text } from '@mantine/core';
import { skillTable } from '@/assets/game-data';
import { StyledModal } from '../shared';

const SKILL_OPTIONS = Object.keys(skillTable).sort();

const SLOT_OPTIONS = [
  { value: null, label: '---' },
  { value: '3', label: '3' },
  { value: '2', label: '2' },
  { value: '1', label: '1' },
];

function getLevelOptions(skill: string | null) {
  if (!skill) return [];
  const skillData = skillTable[skill];
  const options = [];
  for (let i = 0; i < skillData.levels.length; i++) {
    options.push(`${i + 1}`);
  }
  return options;
}

export type InProgressTalisman = {
  skill1Name: string | null,
  skill1Level: string | null,
  skill2Name: string | null,
  skill2Level: string | null,
  slot1Size: string | null,
  slot2Size: string | null,
  slot3Size: string | null,
};

export type CreateTalismanModalProps = {
  onCreate: (value: InProgressTalisman) => void,
} & ModalProps;
const CreateTalismanModal = ({ onCreate, ...modalProps }: CreateTalismanModalProps) => {
  const [talisman, setTalisman] = useState<InProgressTalisman>({
    skill1Name: null,
    skill1Level: null,
    skill2Name: null,
    skill2Level: null,
    slot1Size: null,
    slot2Size: null,
    slot3Size: null,
  });

  return (
    <StyledModal
      title="Create Talisman"
      centered
      maxWidth="900px"
      {...modalProps}
    >
      <Divider my="sm" />
      <Text>Select the skills your talisman has:</Text>
      <Space h="md" />
      <Group>
        <Select
          label='Skill 1'
          data={SKILL_OPTIONS}
          value={talisman.skill1Name}
          onChange={(val) => { setTalisman((prevTalisman) => ({ ...prevTalisman, skill1Name: val, skill1Level: val ? '1' : null })); }}
          placeholder='Type to search'
          searchable
          nothingFound="No results"
          clearable
          style={{ width: '300px' }}
        />
        <Select
          label='Level'
          data={getLevelOptions(talisman.skill1Name)}
          value={talisman.skill1Level}
          onChange={(val) => { setTalisman((prevTalisman) => ({ ...prevTalisman, skill1Level: val })); }}
          disabled={!talisman.skill1Name}
          style={{ width: '80px' }}
        />
      </Group>
      <Space h="md" />
      <Group>
        <Select
          label='Skill 2'
          data={SKILL_OPTIONS}
          value={talisman.skill2Name}
          onChange={(val) => { setTalisman((prevTalisman) => ({ ...prevTalisman, skill2Name: val, skill2Level: val ? '1' : null })); }}
          placeholder='Type to search'
          searchable
          nothingFound="No results"
          clearable
          style={{ width: '300px' }}
        />
        <Select
          label='Level'
          data={getLevelOptions(talisman.skill2Name)}
          value={talisman.skill2Level}
          onChange={(val) => { setTalisman((prevTalisman) => ({ ...prevTalisman, skill2Level: val })); }}
          disabled={!talisman.skill2Name}
          style={{ width: '80px' }}
        />
      </Group>
      <Space h="md" />
      <Divider my="sm" />
      <Text>Select the decoration slots your talisman has:</Text>
      <Space h="md" />
      <Group>
        <Select
          label="Slot 1"
          data={(SLOT_OPTIONS as any)}
          value={talisman.slot1Size}
          onChange={(val) => { setTalisman((prevTalisman) => ({ ...prevTalisman, slot1Size: val })); }}
          style={{ width: '100px', marginRight: '10px' }}
        />
        <Select
          label="Slot 2"
          data={(SLOT_OPTIONS as any)}
          value={talisman.slot2Size}
          onChange={(val) => { setTalisman((prevTalisman) => ({ ...prevTalisman, slot2Size: val })); }}
          style={{ width: '100px', marginRight: '10px' }}
        />
        <Select
          label="Slot 3"
          data={(SLOT_OPTIONS as any)}
          value={talisman.slot3Size}
          onChange={(val) => { setTalisman((prevTalisman) => ({ ...prevTalisman, slot3Size: val })); }}
          style={{ width: '100px', marginRight: '10px' }}
        />
      </Group>
      <Space h="md" />
      <Divider my="sm" />
      <Button onClick={() => { onCreate(talisman); modalProps.onClose(); }}>
        Save
      </Button>
    </StyledModal>
  );
};

export default CreateTalismanModal;
