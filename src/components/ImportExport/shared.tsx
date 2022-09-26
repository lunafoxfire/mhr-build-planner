import styled from '@emotion/styled';
import { Modal, ModalProps } from '@mantine/core';

export const StyledModal = styled<(props: ModalProps) => JSX.Element>(Modal)`
  .mantine-Modal-modal {
    margin-left: 150px;
    margin-right: 150px;
    width: 100%;
    width: 800px;

    border: 3px solid ${({ theme }) => theme.colors.dark[4]};
  }
`;
