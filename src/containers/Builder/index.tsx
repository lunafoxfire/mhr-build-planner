import React from 'react';
import styled from '@emotion/styled';
import { Group } from '@mantine/core';
import { BuildContextProvider } from '@/contexts/build';
import SelectSkills from './SelectSkills';
import SelectEquipment from './SelectEquipment';
import DisplaySkills from './DisplaySkills';
import DisplayStats from './DisplayStats';

export interface BuilderProps {};
const Builder = ({}: BuilderProps) => {
  return (
    <BuildContextProvider>
      <BuilderContainer position='center' align='flex-start'>
        <BuilderSection flex={2} minWidth={0}>
          <SelectSkills />
        </BuilderSection>
        <BuilderSection flex={4} minWidth={0}>
          <SelectEquipment />
        </BuilderSection>
        <BuilderSection flex={2} minWidth={0}>
          <DisplaySkills />
        </BuilderSection>
        <BuilderSection flex={2} minWidth={0}>
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
`;

const BuilderSection = styled.div<{ flex: number, minWidth: number }>`
  flex: ${({ flex }) => flex};
  min-width: ${({ minWidth }) => minWidth}px;
`;
