import { Rect } from 'react-konva';
import { useRecoilState } from 'recoil';

import { bgColorState } from '@/store/canvasStore';

import { DEFAULT_WIDTH } from '@/features/preview/constants/canvas';

const BackgroundObject = () => {
  const [bgColor] = useRecoilState(bgColorState);

  return (
    <Rect
      name="background"
      key="background"
      z={-999}
      x={0}
      y={0}
      width={DEFAULT_WIDTH}
      height={DEFAULT_WIDTH}
      fill={bgColor.hex}
      opacity={bgColor.alpha}
      id="background"
    />
  );
};

export default BackgroundObject;
