import React from 'react';
import styled from '@emotion/styled';
import { Group, Space } from '@mantine/core';
import { BuildContextProvider } from '@/contexts/build';
import { BuildState } from '@/contexts/build/types';
import SelectSkills from './SelectSkills';
import SelectEquipment from './SelectEquipment';
import DisplayStats from './DisplayStats';

export type BuilderProps = {
  build: BuildState,
};
const Builder = ({ build }: BuilderProps) => {
  return (
    <BuildContextProvider build={build}>
      <Space h="md" />
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
  flex-wrap: nowrap;

  @media only screen and (max-width: 1600px) {
    & {
      justify-content: flex-start;
    }
  }
`;

const BuilderSection = styled.div<{ flex: number, minWidth: number }>`
  flex: ${({ flex }) => flex};
  min-width: ${({ minWidth }) => minWidth}px;
`;
