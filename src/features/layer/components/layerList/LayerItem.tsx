import { useRecoilState } from 'recoil';

import {
  CanvasObject,
  menuState,
  modeState,
  selectedObjectIdsState,
} from '@/store/canvasStore';

import Paragraph from '@/ui/texts/Paragraph';

import { LayerDownButton, LayerUpButton } from '../buttons';

interface LayerItemProps {
  object: CanvasObject;
  index: number;
}
const LayerItem = ({ object, index }: LayerItemProps) => {
  const [menu, setMenu] = useRecoilState(menuState);
  const [mode, setMode] = useRecoilState(modeState);
  const [selectedObjectIds, setSelectedObjectIds] = useRecoilState(
    selectedObjectIdsState,
  );

  const clickLayerHandler = (objectId: string) => {
    if (menu !== '저장') {
      setSelectedObjectIds([objectId]);
      setMode('move');
    }
  };

  const isSelected = selectedObjectIds.includes(object.id);
  const isSingle = selectedObjectIds.length === 1;

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
