import { FaTrashAlt } from 'react-icons/fa';

import { useCanvasStore } from '@/store/canvasStore';

import { MUTABLE_OBJECTS } from '@/features/canvas/constants/canvas';
import useObjectControll from '@/features/canvas/hooks/useObjectControll';

import { ActiveButton } from '@/ui/buttons';

const HeaderRemoveButton = () => {
  const canvasObjects = useCanvasStore(state => state.canvasObjects);
  const selectedObjectIds = useCanvasStore(state => state.selectedObjectIds);

  const { removeObject } = useObjectControll();

  // 선택된 objectId를 통해 선택된 object를 찾아낸다.
  const selectedObjects = selectedObjectIds
    .map(id => canvasObjects.find(object => object.id === id))
    .filter(object => object !== undefined);

  // 선택된 object가 모두 삭제 가능하면 삭제 버튼을 보여준다.
  const isRemovable =
    selectedObjects.length > 0 &&
    selectedObjects.every(object => MUTABLE_OBJECTS.includes(object!.name));

  return (
    <>
      {isRemovable && (
        <ActiveButton
          clickHandler={removeObject}
          className=" btn-outline h-12 w-12 border-0 text-accent hover:btn-accent  hover:bg-accent hover:text-white sm:h-16 sm:w-16"
        >
          <FaTrashAlt className="h-full w-full " />
        </ActiveButton>
      )}
    </>
  );
};

export default HeaderRemoveButton;
