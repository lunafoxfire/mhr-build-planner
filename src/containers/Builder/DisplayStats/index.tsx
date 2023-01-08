import React from 'react';
import styled from '@emotion/styled';
import { Checkbox, Divider, Paper, Space, Title, useMantineTheme } from '@mantine/core';
import { weaponTable } from '@/assets/game-data';
import { truncateFloat } from '@/util/number';
import { getElementIcon } from '@/util/items';
import { DEFAULT_ACTIVE_SKILLS } from '@/util/items/defaultActiveSkills';
import { useBuildContext } from '@/contexts/build';
import SharpnessBar from '@/components/SharpnessBar';
import { CalculatedSkill } from '@/contexts/build/types';
import GameIcon from '@/components/GameIcon';

export type DisplayStatsProps = {};
const DisplayStats = ({}: DisplayStatsProps) => {
  const { build, dispatch, calculatedSkills, calculatedStats } = useBuildContext();

  const weaponInfo = weaponTable[build.weapon.name];

  function renderSkills() {
    return (
      (Object.entries(calculatedSkills) as Array<[string, CalculatedSkill]>)
        .sort((a, b) => {
          if (a[1].effectiveLevel > b[1].effectiveLevel) return -1;
          if (a[1].effectiveLevel < b[1].effectiveLevel) return 1;
          if (a[0] > b[0]) return 1;
          if (a[0] < b[0]) return -1;
          return 0;
        })
        .map(([name, { level, maxLevel }]) => (
          <SkillWrapper key={name}>
            <SkillEntry name={name} level={level} maxLevel={maxLevel} />
            <Checkboxbox>
              {DEFAULT_ACTIVE_SKILLS[name] != null && (
                <Checkbox
                  checked={build.activeSkills[name] != null ? !!build.activeSkills[name] : !!DEFAULT_ACTIVE_SKILLS[name]}
                  onChange={(e) => { dispatch({ type: 'SET_ACTIVE_SKILL', skill: name, value: e.target.checked }); }}
                />
              )}
            </Checkboxbox>
          </SkillWrapper>
        ))
    );
  }

  return (
    <Paper shadow="md" p="md">
      <Title order={5}>Skills</Title>
      <Space h="xs" />
      {renderSkills()}
      <Space h="xs" />
      <Divider my="sm" />
      <Title order={5}>Damage</Title>
      <Space h="xs" />
      <StatEntry label="Effective Raw" value={calculatedStats.effectiveRaw} />
      <StatEntry label="Raw" value={calculatedStats.raw} />
      <StatEntry label="Affinity" value={calculatedStats.affinity} suffix="%" />
      <StatEntry label="Crit Multiplier" value={calculatedStats.critMultiplier} />
      <Divider my="sm" variant="dashed" />
      <StatEntry label="Effective Element" value={calculatedStats.effectiveElement} icon={weaponInfo?.stats.element ? getElementIcon(weaponInfo.stats.element.type) : undefined } />
      <StatEntry label="Element" value={calculatedStats.element} icon={weaponInfo?.stats.element ? getElementIcon(weaponInfo.stats.element.type) : undefined} />
      <StatEntry label="Element Crit Multiplier" value={calculatedStats.elementCritMultiplier} />
      <StatEntry label="Status" value={calculatedStats.status} icon={weaponInfo?.stats.status ? getElementIcon(weaponInfo.stats.status.type) : undefined} />
      <Space h="xs" />
      <Divider my="sm" />
      <Title order={5}>Defense</Title>
      <Space h="xs" />
      <StatEntry label="Defense" value={calculatedStats.defense} />
      <StatEntry label="Fire Res" value={calculatedStats.fireRes} icon={getElementIcon('fire')} />
      <StatEntry label="Water Res" value={calculatedStats.waterRes} icon={getElementIcon('water')} />
      <StatEntry label="Thunder Res" value={calculatedStats.thunderRes} icon={getElementIcon('thunder')} />
      <StatEntry label="Ice Res" value={calculatedStats.iceRes} icon={getElementIcon('ice')} />
      <StatEntry label="Dragon Res" value={calculatedStats.dragonRes} icon={getElementIcon('dragon')} />
      <Space h="xs" />
      <Divider my="sm" />
      <Title order={5}>Sharpness</Title>
      <Space h="xs" />
      <StatEntry label="Raw Multiplier" value={calculatedStats.sharpnessMultipliers.raw} />
      <StatEntry label="Elemental Multiplier" value={calculatedStats.sharpnessMultipliers.elemental} />
      <Space h="xs" />
      <SharpnessBar height={24} scale={0.5} sharpness={weaponInfo?.sharpness ?? []} maxSharpness={weaponInfo?.maxSharpness ?? []} currentSharpness={calculatedStats.sharpness} />
    </Paper>
  );
};

export default DisplayStats;

const StatEntry = ({ label, value, decimalPlaces, suffix, icon }: { label: string, value: number, decimalPlaces?: number, suffix?: string, icon?: string }) => {
  return (
    <StatEntryWrapper>
      <div>{label}</div>
      <StatIconWrapper>
        {icon && <GameIcon src={icon} size={18} style={{ marginRight: '5px' }} />}
        <div>{truncateFloat(value, decimalPlaces)}{suffix ?? ''}</div>
      </StatIconWrapper>
    </StatEntryWrapper>
  );
};

const StatEntryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const StatIconWrapper = styled.div`
  display: flex;
`;

const SkillEntry = ({ name, level, maxLevel }: { name: string, level: number, maxLevel: number }) => {
  const theme = useMantineTheme();
  const color
  = (level > maxLevel) ? theme.colors.fail[6]
    : (level === maxLevel) ? theme.colors.success[6]
        : theme.colors.dark[0];

  const barJSX = [];
  for (let i = 1; i <= maxLevel; i++) {
    let markColor = color;
    if (i > level) {
      markColor = theme.colors.dark[4];
    }
    barJSX.push(<StatLevelMark key={Math.random()} color={markColor} />);
  }
  return (
    <SkillEntryWrapper>
      <SkillLabel color={color}>{name}</SkillLabel>
      <StatLevelBar>
        {barJSX}
      </StatLevelBar>
    </SkillEntryWrapper>
  );
};

const SkillEntryWrapper = styled.div`
  margin-bottom: 5px;
`;

const SkillLabel = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 14px;
  margin-bottom: 1px;
`;

const StatLevelBar = styled.div`
  display: flex;
  transform: skewX(-10deg);
`;

const StatLevelMark = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  width: 12px;
  height: 15px;
  margin-right: 6px;
`;

const SkillWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Checkboxbox = styled.div`
  position: relative;
  top: 8px;

  .mantine-Checkbox-input {
    cursor: pointer;
  }
`;
