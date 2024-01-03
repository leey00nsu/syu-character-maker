import { Rect } from 'react-konva';

import { useCanvasStore } from '@/store/canvas';

import { DEFAULT_WIDTH } from '@/features/canvas/constants/canvas';

const BackgroundObject = () => {
  const backgroundColor = useCanvasStore(state => state.backgroundColor);

  return (
    <Rect
      name="background"
      key="background"
      x={0}
      y={0}
      width={DEFAULT_WIDTH}
      height={DEFAULT_WIDTH}
      fill={backgroundColor.hex}
      opacity={backgroundColor.alpha}
      id="background"
    />
  );
};

export default BackgroundObject;
