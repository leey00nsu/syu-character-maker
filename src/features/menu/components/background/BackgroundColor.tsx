import { ChromePicker, ColorResult } from 'react-color';
import { useRecoilState } from 'recoil';

import { bgColorState } from '@/store/canvasStore';

const BackgroundColor = () => {
  const [bgColor, setBgColor] = useRecoilState(bgColorState);

  const changeColorHandler = (color: ColorResult) => {
    setBgColor({ rgb: color.rgb, hex: color.hex, alpha: color.rgb.a ?? 1 });
  };

  return (
    <ChromePicker
      className="overflow-hidden rounded-xl border shadow-none"
      color={bgColor.rgb}
      onChange={changeColorHandler}
    />
  );
};

export default BackgroundColor;
