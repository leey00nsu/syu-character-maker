import { penState } from '../../store/store';
import { useRecoilState } from 'recoil';
import { ChromePicker, ColorResult } from 'react-color';
import { useState } from 'react';

const Draw = () => {
  const [pen, setPen] = useRecoilState(penState);

  const changePenSizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > 50) return;
    setPen({
      ...pen,
      size: Number(e.target.value),
    });
  };

  const changePenColorHandler = (changes: ColorResult) => {
    setPen({
      ...pen,
      color: changes.hex,
      hsl: `${changes.hsl.h} ${changes.hsl.s * 100}% ${changes.hsl.l * 100}%`,
    });
  };

  return (
    <section
      style={
        {
          '--range-shdw': pen.hsl,
        } as React.CSSProperties
      }
      className="flex w-full grow flex-col items-center justify-center border-t  border-base-300 bg-white sm:flex-row"
    >
      <div className="flex w-full flex-col items-center gap-2 p-2 sm:w-1/2">
        <p className="text-lg font-medium ">펜 굵기</p>
        <input
          type="number"
          min="1"
          max="50"
          value={pen.size}
          onChange={changePenSizeHandler}
          className="input-bordered input w-1/2  "
        />
        <input
          type="range"
          min="1"
          max="50"
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
            color={pen.color}
            onChange={changePenColorHandler}
          />
        </div>
      </div>
    </section>
  );
};

export default Draw;
