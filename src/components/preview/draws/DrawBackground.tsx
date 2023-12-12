import { bgColorState } from '@/store/store';
import { Rect } from 'react-konva';
import { useRecoilState } from 'recoil';

interface DrawBackgroundProps {
  width: number;
  height: number;
}

const DrawBackground = ({ width, height }: DrawBackgroundProps) => {
  const [bgColor] = useRecoilState(bgColorState);
  
  return (
    <Rect
      name="background"
      key="background"
      z={-999}
      x={0}
      y={0}
      width={width}
      height={height}
      fill={bgColor.hex}
      opacity={bgColor.alpha}
      id="background"
    />
  );
};

export default DrawBackground;
