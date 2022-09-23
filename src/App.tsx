import React from 'react';
import Main from '@/containers/Main';
import { ThemedMantineProvider, GlobalStyles } from '@/theme';

function App() {
  return (
    <ThemedMantineProvider>
      <GlobalStyles />
      <Main />
    </ThemedMantineProvider>
  );
}

export default App;
