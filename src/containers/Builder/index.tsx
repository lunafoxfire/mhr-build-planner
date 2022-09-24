import React from 'react';
import styled from '@emotion/styled';
import { Button, Group, Space } from '@mantine/core';
import { useGlobalContext } from '@/contexts/global';
import { BuildContextProvider } from '@/contexts/build';
import { BuildState } from '@/contexts/build/types';
import SelectSkills from './SelectSkills';
import SelectEquipment from './SelectEquipment';
import DisplayStats from './DisplayStats';

export type BuilderProps = {
  build: BuildState,
  onBuildUpdate: (data: BuildState) => void,
};
const Builder = ({ build, onBuildUpdate }: BuilderProps) => {
  const { dispatch } = useGlobalContext();
  return (
    <BuildContextProvider build={build} onBuildUpdate={onBuildUpdate}>
      <Group>
        <Button
          color="success"
          onClick={() => { dispatch({ type: 'CREATE_BUILD' }); }}
        >
          New Build
        </Button>
        <Button
          onClick={() => { dispatch({ type: 'DUPLICATE_BUILD', id: build.id }); }}
        >
          Duplicate Build
        </Button>
        <Button>
          Export Build
        </Button>
        <Button>
          Import Build
        </Button>
        <Button
          color="fail"
          style={{ marginLeft: 'auto' }}
          onClick={() => { dispatch({ type: 'DELETE_BUILD', id: build.id }); }}
        >
          Delete Build
        </Button>
      </Group>
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
