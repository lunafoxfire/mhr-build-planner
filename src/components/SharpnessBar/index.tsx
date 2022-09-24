import React from 'react';
import { sum } from '@/util/array';

export const MAX_SHARPNESS = 400;

function sharpnessIndexToColor(i: number) {
  switch (i) {
    case 0:
      return '#BE3843';
    case 1:
      return '#D3673D';
    case 2:
      return '#C9B232';
    case 3:
      return '#81B034';
    case 4:
      return '#3A58D7';
    case 5:
      return '#E2E2E2';
    case 6:
      return '#885AEC';
    default:
      return '#000000';
  }
}

export type SharpnessBarProps = {
  height: number,
  scale: number,
  sharpness: number[],
  maxSharpness: number[],
  currentSharpness?: number[],
};
const SharpnessBar = ({ height, scale, sharpness, maxSharpness, currentSharpness }: SharpnessBarProps) => {
  function renderSections(values: number[], isMax?: boolean) {
    let offset = 0;
    const segmentJSX: JSX.Element[] = [];

    values.forEach((value, index) => {
      segmentJSX.push(
        <rect
          key={index}
          height={height / 2}
          width={value * scale}
          x={offset * scale}
          y={(isMax ? height / 2 : 0) + 4}
          fill={sharpnessIndexToColor(index)}
          stroke="none"
        />,
      );
      offset += value;
    });

    return segmentJSX;
  }

  function renderCurrentSharpness() {
    if (!currentSharpness) return null;
    const offset = sum(currentSharpness);
    return (
      <>
        <rect
          height={height}
          width={4}
          x={offset * scale}
          y={4}
          fill={'#238cff'}
          stroke="none"
        />
        <rect
          height={4}
          width={12}
          x={offset * scale - 8}
          y={0}
          fill={'#238cff'}
          stroke="none"
        />
        <rect
          height={4}
          width={12}
          x={offset * scale - 8}
          y={height + 4}
          fill={'#238cff'}
          stroke="none"
        />
      </>
    );
  }

  return (
    <svg width={MAX_SHARPNESS * scale + 4} height={height + 8}>
      {renderSections(sharpness)}
      {renderSections(maxSharpness, true)}
      {renderCurrentSharpness()}
    </svg>
  );
};

export default SharpnessBar;
