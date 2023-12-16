import { useEffect } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { useRecoilState } from 'recoil';

import { penState } from '@/store/canvasStore';

const PenColor = () => {
  const [pen, setPen] = useRecoilState(penState);

  // 펜 색상 변경시 css 변수 변경
  useEffect(() => {
    document.documentElement.style.setProperty('--pen-color', pen.hex);
  }, [pen]);

  const changePenColorHandler = (color: ColorResult) => {
    setPen({
      ...pen,
      rgb: color.rgb,
      hex: color.hex,
      alpha: color.rgb.a ?? 1,
    });
  };

  return (
    <ChromePicker
      className="overflow-hidden rounded-xl border shadow-none"
      color={pen.rgb}
      onChange={changePenColorHandler}
    />
  );
};

export default PenColor;
