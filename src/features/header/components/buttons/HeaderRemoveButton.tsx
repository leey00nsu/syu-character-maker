import { FaTrashAlt } from 'react-icons/fa';
import { useRecoilState } from 'recoil';

import { drawingObjectState, selectedObjectIdState } from '@/store/canvasStore';

import useObjectControll from '@/hooks/useObjectControll';

import { MUTABLE_OBJECTS } from '@/features/preview/constants/canvas';

const HeaderRemoveButton = () => {
  const [drawingObjects] = useRecoilState(drawingObjectState);
  const [selectedObjectId] = useRecoilState(selectedObjectIdState);

  const { removeObject } = useObjectControll();

  const selectedObject = selectedObjectId
    .map(id => drawingObjects.find(object => object.id === id))
    .filter(object => object !== undefined);

  const isRemovable =
    selectedObject.length > 0 &&
    selectedObject.every(object => MUTABLE_OBJECTS.includes(object!.name));

  return (
    <>
      {isRemovable && (
        <div
          onClick={removeObject}
          className="btn-accent btn-outline rounded-box btn h-12 w-12 cursor-pointer border-0 p-3 sm:h-16 sm:w-16 hover:text-white"
        >
          <FaTrashAlt className="h-full w-full" />
        </div>
      )}
    </>
  );
};

export default HeaderRemoveButton;
