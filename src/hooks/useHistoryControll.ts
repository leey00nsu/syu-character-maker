import { useRecoilState } from 'recoil';

import {
  DrawingObject,
  drawingObjectHistoryIndexState,
  drawingObjectHistoryState,
  drawingObjectState,
  selectedIdState,
} from '@/store/canvasStore';

// 히스토리 업데이트 커스텀 훅
const useHistoryControll = () => {
  const [drawingObjects, setDrawingObjects] =
    useRecoilState(drawingObjectState);
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);
  const [drawingObjectHistory, setDrawingObjectHistory] = useRecoilState(
    drawingObjectHistoryState,
  );
  const [drawingObjectHistoryIndex, setDrawingObjectHistoryIndex] =
    useRecoilState(drawingObjectHistoryIndexState);

  // drawingObjectHistory에 변경 내역 최대 10개까지 저장
  const updateHistory = (newObject: DrawingObject[]) => {
    const newHistory = [...drawingObjectHistory.slice(-9), newObject];
    setDrawingObjectHistory(newHistory);
    setDrawingObjectHistoryIndex(newHistory.length - 1);
  };

  const undoHistory = () => {
    if (drawingObjectHistoryIndex > 0) {
      setSelectedId([]);
      const prevHistory = drawingObjectHistory[drawingObjectHistoryIndex - 1];
      setDrawingObjectHistoryIndex(prev => prev - 1);
      setDrawingObjects(prevHistory);
    }
  };

  const redoHistory = () => {
    if (drawingObjectHistoryIndex < drawingObjectHistory.length - 1) {
      setSelectedId([]);
      const nextHistory = drawingObjectHistory[drawingObjectHistoryIndex + 1];
      setDrawingObjectHistoryIndex(prev => prev + 1);
      setDrawingObjects(nextHistory);
    }
  };

  return { updateHistory, undoHistory, redoHistory };
};

export default useHistoryControll;
