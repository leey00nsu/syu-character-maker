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
