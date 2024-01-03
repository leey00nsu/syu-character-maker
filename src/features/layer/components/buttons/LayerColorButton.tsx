import { IoColorPalette } from 'react-icons/io5';

import { CanvasObject } from '@/store/canvas/canvasObjectSlice';

import useModal from '@/hooks/modal/useModal';

import useObjectControll from '@/features/canvas/hooks/useObjectControll';

interface LayerColorButtonProps {
  object: CanvasObject;
}

const LayerColorButton = ({ object }: LayerColorButtonProps) => {
  const { addModal } = useModal();
  const { changeObjectColor } = useObjectControll();

  const changeColorHandler = () => {
    addModal({
      type: 'colorPicker',
      title: '색 변경',
      content: `${object.color}`,
      callback: changeObjectColor,
    });
  };

  return (
    <button
      onClick={changeColorHandler}
      className="absolute right-16 flex h-full w-8 items-center justify-center"
    >
      <IoColorPalette className="h-6 w-6 shrink-0" />
    </button>
  );
};

export default LayerColorButton;
