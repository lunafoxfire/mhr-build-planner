import React from 'react';
import styled from '@emotion/styled';
import ClickableDiv, { ClickableDivProps } from '@/components/ClickableDiv';
import GameIcon from '../GameIcon';

export type SlotSelection = {
  size: number,
  decoration: string | null,
};

export const GridSection = styled.div<{ section: string }>`
  grid-area: ${({ section }) => section};
`;

export const TitleWrapper = styled(ClickableDiv)`
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;

  :hover {
    color: ${({ theme }) => theme.colors.dark[2]};
  }
`;

export const TitleIconWrapper = styled.div`
  margin-left: 10px;
  font-size: 12px;
`;

export const ItemIconWrapper = styled<(props: ClickableDivProps & { img: string }) => JSX.Element>(ClickableDiv)`
  width: 50px;
  height: 50px;
  background: url(${({ img }) => img});
  background-repeat: no-repeat;
  background-size: auto;
  margin-right: 100px;
`;

export const ItemStatEntry = styled.div`
  font-size: 13px;
  margin-bottom: 2px;
`;

export const ItemStatWithIcon = (props: { text: string, icon: string }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <GameIcon src={props.icon} size={18} style={{ marginRight: '5px' }} />
    <ItemStatEntry>{props.text}</ItemStatEntry>
  </div>
);

export const ItemSkillEntry = styled.div`
  font-size: 14px;
`;

export const Vertical = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
