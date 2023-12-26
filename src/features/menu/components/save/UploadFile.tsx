import { useMutation } from '@tanstack/react-query';
import Konva from 'konva';
import { RefObject } from 'react';
import { twJoin } from 'tailwind-merge';

import { uploadArticle } from '@/apis/article/article.api';

import { useCanvasStore } from '@/store/canvasStore';

import useModal from '@/hooks/modal/useModal';

import { LoadingDots } from '@/ui/loadings';

interface UploadFileProps {
  stageRef: RefObject<Konva.Stage>;
}

const UploadFile = ({ stageRef }: UploadFileProps) => {
  const canvasName = useCanvasStore(state => state.canvasName);
  const setCanvasName = useCanvasStore(state => state.setCanvasName);

  const { addModal } = useModal();

  const showUploadModal = () => {
    addModal({
      type: 'confirm',
      title: '업로드',
      content: '지금 그림을 업로드할까요?',
      callback: uploadHandler,
    });
  };

  const { mutateAsync: upload, isPending } = useMutation({
    mutationKey: ['uploadArticle'],
    retry: false,
    mutationFn: uploadArticle,
  });

  const uploadHandler = async () => {
    if (!canvasName) return;
    if (isPending) return;
    if (!stageRef.current) return;

    // 자동으로 렌더링 되는 것을 방지
    // 원래 비율로 저장하기 위해 scale을 1로 설정하는데
    // 이를 렌더링하지 않도록 함
    Konva.autoDrawEnabled = false;

    // transformer 숨기기
    stageRef.current.find('.transformer')[0].hide();

    stageRef.current.scale({ x: 1, y: 1 });

    const blobs = await stageRef.current.toBlob({
      mimeType: 'image/png',
      width: 600,
      height: 600,
      pixelRatio: 3,
    });

    const blob = blobs as Blob;

    const formData = new FormData();
    formData.append('file', blob);
    formData.append('canvasName', canvasName);

    await upload(formData);

    setCanvasName('');

    stageRef.current.find('.transformer')[0].show();

    Konva.autoDrawEnabled = true;
  };

  const isUploadable = canvasName && !isPending;

  return (
    <button
      onClick={isUploadable ? showUploadModal : undefined}
      className={twJoin(
        'btn-primary btn btn-wide',
        !isUploadable && 'btn-disabled',
      )}
    >
      {isPending && <LoadingDots />}
      {!isPending && canvasName && <div>업로드 하기</div>}
      {!isPending && !canvasName && <div>작품명을 입력해주세요!</div>}
    </button>
  );
};

export default UploadFile;
