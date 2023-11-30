import React from 'react';
import {
  DrawingObject,
  drawingObjectCountState,
  drawingObjectState,
  selectedIdState,
} from '../store/store';
import { useRecoilState } from 'recoil';
import useUpdateHistory from './useHistoryControll';

// 오브젝트 컨트롤 커스텀 훅
const useObjectControll = () => {
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);
  const [drawingObjects, setDrawingObjects] =
    useRecoilState(drawingObjectState);
  const [drawingObjectCount, setDrawingObjectCount] = useRecoilState(
    drawingObjectCountState,
  );

  const { updateHistory } = useUpdateHistory();

  // 새로운 선 추가
  const addLine = (line: Partial<DrawingObject>) => {
    setDrawingObjects(prev => [
      ...prev,
      {
        type: 'line',
        size: line.size,
        color: line.color,
        points: line.points,
        id: `선 ${drawingObjectCount}`,
        z: drawingObjectCount,
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        skewX: 0,
        skewY: 0,
        opacity: 1,
        rotation: 0,
      },
    ]);

    setDrawingObjectCount(prev => prev + 1);
  };

  // 선의 좌표를 업데이트
  const updateLine = (x: number, y: number) => {
    const newObjects = drawingObjects.map((object, index) => {
      if (index === drawingObjects.length - 1) {
        return {
          ...object,
          points: [...object.points!, x, y],
        };
      }
      return object;
    });

    setDrawingObjects(newObjects);
  };

  const addImage = (image: Partial<DrawingObject>) => {
    const newImage = {
      type: 'image',
      id: `이미지 ${drawingObjectCount}`,
      url: image.url,
      x: 50,
      y: 50,
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      skewY: 0,
      z: drawingObjectCount,
      opacity: 1,
    };
    const newObjects = [...drawingObjects, newImage];
    setDrawingObjects(newObjects);
    setDrawingObjectCount(prev => prev + 1);
    updateHistory(newObjects);
  };

  // 선택된 오브젝트 삭제
  const removeObject = () => {
    const newDrawingObjects = drawingObjects.filter(
      drawingObject => !selectedId.includes(drawingObject.id),
    );
    setDrawingObjects(newDrawingObjects);
    setSelectedId([]);
    updateHistory(newDrawingObjects);
  };

  return { addLine, updateLine, addImage, removeObject };
};

export default useObjectControll;
