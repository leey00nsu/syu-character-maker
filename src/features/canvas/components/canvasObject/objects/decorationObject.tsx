import hexToRgb from '@/utils/hexToRgb';
import { useEffect, useRef } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

import { CanvasObject } from '@/store/canvasStore';

import { DEFAULT_WIDTH } from '@/features/canvas/constants/canvas';

interface DecorationObjectProps {
  object: CanvasObject;
}

const DecorationObject = ({ object }: DecorationObjectProps) => {
  const [image] = useImage(object.url || '');
  const imageRef = useRef<any>(null);

  useEffect(() => {
    if (image) {
      imageRef.current?.cache();
    }
  }, [image]);

  const colorFilter = (imageData: ImageData) => {
    if (!object.originColor) return;
    if (!object.color) return;

    const tollerance = 100;
    const sourceColor = hexToRgb(object.originColor);
    const targetColor = hexToRgb(object.color);

    const data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
      // 색생 차이를 계산
      const rDiff = Math.abs(data[i] - sourceColor.r);
      const gDiff = Math.abs(data[i + 1] - sourceColor.g);
      const bDiff = Math.abs(data[i + 2] - sourceColor.b);

      // 색상 차이가 tollerance보다 작으면 색상을 변경
      if (rDiff < tollerance && gDiff < tollerance && bDiff < tollerance) {
        // targetColor를 색상 차이에 따라 적용
        data[i] = targetColor.r + (data[i] - sourceColor.r);
        data[i + 1] = targetColor.g + (data[i + 1] - sourceColor.g);
        data[i + 2] = targetColor.b + (data[i + 2] - sourceColor.b);
      }
    }
  };

  if (image) {
    return (
      <Image
        ref={imageRef}
        opacity={1}
        name={object.name}
        key={object.id}
        x={50}
        y={50}
        width={DEFAULT_WIDTH - 100}
        height={DEFAULT_WIDTH - 100}
        id={object.id}
        filters={[colorFilter]}
        image={image}
      />
    );
  }

  return <></>;
};

export default DecorationObject;
