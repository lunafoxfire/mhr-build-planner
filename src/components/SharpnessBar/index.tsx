import React from 'react';

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
};
const SharpnessBar = ({ height, scale, sharpness, maxSharpness }: SharpnessBarProps) => {
  function renderSections(values: number[], isMax?: boolean) {
    let offset = 0;
    const segmentJSX: JSX.Element[] = [];

    values.forEach((value, index) => {
      segmentJSX.push(
        <rect
          height={height / 2}
          width={value * scale}
          x={offset * scale}
          y={isMax ? height / 2 : 0}
          fill={sharpnessIndexToColor(index)}
          stroke="none"
        />,
      );
      offset += value;
    });

    return segmentJSX;
  }

  return (
    <svg width={MAX_SHARPNESS * scale} height={height}>
      {renderSections(sharpness)}
      {renderSections(maxSharpness, true)}
    </svg>
  );
};

export default SharpnessBar;
