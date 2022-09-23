import React, { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Divider, Paper, Select, Title, Text, Space } from '@mantine/core';
import { X } from 'react-feather';
import { skillTable } from '@/assets/game-data';
import { useBuildContext } from '@/contexts/build';
import ClickableDiv from '@/components/ClickableDiv';

const SKILL_OPTIONS = Object.keys(skillTable).sort();

const RANK_OPTIONS = [
  { value: 'master', label: 'Master Rank' },
  { value: 'high', label: 'High Rank' },
  { value: 'low', label: 'Low Rank' },
];

export interface SelectSkillsProps {};
const SelectSkills = ({}: SelectSkillsProps) => {
  const { state, dispatch } = useBuildContext();
  const [searchValue, setSearchValue] = useState<string>('');
  const reduceMotion = useReducedMotion();

  const handleAddSkill = useCallback((name: string) => {
    dispatch({ type: 'ADD_PRIORITY_SKILL', name });
    setSearchValue('');
  }, [dispatch]);

  const handleRemoveSkill = useCallback((name: string) => {
    dispatch({ type: 'REMOVE_PRIORITY_SKILL', name });
  }, [dispatch]);

  const handleSetRank = useCallback((rank: string) => {
    dispatch({ type: 'SET_TARGET_RANK', rank });
  }, [dispatch]);

  const skillOptions = useMemo(() => {
    return SKILL_OPTIONS.filter((s) => !state.prioritySkills.includes(s));
  }, [state.prioritySkills]);

  function renderSelectedSkills() {
    return state.prioritySkills.map((skill) => (
      <SkillCard
        key={skill}
        role="listitem"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.1,
          layout: { duration: 0.06 },
        }}
        layout={!reduceMotion}
      >
        <SkillText>
          <Text size="sm">
            {skill}
          </Text>
        </SkillText>
        <SkillIcon onActivate={() => { handleRemoveSkill(skill); }}>
          <X size={13} />
        </SkillIcon>
      </SkillCard>
    ));
  }

  return (
    <Paper shadow="md" p="md">
      <Title order={4}>Rank</Title>
      <Space h="md" />
      <Select
        aria-label='Select rank'
        data={RANK_OPTIONS}
        value={state.targetRank}
        onChange={handleSetRank}
      />
      <Space h="md" />
      <Divider my="sm" />

      <Title order={4}>Target Skills</Title>
      <Space h="md" />
      <Select
        aria-label='Select a skill to add'
        placeholder='Type to search'
        data={skillOptions}
        value={null}
        onChange={handleAddSkill}
        searchable
        onSearchChange={setSearchValue}
        searchValue={searchValue}
        nothingFound="No results"
      />
      <Divider my="sm" variant='dashed'/>
      <SkillList role="list">
        <AnimatePresence>
          {renderSelectedSkills()}
        </AnimatePresence>
      </SkillList>
    </Paper>
  );
};

export default SelectSkills;

const SkillList = styled.div`
  list-style: none;
`;

const SkillCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.dark[6]};
  padding: 10px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SkillText = styled.div`
  flex: 0 0 auto;
`;

const SkillIcon = styled(ClickableDiv)`
  flex: 0 0 auto;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.dark[4]};

  :hover {
    background: ${({ theme }) => theme.colors.dark[3]};
  }
`;
