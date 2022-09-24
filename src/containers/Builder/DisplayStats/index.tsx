import React from 'react';
import styled from '@emotion/styled';
import { Divider, Paper, Space, Title, useMantineTheme } from '@mantine/core';
import { truncateFloat } from '@/util/number';
import { useBuildContext } from '@/contexts/build';

export type DisplayStatsProps = {};
const DisplayStats = ({}: DisplayStatsProps) => {
  const { calculatedSkills, calculatedStats } = useBuildContext();

  function renderSkills() {
    return (
      Object.entries(calculatedSkills)
        .sort((a, b) => {
          if (a[1].effectiveLevel > b[1].effectiveLevel) return -1;
          if (a[1].effectiveLevel < b[1].effectiveLevel) return 1;
          if (a[0] > b[0]) return 1;
          if (a[0] < b[0]) return -1;
          return 0;
        })
        .map(([name, { level, effectiveLevel, maxLevel }]) => (
          <SkillEntry key={name} name={name} level={level} maxLevel={maxLevel} />
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
      <StatEntry label="Effective Raw" value={100} />
      <StatEntry label="Raw" value={100} />
      <StatEntry label="Affinity" value={100} />
      <StatEntry label="Crit Multiplier" value={100} />
      <Divider my="sm" variant="dashed" />
      <StatEntry label="Effective Element" value={100} />
      <StatEntry label="Element" value={100} />
      <StatEntry label="Element Crit Multiplier" value={100} />
      <StatEntry label="Status" value={100} />
      <Space h="xs" />
      <Divider my="sm" />
      <Title order={5}>Defense</Title>
      <Space h="xs" />
      <StatEntry label="Defense" value={100} />
      <StatEntry label="Fire Res" value={100} />
      <StatEntry label="Water Res" value={100} />
      <StatEntry label="Thunder Res" value={100} />
      <StatEntry label="Ice Res" value={100} />
      <StatEntry label="Dragon Res" value={100} />
      <Space h="xs" />
      <Divider my="sm" />
      <Title order={5}>Sharpness</Title>
      <Space h="xs" />
      <StatEntry label="Raw Multiplier" value={100} />
      <StatEntry label="Elemental Multiplier" value={100} />
    </Paper>
  );
};

export default DisplayStats;

const StatEntry = ({ label, value, decimalPlaces }: { label: string, value: number, decimalPlaces?: number }) => {
  return (
    <StatEntryWrapper>
      <div>{label}</div>
      <div>{truncateFloat(value, decimalPlaces)}</div>
    </StatEntryWrapper>
  );
};

const StatEntryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
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
