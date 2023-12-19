import React from 'react';

import { useCanvasStore } from '@/store/canvasStore';

const HeaderAlphaButton = () => {
  const canvasObjects = useCanvasStore(state => state.canvasObjects);
  const setCanvasObjects = useCanvasStore(state => state.setCanvasObjects);
  const selectedObjectIds = useCanvasStore(state => state.selectedObjectIds);

  const changeOpacityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newObject = [...canvasObjects].map(object => {
      if (object.id === selectedObjectIds[0]) {
        return {
          ...object,
          opacity: Number(e.target.value),
        };
      }
      return object;
    });
    setCanvasObjects(newObject);
  };

  const selectedObject = canvasObjects.filter(
    object => object.id === selectedObjectIds[0],
  )[0];

  return (
    <>
      {selectedObjectIds.length === 1 &&
        selectedObjectIds[0] !== 'background' && (
          <div className="flex flex-col items-center">
            <p>투명도</p>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={selectedObject?.opacity}
              onChange={changeOpacityHandler}
              className="range "
            />
          </div>
        )}
    </>
  );
};

export default HeaderAlphaButton;
