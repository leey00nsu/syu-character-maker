import { useEffect } from 'react';

import { useCanvasStore } from '@/store/canvas';
import { CanvasObject } from '@/store/canvas/canvasObjectSlice';

// 히스토리 업데이트 커스텀 훅
const useHistoryControll = () => {
  const setCanvasObjects = useCanvasStore(state => state.setCanvasObjects);
  const setSelectedObjectIds = useCanvasStore(
    state => state.setSelectedObjectIds,
  );
  const canvasObjectHistory = useCanvasStore(
    state => state.canvasObjectHistory,
  );
  const setCanvasObjectHistory = useCanvasStore(
    state => state.setCanvasObjectHistory,
  );

  const canvasObjectHistoryIndex = useCanvasStore(
    state => state.canvasObjectHistoryIndex,
  );
  const setCanvasObjectHistoryIndex = useCanvasStore(
    state => state.setCanvasObjectHistoryIndex,
  );


  // canvasObjectHistory에 변경 내역 최대 20개까지 저장
  const updateHistory = (newObject: CanvasObject[]) => {
    const newHistory = [...canvasObjectHistory.slice(-19), newObject];
    setCanvasObjectHistory(newHistory);
    setCanvasObjectHistoryIndex(newHistory.length - 1);
  };

  const undoHistory = () => {
    if (canvasObjectHistoryIndex > 0) {
      setSelectedObjectIds([]);
      const prevHistory = canvasObjectHistory[canvasObjectHistoryIndex - 1];
      setCanvasObjectHistoryIndex(canvasObjectHistoryIndex - 1);
      setCanvasObjects(prevHistory);
    }
  };

  const redoHistory = () => {
    if (canvasObjectHistoryIndex < canvasObjectHistory.length - 1) {
      setSelectedObjectIds([]);
      const nextHistory = canvasObjectHistory[canvasObjectHistoryIndex + 1];
      setCanvasObjectHistoryIndex(canvasObjectHistoryIndex + 1);
      setCanvasObjects(nextHistory);
    }
  };

  return { updateHistory, undoHistory, redoHistory };
};

export default useHistoryControll;
