import tw from '@/utils/tw';

import { useCanvasStore } from '@/store/canvas';
import { CanvasObject } from '@/store/canvas/canvasObjectSlice';

import Paragraph from '@/ui/texts/Paragraph';

import LayerButtons from './LayerButtons';

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

  const isSelected = selectedObjectIds.includes(object.id);
  const isSingle = selectedObjectIds.length === 1;

  const classNames = tw(
    'flex w-full flex-row justify-between',
    isSelected && 'btn-active  rounded-lg ',
  );

  return (
    <li
      className={classNames}
      onClick={clickLayerHandler.bind(this, object.id)}
    >
      <Paragraph className="grow" size="sm" weight="normal">
        {object.id}
      </Paragraph>
      <LayerButtons
        object={object}
        index={index}
        isSelected={isSelected}
        isSingle={isSingle}
      />
    </li>
  );
};

export default LayerItem;
