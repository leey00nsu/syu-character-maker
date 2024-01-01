import { useRef } from 'react';
import { ChromePicker, Color, ColorChangeHandler } from 'react-color';
import { useEventListener } from 'usehooks-ts';

interface ColorPickerProps {
  color: Color;
  changeHandler: ColorChangeHandler;
}

const ColorPicker = ({ color, changeHandler }: ColorPickerProps) => {
  const colorPickerRef = useRef(null);

  useEventListener(
    'touchmove',
    e => {
      e.preventDefault();
    },
    colorPickerRef,
  );

  return (
    <div ref={colorPickerRef}>
      <ChromePicker
        className="overflow-hidden rounded-xl border shadow-none "
        color={color}
        onChange={changeHandler}
      />
    </div>
  );
};

export default ColorPicker;
