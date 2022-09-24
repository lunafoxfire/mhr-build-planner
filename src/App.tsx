import React from 'react';
import { ThemedMantineProvider, GlobalStyles } from '@/theme';
import Main from '@/containers/Main';
import { GlobalContextProvider } from '@/contexts/global';

function App() {
  return (
    <ThemedMantineProvider>
      <GlobalStyles />
      <GlobalContextProvider>
        <Main />
      </GlobalContextProvider>
    </ThemedMantineProvider>
  );
}

export default App;
