import {
  DrawingObject,
  menuState,
  modeState,
  selectedIdState,
} from '@/store/store';
import { useRecoilState } from 'recoil';
import { LayerDownButton, LayerUpButton } from '../buttons';

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
          ? 'btn-active flex h-full w-full flex-row justify-between rounded-lg  '
          : 'flex h-full w-full flex-row justify-between'
      }
      onClick={clickLayerHandler.bind(this, object.id)}
    >
      <p className="w-full">{object.id}</p>

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
