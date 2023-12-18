import Konva from 'konva';
import { RefObject } from 'react';
import { Rect } from 'react-konva';

interface ObjectSelectBoxProps {
  selectBoxRef: RefObject<Konva.Rect>;
}

const ObjectSelectBox = ({ selectBoxRef }: ObjectSelectBoxProps) => {
  return (
    <Rect
      ref={selectBoxRef}
      id="selectBox"
      fill="rgba(0,0,245,0.2)"
      visible={false}
    />
  );
};

export default ObjectSelectBox;
