import React from 'react';
import Builder from '@/containers/Builder';
import { Center } from '@mantine/core';

export interface MainProps {};
const Main = ({}: MainProps) => {
  return (
    <Center>
      <Builder />
    </Center>
  );
};

export default Main;
