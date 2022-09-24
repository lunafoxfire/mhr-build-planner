import '@emotion/react';
import type { MantineTheme } from '@mantine/core';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface Theme extends MantineTheme { }
}
