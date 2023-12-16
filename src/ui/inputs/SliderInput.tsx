import React from 'react';

interface SliderInputProps {
  min: number;
  max: number;
  value: number;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SliderInput = ({ min, max, value, changeHandler }: SliderInputProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={changeHandler}
        className="input-bordered input"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={changeHandler}
        className="range"
      />
    </div>
  );
};

export default SliderInput;
