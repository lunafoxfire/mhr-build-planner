import React, { useCallback } from 'react';
import styled from '@emotion/styled';

export type ClickableDivProps = {
  onActivate?: () => void,
  as?: React.ElementType<any>,
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ClickableDiv = (props: ClickableDivProps) => {
  const { onActivate, as, onClick, onKeyDown, ...otherProps } = props;

  const handleClick = useCallback((e: any) => {
    if (onActivate) {
      onActivate();
    }
    if (onClick) {
      onClick(e);
    }
  }, [onActivate, onClick]);

  const handleKeyDown = useCallback((e: any) => {
    if (onActivate) {
      if (e.key === 'Enter') {
        onActivate();
      }
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  }, [onActivate, onKeyDown]);

  return (
    <ClickableContainer
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      as={as}
      {...otherProps}
    />
  );
};

export default ClickableDiv;

const ClickableContainer = styled.div`
  cursor: pointer;
`;
