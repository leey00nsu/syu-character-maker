import { KonvaEventObject } from 'konva/lib/Node';
import { useRecoilState } from 'recoil';
import {
  DrawingObject,
  drawingObjectCountState,
  drawingObjectState,
  selectedIdState,
} from '../store/store';
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

  // 오브젝트 상태 업데이트
  const transformObject = (e: KonvaEventObject<any>) => {
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

  return { addLine, updateLine, addImage, removeObject, transformObject };
};

export default useObjectControll;
