import useObjectControll from '@/hooks/useObjectControll';
import { FaAngleDown } from 'react-icons/fa';

interface LayerDownButtonProps {
  index: number;
}

const LayerDownButton = ({ index }: LayerDownButtonProps) => {
  const { changeObjectIndex } = useObjectControll();

  const layerDownHandler = (index: number) => {
    changeObjectIndex(index, 'down');
  };

  return (
    <div
      onClick={layerDownHandler.bind(this, index)}
      className="absolute right-0 flex h-full w-8 items-center justify-center "
    >
      <FaAngleDown className="h-full w-8 shrink-0" />
    </div>
  );
};

export default LayerDownButton;
