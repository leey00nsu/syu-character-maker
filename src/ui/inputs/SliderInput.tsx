import tw from '@/utils/tw';
import React, { InputHTMLAttributes } from 'react';

interface SliderInputProps extends InputHTMLAttributes<HTMLInputElement> {
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SliderInput = ({
  changeHandler,
  className,
  ...inputProps
}: SliderInputProps) => {
  const classNames = tw('range', className);
  return (
    <input
      {...inputProps}
      type="range"
      onChange={changeHandler}
      className={classNames}
    />
  );
};

export default SliderInput;
