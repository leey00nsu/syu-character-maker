import Konva from 'konva';
import { MutableRefObject } from 'react';
import { useRecoilState } from 'recoil';
import { uploadPost } from '@/apis/post.api';
import { authState } from '@/store/authStore';

interface SaveProps {
  stageRef: MutableRefObject<Konva.Stage | null>;
}

const Save = ({ stageRef }: SaveProps) => {
  const [auth, setAuth] = useRecoilState(authState);

  // 현재 Stage를 이미지 파일로 저장하기
  const saveHandler = () => {
    if (!stageRef.current) return;

    // 자동으로 렌더링 되는 것을 방지
    // 원래 비율로 저장하기 위해 scale을 1로 설정하는데
    // 이를 렌더링하지 않도록 함
    Konva.autoDrawEnabled = false;

    stageRef.current.scale({ x: 1, y: 1 });

    const dataURL = stageRef.current.toDataURL({
      mimeType: 'image/png',
      width: 600,
      height: 600,
      pixelRatio: 3,
    });

    var link = document.createElement('a');
    link.download = 'save';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Konva.autoDrawEnabled = true;
  };

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
    <section className="flex w-full grow items-center justify-center  border-t border-base-300 bg-white">
      <button onClick={saveHandler} className="btn-primary btn-wide btn">
        이미지 파일로 저장하기
      </button>
      {auth && (
        <button onClick={uploadHandler} className="btn-primary btn-wide btn">
          업로드 하기
        </button>
      )}
    </section>
  );
};

export default Save;
