import {
  DrawingObject,
  menuState,
  modeState,
  selectedIdState,
} from '@/store/store';
import { useRecoilState } from 'recoil';
import LayerDownButton from './LayerDownButton';
import LayerUpButton from './LayerUpButton';

interface LayerProps {
  object: DrawingObject;
  index: number;
}
const Layer = ({ object, index }: LayerProps) => {
  const [menu, setMenu] = useRecoilState(menuState);
  const [mode, setMode] = useRecoilState(modeState);
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);

  const clickLayerHandler = (objectId: string) => {
    if (menu !== '저장') {
      setSelectedId([objectId]);
      setMode('move');
    }
  };

  const isSelected = selectedId.length === 1 && selectedId.includes(object.id);

  return (
    <li
      className={
        selectedId.includes(object.id)
          ? 'btn-active flex h-full w-full flex-row justify-between rounded-lg  '
          : 'flex h-full w-full flex-row justify-between'
      }
      onClick={clickLayerHandler.bind(this, object.id)}
    >
      <p className="w-full">{object.id}</p>

      {isSelected && (
        <>
          <LayerUpButton index={index} />
          <LayerDownButton index={index} />
        </>
      )}
    </li>
  );
};

export default Layer;
