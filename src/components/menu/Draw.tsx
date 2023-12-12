import { penState } from '@/store/store';
import { useEffect } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { useRecoilState } from 'recoil';

const MAX_PEN_SIZE = 200;

const Draw = () => {
  const [pen, setPen] = useRecoilState(penState);

  // 펜 색상 변경시 css 변수 변경
  useEffect(() => {
    document.documentElement.style.setProperty('--range-shdw', pen.hsl);
  }, [pen]);

  const changePenSizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > MAX_PEN_SIZE) return;
    setPen({
      ...pen,
      size: Number(e.target.value),
    });
  };

  const changePenColorHandler = (color: ColorResult) => {
    setPen({
      ...pen,
      rgb: color.rgb,
      hex: color.hex,
      alpha: color.rgb.a ?? 1,
      hsl: `${color.hsl.h} ${color.hsl.s * 100}% ${color.hsl.l * 100}%`,
    });
  };

  return (
    <section className="flex w-full grow flex-col items-center justify-center border-t  border-base-300 bg-white sm:flex-row">
      <div className="flex w-full flex-col items-center gap-2 p-2 sm:w-1/2">
        <p className="text-lg font-medium ">펜 굵기</p>
        <input
          type="number"
          min="1"
          max={MAX_PEN_SIZE}
          value={pen.size}
          onChange={changePenSizeHandler}
          className="input-bordered input w-1/2  "
        />
        <input
          type="range"
          min="1"
          max={MAX_PEN_SIZE}
          value={pen.size}
          onChange={changePenSizeHandler}
          className="color-range "
        />
      </div>

      <div className="flex w-full flex-col items-center gap-2 p-2 sm:w-1/2">
        <p className="text-lg font-medium ">펜 색</p>
        <div className="flex gap-2">
          <ChromePicker
            className="h-full overflow-hidden rounded-xl border shadow-none"
            color={pen.rgb}
            onChange={changePenColorHandler}
          />
        </div>
      </div>
    </section>
  );
};

export default Draw;
