import { useRecoilState } from 'recoil';

import {
  CanvasObject,
  canvasObjectHistoryIndexState,
  canvasObjectHistoryState,
  canvasObjectsState,
  selectedObjectIdsState,
} from '@/store/canvasStore';

// 히스토리 업데이트 커스텀 훅
const useHistoryControll = () => {
  const [, setCanvasObjects] = useRecoilState(canvasObjectsState);
  const [, setSelectedObjectId] = useRecoilState(selectedObjectIdsState);
  const [canvasObjectHistory, setCanvasObjectHistory] = useRecoilState(
    canvasObjectHistoryState,
  );
  const [canvasObjectHistoryIndex, setCanvasObjectHistoryIndex] =
    useRecoilState(canvasObjectHistoryIndexState);

  // canvasObjectHistory에 변경 내역 최대 20개까지 저장
  const updateHistory = (newObject: CanvasObject[]) => {
    const newHistory = [...canvasObjectHistory.slice(-19), newObject];
    setCanvasObjectHistory(newHistory);
    setCanvasObjectHistoryIndex(newHistory.length - 1);
  };

  const undoHistory = () => {
    if (canvasObjectHistoryIndex > 0) {
      setSelectedObjectId([]);
      const prevHistory = canvasObjectHistory[canvasObjectHistoryIndex - 1];
      setCanvasObjectHistoryIndex(prev => prev - 1);
      setCanvasObjects(prevHistory);
    }
  };

  const redoHistory = () => {
    if (canvasObjectHistoryIndex < canvasObjectHistory.length - 1) {
      setSelectedObjectId([]);
      const nextHistory = canvasObjectHistory[canvasObjectHistoryIndex + 1];
      setCanvasObjectHistoryIndex(prev => prev + 1);
      setCanvasObjects(nextHistory);
    }
  };

  return { updateHistory, undoHistory, redoHistory };
};

export default useHistoryControll;
