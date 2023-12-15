import { useRecoilState } from 'recoil';

import { penState } from '@/store/canvasStore';

import SliderInput from '@/ui/inputs/SliderInput';

const MIN_PEN_SIZE = 1;
const MAX_PEN_SIZE = 200;

const PenSize = () => {
  const [pen, setPen] = useRecoilState(penState);

  const changePenSizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);

    if (value > MAX_PEN_SIZE) {
      value = MAX_PEN_SIZE;
    }
    if (value < MIN_PEN_SIZE) {
      value = MIN_PEN_SIZE;
    }

    setPen({
      ...pen,
      size: value,
    });
  };

  return (
    <SliderInput
      min={1}
      max={MAX_PEN_SIZE}
      value={pen.size}
      changeHandler={changePenSizeHandler}
    />
  );
};

export default PenSize;
