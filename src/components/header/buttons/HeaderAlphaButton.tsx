import React from 'react';
import { useRecoilState } from 'recoil';
import { drawingObjectState, selectedIdState } from '../../../store/store';

const HeaderAlphaButton = () => {
  const [drawingObjects, setdrawingObjects] =
    useRecoilState(drawingObjectState);
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);
  
  const changeOpacityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newObject = [...drawingObjects].map(object => {
      if (object.id === selectedId[0]) {
        return {
          ...object,
          opacity: Number(e.target.value),
        };
      }
      return object;
    });
    setdrawingObjects(newObject);
  };

  const selectedObject = drawingObjects.filter(
    object => object.id === selectedId[0],
  )[0];

  return (
    <>
      {selectedId.length === 1 && selectedId[0] !== 'background' && (
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
