import { ActiveButton } from '@/ui/buttons';

import useSaveImage from '../hooks/useSaveImage';

const SaveImageButton = () => {
  const { saveImage } = useSaveImage();

  return (
    <ActiveButton clickHandler={saveImage} className="btn-primary btn btn-wide">
      이미지 파일로 저장하기
    </ActiveButton>
  );
};

export default SaveImageButton;
