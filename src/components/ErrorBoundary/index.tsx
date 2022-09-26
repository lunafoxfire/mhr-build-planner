import React from 'react';
import styled from '@emotion/styled';
import { Title, Text, Center } from '@mantine/core';
import ExternalLink from '@/components/ExternalLink';

type ErrorBoundaryProps = {
  children: React.ReactNode,
};

type ErrorBoundaryState = {
  hasError: boolean,
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // TODO: log to reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <Center>
          <ErrorContainer>
            <Title>Oh no...</Title>
            <Text>
              Something broke horribly... Sorry about that...<br />
              If you don't mind, you can <ExternalLink href='https://github.com/lydianlights/mhr-build-planner/issues'>file an issue on github</ExternalLink> describing what happened<br />
              In the meantime, refreshing the page should reset everything and let you get back to work :D
            </Text>
          </ErrorContainer>
        </Center>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
`;
