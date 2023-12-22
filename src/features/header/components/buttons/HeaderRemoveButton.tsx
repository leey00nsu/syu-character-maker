import { FaTrashAlt } from 'react-icons/fa';

import { useCanvasStore } from '@/store/canvasStore';

import useObjectControll from '@/hooks/canvas/useObjectControll';

import { MUTABLE_OBJECTS } from '@/features/preview/constants/canvas';

import { ActiveButton } from '@/ui/buttons';

const HeaderRemoveButton = () => {
  const canvasObjects = useCanvasStore(state => state.canvasObjects);
  const selectedObjectIds = useCanvasStore(state => state.selectedObjectIds);

  const { removeObject } = useObjectControll();

  const selectedObject = selectedObjectIds
    .map(id => canvasObjects.find(object => object.id === id))
    .filter(object => object !== undefined);

  const isRemovable =
    selectedObject.length > 0 &&
    selectedObject.every(object => MUTABLE_OBJECTS.includes(object!.name));

  return (
    <>
      {isRemovable && (
        <ActiveButton
          clickHandler={removeObject}
          className="h-12 w-12 border-0 bg-transparent hover:btn-accent hover:bg-accent hover:text-white sm:h-16 sm:w-16"
        >
          <FaTrashAlt className="h-full w-full" />
        </ActiveButton>
      )}
    </>
  );
};

export default HeaderRemoveButton;
