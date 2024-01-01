import { FaAngleDown } from 'react-icons/fa';

import useObjectControll from '@/features/canvas/hooks/useObjectControll';

interface LayerDownButtonProps {
  index: number;
}

const LayerDownButton = ({ index }: LayerDownButtonProps) => {
  const { changeObjectIndex } = useObjectControll();

  const layerDownHandler = (index: number) => {
    changeObjectIndex(index, 'down');
  };

  return (
    <button
      onClick={layerDownHandler.bind(this, index)}
      className="absolute right-0 flex h-full w-8 items-center justify-center"
    >
      <FaAngleDown className="h-6 w-6 shrink-0" />
    </button>
  );
};

export default LayerDownButton;
