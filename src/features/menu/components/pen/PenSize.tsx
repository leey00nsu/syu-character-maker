import { useCanvasStore } from '@/store/canvas';

import { NumberInput } from '@/ui/inputs';
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
    <div className="flex w-full flex-col items-center gap-2">
      <NumberInput
        min={1}
        max={MAX_PEN_SIZE}
        value={penSize}
        changeHandler={changePenSizeHandler}
        className="w-1/2"
      />
      <SliderInput
        min={1}
        max={MAX_PEN_SIZE}
        value={penSize}
        changeHandler={changePenSizeHandler}
        className="pen-range"
      />
    </div>
  );
};

export default PenSize;
