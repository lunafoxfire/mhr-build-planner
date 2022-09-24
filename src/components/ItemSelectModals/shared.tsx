import React from 'react';
import styled from '@emotion/styled';
import { Modal, ModalProps } from '@mantine/core';
import { WeaponElement } from '@/assets/game-data/types';
import { getElementIcon, getDecorationSlotIcon } from '@/util/items';
import GameIcon from '../GameIcon';

export const StyledModal = styled<(props: ModalProps & { maxWidth?: string }) => JSX.Element>(Modal)`
  .mantine-Modal-modal {
    margin-left: 150px;
    margin-right: 150px;
    width: 100%;
    max-width: ${({ maxWidth }) => maxWidth || '1200px'};
    min-width: 850px;

    border: 3px solid ${({ theme }) => theme.colors.dark[4]};
  }
`;

export const TableWrapper = styled.div`
  flex: 0 0 auto;
  max-height: 500px;
  overflow: auto;
`;

export const ElementDisplay = ({ element }: { element?: WeaponElement }) => {
  if (!element) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <GameIcon
        src={getElementIcon(element.type)}
        size={24}
        style={{ marginRight: '10px' }}
      />
      {element.power}
    </div>
  );
};

export const SlotsDisplay = ({ slots }: { slots: number[] }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {
        slots.map((slotSize, index) => (
          <GameIcon
            key={index}
            src={getDecorationSlotIcon(slotSize)}
            size={24}
            style={{ marginRight: '10px' }}
          />
        ))
      }
    </div>
  );
};
