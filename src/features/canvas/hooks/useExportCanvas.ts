import Konva from 'konva';

import { useCanvasStore } from '@/store/canvasStore';

const useExportCanvas = () => {
  const stageRef = useCanvasStore(state => state.stageRef);

  const exportCanvasToDataURL = () => {
    if (!stageRef) return;
    if (!stageRef.current) return;
    // 자동으로 렌더링 되는 것을 방지
    // 원래 비율로 저장하기 위해 scale을 1로 설정하는데
    // 이를 렌더링하지 않도록 함
    Konva.autoDrawEnabled = false;

    // transformer 숨기기
    stageRef.current.find('.transformer')[0].hide();

    // 원래 비율인 1로 설정
    stageRef.current.scale({ x: 1, y: 1 });

    const dataURL = stageRef.current.toDataURL({
      mimeType: 'image/png',
      width: 600,
      height: 600,
      pixelRatio: 3,
    });

    stageRef.current.find('.transformer')[0].show();

    Konva.autoDrawEnabled = true;

    return dataURL;
  };

  const exportCanvasToBlob = async () => {
    if (!stageRef) return;
    if (!stageRef.current) return;

    Konva.autoDrawEnabled = false;

    stageRef.current.find('.transformer')[0].hide();

    stageRef.current.scale({ x: 1, y: 1 });

    const blobs = await stageRef.current.toBlob({
      mimeType: 'image/png',
      width: 600,
      height: 600,
      pixelRatio: 3,
    });

    const blob = blobs as Blob;

    stageRef.current.find('.transformer')[0].show();

    Konva.autoDrawEnabled = true;

    return blob;
  };

  return {
    exportCanvasToDataURL,
    exportCanvasToBlob,
  };
};

export default useExportCanvas;
