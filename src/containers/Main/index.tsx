import React, { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Group, Space, Tabs } from '@mantine/core';
import { useGlobalContext } from '@/contexts/global';
import { BuildState } from '@/contexts/build/types';
import Builder from '@/containers/Builder';
import ExportModal from '@/components/ImportExport/ExportModal';
import ImportModal from '@/components/ImportExport/ImportModal';

export type MainProps = {};
const Main = ({ }: MainProps) => {
  const { state, dispatch } = useGlobalContext();
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);

  const activeBuild = useMemo<BuildState | null>(() => {
    const build = state.builds[state.activeBuildIndex];
    return build ?? null;
  }, [state.activeBuildIndex, state.builds]);

  const handleTabChange = useCallback((value: string | null) => {
    let index = state.builds.findIndex((build) => build.id === value);
    if (index === -1) {
      index = 0;
    }
    dispatch({ type: 'SET_ACTIVE_BUILD', index });
  }, [dispatch, state.builds]);

  const handleImportBuild = useCallback((encoding: string) => {
    dispatch({ type: 'IMPORT_BUILD', encoding });
  }, [dispatch]);

  const renderedTabs = useMemo(() => {
    return state.builds.map((build, index) => (
      <Tabs.Tab key={build.id} value={build.id} style={{ fontStyle: build.buildName ? 'normal' : 'italic' }}>
        {build.buildName || 'Unnamed'}
      </Tabs.Tab>
    ));
  }, [state.builds]);

  const renderedButtons = useMemo(() => {
    return (
      <Group>
        <Button
          color="success"
          onClick={() => { dispatch({ type: 'CREATE_BUILD' }); }}
        >
          New Build
        </Button>
        <Button
          onClick={() => { dispatch({ type: 'DUPLICATE_BUILD' }); }}
        >
          Duplicate Build
        </Button>
        <Button onClick={() => { setExportModalOpen(true); }}>
          Export Build
        </Button>
        <Button onClick={() => { setImportModalOpen(true); }}>
          Import Build
        </Button>
        <Button
          color="fail"
          style={{ marginLeft: 'auto' }}
          onClick={() => { dispatch({ type: 'DELETE_BUILD' }); }}
        >
          Delete Build
        </Button>
      </Group>
    );
  }, [dispatch]);

  return (
    <MainContainer>
      <Tabs variant="outline" value={activeBuild?.id ?? null} onTabChange={handleTabChange}>
        <Tabs.List>
          {renderedTabs}
        </Tabs.List>
        <Space h="md" />
        {renderedButtons}
        {activeBuild && (
          <>
            <Builder build={activeBuild} />
            <ExportModal
              opened={exportModalOpen}
              onClose={() => { setExportModalOpen(false); }}
              build={activeBuild}
            />
            <ImportModal
              opened={importModalOpen}
              onClose={() => { setImportModalOpen(false); }}
              omImport={handleImportBuild}
            />
          </>
        )}
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
