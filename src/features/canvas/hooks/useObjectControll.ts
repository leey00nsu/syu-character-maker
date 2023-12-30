import { KonvaEventObject } from 'konva/lib/Node';

import { CanvasObject, useCanvasStore } from '@/store/canvasStore';

import {
  IMMUTABLE_OBJECTS,
  MUTABLE_OBJECTS,
} from '@/features/canvas/constants/canvas';
import useHistoryControll from '@/features/canvas/hooks/useHistoryControll';
import { Decoration } from '@/features/menu/components/decoration/constants/decoration.type';

// 오브젝트 컨트롤 커스텀 훅
const useObjectControll = () => {
  const selectedObjectIds = useCanvasStore(state => state.selectedObjectIds);
  const setSelectedObjectIds = useCanvasStore(
    state => state.setSelectedObjectIds,
  );
  const canvasObjects = useCanvasStore(state => state.canvasObjects);
  const setCanvasObjects = useCanvasStore(state => state.setCanvasObjects);

  const { updateHistory } = useHistoryControll();

  // 새로운 선 추가
  const addLine = (line: Partial<CanvasObject>) => {
    setCanvasObjects([
      ...canvasObjects,
      {
        name: 'line',
        size: line.size,
        color: line.color,
        points: line.points,
        id: `선 ${canvasObjects.length}`,
        z: canvasObjects.length,
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        skewX: 0,
        skewY: 0,
        opacity: line.opacity,
        rotation: 0,
      },
    ]);
  };

  // 선의 좌표를 업데이트
  const updateLine = (x: number, y: number) => {
    const newCanvasObjects = canvasObjects.map((object, index) => {
      if (index === canvasObjects.length - 1) {
        return {
          ...object,
          points: [...object.points!, x, y],
        };
      }
      return object;
    });

    setCanvasObjects(newCanvasObjects);
  };

  // 새로운 이미지 추가
  const addImage = (image: Partial<CanvasObject>) => {
    const newImage = {
      name: 'image',
      id: `이미지 ${canvasObjects.length}`,
      url: image.url,
      x: 50,
      y: 50,
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      skewY: 0,
      z: canvasObjects.length,
      opacity: 1,
    };
    const newCanvasObjects = [...canvasObjects, newImage];

    setCanvasObjects(newCanvasObjects);
    updateHistory(newCanvasObjects);
  };

  // 꾸미기 아이템 추가
  const addDecoration = (decoration: Decoration) => {
    const newImage = {
      name: 'decoration',
      id: decoration.item,
      url: decoration.url,
      z: canvasObjects.length,
    };
    const newCanvasObjects = [...canvasObjects, newImage];

    setCanvasObjects(newCanvasObjects);
    updateHistory(newCanvasObjects);
  };

  // 꾸미기 오브젝트 삭제
  const removeDecoration = (decoration: Decoration) => {
    const newCanvasObjects = canvasObjects.filter(
      canvasObject => canvasObject.id !== decoration.item,
    );

    setCanvasObjects(newCanvasObjects);
    setSelectedObjectIds([]);
    updateHistory(newCanvasObjects);
  };

  // 선택된 오브젝트 삭제
  const removeObject = () => {
    const newCanvasObjects = canvasObjects.filter(
      canvasObject => !selectedObjectIds.includes(canvasObject.id),
    );

    setCanvasObjects(newCanvasObjects);
    setSelectedObjectIds([]);
    updateHistory(newCanvasObjects);
  };

  // 오브젝트 상태 업데이트
  const transformObject = (e: KonvaEventObject<any>) => {
    const { x, y, id, scaleX, scaleY, skewX, skewY, rotation } = e.target.attrs;

    const newCanvasObjects: CanvasObject[] = canvasObjects.map(object => {
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

    setCanvasObjects(newCanvasObjects);

    // 현재 선택된 오브젝트 중에서 가장 마지막의 오브젝트가 변경되었을 때 히스토리에 저장
    // (현재 선택된 오브젝트가 여러개일 수 있기 때문에 히스토리가 중복되는 것을 방지하기 위함)
    if (id === selectedObjectIds.at(-1)) {
      updateHistory(newCanvasObjects);
    }
  };

  // 오브젝트의 인덱스 변경
  const changeObjectIndex = (index: number, direction: string) => {
    if (direction === 'up' && index !== 0) {
      const newCanvasObjects = [...canvasObjects].reverse();
      const temp = newCanvasObjects[index - 1];
      newCanvasObjects[index - 1] = newCanvasObjects[index];
      newCanvasObjects[index] = temp;
      newCanvasObjects.reverse();

      setCanvasObjects(newCanvasObjects);
      updateHistory(newCanvasObjects);
    }

    if (direction === 'down' && index !== canvasObjects.length - 1) {
      const newCanvasObjects = [...canvasObjects].reverse();
      const temp = newCanvasObjects[index + 1];
      newCanvasObjects[index + 1] = newCanvasObjects[index];
      newCanvasObjects[index] = temp;
      newCanvasObjects.reverse();

      setCanvasObjects(newCanvasObjects);
      updateHistory(newCanvasObjects);
    }
  };

  // 오브젝트의 투명도 변경
  // 이 함수는 자동적으로 히스토리에 저장하지 않습니다. : 슬라이더를 움직일 때마다 히스토리가 저장되는 것을 방지하기 위함
  // HeaderAlphaButton 참고
  const changeObjectOpacity = (opacity: number) => {
    const newCanvasObjects = canvasObjects.map(object => {
      if (selectedObjectIds.includes(object.id)) {
        return {
          ...object,
          opacity: opacity,
        };
      } else {
        return object;
      }
    });

    setCanvasObjects(newCanvasObjects);
  };

  // 캐릭터 변경
  const changeCharacter = (character: string) => {
    const imageUrl = character === '수호' ? '/suho.png' : '/suya.png';

    // 캐릭터 변경 시 기존 캐릭터의 이미지를 변경 및 꾸미기 아이템 삭제
    const newCanvasObjects = canvasObjects
      .map(canvasObject => {
        if (canvasObject.name === 'character') {
          return {
            ...canvasObject,
            id: character,
            url: imageUrl,
          };
        }
        return canvasObject;
      })
      .filter(canvasObject => canvasObject.name !== 'decoration');

    setCanvasObjects(newCanvasObjects);
    setSelectedObjectIds([]);
    updateHistory(newCanvasObjects);
  };

  // 모든 꾸미기 아이템 삭제
  const clearDecorations = () => {
    const newCanvasObjects = canvasObjects.filter(
      canvasObject => canvasObject.name !== 'decoration',
    );
    setCanvasObjects(newCanvasObjects);
    setSelectedObjectIds([]);
    updateHistory(newCanvasObjects);
  };

  // 모든 선, 이미지 삭제
  const clearDrawingObjects = () => {
    const newCanvasObjects = canvasObjects.filter(canvasObject =>
      IMMUTABLE_OBJECTS.includes(canvasObject.name),
    );
    setCanvasObjects(newCanvasObjects);
    setSelectedObjectIds([]);
    updateHistory(newCanvasObjects);
  };

  // 현재 그려진 선, 이미지가 없는지 확인
  const isDrawingObjectsEmpty =
    canvasObjects.filter(canvasObject =>
      MUTABLE_OBJECTS.includes(canvasObject.name),
    ).length === 0;

  return {
    addLine,
    updateLine,
    addImage,
    addDecoration,
    removeObject,
    removeDecoration,
    transformObject,
    changeObjectOpacity,
    changeObjectIndex,
    clearDecorations,
    clearDrawingObjects,
    changeCharacter,
    isDrawingObjectsEmpty,
  };
};

export default useObjectControll;
