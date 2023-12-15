import { uploadPost } from '@/apis/post.api';
import Konva from 'konva';
import { RefObject } from 'react';

interface UploadFileProps {
  stageRef: RefObject<Konva.Stage>;
}

const UploadFile = ({ stageRef }: UploadFileProps) => {
  const uploadHandler = async () => {
    if (!stageRef.current) return;

    Konva.autoDrawEnabled = false;

    const blobs = await stageRef.current.toBlob({
      mimeType: 'image/png',
      width: 600,
      height: 600,
      pixelRatio: 3,
    });

    const blob = blobs as Blob;

    const formData = new FormData();
    formData.append('file', blob);

    const response = await uploadPost(formData);

    Konva.autoDrawEnabled = true;
  };

  return (
    <button onClick={uploadHandler} className="btn-primary btn-wide btn">
      업로드 하기
    </button>
  );
};

export default UploadFile;
