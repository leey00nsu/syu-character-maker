import React from 'react';
import {
  DrawingObject,
  drawingObjectState,
  selectedIdState,
} from '../store/store';
import { useRecoilState } from 'recoil';
import { KonvaEventObject } from 'konva/lib/Node';
import useUpdateHistory from './useHistoryControll';

// 오브젝트 변형 커스텀 훅
const useObjectTransform = () => {
  const [selectedId] = useRecoilState(selectedIdState);
  const [drawingObjects, setDrawingObjects] =
    useRecoilState(drawingObjectState);

  const { updateHistory } = useUpdateHistory();

  const objectTransformHandler = (e: KonvaEventObject<any>) => {
    const { x, y, id, scaleX, scaleY, skewX, skewY, rotation } = e.target.attrs;
    const newObjects: DrawingObject[] = drawingObjects.map(object => {
      if (object.id === id) {
        return {
          ...object,
          x: x,
          y: y,
          skewX: skewX,
          skewY: skewY,
          scaleX: scaleX,
          scaleY: scaleY,
          rotation: rotation,
        };
      } else {
        return object;
      }
    });

    setDrawingObjects(newObjects);

    // 현재 선택된 오브젝트 중에서 가장 마지막의 오브젝트가 변경되었을 때 히스토리에 저장
    // (현재 선택된 오브젝트가 여러개일 수 있기 때문에 히스토리가 중복되는 것을 방지하기 위함)
    if (id === selectedId.at(-1)) {
      updateHistory(newObjects);
    }
  };

  return objectTransformHandler;
};

export default useObjectTransform;
