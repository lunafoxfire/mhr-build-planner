import React, { useCallback, useRef } from 'react';
import { Button, ModalProps, Space, Text, Textarea } from '@mantine/core';
import { StyledModal } from '../shared';

export type ImportModalProps = {
  omImport: (encoding: string) => void,
} & ModalProps;
const ImportModal = ({ omImport, ...modalProps }: ImportModalProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>();

  const handleImportClicked = useCallback(() => {
    const value = textAreaRef?.current?.value;
    if (value) {
      omImport(value);
    }
    modalProps.onClose();
  }, [omImport, modalProps]);

  return (
    <StyledModal
      title="Import Build"
      centered
      {...modalProps}
    >
      <Text size="sm">Paste code below to import a build</Text>
      <Space h="md" />
      <Textarea
        ref={textAreaRef as any}
        minRows={6}
        data-autofocus
      />
      <Space h="md" />
      <Button onClick={handleImportClicked}>
        Import
      </Button>
    </StyledModal>
  );
};

export default ImportModal;
