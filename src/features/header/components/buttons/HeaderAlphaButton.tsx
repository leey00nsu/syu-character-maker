import React from 'react';

import { useCanvasStore } from '@/store/canvas';

import { MUTABLE_OBJECTS } from '@/features/canvas/constants/canvas';
import useHistoryControll from '@/features/canvas/hooks/useHistoryControll';
import useObjectControll from '@/features/canvas/hooks/useObjectControll';

import { SliderInput } from '@/ui/inputs';
import { Paragraph } from '@/ui/texts';

const HeaderAlphaButton = () => {
  const canvasObjects = useCanvasStore(state => state.canvasObjects);
  const selectedObjectIds = useCanvasStore(state => state.selectedObjectIds);

  const { changeObjectOpacity } = useObjectControll();
  const { updateHistory } = useHistoryControll();

  // 선택된 objectId를 통해 선택된 object를 찾아낸다.
  const selectedObjects = selectedObjectIds
    .map(id => canvasObjects.find(object => object.id === id))
    .filter(object => object !== undefined);

  // 선택된 object가 한 개이고 변경 가능하면 투명도 슬라이더를 보여준다.
  const isTransformable =
    selectedObjects.length === 1 &&
    selectedObjects.every(object => MUTABLE_OBJECTS.includes(object!.name));

  const changeOpacityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOpacity = Number(e.target.value);

    changeObjectOpacity(newOpacity);
  };

  const updateOpacityHistoryHandler = () => {
    updateHistory(canvasObjects);
  };

  return (
    <>
      {isTransformable && (
        <div className="col-span-1 flex  w-12 flex-col items-center xs:col-span-2 xs:w-24">
          <Paragraph size="sm" weight="light">
            투명도
          </Paragraph>
          <SliderInput
            min={0}
            max={1}
            step={0.1}
            onMouseUp={updateOpacityHistoryHandler}
            value={selectedObjects[0]?.opacity}
            changeHandler={changeOpacityHandler}
            className="range "
          />
        </div>
      )}
    </>
  );
};

export default HeaderAlphaButton;
