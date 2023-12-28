import tw from '@/utils/tw';
import React, { InputHTMLAttributes } from 'react';

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const NumberInput = ({
  changeHandler,
  className,
  ...inputProps
}: NumberInputProps) => {
  const classNames = tw('input input-bordered ', className);
  return (
    <input
      {...inputProps}
      type="number"
      onChange={changeHandler}
      className={classNames}
    />
  );
};

export default NumberInput;
