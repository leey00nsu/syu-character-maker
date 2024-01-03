import { useCanvasStore } from '@/store/canvas';
import { CanvasObject } from '@/store/canvas/canvasObjectSlice';

import Paragraph from '@/ui/texts/Paragraph';

import { LayerDownButton, LayerUpButton } from '../buttons';
import LayerColorButton from '../buttons/LayerColorButton';

interface LayerItemProps {
  object: CanvasObject;
  index: number;
}
const LayerItem = ({ object, index }: LayerItemProps) => {
  const setMode = useCanvasStore(state => state.setMode);
  const selectedObjectIds = useCanvasStore(state => state.selectedObjectIds);
  const setSelectedObjectIds = useCanvasStore(
    state => state.setSelectedObjectIds,
  );

  const clickLayerHandler = (objectId: string) => {
    setSelectedObjectIds([objectId]);
    setMode('move');
  };

  const isColorChangeable = !!object.originColor;
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
      <Paragraph className="grow" size="sm" weight="normal">
        {object.id}
      </Paragraph>

      {isSelected && isSingle && (
        <>
          {isColorChangeable && <LayerColorButton object={object} />}
          <LayerUpButton index={index} />
          <LayerDownButton index={index} />
        </>
      )}
    </li>
  );
};

export default LayerItem;
