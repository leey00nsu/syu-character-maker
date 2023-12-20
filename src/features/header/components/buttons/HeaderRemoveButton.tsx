import { FaTrashAlt } from 'react-icons/fa';

import { useCanvasStore } from '@/store/canvasStore';

import useObjectControll from '@/hooks/canvas/useObjectControll';

import { MUTABLE_OBJECTS } from '@/features/preview/constants/canvas';

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
        <div
          onClick={removeObject}
          className="btn-accent btn-outline btn h-12 w-12 cursor-pointer rounded-box border-0 p-3 hover:text-white sm:h-16 sm:w-16"
        >
          <FaTrashAlt className="h-full w-full" />
        </div>
      )}
    </>
  );
};

export default HeaderRemoveButton;
