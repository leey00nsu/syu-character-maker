import { penState } from "../../store/store";
import { useRecoilState } from "recoil";
import { ChromePicker, ColorResult } from "react-color";
import { useState } from "react";

const Draw = () => {
  const [pen, setPen] = useRecoilState(penState);

  const changePenSizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          "--range-shdw": pen.hsl,
        } as React.CSSProperties
      }
      className="flex w-full grow justify-center items-center px-8  border-t border-base-300 bg-white"
    >
      <div className="flex flex-col items-center w-full gap-4">
        <div className="flex items-center  w-full gap-2">
          <div className="flex flex-col items-center w-1/2 gap-2">
            <p className="text-lg font-medium ">펜 굵기</p>
            <input
              type="number"
              min={1}
              max={50}
              value={pen.size}
              onChange={changePenSizeHandler}
              className="input input-bordered w-1/2  "
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

          <div className="flex flex-col items-center w-1/2 gap-2">
            <p className="text-lg font-medium ">펜 색</p>
            <div className="flex gap-2">
              <ChromePicker
                className="border shadow-none rounded-xl overflow-hidden h-full"
                color={pen.color}
                onChange={changePenColorHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Draw;
