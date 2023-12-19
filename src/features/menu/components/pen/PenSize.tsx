import { useCanvasStore } from '@/store/canvasStore';

import SliderInput from '@/ui/inputs/SliderInput';

const MIN_PEN_SIZE = 1;
const MAX_PEN_SIZE = 200;

const PenSize = () => {
  const penSize = useCanvasStore(state => state.penSize);
  const setPenSize = useCanvasStore(state => state.setPenSize);

  const changePenSizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let size = Number(e.target.value);

    if (size > MAX_PEN_SIZE) {
      size = MAX_PEN_SIZE;
    }
    if (size < MIN_PEN_SIZE) {
      size = MIN_PEN_SIZE;
    }

    setPenSize(size);
  };

  return (
    <SliderInput
      min={1}
      max={MAX_PEN_SIZE}
      value={penSize}
      changeHandler={changePenSizeHandler}
    />
  );
};

export default PenSize;
