import { CanvasObject } from '@/store/canvas/canvasObjectSlice';

import { LayerDownButton, LayerUpButton } from '../buttons';
import LayerColorButton from '../buttons/LayerColorButton';

interface LayerButtonsProps {
  object: CanvasObject;
  index: number;
  isSingle: boolean;
  isSelected: boolean;
}

const LayerButtons = ({
  object,
  isSelected,
  index,
  isSingle,
}: LayerButtonsProps) => {
  const isColorChangable = !!object.originColor;

  if (!isSelected || !isSingle) return null;

  return (
    <>
      {isColorChangable && <LayerColorButton object={object} />}
      <LayerUpButton index={index} />
      <LayerDownButton index={index} />
    </>
  );
};

export default LayerButtons;
