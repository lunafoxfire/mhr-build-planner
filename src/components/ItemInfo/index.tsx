import React from 'react';
import styled from '@emotion/styled';
import { ArmorType } from '@/assets/game-data/types';
import WeaponInfo from './WeaponInfo';
import TalismanInfo from './TalismanInfo';
import ArmorInfo from './ArmorInfo';

export interface ItemInfoProps {
  type: 'WEAPON' | 'TALISMAN' | ArmorType,
};
const ItemInfo = ({ type }: ItemInfoProps) => {
  function renderItemLayout() {
    switch (type) {
      case 'WEAPON':
        return <WeaponInfo />;
      case 'TALISMAN':
        return <TalismanInfo />;
      default:
        return <ArmorInfo type={type} />;
    }
  }

  return (
    <GridLayout>
      {renderItemLayout()}
    </GridLayout>
  );
};

export default ItemInfo;

const GridLayout = styled.div`
  display: grid;
  grid-template-areas:
    "icon name name stats"
    "icon skills slots stats";
  grid-template-columns: 58px 1fr 1fr 120px;
  grid-template-rows: 30px auto;
`;
