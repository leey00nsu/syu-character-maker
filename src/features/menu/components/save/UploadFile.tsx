import { useMutation } from '@tanstack/react-query';
import Konva from 'konva';
import { RefObject } from 'react';

import { uploadArticle } from '@/apis/article/article.api';

import { LoadingDots } from '@/ui/loadings';

interface UploadFileProps {
  stageRef: RefObject<Konva.Stage>;
}

const UploadFile = ({ stageRef }: UploadFileProps) => {
  const { mutateAsync: upload, isPending } = useMutation({
    mutationKey: ['uploadArticle'],
    retry: false,
    mutationFn: uploadArticle,
  });

  const uploadHandler = async () => {
    if (isPending) return;
    if (!stageRef.current) return;

    Konva.autoDrawEnabled = false;

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

    await upload(formData);

    Konva.autoDrawEnabled = true;
  };

  return (
    <button onClick={uploadHandler} className="btn-primary btn-wide btn">
      {isPending && <LoadingDots />}
      {!isPending && <div>업로드 하기</div>}
    </button>
  );
};

export default UploadFile;
