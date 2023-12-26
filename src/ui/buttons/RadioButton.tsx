import React from 'react';

interface RadioButtonProps {
  name: string;
  label: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}

const RadioButton = ({
  name,
  changeHandler,
  isChecked,
  label,
}: RadioButtonProps) => {
  return (
    <label className="label cursor-pointer">
      <span className="label-text">{label}</span>
      <input
        onChange={changeHandler}
        type="radio"
        name={name}
        className="radio"
        checked={isChecked}
      />
    </label>
  );
};

export default RadioButton;
