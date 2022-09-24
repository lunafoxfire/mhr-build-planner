import React, { useCallback, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { Space, Tabs } from '@mantine/core';
import { useGlobalContext } from '@/contexts/global';
import { BuildState } from '@/contexts/build/types';
import Builder from '@/containers/Builder';

export type MainProps = {};
const Main = ({ }: MainProps) => {
  const { state, dispatch } = useGlobalContext();

  useEffect(() => {
    if (state.builds.length === 0) {
      dispatch({ type: 'CREATE_BUILD_IF_NONE' });
    }
  }, [dispatch, state.builds]);

  const onBuildUpdate = useCallback((data: BuildState) => {
    dispatch({ type: 'UPDATE_BUILD', data });
  }, [dispatch]);

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
        <Builder build={build} onBuildUpdate={onBuildUpdate} />
      </Tabs.Panel>
    ));
  }, [onBuildUpdate, state.builds]);

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
