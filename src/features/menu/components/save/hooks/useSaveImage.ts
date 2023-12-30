import { useCanvasStore } from '@/store/canvasStore';

import useExportCanvas from '@/features/canvas/hooks/useExportCanvas';

const useSaveImage = () => {
  const canvasName = useCanvasStore(state => state.canvasName);

  const { exportCanvasToDataURL } = useExportCanvas();

  const saveImage = () => {
    const dataURL = exportCanvasToDataURL();

    if (!dataURL) return;

    var link = document.createElement('a');
    link.download = canvasName ?? 'image.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { saveImage };
};

export default useSaveImage;
