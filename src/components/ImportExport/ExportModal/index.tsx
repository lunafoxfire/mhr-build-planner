import React, { useCallback, useMemo, useState } from 'react';
import { Button, ModalProps, Popover, Space, Text, Textarea } from '@mantine/core';
import { BuildState } from '@/contexts/build/types';
import { StyledModal } from '../shared';

export type ExportModalProps = {
  build: BuildState,
} & ModalProps;
const ExportModal = ({ build, ...modalProps }: ExportModalProps) => {
  const [popoverOpened, setPopoverOpened] = useState(false);

  const encoding = useMemo(() => {
    let encoding = '';
    try {
      encoding = btoa(JSON.stringify(build));
    } catch {}
    return encoding;
  }, [build]);

  const handleCopyClicked = useCallback(() => {
    if (encoding) {
      void navigator.clipboard.writeText(encoding);
      setPopoverOpened(true);
    }
  }, [encoding]);

  return (
    <StyledModal
      title="Export Build"
      centered
      {...modalProps}
    >
      <Text size="sm">Copy this code to save your build</Text>
      <Space h="md" />
      <Popover
        opened={popoverOpened}
        onChange={setPopoverOpened}
        position='right'
        withArrow
      >
        <Popover.Target>
          <Textarea
            value={encoding}
            readOnly
            onClick={handleCopyClicked}
            minRows={6}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <Text style={{ width: 'max-content' }}>Copied!</Text>
        </Popover.Dropdown>
      </Popover>
      <Space h="md" />
      <Button onClick={handleCopyClicked}>
        Copy to Clipboard
      </Button>
    </StyledModal>
  );
};

export default ExportModal;
