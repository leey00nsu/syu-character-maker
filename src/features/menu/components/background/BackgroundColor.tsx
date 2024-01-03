import { ColorResult } from 'react-color';

import { useCanvasStore } from '@/store/canvas';

import { ColorPicker } from '@/ui/inputs';

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
    <ColorPicker
      color={backgroundColor.rgb}
      changeHandler={changeColorHandler}
    />
  );
};

export default BackgroundColor;
