import tw from '@/utils/tw';
import { useEffect, useRef, useState } from 'react';
import { ChromePicker, Color, ColorChangeHandler } from 'react-color';
import { useEventListener } from 'usehooks-ts';

interface ColorPickerProps {
  color: Color;
  changeHandler: ColorChangeHandler;
  disableAlpha?: boolean;
}

const ColorPicker = ({
  color,
  changeHandler,
  disableAlpha,
}: ColorPickerProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  // 모바일 환경에서 스크롤을 막는다.
  useEventListener(
    'touchmove',
    e => {
      e.preventDefault();
    },
    colorPickerRef,
    {
      passive: false,
    },
  );

  // 모바일 환경에서 input 요소가 자동으로 포커스되는데, 이를 방지하기 위해 input 요소의 포커스를 해제한 후 visible로 바꿔준다.
  // 라이브러리 자체에서 제공하는 기능 X
  useEffect(() => {
    if (colorPickerRef.current) {
      const inputElement = colorPickerRef.current.querySelector('input');

      inputElement?.blur();
      setIsMounted(true);
    }
  }, []);

  const classNames = tw(
    'overflow-hidden rounded-xl border shadow-none',
    isMounted ? 'visible' : 'invisible',
  );

  return (
    <div ref={colorPickerRef}>
      <ChromePicker
        disableAlpha={disableAlpha}
        className={classNames}
        color={color}
        onChange={changeHandler}
      />
    </div>
  );
};

export default ColorPicker;
