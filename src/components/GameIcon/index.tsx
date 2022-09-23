import React from 'react';
import styled from '@emotion/styled';

export type GameIconProps = {
  src: string,
  size?: number | string,
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
const GameIcon = ({ src, size, ...divProps }: GameIconProps) => {
  function getSize() {
    if (typeof size === 'string') {
      return size;
    }
    if (typeof size === 'number') {
      return `${size}px`;
    }
    return '16px';
  }

  return (
    <IconWrapper src={src} size={getSize()} {...divProps} />
  );
};

export default GameIcon;

const IconWrapper = styled.div<{ src: string, size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-size: ${({ size }) => size};
`;
