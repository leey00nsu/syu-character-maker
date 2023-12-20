import Konva from 'konva';
import { RefObject } from 'react';

interface SaveFileProps {
  stageRef: RefObject<Konva.Stage>;
}

const SaveFile = ({ stageRef }: SaveFileProps) => {
  // 현재 Stage를 이미지 파일로 저장하기
  const saveHandler = () => {
    if (!stageRef.current) return;

    // 자동으로 렌더링 되는 것을 방지
    // 원래 비율로 저장하기 위해 scale을 1로 설정하는데
    // 이를 렌더링하지 않도록 함
    Konva.autoDrawEnabled = false;

    // transformer 숨기기
    stageRef.current.find('.transformer')[0].hide();

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

    stageRef.current.find('.transformer')[0].show();

    Konva.autoDrawEnabled = true;
  };

  return (
    <button onClick={saveHandler} className="btn-primary btn btn-wide">
      이미지 파일로 저장하기
    </button>
  );
};

export default SaveFile;
