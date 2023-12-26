import { ChromePicker, ColorResult } from 'react-color';

import { useCanvasStore } from '@/store/canvasStore';

const BackgroundColor = () => {
  const backgroundColor = useCanvasStore(state => state.backgroundColor);
  const setBackgroundColor = useCanvasStore(state => state.setBackgroundColor);

  const changeColorHandler = (color: ColorResult) => {
    setBackgroundColor({
      rgb: color.rgb,
      hex: color.hex,
      alpha: color.rgb.a ?? 1,
    });
  };

  return (
    <ChromePicker
      className="overflow-hidden rounded-xl border shadow-none"
      color={backgroundColor.rgb}
      onChange={changeColorHandler}
    />
  );
};

export default BackgroundColor;
