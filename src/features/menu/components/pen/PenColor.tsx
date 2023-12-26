import { useEffect } from 'react';
import { ChromePicker, ColorResult } from 'react-color';

import { useCanvasStore } from '@/store/canvasStore';

const PenColor = () => {
  const penColor = useCanvasStore(state => state.penColor);
  const setPenColor = useCanvasStore(state => state.setPenColor);

  // 펜 색상 변경시 css 변수 변경
  useEffect(() => {
    document.documentElement.style.setProperty('--pen-color', penColor.hex);
  }, [penColor]);

  const changePenColorHandler = (color: ColorResult) => {
    setPenColor({
      rgb: color.rgb,
      hex: color.hex,
      alpha: color.rgb.a ?? 1,
    });
  };

  return (
    <ChromePicker
      className="overflow-hidden rounded-xl border shadow-none"
      color={penColor.rgb}
      onChange={changePenColorHandler}
    />
  );
};

export default PenColor;
