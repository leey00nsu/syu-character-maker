import useObjectControll from '@/hooks/useObjectControll';
import { selectedIdState } from '@/store/canvasStore';
import { FaTrashAlt } from 'react-icons/fa';
import { useRecoilState } from 'recoil';

const HeaderRemoveButton = () => {
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);

  const { removeObject } = useObjectControll();

  return (
    <>
      {selectedId.length > 0 && selectedId[0] !== 'background' && (
        <div
          onClick={removeObject}
          className="btn-accent btn-outline rounded-box btn h-12 w-12 cursor-pointer border-0 p-3 sm:h-16 sm:w-16"
        >
          <FaTrashAlt className="h-full w-full" />
        </div>
      )}
    </>
  );
};

export default HeaderRemoveButton;
