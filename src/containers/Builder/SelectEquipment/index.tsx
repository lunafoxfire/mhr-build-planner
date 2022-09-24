import React from 'react';
import { Divider, Paper } from '@mantine/core';
import ItemInfo from '@/components/ItemInfo';

export type SelectEquipmentProps = {};
const SelectEquipment = ({ }: SelectEquipmentProps) => {
  return (
    <Paper shadow="md" p="md">
      <ItemInfo type="WEAPON" />

      <Divider my="sm" />
      <ItemInfo type="TALISMAN" />

      <Divider my="sm" />
      <ItemInfo type="HEAD" />

      <Divider my="sm" />
      <ItemInfo type="BODY" />

      <Divider my="sm" />
      <ItemInfo type="ARMS" />

      <Divider my="sm" />
      <ItemInfo type="WAIST" />

      <Divider my="sm" />
      <ItemInfo type="LEGS" />
    </Paper>
  );
};

export default SelectEquipment;
