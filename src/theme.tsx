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
        'success': ['#e8f5e9', '#d2ebd4', '#bde2be', '#a7d8a9', '#91ce94', '#7cc57f', '#66bb6a', '#4fa152', '#437c45', '#345a36'],
        'fail': ['#fde5e5', '#facdcc', '#f8b4b3', '#f69c9a', '#f48482', '#f16b69', '#ef5350', '#e02c28', '#af2724', '#7a2422'],
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
