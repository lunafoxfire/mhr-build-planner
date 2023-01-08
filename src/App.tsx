import React from 'react';
import styled from '@emotion/styled';
import { ThemedMantineProvider, GlobalStyles } from '@/theme';
import { GlobalContextProvider } from '@/contexts/global';
import Main from '@/containers/Main';
import ErrorBoundary from '@/components/ErrorBoundary';
import ExternalLink from '@/components/ExternalLink';

function App() {
  return (
    <ThemedMantineProvider>
      <GlobalStyles />
      <ErrorBoundary>
        <GlobalContextProvider>
          <Main />
        </GlobalContextProvider>
      </ErrorBoundary>

      <Footer>
        <FooterContent>
          Made with ♥ by <ExternalLink href='https://github.com/lydianlights'>LydianLights</ExternalLink> -
          Source code available on <ExternalLink href='https://github.com/lydianlights/mhr-build-planner'>Github</ExternalLink> -
          Powered by data from <ExternalLink href='https://mhrise.kiranico.com/'>Kiranico</ExternalLink> (thank you!)
        </FooterContent>
      </Footer>
    </ThemedMantineProvider>
  );
}

export default App;

const Footer = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FooterContent = styled.div`
  padding: 10px 20px;
`;
