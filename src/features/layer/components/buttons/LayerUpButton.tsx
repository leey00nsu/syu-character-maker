import { FaAngleUp } from 'react-icons/fa';

import useObjectControll from '@/features/canvas/hooks/useObjectControll';

interface LayerUpButtonProps {
  index: number;
}

const LayerUpButton = ({ index }: LayerUpButtonProps) => {
  const { changeObjectIndex } = useObjectControll();

  const layerUpHandler = (index: number) => {
    changeObjectIndex(index, 'up');
  };

  return (
    <button
      onClick={layerUpHandler.bind(this, index)}
      className="absolute right-8 flex h-full w-8 items-center justify-center"
    >
      <FaAngleUp className="h-full w-8 shrink-0" />
    </button>
  );
};

export default LayerUpButton;
