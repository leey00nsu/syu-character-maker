import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadArticle } from '@/apis/article/article.api';

import { useCanvasStore } from '@/store/canvasStore';

import useExportCanvas from '@/features/canvas/hooks/useExportCanvas';

const useUploadArticle = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: upload, isPending } = useMutation({
    mutationKey: ['uploadArticle'],
    retry: false,
    mutationFn: uploadArticle,
    onSuccess() {
      // 업로드 후에는 업로드 제한을 다시 조회한다.
      queryClient.invalidateQueries({ queryKey: ['articleLimit'] });
    },
  });

  const canvasName = useCanvasStore(state => state.canvasName);
  const setCanvasName = useCanvasStore(state => state.setCanvasName);

  const { exportCanvasToBlob } = useExportCanvas();

  const uploadHandler = async () => {
    const blob = await exportCanvasToBlob();

    if (!blob) return;

    const formData = new FormData();
    formData.append('file', blob);
    formData.append('canvasName', canvasName);

    upload(formData);

    setCanvasName('');
  };

  return { uploadHandler, isPending };
};

export default useUploadArticle;
