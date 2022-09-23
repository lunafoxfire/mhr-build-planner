import React from 'react';
import { Global, MantineProvider } from '@mantine/core';

export const ThemedMantineProvider = (props: any) => (
  <MantineProvider
    {...props}
    withGlobalStyles
    withNormalizeCSS
    theme={{
      colorScheme: 'dark',
      colors: {
        'background': ['#dae2e6', '#b7c6ce', '#94abb6', '#708f9e', '#56717e', '#3e515b', '#263238', '#202a2e', '#1a2124', '#14181a'],
      },
      components: {},
    }}
  />
);

export const GlobalStyles = (props: any) => (
  <Global
    {...props}
    styles={(theme) => ({
      body: {
        backgroundColor: theme.colors.background[6],
      },
    })}
  />
);
