import { useEffect } from 'react';
import { ColorResult } from 'react-color';

import { useCanvasStore } from '@/store/canvas';

import { ColorPicker } from '@/ui/inputs';

const PenColor = () => {
  const penColor = useCanvasStore(state => state.penColor);
  const setPenColor = useCanvasStore(state => state.setPenColor);

  // 펜 색상 변경시 css 변수 변경
  useEffect(() => {
    document.documentElement.style.setProperty('--pen-color', penColor.hex);
  }, [penColor]);

  const changeColorHandler = (color: ColorResult) => {
    setPenColor({
      rgb: color.rgb,
      hex: color.hex,
      alpha: color.rgb.a ?? 1,
    });
  };

  return (
    <ColorPicker color={penColor.rgb} changeHandler={changeColorHandler} />
  );
};

export default PenColor;
