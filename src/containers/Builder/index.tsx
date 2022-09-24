import React from 'react';
import styled from '@emotion/styled';
import { Group } from '@mantine/core';
import { BuildContextProvider } from '@/contexts/build';
import SelectSkills from './SelectSkills';
import SelectEquipment from './SelectEquipment';
import DisplayStats from './DisplayStats';

export type BuilderProps = {};
const Builder = ({}: BuilderProps) => {
  return (
    <BuildContextProvider>
      <BuilderContainer position='center' align='flex-start'>
        <BuilderSection flex={1} minWidth={230}>
          <SelectSkills />
        </BuilderSection>
        <BuilderSection flex={3} minWidth={600}>
          <SelectEquipment />
        </BuilderSection>
        <BuilderSection flex={1} minWidth={230}>
          <DisplayStats />
        </BuilderSection>
      </BuilderContainer>
    </BuildContextProvider>
  );
};

export default Builder;

const BuilderContainer = styled(Group)`
  flex: 0 0 100%;
  max-width: 1800px;
  flex-wrap: nowrap;
  padding: 20px;
`;

const BuilderSection = styled.div<{ flex: number, minWidth: number }>`
  flex: ${({ flex }) => flex};
  min-width: ${({ minWidth }) => minWidth}px;
`;
