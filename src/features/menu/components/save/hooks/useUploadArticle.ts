import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { uploadArticle } from '@/apis/article/article.api';

import { useCanvasStore } from '@/store/canvas';

import useExportCanvas from '@/features/canvas/hooks/useExportCanvas';
import { TOAST_MESSAGE } from '@/constants/toast';

const useUploadArticle = () => {
  const canvasName = useCanvasStore(state => state.canvasName);
  const setCanvasName = useCanvasStore(state => state.setCanvasName);

  const { exportCanvasToBlob } = useExportCanvas();
  const queryClient = useQueryClient();

  const { mutateAsync: uploadMutate, isPending } = useMutation({
    mutationKey: ['uploadArticle'],
    retry: false,
    mutationFn: uploadArticle,
    onSuccess() {
      // 업로드 후에는 업로드 제한을 다시 조회한다.
      queryClient.invalidateQueries({ queryKey: ['articleLimit'] });
      toast.success(TOAST_MESSAGE.UPLOAD_ARTICLE);
    },
  });

  const uploadHandler = async () => {
    const blob = await exportCanvasToBlob();

    if (!blob) return;

    const formData = new FormData();
    formData.append('file', blob);
    formData.append('canvasName', canvasName);

    uploadMutate(formData);

    setCanvasName('');
  };

  return { uploadHandler, isPending };
};

export default useUploadArticle;
