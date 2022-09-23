import React from 'react';
import styled from '@emotion/styled';
import { Modal } from '@mantine/core';
import { WeaponElement } from '@/assets/game-data/types';
import { getElementIcon, getDecorationSlotIcon } from '@/util/items';
import GameIcon from '../GameIcon';

export const StyledModal = styled(Modal)`
  .mantine-Modal-modal {
    margin-left: 200px;
    margin-right: 200px;
    width: 100%;
    max-width: 1200px;
    min-width: 800px;
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
