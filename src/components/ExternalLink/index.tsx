import React from 'react';
import { Anchor } from '@mantine/core';

// Mantine, your exported types are shoddy af
const ExternalLink = (props: any) => {
  return <Anchor target='_blank' rel='noopener noreferrer' {...props} />;
};

export default ExternalLink;
