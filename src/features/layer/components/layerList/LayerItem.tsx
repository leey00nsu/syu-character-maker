import {
  DrawingObject,
  menuState,
  modeState,
  selectedIdState,
} from '@/store/canvasStore';
import { useRecoilState } from 'recoil';
import { LayerDownButton, LayerUpButton } from '../buttons';
import Paragraph from '@/ui/texts/Paragraph';

interface LayerItemProps {
  object: DrawingObject;
  index: number;
}
const LayerItem = ({ object, index }: LayerItemProps) => {
  const [menu, setMenu] = useRecoilState(menuState);
  const [mode, setMode] = useRecoilState(modeState);
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);

  const clickLayerHandler = (objectId: string) => {
    if (menu !== '저장') {
      setSelectedId([objectId]);
      setMode('move');
    }
  };

  const isSelected = selectedId.includes(object.id);
  const isSingle = selectedId.length === 1;

  return (
    <li
      className={
        isSelected
          ? 'btn-active flex w-full flex-row justify-between rounded-lg  '
          : 'flex  w-full flex-row justify-between'
      }
      onClick={clickLayerHandler.bind(this, object.id)}
    >
      <Paragraph className="w-full" size="sm" weight="normal">
        {object.id}
      </Paragraph>

      {isSelected && isSingle && (
        <>
          <LayerUpButton index={index} />
          <LayerDownButton index={index} />
        </>
      )}
    </li>
  );
};

export default LayerItem;
