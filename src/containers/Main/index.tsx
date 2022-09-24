import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { Space, Tabs } from '@mantine/core';
import { useGlobalContext } from '@/contexts/global';
import Builder from '@/containers/Builder';

export type MainProps = {};
const Main = ({ }: MainProps) => {
  const { state, dispatch } = useGlobalContext();

  const renderedTabs = useMemo(() => {
    return state.builds.map((build) => (
      <Tabs.Tab key={build.id} value={build.id} style={{ fontStyle: build.buildName ? 'normal' : 'italic' }}>
        {build.buildName || 'New Build'}
      </Tabs.Tab>
    ));
  }, [state.builds]);

  const renderedTabPanels = useMemo(() => {
    return state.builds.map((build) => (
      <Tabs.Panel key={build.id} value={build.id}>
        <Builder build={build} />
      </Tabs.Panel>
    ));
  }, [state.builds]);

  return (
    <MainContainer>
      <Tabs value={state.activeTab} onTabChange={(value) => { dispatch({ type: 'SET_ACTIVE_TAB', id: value }); }}>
        <Tabs.List>
          {renderedTabs}
        </Tabs.List>
        <Space h="md" />
        {renderedTabPanels}
      </Tabs>
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1800px;
  padding: 20px;
  margin: auto;

  @media only screen and (max-width: 1600px) {
    & {
      justify-content: flex-start;
    }
  }
`;
