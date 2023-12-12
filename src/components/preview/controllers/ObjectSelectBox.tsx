import Konva from 'konva';
import React, { MutableRefObject } from 'react';
import { Rect } from 'react-konva';

interface ObjectSelectBoxProps {
  selectBoxRef: MutableRefObject<Konva.Rect | null>;
}

const ObjectSelectBox = ({ selectBoxRef }: ObjectSelectBoxProps) => {
  return (
    <Rect
      ref={selectBoxRef}
      id="selection"
      fill="rgba(0,0,245,0.2)"
      visible={false}
    />
  );
};

export default ObjectSelectBox;
