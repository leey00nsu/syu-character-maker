import { useCanvasStore } from '@/store/canvasStore';

import { RadioButton } from '@/ui/buttons';

const PenMode = () => {
  const penMode = useCanvasStore(state => state.penMode);
  const setPenMode = useCanvasStore(state => state.setPenMode);

  const changePenModeHandler = (changes: 'brush' | 'erase') => {
    setPenMode(changes);
  };

  return (
    <div className="w-1/2">
      <RadioButton
        name="radio-pen-mode"
        label="펜"
        changeHandler={changePenModeHandler.bind(this, 'brush')}
        isChecked={penMode === 'brush'}
      />
      <RadioButton
        name="radio-pen-mode"
        label="지우개"
        changeHandler={changePenModeHandler.bind(this, 'erase')}
        isChecked={penMode === 'erase'}
      />
    </div>
  );
};

export default PenMode;
